import { act, renderHook, waitFor } from '@testing-library/react-native';
import { ShoppingItemService } from '../../service/shoppingItemService';
import { useShoppingList } from '../useShoppingList';

jest.mock('../../service/shoppingItemService');

const mockShoppingItemService = ShoppingItemService as jest.Mocked<typeof ShoppingItemService>;

describe('useShoppingList Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockItens = [
    {
      id: '1',
      nome: 'Arroz',
      concluido: false,
      categoria: 'Alimentos',
      dataCriacao: new Date('2025-10-11')
    },
    {
      id: '2',
      nome: 'Leite',
      concluido: true,
      categoria: 'Laticínios',
      dataCriacao: new Date('2025-10-12')
    }
  ];

  it('deve carregar itens automaticamente na inicialização', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue(mockItens);

    const { result } = renderHook(() => useShoppingList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockShoppingItemService.obterItens).toHaveBeenCalledTimes(1);
    expect(result.current.itens).toEqual(mockItens);
    expect(result.current.error).toBe(null);
  });

  it('deve definir loading como true durante o carregamento de itens', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockShoppingItemService.obterItens.mockReturnValue(promise as any);

    const { result } = renderHook(() => useShoppingList());

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    act(() => {
      resolvePromise!(mockItens);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('deve lidar com erro ao carregar itens', async () => {
    const errorMessage = 'Erro de rede';
    mockShoppingItemService.obterItens.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useShoppingList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Erro ao carregar a lista de compras.');
    expect(result.current.itens).toEqual([]);
  });

  it('deve adicionar item com sucesso', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue([]);
    mockShoppingItemService.adicionarItem.mockResolvedValue('novo-id');

    const { result } = renderHook(() => useShoppingList());

    await act(async () => {
      const resultado = await result.current.adicionarItem('Banana', 'Hortifruti');
      expect(resultado).toBe(true);
    });

    expect(mockShoppingItemService.adicionarItem).toHaveBeenCalledWith({
      nome: 'Banana',
      concluido: false,
      categoria: 'Hortifruti'
    });
  });

  it('deve usar categoria padrão "Outros" quando não especificada', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue([]);
    mockShoppingItemService.adicionarItem.mockResolvedValue('novo-id');

    const { result } = renderHook(() => useShoppingList());

    await act(async () => {
      await result.current.adicionarItem('Açúcar');
    });

    expect(mockShoppingItemService.adicionarItem).toHaveBeenCalledWith({
      nome: 'Açúcar',
      concluido: false,
      categoria: 'Outros'
    });
  });

  it('não deve adicionar item com nome vazio', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue([]);

    const { result } = renderHook(() => useShoppingList());

    await act(async () => {
      const resultado = await result.current.adicionarItem('');
      expect(resultado).toBe(false);
    });

    expect(mockShoppingItemService.adicionarItem).not.toHaveBeenCalled();
  });

  it('não deve adicionar item com apenas espaços', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue([]);

    const { result } = renderHook(() => useShoppingList());

    await act(async () => {
      const resultado = await result.current.adicionarItem('   ');
      expect(resultado).toBe(false);
    });

    expect(mockShoppingItemService.adicionarItem).not.toHaveBeenCalled();
  });

  it('deve lidar com erro ao adicionar item', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue([]);
    mockShoppingItemService.adicionarItem.mockRejectedValue(new Error('Erro ao adicionar'));

    const { result } = renderHook(() => useShoppingList());

    await act(async () => {
      const resultado = await result.current.adicionarItem('Teste');
      expect(resultado).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Erro ao adicionar item à lista.');
    });
  });

  it('deve alternar conclusão de item com sucesso', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue(mockItens);
    mockShoppingItemService.alternarConclusao.mockResolvedValue();

    const { result } = renderHook(() => useShoppingList());

    await waitFor(() => {
      expect(result.current.itens).toEqual(mockItens);
    });

    await act(async () => {
      await result.current.alternarConclusaoItem('1');
    });

    expect(mockShoppingItemService.alternarConclusao).toHaveBeenCalledWith('1');
    expect(mockShoppingItemService.obterItens).toHaveBeenCalledTimes(2);
  });

  it('deve lidar com erro ao alternar conclusão', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue(mockItens);
    mockShoppingItemService.alternarConclusao.mockRejectedValue(new Error('Erro ao atualizar'));

    const { result } = renderHook(() => useShoppingList());

    await act(async () => {
      await result.current.alternarConclusaoItem('1');
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Erro ao atualizar o item.');
    });
  });

  it('deve remover item com sucesso', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue(mockItens);
    mockShoppingItemService.removerItem.mockResolvedValue();

    const { result } = renderHook(() => useShoppingList());

    await waitFor(() => {
      expect(result.current.itens).toEqual(mockItens);
    });

    await act(async () => {
      await result.current.removerItem('1');
    });

    expect(mockShoppingItemService.removerItem).toHaveBeenCalledWith('1');
    expect(mockShoppingItemService.obterItens).toHaveBeenCalledTimes(2);
  });

  it('deve lidar com erro ao remover item', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue(mockItens);
    mockShoppingItemService.removerItem.mockRejectedValue(new Error('Erro ao remover'));

    const { result } = renderHook(() => useShoppingList());

    await act(async () => {
      await result.current.removerItem('1');
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Erro ao remover o item da lista.');
    });
  });

  it('deve agrupar itens por categoria corretamente', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue(mockItens);

    const { result } = renderHook(() => useShoppingList());

    await waitFor(() => {
      expect(result.current.itens).toEqual(mockItens);
    });

    const itensPorCategoria = result.current.obterItensPorCategoria;

    expect(itensPorCategoria).toEqual({
      'Alimentos': [mockItens[0]],
      'Laticínios': [mockItens[1]]
    });
  });

  it('deve agrupar itens sem categoria em "Outros"', async () => {
    const itensSemCategoria = [
      { ...mockItens[0], categoria: undefined },
      { ...mockItens[1], categoria: 'Bebidas' }
    ];

    mockShoppingItemService.obterItens.mockResolvedValue(itensSemCategoria);

    const { result } = renderHook(() => useShoppingList());

    await waitFor(() => {
      expect(result.current.itens).toEqual(itensSemCategoria);
    });

    const itensPorCategoria = result.current.obterItensPorCategoria;

    expect(itensPorCategoria).toEqual({
      'Outros': [itensSemCategoria[0]],
      'Bebidas': [itensSemCategoria[1]]
    });
  });

  it('deve permitir recarregar itens manualmente', async () => {
    mockShoppingItemService.obterItens.mockResolvedValue([]);

    const { result } = renderHook(() => useShoppingList());

    await act(async () => {
      await result.current.carregarItens();
    });

    expect(mockShoppingItemService.obterItens).toHaveBeenCalledTimes(2);
  });

  it('deve limpar erro ao executar operação com sucesso', async () => {

    mockShoppingItemService.obterItens.mockRejectedValueOnce(new Error('Erro inicial'));

    const { result } = renderHook(() => useShoppingList());

    await waitFor(() => {
      expect(result.current.error).toBe('Erro ao carregar a lista de compras.');
    });

    mockShoppingItemService.obterItens.mockResolvedValue(mockItens);

    await act(async () => {
      await result.current.carregarItens();
    });

    expect(result.current.error).toBe(null);
    expect(result.current.itens).toEqual(mockItens);
  });
});