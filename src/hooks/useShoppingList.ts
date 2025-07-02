import { useState } from 'react';
import { ItemCompra } from '../models/ShoppingItem';

export function useShoppingList() {
  const [itens, setItens] = useState<ItemCompra[]>([]);

  function adicionarItem(nome: string, categoria?: string) {
    if (nome.trim()) {
      const novoItem: ItemCompra = {
        id: Date.now().toString(),
        nome: nome.trim(),
        concluido: false,
        categoria,
        dataCriacao: new Date()
      };
      setItens(itensAtuais => [...itensAtuais, novoItem]);
      return true;
    }
    return false;
  }

  return {
    itens,
    adicionarItem
  };
}