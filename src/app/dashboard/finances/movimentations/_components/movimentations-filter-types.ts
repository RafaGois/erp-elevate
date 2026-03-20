import MovimentationType from "@/lib/enums/MovimentationType";

/** Estado de filtros da página de movimentações (só este contexto). */
export type MovimentationsFilterValues = {
  ranges: { from?: Date; to?: Date };
  /** Vazio = todos os tipos. Com itens = apenas movimentações desses tipos. */
  types: MovimentationType[];
  /** Vazio = todas. Com ids = apenas essas categorias. */
  categoryIds: string[];
  bankAccountIds: string[];
  userIds: string[];
};
