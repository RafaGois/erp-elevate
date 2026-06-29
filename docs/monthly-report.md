# Relatório Mensal de Social Media — Especificação de Implementação

> Documento de referência para instruir a IA na implementação da feature de **relatório mensal de social media por cliente**.
> Projeto backend: `elevate_api` (Express + TypeScript + **Prisma**). Frontend: Next.
> **Esta feature espelha o módulo de Orçamento já existente:** um formulário salva os dados como **JSON no banco** e uma tela renderiza esse JSON. A única diferença é a estrutura do modelo (relatório, não orçamento).
> Documento autocontido: todo modelo, schema Prisma e contrato a ser criado está aqui. Cada passo numerado pode ser usado como prompt.

---

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Relação com o módulo de Orçamento](#2-relação-com-o-módulo-de-orçamento)
3. [Decisões de design (já cravadas)](#3-decisões-de-design-já-cravadas)
4. [BACKEND](#4-backend)
   - 4.1 [Model Prisma](#41-model-prisma)
   - 4.2 [Estrutura do JSON `dados` (tipo TS)](#42-estrutura-do-json-dados-tipo-ts)
   - 4.3 [Schema de validação Zod](#43-schema-de-validação-zod)
   - 4.4 [Estrutura de arquivos](#44-estrutura-de-arquivos)
   - 4.5 [Contrato da API](#45-contrato-da-api-comunicação-com-o-frontend)
   - 4.6 [Passo a passo](#46-passo-a-passo-backend)
5. [FRONTEND](#5-frontend)
   - 5.1 [Tipos compartilhados](#51-tipos-compartilhados)
   - 5.2 [Cliente HTTP](#52-cliente-http)
   - 5.3 [Editor do relatório](#53-editor-do-relatório)
   - 5.4 [Tela de visualização](#54-tela-de-visualização-render)
   - 5.5 [Passo a passo](#55-passo-a-passo-frontend)
6. [Ordem de execução](#6-ordem-de-execução)
7. [Pontos de atenção](#7-pontos-de-atenção)

---

## 1. Visão geral

O que será construído:

- **Backend (`elevate_api`):** uma entidade `Relatorio` no Prisma, vinculada ao `Cliente` já existente, com os dados do relatório guardados num campo **`Json`** (mesmo padrão do orçamento). CRUD via REST.
- **Frontend (Next):** um **editor** (formulário que preenche os valores informados e salva o JSON) e uma **tela de visualização** que renderiza esse JSON — exatamente como o orçamento funciona hoje.

Mudança central em relação a versões anteriores desta spec: **não há mais entidade `Post` nem agregação**. A unidade de trabalho é o **relatório**, e os valores (visualizações mensais, número de seguidores, etc.) são **informados manualmente** no formulário, do mesmo jeito que os itens de um orçamento são informados.

A entidade **Cliente já existe** — esta feature apenas a referencia por `clienteId`.

---

## 2. Relação com o módulo de Orçamento

A regra de ouro: **copie o que o orçamento já faz e troque o modelo.** Onde o orçamento tem seus campos, o relatório tem os campos da seção 4.2.

| Aspecto | Orçamento (existente) | Relatório (novo) |
|---|---|---|
| Entidade Prisma | `Orcamento` | `Relatorio` |
| Vínculo | `clienteId` | `clienteId` |
| Conteúdo | `Json` (dados do orçamento) | `Json` (dados do relatório — seção 4.2) |
| Persistência | Prisma | Prisma (mesmo padrão) |
| Backend | repository/service/controller/routes | espelhar os mesmos arquivos |
| Frontend | editor (form → JSON) + tela de render | espelhar editor + render |

Sempre que este documento disser "espelhe o orçamento", reaproveite a estrutura de arquivos, os padrões de service/controller e os componentes de UI já existentes, mudando apenas o modelo de dados.

---

## 3. Decisões de design (já cravadas)

1. **Relatório é a entidade; valores são informados manualmente** no formulário (não calculados a partir de posts).
2. **Conteúdo guardado como `Json`** no Prisma (campo `dados`), validado por Zod na entrada. Mesmo padrão do orçamento.
3. **`competencia` (`YYYY-MM`) é um campo informado** no formulário (o gestor escolhe o mês de referência). Um cliente tem no máximo um relatório por competência (`@@unique`).
4. **Status `RASCUNHO` / `PUBLICADO`** para diferenciar o que está em edição do que foi entregue, espelhando o fluxo do orçamento (ajuste se o orçamento usar outra convenção).
5. **Seção de destaques é opcional e faz parte do JSON** (não é entidade): uma lista de até N publicações de destaque, informadas manualmente dentro do próprio relatório.

---

## 4. BACKEND

### 4.1 Model Prisma

Adicionar ao `schema.prisma`. Ajuste tipos de id, naming e convenções ao que o **model `Orcamento` já usa** no projeto (se o orçamento usa `Int` autoincrement ou `String cuid`, siga o mesmo).

```prisma
model Relatorio {
  id           String          @id @default(cuid())
  clienteId    String
  cliente      Cliente         @relation(fields: [clienteId], references: [id])
  competencia  String          // "YYYY-MM"
  status       RelatorioStatus @default(RASCUNHO)
  dados        Json            // estrutura validada por Zod (ver 4.2 / 4.3)
  criadoEm     DateTime        @default(now())
  atualizadoEm DateTime        @updatedAt

  @@unique([clienteId, competencia])
  @@index([clienteId])
}

enum RelatorioStatus {
  RASCUNHO
  PUBLICADO
}
```

E acrescentar a relação inversa no model `Cliente` existente:

```prisma
model Cliente {
  // ...campos existentes...
  relatorios Relatorio[]
}
```

Depois rodar a migration (ex.: `npx prisma migrate dev --name add_relatorio`).

### 4.2 Estrutura do JSON `dados` (tipo TS)

Arquivo: `src/modules/relatorio/relatorio.types.ts`

Este tipo descreve o conteúdo do campo `dados Json`. Todos os valores são **informados manualmente** no formulário.

```ts
/** Conteúdo do relatório mensal (vai no campo `dados Json` do Prisma). */
export interface DadosRelatorio {
  /** Período de referência exibido no relatório. */
  periodo: {
    /** Mês de referência, redundante com Relatorio.competencia para facilitar o render. */
    competencia: string;        // "YYYY-MM"
    inicio?: string;            // ISO 8601, opcional
    fim?: string;               // ISO 8601, opcional
  };

  /** Dados de perfil / audiência. */
  perfil: {
    seguidoresInicio?: number;  // seguidores no começo do mês
    seguidoresFim: number;      // seguidores no fim do mês
    novosSeguidores?: number;   // ganho líquido no mês
    crescimentoPercentual?: number; // % de crescimento
  };

  /** Alcance e visualizações do mês. */
  alcanceEVisualizacoes: {
    visualizacoesMensais: number;   // total de visualizações no mês
    alcanceMensal?: number;         // contas únicas alcançadas
    impressoes?: number;
    visitasPerfil?: number;
    cliquesNoLink?: number;
  };

  /** Engajamento agregado do mês. */
  engajamento: {
    curtidas?: number;
    comentarios?: number;
    compartilhamentos?: number;
    salvamentos?: number;
    /** Taxa de engajamento do mês, em % (informada ou calculada na UI). */
    taxaEngajamento?: number;
  };

  /** Resumo de produção de conteúdo no mês. */
  conteudo?: {
    totalPublicacoes?: number;
    porTipo?: {
      feed?: number;
      carrossel?: number;
      reel?: number;
      story?: number;
    };
  };

  /** Publicações de destaque (informadas manualmente; NÃO são entidades). */
  destaques?: Array<{
    titulo: string;
    tipo?: 'feed' | 'carrossel' | 'reel' | 'story';
    url?: string;
    capaUrl?: string;
    visualizacoes?: number;
    curtidas?: number;
    comentarios?: number;
    observacao?: string;
  }>;

  /** Narrativa / comentários do gestor sobre o mês. */
  observacoes?: string;
}
```

E o tipo da entidade, refletindo o model Prisma:

```ts
export type RelatorioStatus = 'RASCUNHO' | 'PUBLICADO';

export interface Relatorio {
  id: string;
  clienteId: string;
  competencia: string;          // "YYYY-MM"
  status: RelatorioStatus;
  dados: DadosRelatorio;
  criadoEm: string;
  atualizadoEm: string;
}
```

### 4.3 Schema de validação Zod

Arquivo: `src/modules/relatorio/relatorio.schema.ts`

Valida o `dados` na entrada (mesmo princípio que o orçamento valida o conteúdo dele). Os DTOs são inferidos via `z.infer` e viram a fonte de verdade compartilhada com o frontend.

```ts
import { z } from 'zod';

const numNaoNegativo = z.number().nonnegative();

export const dadosRelatorioSchema = z.object({
  periodo: z.object({
    competencia: z.string().regex(/^\d{4}-\d{2}$/),
    inicio: z.string().datetime().optional(),
    fim: z.string().datetime().optional(),
  }),
  perfil: z.object({
    seguidoresInicio: numNaoNegativo.optional(),
    seguidoresFim: numNaoNegativo,
    novosSeguidores: z.number().optional(),
    crescimentoPercentual: z.number().optional(),
  }),
  alcanceEVisualizacoes: z.object({
    visualizacoesMensais: numNaoNegativo,
    alcanceMensal: numNaoNegativo.optional(),
    impressoes: numNaoNegativo.optional(),
    visitasPerfil: numNaoNegativo.optional(),
    cliquesNoLink: numNaoNegativo.optional(),
  }),
  engajamento: z.object({
    curtidas: numNaoNegativo.optional(),
    comentarios: numNaoNegativo.optional(),
    compartilhamentos: numNaoNegativo.optional(),
    salvamentos: numNaoNegativo.optional(),
    taxaEngajamento: z.number().optional(),
  }),
  conteudo: z
    .object({
      totalPublicacoes: numNaoNegativo.optional(),
      porTipo: z
        .object({
          feed: numNaoNegativo.optional(),
          carrossel: numNaoNegativo.optional(),
          reel: numNaoNegativo.optional(),
          story: numNaoNegativo.optional(),
        })
        .optional(),
    })
    .optional(),
  destaques: z
    .array(
      z.object({
        titulo: z.string().min(1),
        tipo: z.enum(['feed', 'carrossel', 'reel', 'story']).optional(),
        url: z.string().url().optional(),
        capaUrl: z.string().url().optional(),
        visualizacoes: numNaoNegativo.optional(),
        curtidas: numNaoNegativo.optional(),
        comentarios: numNaoNegativo.optional(),
        observacao: z.string().optional(),
      }),
    )
    .optional(),
  observacoes: z.string().optional(),
});

export const criarRelatorioSchema = z.object({
  competencia: z.string().regex(/^\d{4}-\d{2}$/),
  status: z.enum(['RASCUNHO', 'PUBLICADO']).optional(),
  dados: dadosRelatorioSchema,
});

export const atualizarRelatorioSchema = criarRelatorioSchema.partial();

export type CriarRelatorioDTO = z.infer<typeof criarRelatorioSchema>;
export type AtualizarRelatorioDTO = z.infer<typeof atualizarRelatorioSchema>;
```

### 4.4 Estrutura de arquivos

Espelhando o módulo de orçamento, dentro de `elevate_api`:

```
src/modules/relatorio/
├── relatorio.types.ts        # Relatorio + DadosRelatorio (seção 4.2)
├── relatorio.schema.ts       # schemas Zod + DTOs inferidos (seção 4.3)
├── relatorio.repository.ts   # acesso Prisma (espelhar o do orçamento)
├── relatorio.service.ts      # regras de negócio
├── relatorio.controller.ts   # handlers HTTP
├── relatorio.routes.ts       # rotas Express
└── __tests__/
    └── relatorio.service.test.ts
```

> Se o orçamento estiver organizado por camada e não por módulo, distribua estes arquivos seguindo o mesmo padrão.

### 4.5 Contrato da API (comunicação com o frontend)

Mesma forma que o orçamento expõe.

| Método | Rota | Função | Body | Retorno |
|---|---|---|---|---|
| `POST` | `/api/clientes/:clienteId/relatorios` | Cria relatório | `CriarRelatorioDTO` | `201` + `Relatorio` |
| `GET` | `/api/clientes/:clienteId/relatorios` | Lista relatórios do cliente | — | `200` + `Relatorio[]` |
| `GET` | `/api/relatorios/:id` | Detalhe | — | `200` + `Relatorio` |
| `PUT` | `/api/relatorios/:id` | Atualiza | `AtualizarRelatorioDTO` | `200` + `Relatorio` |
| `DELETE` | `/api/relatorios/:id` | Remove | — | `204` |

Filtros opcionais na listagem (query params): `competencia` (`YYYY-MM`), `status` (`RASCUNHO`|`PUBLICADO`).

**Formato de erro padrão** (idêntico ao do orçamento, se já houver; senão, criar):

```ts
interface ErroResposta {
  erro: {
    codigo: string;     // 'VALIDACAO' | 'NAO_ENCONTRADO' | 'CLIENTE_INEXISTENTE' | 'DUPLICADO' | 'INTERNO'
    mensagem: string;
    detalhes?: unknown; // issues do Zod
  };
}
```

Status: `400` (payload malformado), `404` (relatório/cliente não encontrado), `409` (`DUPLICADO` — já existe relatório para o cliente naquela competência), `422` (regra de negócio), `500` (interno).

**Exemplo de body de criação** — `POST /api/clientes/cli_123/relatorios`:

```json
{
  "competencia": "2026-06",
  "status": "RASCUNHO",
  "dados": {
    "periodo": { "competencia": "2026-06" },
    "perfil": { "seguidoresInicio": 12030, "seguidoresFim": 12540, "novosSeguidores": 510, "crescimentoPercentual": 4.2 },
    "alcanceEVisualizacoes": { "visualizacoesMensais": 188900, "alcanceMensal": 152300, "visitasPerfil": 3400 },
    "engajamento": { "curtidas": 8420, "comentarios": 512, "compartilhamentos": 690, "salvamentos": 430, "taxaEngajamento": 6.42 },
    "conteudo": { "totalPublicacoes": 14, "porTipo": { "feed": 5, "carrossel": 3, "reel": 4, "story": 2 } },
    "destaques": [
      { "titulo": "Bastidores da gravação", "tipo": "reel", "url": "https://instagram.com/reel/abc", "visualizacoes": 22100, "curtidas": 1320, "comentarios": 87 }
    ],
    "observacoes": "Melhor mês de crescimento do semestre."
  }
}
```

### 4.6 Passo a passo (backend)

> Cada item é um prompt. Execute de cima para baixo.

1. "Adicione ao `schema.prisma` o model `Relatorio` e o enum `RelatorioStatus` exatamente como na seção 4.1, e a relação inversa `relatorios Relatorio[]` no model `Cliente`. Gere a migration com `prisma migrate dev`. Espelhe os tipos de id e as convenções do model `Orcamento` existente."

2. "Crie `src/modules/relatorio/relatorio.types.ts` com `DadosRelatorio`, `Relatorio` e `RelatorioStatus` conforme a seção 4.2."

3. "Crie `src/modules/relatorio/relatorio.schema.ts` com os schemas Zod da seção 4.3 (`dadosRelatorioSchema`, `criarRelatorioSchema`, `atualizarRelatorioSchema`) e os DTOs inferidos."

4. "Crie `relatorio.repository.ts` espelhando o repository de orçamento, usando o Prisma Client: `criar`, `listarPorCliente(clienteId, filtros)`, `obterPorId`, `atualizar`, `remover`. O campo `dados` é gravado/lido como `Json`."

5. "Crie `relatorio.service.ts` espelhando o service de orçamento, com as regras: (a) validar que o `clienteId` existe (erro `CLIENTE_INEXISTENTE`); (b) impedir relatório duplicado para a mesma `competencia` do mesmo cliente, retornando `409 DUPLICADO` (a constraint `@@unique` reforça isso no banco); (c) validar `dados` com `dadosRelatorioSchema`."

6. "Crie `relatorio.controller.ts` e `relatorio.routes.ts` implementando os endpoints da seção 4.5, espelhando os do orçamento, aplicando os schemas Zod na entrada e os filtros de query param. Registre as rotas no app Express."

7. "Garanta o tratamento de erro no formato `ErroResposta` da seção 4.5 (reaproveite o middleware do orçamento se existir), mapeando `ZodError`→`400`, duplicidade→`409`, não-encontrado→`404`, regra de negócio→`422`, resto→`500`."

8. "Escreva testes em `__tests__/relatorio.service.test.ts`: criação válida, rejeição de cliente inexistente, rejeição de duplicidade por competência e validação de `dados` malformado."

---

## 5. FRONTEND

> Espelhe o que o orçamento já tem no Next: o editor que monta o JSON e a tela que renderiza. Construa após os endpoints existirem ou mockando o contrato da seção 4.5.

### 5.1 Tipos compartilhados

Reaproveite os tipos `Relatorio`, `DadosRelatorio`, `RelatorioStatus`, `CriarRelatorioDTO`, `AtualizarRelatorioDTO` definidos no backend (seções 4.2 e 4.3). **Não os redefina à mão.** Se não houver pacote compartilhado, copie do `elevate_api` mantendo sincronizado, com um comentário apontando o arquivo-fonte.

### 5.2 Cliente HTTP

Crie um cliente tipado (`relatorioApi`) espelhando o do orçamento, com uma função por endpoint da seção 4.5: `criarRelatorio`, `listarRelatorios`, `obterRelatorio`, `atualizarRelatorio`, `removerRelatorio`. Centralize o parse do `ErroResposta`.

### 5.3 Editor do relatório

Espelhe o **editor de orçamento**. A diferença é o conjunto de campos: o formulário monta o objeto `DadosRelatorio` (seção 4.2), agrupado em seções:

- **Período:** competência (seletor de mês), datas opcionais.
- **Perfil:** seguidores início/fim, novos seguidores, crescimento %.
- **Alcance e visualizações:** visualizações mensais, alcance, impressões, visitas ao perfil, cliques no link.
- **Engajamento:** curtidas, comentários, compartilhamentos, salvamentos, taxa de engajamento.
- **Conteúdo:** total de publicações e quebra por tipo.
- **Destaques:** lista dinâmica (adicionar/remover) de publicações de destaque.
- **Observações:** texto livre (narrativa do gestor).

Validar com o mesmo schema Zod do backend. Salvar via `criarRelatorio`/`atualizarRelatorio`.

### 5.4 Tela de visualização (render)

Espelhe a **tela que renderiza o orçamento** a partir do JSON. Aqui ela lê `Relatorio.dados` e monta o relatório visual: cabeçalho com cliente e competência; cards das métricas de perfil e alcance; bloco de engajamento; quebra de conteúdo por tipo; seção de destaques (usando `capaUrl`/`titulo`/métricas); e a narrativa. Reaproveite o mesmo mecanismo de exportação/impressão (PDF) que o orçamento já usa, se houver.

### 5.5 Passo a passo (frontend)

1. "Traga para o frontend os tipos da seção 4.2/4.3 (`Relatorio`, `DadosRelatorio`, DTOs), replicando do `elevate_api` sem redefinir."

2. "Crie o cliente HTTP `relatorioApi` espelhando o do orçamento, com as funções dos endpoints da seção 4.5 e tratamento do `ErroResposta`."

3. "Crie a tela de listagem de relatórios por cliente (filtros de `competencia` e `status`), espelhando a listagem de orçamentos, com estados de carregando/vazio/erro."

4. "Crie o editor de relatório espelhando o editor de orçamento, com as seções de campos da 5.3, montando o objeto `DadosRelatorio` e validando com o schema Zod do backend. Inclua a lista dinâmica de destaques (adicionar/remover)."

5. "Crie a tela de visualização do relatório espelhando a do orçamento: lê `Relatorio.dados` e renderiza as seções da 5.4. Reaproveite a exportação/impressão (PDF) do orçamento se existir."

6. "Adicione UX de feedback: validação inline, toasts lendo a `mensagem` do `ErroResposta`, e confirmação antes de remover um relatório."

---

## 6. Ordem de execução

1. Backend passo 1 (Prisma migration) — base de tudo.
2. Backend passos 2–3 (tipos + schemas).
3. Backend passos 4–7 (repository → service → rotas → erro).
4. Frontend passos 1–2 (tipos + cliente HTTP).
5. Frontend passos 3–6 (telas).
6. Backend passo 8 (testes) — pode rodar em paralelo a partir do passo 5.

---

## 7. Pontos de atenção

- **Espelhar de verdade o orçamento:** antes de codar, abra o módulo de orçamento e replique a estrutura (arquivos, padrão de service/controller, componentes de UI, exportação PDF). Isso reduz o trabalho a "trocar o modelo".
- **Unicidade por competência:** a constraint `@@unique([clienteId, competencia])` garante um relatório por mês por cliente; trate o erro do Prisma como `409 DUPLICADO` na API.
- **Validação do `Json`:** o Prisma não valida o conteúdo de um campo `Json` — quem valida é o Zod (`dadosRelatorioSchema`). Nunca grave `dados` sem passar pelo schema.
- **Paridade de validação:** o mesmo schema Zod no backend (autoritativo) e no frontend (UX). A validação do cliente é conveniência, não segurança.
- **`competencia` redundante:** ela existe tanto na coluna `Relatorio.competencia` (para query/unicidade) quanto em `dados.periodo.competencia` (para o render). Mantenha as duas iguais no service ao salvar.
- **Status e edição:** decida se um relatório `PUBLICADO` ainda pode ser editado ou se vira somente-leitura, seguindo a mesma regra que o orçamento aplica a propostas publicadas.
- **Compatibilidade de evolução:** como `dados` é `Json`, adicionar campos novos no futuro não exige migration — só atualizar o tipo e o schema. Bom para crescer o relatório sem dor.