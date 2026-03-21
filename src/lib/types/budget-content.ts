// ─── Hero ────────────────────────────────────────────────────────────────────
export interface HeroBlockData {
  titulo: string;
  subtitulo?: string;
  /** Client name shown on the left panel */
  cliente?: string;
  imagem?: string;
  /** e.g. "Proposta Comercial" */
  badge?: string;
  /** Project name shown on the left panel */
  projeto?: string;
  /** Date label */
  data?: string;
  /** Summary investment label e.g. "R$ 18.500" */
  investimento?: string;
  /** Delivery timeframe e.g. "7 semanas" */
  prazo?: string;
  /** Deliverables summary e.g. "6 entregas" */
  entregas?: string;
}

// ─── Sobre a empresa ─────────────────────────────────────────────────────────
export interface SobreEmpresaBlockData {
  titulo?: string;
  foto?: string;
  descricao: string;
  /** Short italic mission statement shown in the aside card */
  missao?: string;
  /** Legacy: renamed to diferenciais for display */
  destaques?: string[];
  diferenciais?: string[];
}

// ─── Sobre o projeto ─────────────────────────────────────────────────────────
export interface ProjetoBlockData {
  titulo?: string;
  descricao: string;
  imagem?: string;
  objetivos?: string[];
  /** Challenges / pain-points identified */
  desafios?: string[];
}

// ─── Serviços inclusos ───────────────────────────────────────────────────────
export interface ServicoItem {
  /** Display title */
  titulo?: string;
  /** Alternative field (legacy) */
  nome?: string;
  descricao?: string;
  icone?: string;
}

export interface ServicosBlockData {
  titulo?: string;
  subtitulo?: string;
  itens: ServicoItem[];
  /** Legacy alias */
  servicos?: ServicoItem[];
}

// ─── Timeline / Cronograma ───────────────────────────────────────────────────
export interface TimelineEtapa {
  fase: string;
  descricao: string;
  duracao: string;
}

/** Legacy alias */
export type TimelineItem = TimelineEtapa;

export interface TimelineBlockData {
  titulo?: string;
  etapas: TimelineEtapa[];
}

// ─── Investimento / Preço ────────────────────────────────────────────────────
export interface PacoteItem {
  nome: string;
  descricao?: string;
  valor: number;
  moeda?: string;
  parcelas?: string;
  inclui: string[];
  /** When true, this package is visually highlighted as recommended */
  destaque?: boolean;
}

export interface PrecoBlockData {
  titulo?: string;
  subtitulo?: string;
  pacotes: PacoteItem[];
  observacao?: string;
}

// ─── Depoimentos ─────────────────────────────────────────────────────────────
export interface DepoimentoItem {
  texto: string;
  autor: string;
  cargo?: string;
  foto?: string;
}

export interface DepoimentosBlockData {
  titulo?: string;
  itens: DepoimentoItem[];
}

// ─── Portfólio / Galeria ─────────────────────────────────────────────────────
export interface GaleriaBlockData {
  titulo?: string;
  imagens: { url: string; legenda?: string }[];
}

// ─── Equipe ──────────────────────────────────────────────────────────────────
export interface EquipeItem {
  nome: string;
  cargo?: string;
  foto?: string;
  bio?: string;
}

export interface EquipeBlockData {
  titulo?: string;
  membros: EquipeItem[];
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
export interface CtaBlockData {
  titulo: string;
  subtitulo?: string;
  botaoTexto?: string;
  botaoUrl?: string;
  whatsapp?: string;
  email?: string;
}

// ─── Texto livre ─────────────────────────────────────────────────────────────
export interface TextoBlockData {
  titulo?: string;
  conteudo: string;
}

// ─── Union de todos os blocks ─────────────────────────────────────────────────
export type BudgetBlock =
  | { type: "hero"; data: HeroBlockData }
  | { type: "sobre_empresa"; data: SobreEmpresaBlockData }
  | { type: "projeto"; data: ProjetoBlockData }
  | { type: "servicos"; data: ServicosBlockData }
  | { type: "timeline"; data: TimelineBlockData }
  | { type: "preco"; data: PrecoBlockData }
  | { type: "depoimentos"; data: DepoimentosBlockData }
  | { type: "galeria"; data: GaleriaBlockData }
  | { type: "equipe"; data: EquipeBlockData }
  | { type: "cta"; data: CtaBlockData }
  | { type: "texto"; data: TextoBlockData };

export interface BudgetContent {
  blocks: BudgetBlock[];
}
