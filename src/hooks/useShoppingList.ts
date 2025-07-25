import { useEffect, useMemo, useState } from 'react';
import { ShoppingItem, ShoppingItemRequest } from '../models/ShoppingItem';
import { ShoppingItemService } from '../service/shoppingItemService';
import { showErrorToast } from '../utils/errorHandler';

interface UseShoppingListReturn {
  itens: ShoppingItem[];
  loading: boolean;
  error: string | null;
  adicionarItem: (nome: string, categoria?: string) => Promise<boolean>;
  alternarConclusaoItem: (id: string) => Promise<void>;
  removerItem: (id: string) => Promise<void>;
  obterItensPorCategoria: Record<string, ShoppingItem[]>;
  carregarItens: () => Promise<void>;
}

export function useShoppingList(): UseShoppingListReturn {
  const [itens, setItens] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarItens();
  }, []);

  async function carregarItens(): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      const itensFirebase = await ShoppingItemService.obterItens();
      setItens(itensFirebase as ShoppingItem[]);
    } catch {
    showErrorToast('Erro ao carregar a lista de compras.');
    setError('Erro ao carregar a lista de compras.');
    } finally {
      setLoading(false);
    }
  }

  async function adicionarItem(nome: string, categoria?: string): Promise<boolean> {
    if (nome.trim()) {
      try {
        setLoading(true);
        setError(null);

        const novoItemRequest: ShoppingItemRequest = {
          nome: nome.trim(),
          concluido: false,
          categoria: categoria || 'Outros'
        };

        await ShoppingItemService.adicionarItem(novoItemRequest);

        await carregarItens();
        return true;
      } catch {
        showErrorToast('Erro ao adicionar item à lista.');
        setError('Erro ao adicionar item à lista.');
        return false;
      } finally {
        setLoading(false);
      }
    }
    return false;
  }

  async function alternarConclusaoItem(id: string): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      await ShoppingItemService.alternarConclusao(id);

      await carregarItens();
    } catch {
      showErrorToast('Erro ao atualizar o item.');
      setError('Erro ao atualizar o item.');
    } finally {
      setLoading(false);
    }
  }

  async function removerItem(id: string): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      await ShoppingItemService.removerItem(id);

      await carregarItens();
    } catch {
      showErrorToast('Erro ao remover o item da lista.');
      setError('Erro ao remover o item da lista.');
    } finally {
      setLoading(false);
    }
  }

  const obterItensPorCategoria: Record<string, ShoppingItem[]> = useMemo(() => {
    const categorizados: Record<string, ShoppingItem[]> = {};
    itens.forEach(item => {
      const categoria = item.categoria || 'Outros';
      if (!categorizados[categoria]) {
        categorizados[categoria] = [];
      }
      categorizados[categoria].push(item);
    });
    return categorizados;
  }, [itens]);

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