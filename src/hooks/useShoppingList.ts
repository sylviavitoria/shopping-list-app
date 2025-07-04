import { useEffect, useState } from 'react';
import { ShoppingItem, ShoppingItemRequest } from '../models/ShoppingItem';
import { ShoppingItemService } from '../service/shoppingItemService';

export function useShoppingList() {
  const [itens, setItens] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarItens();
  }, []);

  async function carregarItens() {
    try {
      setLoading(true);
      setError(null);
      const itensFirebase = await ShoppingItemService.obterItens();
      setItens(itensFirebase as ShoppingItem[]);
    } catch (err) {
      console.error('Erro ao carregar itens:', err);
      setError('Erro ao carregar a lista de compras.');
    } finally {
      setLoading(false);
    }
  }

  async function adicionarItem(nome: string, categoria?: string) {
    if (nome.trim()) {
      try {
        setLoading(true);
        setError(null);

        const novoItemRequest: ShoppingItemRequest = {
          nome: nome.trim(),
          concluido: false,
          categoria: categoria || 'Outros'
        };

        const id = await ShoppingItemService.adicionarItem(novoItemRequest);

        carregarItens();
        return true;
      } catch (err) {
        console.error('Erro ao adicionar item:', err);
        setError('Erro ao adicionar item à lista.');
        return false;
      } finally {
        setLoading(false);
      }
    }
    return false;
  }

  async function alternarConclusaoItem(id: string) {
    try {
      setLoading(true);
      setError(null);
      await ShoppingItemService.alternarConclusao(id);

      carregarItens();
    } catch (err) {
      console.error('Erro ao alternar conclusão do item:', err);
      setError('Erro ao atualizar o item.');
    } finally {
      setLoading(false);
    }
  }

  async function removerItem(id: string) {
    try {
      setLoading(true);
      setError(null);
      await ShoppingItemService.removerItem(id);

      carregarItens();
    } catch (err) {
      console.error('Erro ao remover item:', err);
      setError('Erro ao remover o item da lista.');
    } finally {
      setLoading(false);
    }
  }

  function obterItensPorCategoria() {
    const categorizados: Record<string, ShoppingItem[]> = {};

    itens.forEach(item => {
      const categoria = item.categoria || 'Outros';
      if (!categorizados[categoria]) {
        categorizados[categoria] = [];
      }
      categorizados[categoria].push(item);
    });

    return categorizados;
  }

  return {
    itens,
    loading,
    error,
    adicionarItem,
    alternarConclusaoItem,
    removerItem,
    obterItensPorCategoria,
    carregarItens
  };
}