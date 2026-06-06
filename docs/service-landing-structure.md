# Estrutura de Páginas de Serviço — Sistemas Elevate

> Documento de referência para idealização e implementação das landing pages de alta conversão por serviço.  
> Baseado na skill [Aura — Landing Page High Conversion](https://www.aura.build/skills/8f0a2ce4-15bb-41b5-8bbf-36efc2634e1d/landing-page-high-conversion-web-design) e no conteúdo atual de `src/lib/data/services.ts`.

**Última atualização:** 2026-06-05  
**Status:** Idealização (estrutura apenas — sem implementação)

---

## 1. Contexto

A Elevate é uma **fábrica de software** focada em:

- Digitalização de empresas industriais
- Sistemas de controle de produção (PCP / MES)
- Desenvolvimento sob medida
- Dashboards e indicadores industriais
- Integração e automação de processos
- Sites institucionais e presença digital (a definir se página própria ou sub-bloco)

**Situação atual:**

- 5 serviços em `src/lib/data/services.ts`
- Rota `/servicos/[slug]` com layout simples (texto longo)
- Landing em `Services.tsx` com cards visuais, mas sem LP completa por serviço

**Objetivo:**

Cada serviço vira uma **mini-landing de alta conversão**, quase independente, mantendo identidade visual Elevate (retro, lime `#dfff00`, tom industrial).

---

## 2. Princípios globais (todas as páginas)

| Regra | Aplicação na Elevate |
|--------|----------------------|
| **1 CTA principal** | WhatsApp (`ELEVATE_WHATSAPP_URL`) — repetido 3x: hero, meio, fechamento |
| **Headline = resultado** | Foco em outcome operacional, não em nome técnico do serviço |
| **Cada seção responde** | *Você me entende?* → *Pode me ajudar?* → *Posso confiar?* |
| **Ritmo visual alternado** | Texto + mockup / diagrama / foto industrial — evitar blocos só de texto |
| **Prova específica** | Números, setor, cases reais quando possível |
| **Identidade visual** | Badge `SYS://`, retro window, tipografia display/pixel da landing |
| **Construção seção a seção** | Padrão Aura: não gerar página monolítica; iterar bloco por bloco |

---

## 3. Template único — 14 seções + footer

Ordem fixa para todos os serviços. Apenas copy, ícones, imagens e blocos opcionais mudam.

```
┌─────────────────────────────────────────────────────────────┐
│  NAV minimal (logo + voltar + CTA WhatsApp no scroll)         │
├─────────────────────────────────────────────────────────────┤
│  01. HERO — Above the fold                                  │
│  02. TRUST BAR — Credibilidade rápida                       │
│  03. PROBLEMA — Dor da indústria                            │
│  04. TRANSFORMAÇÃO — Antes → Depois                         │
│  05. SOLUÇÃO — Benefícios (não features)                    │
│  06. COMO FUNCIONA — 3 passos                               │
│  07. O QUE ESTÁ INCLUÍDO — Escopo claro                     │
│  08. CAPACIDADES — Grid de features (escaneável)            │
│  09. PARA QUEM É — Segmentação + anti-persona               │
│  10. PROVA SOCIAL — Cases / depoimentos / logos             │
│  11. COMPARATIVO — Elevate vs alternativas                  │
│  12. FAQ — Objeções B2B                                     │
│  13. CTA FINAL — Fechamento + WhatsApp                      │
│  14. SERVIÇOS RELACIONADOS — Cross-sell                     │
│  FOOTER (igual landing principal)                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Detalhamento por seção

### 01. Hero (Above the fold)

**Objetivo:** comunicar valor em menos de 5 segundos.

**Elementos:**

- Badge: `SYS://PCP`, `SYS://DIGITAL`, etc.
- Headline (≤10 palavras): resultado operacional
- Subheadline: público + contexto industrial
- CTA primário: “Falar no WhatsApp”
- CTA secundário: “Ver como funciona” (âncora `#como-funciona`)
- Visual: mockup, dashboard ou diagrama (evitar stock genérico)
- Micro-prova: “Metal mecânica · Usinagem · Manufatura sob encomenda”

**Exemplo (PCP):**

> **Veja em tempo real o que está atrasando na sua produção.**  
> PCP sob medida para fábricas que ainda planejam em planilha.

---

### 02. Trust bar

**Objetivo:** reduzir risco percebido.

**Elementos:**

- Logos de clientes / setores
- Métricas: anos de experiência, sistemas em produção
- Selos: “Desenvolvimento sob medida”, “Suporte pós-implantação”, “Integração com ERP”

---

### 03. Problema (agitação empática)

**Objetivo:** visitante pensa “essa empresa me entende”.

**Formato:** 3 cards de dor.

**Exemplos de dores:**

- Planilhas que não batem
- Prazo prometido ≠ prazo real
- Informação em silos (comercial / produção / estoque)
- Retrabalho por digitação duplicada
- Gestão sem visibilidade do chão de fábrica

**Tom:** linguagem de fábrica e gestão, não jargão de software.

---

### 04. Transformação (Antes → Depois)

**Objetivo:** visualizar o ganho concreto.

| Antes | Depois |
|-------|--------|
| Status por WhatsApp | Painel em tempo real |
| 5 planilhas desconectadas | Uma fonte de verdade |
| Prazo “no feeling” | Lead time mensurável |
| Dado digitado 3 vezes | Integração automática |

**Layout:** blocos alternados (texto | visual).

---

### 05. Solução (benefícios)

**Objetivo:** responder “pode me ajudar?”.

**Formato:** 3–4 blocos com outcome:

- **Previsibilidade** — saiba o que entrega na semana
- **Rastreabilidade** — do pedido ao chão de fábrica
- **Decisão com dados** — menos reunião, mais indicador
- **Escala sem caos** — processo documentado e evolutivo

Cada bloco: ícone + título + 2 linhas + métrica opcional.

---

### 06. Como funciona (3 passos)

**Objetivo:** reduzir medo de projeto grande.

```
01 Diagnóstico   → Mapeamos processos e gargalos
02 Construção    → Entregas parciais com validação
03 Implantação   → Treinamento + suporte + evolução
```

**CTA intermediário:** WhatsApp (2ª repetição).

**Âncora:** `id="como-funciona"`

---

### 07. O que está incluído

**Objetivo:** clareza de escopo (crítico em B2B industrial).

**Lista típica de entregáveis:**

- Levantamento de requisitos e processos
- Protótipo / validação com equipe
- Sistema web responsivo
- Integrações (API, ERP, planilhas, máquinas quando aplicável)
- Documentação técnica e funcional
- Treinamento e implantação assistida
- Suporte pós-go-live

---

### 08. Capacidades (feature grid)

**Objetivo:** detalhe técnico para quem precisa aprofundar.

**Formato:** grid 2×3 ou 3×3, ícones, títulos curtos.

**Fonte de conteúdo:** listas e parágrafos atuais de `services.ts` → `sections[]`.

---

### 09. Para quem é / não é

**Indicado para:**

- Indústria metal mecânica, usinagem, montagem
- Empresas com processo único ou misto
- Operações com ERP mas sem visão de chão de fábrica
- Gestores que precisam de controle real, não relatório defasado

**Não indicado para:**

- Quem busca apenas vitrine sem processo
- Quem quer SaaS genérico sem adaptação
- Projetos sem disponibilidade para validar com a operação

---

### 10. Prova social

**Objetivo:** responder “posso confiar?”.

**Camadas:**

1. **Case curto** — problema → solução → resultado
2. **Depoimento** — nome + cargo + foto (quando houver)
3. **Métricas** — ganhos operacionais (mesmo estimativas qualificadas no início)

**Cases de referência (já no ecossistema Elevate):**

- ERP Elevate (gestão integrada)
- Codinome Barbearia
- Pollis Pollen Intelligence

**Opcional:** strip de vídeo / UGC industrial.

---

### 11. Comparativo

**Objetivo:** ajudar na decisão.

**Formato:** tabela simples.

| Critério | Planilhas | ERP genérico | Elevate |
|----------|-----------|--------------|---------|
| Aderência ao processo | ❌ | ⚠️ | ✅ |
| Integração chão de fábrica | ❌ | ⚠️ | ✅ |
| Evolução sob medida | ❌ | ❌ | ✅ |
| Indicadores em tempo real | ❌ | ⚠️ | ✅ |

*Variar comparativo por serviço.*

---

### 12. FAQ (6–8 perguntas)

**Objetivo:** eliminar objeções antes do contato.

**Perguntas típicas B2B:**

- Quanto tempo leva um projeto?
- Preciso trocar meu ERP?
- Funciona no chão de fábrica (tablet/celular)?
- Como é o suporte depois da entrega?
- Qual o investimento inicial?
- Vocês atendem empresas do meu porte?
- O sistema é exclusivo da minha empresa?
- Como garantem que a equipe vai usar?

---

### 13. CTA final

**Objetivo:** fechar com confiança.

**Elementos:**

- Headline emocional (ex.: “Sua fábrica merece controle de verdade.”)
- Botão grande WhatsApp (3ª repetição do CTA)
- Redutor de risco: “Diagnóstico inicial sem compromisso” ou “Conversa de 30 min”

---

### 14. Serviços relacionados

**Objetivo:** cross-sell e retenção no site.

**Formato:** 2–3 cards com link para outros `/servicos/[slug]`.

---

## 5. Mapa dos 5 serviços atuais

| Slug | Nome (`services.ts`) | Headline sugerida | Foco da página | Cross-sell |
|------|----------------------|-------------------|----------------|------------|
| `digitalizacao` | Digitalização de Empresas Industriais | “Saia do papel sem parar a fábrica.” | Maturidade digital, plano em etapas | PCP, Integração |
| `pcp` | Sistemas de Controle de Produção (PCP) | “O cérebro da sua produção, em tempo real.” | Chão de fábrica, OEE, ordens, prazos | Dashboards, Integração |
| `sistemas-sob-medida` | Desenvolvimento de Sistemas Sob Medida | “Software que encaixa no seu processo — não o contrário.” | Ciclo dev, arquitetura, setores | Digitalização, Integração |
| `dashboards` | Dashboards e Indicadores Industriais | “Decisão com dado atualizado, não planilha de ontem.” | KPIs, OEE, painéis operacionais/gerenciais | PCP, Integração |
| `integracao-automacao` | Integração e Automação de Processos | “Seus sistemas finalmente conversando.” | APIs, ETL, ERP, máquinas | Digitalização, PCP |

### Alinhamento landing vs dados

| Landing (`Services.tsx`) | Slug | `services.ts` |
|--------------------------|------|---------------|
| Presença Digital Corporativa | `digitalizacao` | Digitalização de Empresas Industriais |
| Sistemas de Controle de Produção | `pcp` | Sistemas de Controle de Produção (PCP) |
| BI Industrial e Análise de Dados | `dashboards` | Dashboards e Indicadores Industriais |
| Integração com Automação Industrial | `integracao-automacao` | Integração e Automação de Processos |
| Desenvolvimento Sob Medida | `sistemas-sob-medida` | Desenvolvimento de Sistemas Sob Medida |

**Pendência:** unificar nomenclatura entre landing e páginas de serviço na implementação.

---

## 6. Sites institucionais — decisão estratégica

**Opção A — Manter 5 páginas**  
Sites institucionais como sub-bloco dentro de `digitalizacao` (seções 07 e 10).

**Opção B — 6ª página dedicada** (`sites-institucionais`)  
LP focada em: marca, SEO, performance, formulários, integração com operação.  
Recomendado se sites forem linha de receita separada de PCP/fábrica.

**Status:** a definir com o time.

---

## 7. Rotas e navegação

```
/                    → Landing (seção serviços)
/servicos/[slug]     → LP completa por serviço
/servicos            → Índice opcional (grid dos serviços)
```

**Fluxo:**

1. Usuário vê card na landing (`/#services`)
2. Clica “Ver solução completa →”
3. Entra em `/servicos/{slug}`
4. Percorre LP → CTA WhatsApp
5. Opcional: explora serviços relacionados

---

## 8. Modelo de dados proposto

Substituir/evoluir `ServicePage` em `services.ts`:

```ts
type ServiceLandingPage = {
  slug: string;
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
  hero: {
    badge: string;           // ex: "SYS://PCP"
    headline: string;
    subheadline: string;
    primaryCta: string;      // "Falar no WhatsApp"
    secondaryCta: string;    // "Ver como funciona"
    visual?: string;         // URL imagem/mockup
  };
  trustBar: {
    items: string[];
  };
  problem: {
    title: string;
    pains: { title: string; description: string }[];
  };
  transformation: {
    before: string[];
    after: string[];
  };
  benefits: {
    title: string;
    description: string;
    metric?: string;
  }[];
  howItWorks: {
    step: string;            // "01", "02", "03"
    title: string;
    description: string;
  }[];
  deliverables: string[];
  capabilities: {
    icon?: string;
    title: string;
    description: string;
  }[];
  audience: {
    for: string[];
    notFor: string[];
  };
  socialProof: {
    cases?: {
      title: string;
      problem: string;
      solution: string;
      result: string;
    }[];
    testimonials?: {
      quote: string;
      author: string;
      role: string;
    }[];
    metrics?: string[];
  };
  comparison: {
    columns: string[];
    rows: { label: string; values: ("yes" | "partial" | "no")[] }[];
  };
  faq: { question: string; answer: string }[];
  relatedServices: string[];  // slugs
  // Legado — migrar conteúdo de sections[] para blocos acima
  listingDescription: string;
  shortDescription: string;
};
```

**Migração:** conteúdo atual em `sections[]` alimenta `benefits`, `capabilities`, `audience` e `faq`.

---

## 9. Estrutura de arquivos (implementação futura)

```
src/
├── app/(public)/servicos/
│   ├── page.tsx                    # índice opcional
│   └── [slug]/
│       ├── page.tsx                # Server Component — loader
│       └── _components/
│           ├── ServiceHero.tsx
│           ├── ServiceTrustBar.tsx
│           ├── ServiceProblem.tsx
│           ├── ServiceTransformation.tsx
│           ├── ServiceBenefits.tsx
│           ├── ServiceHowItWorks.tsx
│           ├── ServiceDeliverables.tsx
│           ├── ServiceCapabilities.tsx
│           ├── ServiceAudience.tsx
│           ├── ServiceSocialProof.tsx
│           ├── ServiceComparison.tsx
│           ├── ServiceFaq.tsx
│           ├── ServiceCtaFinal.tsx
│           └── ServiceRelated.tsx
├── lib/data/
│   └── services.ts                 # dados estruturados (evoluído)
└── types/
    └── service-landing.ts          # tipos ServiceLandingPage
```

---

## 10. Ordem de implementação sugerida

1. [ ] Validar 5 slugs e decisão sobre `sites-institucionais`
2. [ ] Unificar nomes entre `Services.tsx` e `services.ts`
3. [ ] Definir tipos (`ServiceLandingPage`)
4. [ ] Migrar conteúdo de 1 serviço piloto (**sugestão: `pcp`**)
5. [ ] Implementar template de seções reutilizáveis
6. [ ] Publicar `/servicos/pcp` e validar conversão
7. [ ] Replicar para os outros 4 serviços
8. [ ] Criar `/servicos` índice (opcional)
9. [ ] Atualizar links na landing (`Ver solução completa →`)

---

## 11. Checklist de qualidade (antes de publicar cada página)

- [ ] Headline comunica resultado em < 5 segundos
- [ ] CTA WhatsApp aparece 3x (hero, meio, final)
- [ ] Nenhuma seção é só parágrafo — há ritmo visual
- [ ] Problema usa linguagem da indústria metal mecânica
- [ ] FAQ cobre objeções de prazo, ERP, investimento e suporte
- [ ] Comparativo é honesto (não prometer o que não entrega)
- [ ] Links para serviços relacionados funcionam
- [ ] Metadata SEO (`title`, `description`) preenchidos
- [ ] Mobile: hero e CTAs legíveis sem scroll excessivo
- [ ] Identidade Elevate preservada (cores, tipografia, retro)

---

## 12. Referências

- Skill Aura: [Landing Page High Conversion Web Design](https://www.aura.build/skills/8f0a2ce4-15bb-41b5-8bbf-36efc2634e1d/landing-page-high-conversion-web-design)
- Dados atuais: `src/lib/data/services.ts`
- Página atual: `src/app/(public)/servicos/[slug]/page.tsx`
- Cards landing: `src/components/landing/services/Services.tsx`
- CTA WhatsApp: `src/lib/data/contact-links.ts`
- Cases: `src/lib/data/budget-templates.ts`

---

*Documento vivo — atualizar conforme decisões de produto e implementação.*
