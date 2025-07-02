export interface ShoppingItem {
  id: string;
  nome: string;
  concluido: boolean;
  categoria?: string;
  dataCriacao: Date;
}
