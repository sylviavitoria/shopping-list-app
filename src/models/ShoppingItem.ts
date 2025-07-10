export interface ShoppingItem {
  id: string;
  nome: string;
  concluido: boolean;
  categoria?: string;
  dataCriacao: Date;
}

export interface ShoppingItemRequest {
  nome: string;
  concluido?: boolean;
  categoria?: string;
}

export interface ShoppingItemResponse {
  id: string;
  nome: string;
  concluido: boolean;
  categoria?: string;
  dataCriacao: Date | string;
}

export type CategoriaCompra = 'Hortifruti' | 'Bebidas' | 'Limpeza' | 'Laticínios' | 'Alimentos' |'Higiene' | 'Outros';