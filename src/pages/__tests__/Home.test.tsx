import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useShoppingList } from '../../hooks/useShoppingList';
import { ShoppingItem } from '../../models/ShoppingItem';
import { CompartilharService } from '../../service/CompartilharService';
import { Home } from '../Home';

jest.mock('../../hooks/useShoppingList');
jest.mock('../../service/CompartilharService');

const mockUseShoppingList = useShoppingList as jest.MockedFunction<typeof useShoppingList>;
const mockCompartilharService = CompartilharService as jest.Mocked<typeof CompartilharService>;

describe('Home Component', () => {
  const mockItens: ShoppingItem[] = [
    {
      id: '1',
      nome: 'Arroz',
      concluido: false,
      categoria: 'Alimentos',
      dataCriacao: new Date('2025-10-11')
    },
    {
      id: '2',
      nome: 'Sabão',
      concluido: true,
      categoria: 'Limpeza',
      dataCriacao: new Date('2025-10-12')
    },
    {
      id: '3',
      nome: 'Sabão',
      concluido: false,
      categoria: 'Laticínios',
      dataCriacao: new Date('2025-10-13')
    },
    {
      id: '4',
      nome: 'Banana',
      concluido: true,
      categoria: 'Hortifruti',
      dataCriacao: new Date('2025-10-14')
    },
    {
      id: '4',
      nome: 'Biscoito',
      concluido: false,
      categoria: 'Alimentos',
      dataCriacao: new Date('2025-10-15')
    }
  ];

  const mockShoppingListHook = {
    itens: mockItens,
    loading: false,
    error: null,
    adicionarItem: jest.fn(),
    alternarConclusaoItem: jest.fn(),
    removerItem: jest.fn(),
    obterItensPorCategoria: jest.fn(),
    carregarItens: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseShoppingList.mockReturnValue(mockShoppingListHook);
    mockCompartilharService.compartilharLista = jest.fn().mockResolvedValue(true);
  });

  describe('Renderização', () => {
    it('deve renderizar o header com título correto', () => {
      const { getByText } = render(<Home />);
      
      expect(getByText('Lista de Compras')).toBeTruthy();
    });

    it('deve renderizar o formulário de item', () => {
      const { getByTestId } = render(<Home />);
    
      expect(getByTestId('formulario-item')).toBeTruthy();
    });

    it('deve renderizar os filtros da lista', () => {
      const { getByText } = render(<Home />);
      
      expect(getByText('Todos')).toBeTruthy();
      expect(getByText('Pendentes')).toBeTruthy();
      expect(getByText('Concluídos')).toBeTruthy();
    });

    it('deve renderizar a lista agrupada quando há itens', () => {
      const { getByTestId } = render(<Home />);
      
      expect(getByTestId('section-list')).toBeTruthy();
    });
  });

  describe('Estados da lista', () => {
    it('deve mostrar estado de loading quando loading é true', () => {
      mockUseShoppingList.mockReturnValue({
        ...mockShoppingListHook,
        loading: true,
        itens: []
      });

      const { getByTestId } = render(<Home />);
      
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('deve mostrar estado de erro quando há erro', () => {
      mockUseShoppingList.mockReturnValue({
        ...mockShoppingListHook,
        error: 'Erro de conexão',
        itens: []
      });

      const { getByText, getByTestId } = render(<Home />);
      
      expect(getByTestId('error-icon')).toBeTruthy();
      expect(getByText('Erro de conexão')).toBeTruthy();
    });

    it('deve mostrar estado vazio quando não há itens', () => {
      mockUseShoppingList.mockReturnValue({
        ...mockShoppingListHook,
        itens: []
      });

      const { getByTestId, getByText } = render(<Home />);
      
      expect(getByTestId('empty-basket-icon')).toBeTruthy();
      expect(getByText('Sua lista está vazia')).toBeTruthy();
    });

    it('não deve renderizar lista quando loading é true', () => {
      mockUseShoppingList.mockReturnValue({
        ...mockShoppingListHook,
        loading: true
      });

      const { queryByTestId } = render(<Home />);
      
      expect(queryByTestId('section-list')).toBeNull();
    });

    it('não deve renderizar lista quando há erro', () => {
      mockUseShoppingList.mockReturnValue({
        ...mockShoppingListHook,
        error: 'Erro de conexão'
      });

      const { queryByTestId } = render(<Home />);
      
      expect(queryByTestId('section-list')).toBeNull();
    });
  });

  describe('Filtros', () => {
    it('deve iniciar com filtro "todos" ativo', () => {
      const { getByText } = render(<Home />);
      
      const botaoTodos = getByText('Todos');

      expect(botaoTodos).toBeTruthy();
    });

    it('deve filtrar itens pendentes corretamente', () => {
      const { getByText } = render(<Home />);
      
      fireEvent.press(getByText('Pendentes'));
      
      expect(getByText('Arroz')).toBeTruthy(); 
      expect(getByText('Biscoito')).toBeTruthy(); 
    });

    it('deve filtrar itens concluídos corretamente', () => {
      const { getByText } = render(<Home />);
      
      fireEvent.press(getByText('Concluídos'));

      expect(getByText('Sabão')).toBeTruthy(); 
      expect(getByText('Banana')).toBeTruthy(); 
    });

    it('deve mostrar todos os itens quando filtro "todos" está ativo', () => {
      const { getByText } = render(<Home />);
      
      fireEvent.press(getByText('Pendentes'));
      
      fireEvent.press(getByText('Todos'));
      
      expect(getByText('Arroz')).toBeTruthy();
      expect(getByText('Sabão')).toBeTruthy();
      expect(getByText('Banana')).toBeTruthy();
      expect(getByText('Biscoito')).toBeTruthy();
    });
  });

  describe('Ações dos itens', () => {
    it('deve chamar adicionarItem quando formulário é submetido', async () => {
      const { getByTestId } = render(<Home />);
      
      const formulario = getByTestId('formulario-item');
      
      fireEvent(formulario, 'onAdicionar', 'Novo Item', 'Alimentos');
      
      await waitFor(() => {
        expect(mockShoppingListHook.adicionarItem).toHaveBeenCalledWith('Novo Item', 'Alimentos');
      });
    });

    it('deve chamar removerItem quando botão excluir é pressionado', async () => {
      const { getByTestId } = render(<Home />);
      
      const botaoExcluir = getByTestId('botao-excluir-1');
      fireEvent.press(botaoExcluir);
      
      await waitFor(() => {
        expect(mockShoppingListHook.removerItem).toHaveBeenCalledWith('1');
      });
    });
  });

  describe('Compartilhamento', () => {
    it('deve chamar CompartilharService quando botão compartilhar é pressionado', async () => {
      const { getByTestId } = render(<Home />);
      
      const botaoCompartilhar = getByTestId('botao-direito');
      fireEvent.press(botaoCompartilhar);
      
      await waitFor(() => {
        expect(mockCompartilharService.compartilharLista).toHaveBeenCalledWith(mockItens);
      });
    });

    it('deve compartilhar apenas itens filtrados quando filtro está ativo', async () => {
      const { getByText, getByTestId } = render(<Home />);
      
      fireEvent.press(getByText('Pendentes'));
      
      const botaoCompartilhar = getByTestId('botao-direito');
      fireEvent.press(botaoCompartilhar);
      
      const itensPendentes = mockItens.filter(item => !item.concluido);
      
      await waitFor(() => {
        expect(mockCompartilharService.compartilharLista).toHaveBeenCalledWith(itensPendentes);
      });
    });
  });
});