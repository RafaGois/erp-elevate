# Relatório Mensal — Backend (modelo + rotas) para o contrato do frontend

> Documento de implementação do **backend** (`elevate_api` · Express + TypeScript + **Prisma**) da feature de **relatório mensal de social media por cliente**.
> Complementa e **refina** o `docs/monthly-report.md`: aquele documento descreve a ideia geral e a estrutura do `dados`; **este aqui descreve o contrato exato que o frontend já implementado consome**.
> Onde os dois divergirem, **vale este documento** — porque ele reflete o código real que está rodando no front.
> Documento autocontido: cada passo numerado pode ser usado como prompt.

---

## 0. TL;DR — o que mudou em relação ao `monthly-report.md`

O frontend foi implementado **espelhando o módulo de Orçamento (`Budget`)**, não a modelagem por `clienteId` da seção 4 do `monthly-report.md`. As diferenças, todas já cravadas no front:

| Tema | `monthly-report.md` (seção 4) | **Implementado no front (vale este doc)** |
|---|---|---|
| Nome do recurso/rotas | `/api/clientes/:clienteId/relatorios`, `/api/relatorios/:id` | **`/reports`**, **`/reports/:id`**, **`/reports/slug/:slug`** (espelha `/budgets`) |
| Vínculo com cliente | relação `clienteId` → entidade `Cliente` | **string `client`** denormalizada (igual `Budget.client`) — sem entidade Cliente |
| Identificação pública | por `id` | **por `slug`** (link `/relatorio/[slug]`), igual ao orçamento |
| Campo de título | — | **`name`** (título exibido na listagem) |
| Conteúdo das métricas | `dados Json` | **`dados Json`** (igual; mesma estrutura da seção 4.2) |
| Como as métricas entram | formulário no editor | **na criação vão zeradas**; o gestor preenche **clicando nos valores na própria tela** e salva via `PUT /reports/:id` com `{ dados }` |
| Atualização | PUT com payload completo | **PUT parcial**: ora só metadados (`name/client/competencia/status`), ora só `{ dados }` |

> Resumindo: **copie o módulo `Budget` e troque `content` por `dados` + adicione `competencia` e `status`.** O resto (slug, `client` string, rotas, auth) é igual ao orçamento.

---

## 1. Decisões cravadas

1. **Recurso `Report`**, rotas REST em **`/reports`** (plural, inglês — igual a `/budgets`).
2. **`client` é string** (nome do cliente), não FK. Sem entidade `Cliente` nesta feature.
3. **`slug` único**, gerado pelo front na criação e enviado no body; o backend deve persistir e indexar como único. (Se vier vazio, gerar no backend — ver 4.4.)
4. **`dados` é `Json`**, validado por Zod (seção 4.2/4.3 do `monthly-report.md`, reproduzidas aqui). O Prisma não valida o conteúdo — quem valida é o Zod.
5. **`competencia`** (`"YYYY-MM"`) e **`status`** (`RASCUNHO`/`PUBLICADO`) são colunas próprias.
6. **`PUT /reports/:id` é parcial**: aceita qualquer subconjunto de `{ name, client, competencia, status, slug, dados }`. Nunca exigir o payload inteiro.
7. **Leitura pública por slug**: `GET /reports/slug/:slug` e `GET /reports` precisam responder **sem autenticação** (o cliente final abre o link sem estar logado). As rotas de escrita são protegidas. Ver seção 6.

---

## 2. Model Prisma

Adicionar ao `schema.prisma`, espelhando os tipos de id e convenções do model **`Budget`** existente (se `Budget` usa `String @id @default(cuid())`, siga igual; se usa `Int autoincrement`, idem).

```prisma
model Report {
  id           String        @id @default(cuid())
  slug         String        @unique
  name         String
  client       String?
  competencia  String        // "YYYY-MM"
  status       ReportStatus  @default(RASCUNHO)
  dados        Json          // estrutura validada por Zod (seção 4)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  @@unique([client, competencia])   // no máx. 1 relatório por cliente/mês (opcional, ver 4.5)
  @@index([slug])
}

enum ReportStatus {
  RASCUNHO
  PUBLICADO
}
```

> **Sobre `@@unique([client, competencia])`:** garante a regra "um relatório por cliente por mês" do `monthly-report.md`. Como `client` é string, a unicidade é por nome exato. Se preferir não travar por isso, remova essa linha e mantenha só o `slug @unique`.

Rodar a migration:

```bash
npx prisma migrate dev --name add_report
```

---

## 3. Tipos TypeScript compartilhados

Espelham os tipos que o frontend já usa (`src/types/models/Report.ts`, `src/types/report-content.ts`, `src/types/enums/ReportStatus.ts`). **Mantenha sincronizado** — estes são a fonte da verdade do contrato.

```ts
export type ReportStatus = 'RASCUNHO' | 'PUBLICADO';

export interface Report {
  id: string;
  slug: string;
  name: string;
  client?: string | null;
  competencia: string;        // "YYYY-MM"
  status: ReportStatus;
  dados: DadosRelatorio;
  createdAt: string;
  updatedAt: string;
}
```

---

## 4. Estrutura do `dados` (Json) — idêntica à seção 4.2 do `monthly-report.md`

As **chaves são em português** porque o front lê/grava exatamente assim. Não renomeie.

```ts
export type HighlightTipo = 'feed' | 'carrossel' | 'reel' | 'story';

export interface ReportHighlight {
  titulo: string;
  tipo?: HighlightTipo;
  url?: string;
  capaUrl?: string;
  visualizacoes?: number;
  curtidas?: number;
  comentarios?: number;
  observacao?: string;
}

export interface DadosRelatorio {
  periodo: {
    competencia: string;        // "YYYY-MM" (redundante com Report.competencia)
    inicio?: string;            // ISO 8601
    fim?: string;               // ISO 8601
  };
  perfil: {
    seguidoresInicio?: number;
    seguidoresFim: number;
    novosSeguidores?: number;
    crescimentoPercentual?: number;
  };
  alcanceEVisualizacoes: {
    visualizacoesMensais: number;
    alcanceMensal?: number;
    impressoes?: number;
    visitasPerfil?: number;
    cliquesNoLink?: number;
  };
  engajamento: {
    curtidas?: number;
    comentarios?: number;
    compartilhamentos?: number;
    salvamentos?: number;
    taxaEngajamento?: number;   // %
  };
  conteudo?: {
    totalPublicacoes?: number;
    porTipo?: { feed?: number; carrossel?: number; reel?: number; story?: number };
  };
  destaques?: ReportHighlight[];
  observacoes?: string;
}
```

> **Importante sobre os zeros:** na criação o front manda esta estrutura **toda zerada** (template). Os opcionais podem chegar como `0`. O backend **não deve rejeitar zeros** nem exigir os campos opcionais. Os únicos obrigatórios dentro de `dados` são `periodo.competencia`, `perfil.seguidoresFim` e `alcanceEVisualizacoes.visualizacoesMensais` (que o template já preenche com `0`).

### 4.3 Schema de validação Zod

`src/modules/report/report.schema.ts`:

```ts
import { z } from 'zod';

const numNaoNegativo = z.number().nonnegative();
const competenciaRegex = /^\d{4}-\d{2}$/;

export const dadosRelatorioSchema = z.object({
  periodo: z.object({
    competencia: z.string().regex(competenciaRegex),
    inicio: z.string().datetime().optional(),
    fim: z.string().datetime().optional(),
  }),
  perfil: z.object({
    seguidoresInicio: numNaoNegativo.optional(),
    seguidoresFim: numNaoNegativo,
    novosSeguidores: z.number().optional(),         // pode ser negativo
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
  conteudo: z.object({
    totalPublicacoes: numNaoNegativo.optional(),
    porTipo: z.object({
      feed: numNaoNegativo.optional(),
      carrossel: numNaoNegativo.optional(),
      reel: numNaoNegativo.optional(),
      story: numNaoNegativo.optional(),
    }).optional(),
  }).optional(),
  destaques: z.array(z.object({
    titulo: z.string().min(1),
    tipo: z.enum(['feed', 'carrossel', 'reel', 'story']).optional(),
    url: z.string().url().optional(),
    capaUrl: z.string().url().optional(),
    visualizacoes: numNaoNegativo.optional(),
    curtidas: numNaoNegativo.optional(),
    comentarios: numNaoNegativo.optional(),
    observacao: z.string().optional(),
  })).optional(),
  observacoes: z.string().optional(),
});

// Criação: o front manda name/client/competencia/status/slug/dados.
export const criarReportSchema = z.object({
  name: z.string().min(1),
  client: z.string().optional().nullable(),
  competencia: z.string().regex(competenciaRegex),
  status: z.enum(['RASCUNHO', 'PUBLICADO']).optional(),
  slug: z.string().min(1).optional(),   // front envia; se ausente, backend gera (4.4)
  dados: dadosRelatorioSchema,
});

// Atualização: PARCIAL. Qualquer subconjunto. `dados` também pode vir parcial
// (o front manda o objeto inteiro, mas trate como "substitui o dados").
export const atualizarReportSchema = z.object({
  name: z.string().min(1).optional(),
  client: z.string().optional().nullable(),
  competencia: z.string().regex(competenciaRegex).optional(),
  status: z.enum(['RASCUNHO', 'PUBLICADO']).optional(),
  slug: z.string().min(1).optional(),
  dados: dadosRelatorioSchema.optional(),
}).strict();

export type CriarReportDTO = z.infer<typeof criarReportSchema>;
export type AtualizarReportDTO = z.infer<typeof atualizarReportSchema>;
```

> **`capaUrl`/`url` com `.url()`:** o front pode mandar string vazia `""` para `capaUrl` enquanto o gestor edita. Se isso causar erro de validação, troque por `z.string().url().or(z.literal('')).optional()` ou normalize `""` → `undefined` antes de validar.

### 4.4 Geração de slug (fallback no backend)

O front gera o slug como `"<client>-<competencia>"` normalizado (minúsculas, sem acento, `[^a-z0-9]` → `-`) e envia no `POST`. O backend deve:

- Usar o `slug` recebido se vier;
- Se vier vazio/ausente, gerar com a mesma regra;
- Garantir unicidade — em colisão, sufixar (`-2`, `-3`, …) **ou** retornar `409 DUPLICADO`. Recomendado sufixar para não quebrar o fluxo.

### 4.5 Unicidade por competência

Se mantiver `@@unique([client, competencia])`: ao criar um segundo relatório do mesmo `client` no mesmo mês, o Prisma lança erro de constraint → mapear para **`409 DUPLICADO`** (ver 7).

---

## 5. Contrato da API (o que o frontend chama)

Base URL: `https://elevatepromedia.com/api`. Header de auth: **`token: <valor-do-token>`** (sem prefixo `Bearer`), igual ao resto do app.

| # | Método | Rota | Auth | Body | Retorno |
|---|---|---|---|---|---|
| 1 | `GET`  | `/reports` | **pública** | — | `200` + `Report[]` |
| 2 | `GET`  | `/reports/slug/:slug` | **pública** | — | `200` + `Report` · `404` se não achar |
| 3 | `POST` | `/reports` | protegida | `CriarReportDTO` | `201` + `Report` |
| 4 | `PUT`  | `/reports/:id` | protegida | `AtualizarReportDTO` (parcial) | `200` + `Report` |
| 5 | `DELETE` | `/reports/:id` | protegida | — | `204` (ou `200`) |

Filtros opcionais em `GET /reports` (query params, bom ter mas o front não depende): `competencia` (`YYYY-MM`), `status`, `client`.

### Exemplos exatos do que o front manda

**(3) Criar — `POST /reports`** (modal de criação; métricas zeradas):

```json
{
  "name": "Relatório de Junho — ACME",
  "client": "ACME",
  "competencia": "2026-06",
  "status": "RASCUNHO",
  "slug": "acme-2026-06",
  "dados": {
    "periodo": { "competencia": "2026-06" },
    "perfil": { "seguidoresInicio": 0, "seguidoresFim": 0, "novosSeguidores": 0, "crescimentoPercentual": 0 },
    "alcanceEVisualizacoes": { "visualizacoesMensais": 0, "alcanceMensal": 0, "impressoes": 0, "visitasPerfil": 0, "cliquesNoLink": 0 },
    "engajamento": { "curtidas": 0, "comentarios": 0, "compartilhamentos": 0, "salvamentos": 0, "taxaEngajamento": 0 },
    "conteudo": { "totalPublicacoes": 0, "porTipo": { "feed": 0, "carrossel": 0, "reel": 0, "story": 0 } },
    "destaques": [],
    "observacoes": ""
  }
}
```

**(4a) Editar metadados — `PUT /reports/:id`** (modal de edição):

```json
{ "name": "Relatório de Junho — ACME", "client": "ACME", "competencia": "2026-06", "status": "PUBLICADO" }
```

**(4b) Salvar métricas editadas na tela — `PUT /reports/:id`** (edição inline → barra "Salvar"):

```json
{
  "dados": {
    "periodo": { "competencia": "2026-06" },
    "perfil": { "seguidoresInicio": 12030, "seguidoresFim": 12540, "novosSeguidores": 510, "crescimentoPercentual": 4.2 },
    "alcanceEVisualizacoes": { "visualizacoesMensais": 188900, "alcanceMensal": 152300, "visitasPerfil": 3400, "impressoes": 0, "cliquesNoLink": 0 },
    "engajamento": { "curtidas": 8420, "comentarios": 512, "compartilhamentos": 690, "salvamentos": 430, "taxaEngajamento": 6.42 },
    "conteudo": { "totalPublicacoes": 14, "porTipo": { "feed": 5, "carrossel": 3, "reel": 4, "story": 2 } },
    "destaques": [
      { "titulo": "Bastidores da gravação", "tipo": "reel", "visualizacoes": 22100, "curtidas": 1320, "comentarios": 87 }
    ],
    "observacoes": "Melhor mês de crescimento do semestre."
  }
}
```

> Em **(4b)** o body **só tem `dados`** — o backend deve atualizar apenas esse campo e preservar `name/client/competencia/status`. Em **(4a)** acontece o inverso. Por isso o `PUT` precisa ser parcial.

### Resposta esperada (todos os GET/POST/PUT)

Objeto `Report` completo, com `dados` **já como objeto JSON** (não string). Datas em ISO 8601.

```json
{
  "id": "ckv...",
  "slug": "acme-2026-06",
  "name": "Relatório de Junho — ACME",
  "client": "ACME",
  "competencia": "2026-06",
  "status": "PUBLICADO",
  "dados": { "...": "..." },
  "createdAt": "2026-06-28T12:00:00.000Z",
  "updatedAt": "2026-06-28T12:30:00.000Z"
}
```

---

## 6. Autenticação / autorização

Espelhe exatamente o módulo de **orçamento**:

- **`GET /reports/slug/:slug` e `GET /reports`**: **públicas** (sem exigir token). O cliente final abre o link `/relatorio/[slug]` sem login; o front também faz fallback listando `/reports` e filtrando por slug. Se hoje `/budgets` e `/budgets/slug/:slug` são públicas, faça igual.
- **`POST` / `PUT` / `DELETE /reports`**: **protegidas** (exigem token válido). Só o gestor cria/edita/exclui.
- O front envia o token no header `token` quando logado (interceptor do `api`), inclusive nos GET — então aceite o header se presente, mas **não exija** nos GET.

> O `proxy.ts` do front protege apenas `/dashboard/*`. A página pública `/relatorio/[slug]` **não** passa pelo proxy — a proteção de escrita é responsabilidade da API.

---

## 7. Formato de erro

Reaproveite o handler do orçamento. Se não houver padrão, use:

```ts
interface ErroResposta {
  erro: {
    codigo: 'VALIDACAO' | 'NAO_ENCONTRADO' | 'DUPLICADO' | 'INTERNO';
    mensagem: string;
    detalhes?: unknown; // issues do Zod
  };
}
```

Mapeamento de status:

| Situação | Status | `codigo` |
|---|---|---|
| Body inválido (Zod) | `400` | `VALIDACAO` |
| Relatório não encontrado (id/slug) | `404` | `NAO_ENCONTRADO` |
| `slug` ou `(client, competencia)` duplicado | `409` | `DUPLICADO` |
| Erro inesperado | `500` | `INTERNO` |

> O front trata erro lendo a mensagem genérica e mostrando toast; não depende do shape do erro, mas siga o padrão para consistência.

---

## 8. Estrutura de arquivos (espelhando o módulo de orçamento)

```
src/modules/report/
├── report.types.ts        # Report + DadosRelatorio (seções 3 e 4)
├── report.schema.ts       # schemas Zod + DTOs (seção 4.3)
├── report.repository.ts   # acesso Prisma
├── report.service.ts      # regras de negócio (slug, unicidade, validação)
├── report.controller.ts   # handlers HTTP
├── report.routes.ts       # rotas Express (seção 5)
└── __tests__/report.service.test.ts
```

---

## 9. Passo a passo (cada item é um prompt)

1. "Adicione ao `schema.prisma` o model `Report` e o enum `ReportStatus` exatamente como na seção 2 deste doc, espelhando os tipos de id do model `Budget`. Gere a migration `add_report`."

2. "Crie `src/modules/report/report.types.ts` com `Report`, `DadosRelatorio`, `ReportHighlight`, `ReportStatus` (seções 3 e 4)."

3. "Crie `src/modules/report/report.schema.ts` com `dadosRelatorioSchema`, `criarReportSchema`, `atualizarReportSchema` (parcial) e os DTOs inferidos (seção 4.3). Trate `capaUrl/url` vazias e não rejeite zeros."

4. "Crie `report.repository.ts` espelhando o repository de `Budget`: `criar`, `listar(filtros)`, `obterPorId`, `obterPorSlug`, `atualizar(id, patchParcial)`, `remover`. Grave/leia `dados` como `Json` (retorne como objeto, nunca string)."

5. "Crie `report.service.ts`: (a) gera/normaliza `slug` e garante unicidade sufixando em colisão (seção 4.4); (b) valida `dados` com Zod; (c) se mantiver `@@unique([client, competencia])`, mapeie a violação para `409 DUPLICADO`; (d) `atualizar` faz **merge parcial** — atualiza só os campos enviados (inclusive quando vier só `dados`)."

6. "Crie `report.controller.ts` e `report.routes.ts` com os 5 endpoints da seção 5, aplicando os schemas Zod e os filtros de query. **`GET /reports` e `GET /reports/slug/:slug` são públicas**; `POST/PUT/DELETE` são protegidas (seção 6). Registre as rotas em `/reports` no app Express."

7. "Garanta o tratamento de erro no formato `ErroResposta` (seção 7): `ZodError`→`400`, não-encontrado→`404`, duplicidade→`409`, resto→`500`."

8. "Escreva testes em `report.service.test.ts`: criação válida (com `dados` zerado), atualização parcial só de `dados`, atualização parcial só de metadados, geração/unicidade de slug e busca por slug."

---

## 10. Ordem de execução

1. Passo 1 (migration).
2. Passos 2–3 (tipos + schemas).
3. Passos 4–7 (repository → service → rotas → erro).
4. Passo 8 (testes) — pode rodar em paralelo a partir do 5.
5. Subir a API e validar contra o front: criar pelo dashboard (`/dashboard/reports`), abrir `/relatorio/<slug>`, editar valores na tela e salvar.

---

## 11. Checklist de paridade com o frontend

- [ ] Rotas em **`/reports`** (não `/relatorios`, não aninhado em `/clientes`).
- [ ] **`GET /reports/slug/:slug`** existe e é **pública**.
- [ ] `GET /reports` é **pública** (fallback do front depende disso).
- [ ] `POST /reports` aceita `{ name, client, competencia, status, slug, dados }` e devolve o `Report` criado com `id` e `slug`.
- [ ] `PUT /reports/:id` é **parcial** (aceita só `{ dados }` **ou** só metadados).
- [ ] `dados` volta como **objeto JSON**, com as **chaves em português** intactas.
- [ ] `status` aceita `"RASCUNHO"` e `"PUBLICADO"`.
- [ ] Zeros e campos opcionais não são rejeitados.
- [ ] `slug` único; colisão sufixada (ou `409`).
- [ ] `DELETE /reports/:id` remove e devolve `204/200`.
```
