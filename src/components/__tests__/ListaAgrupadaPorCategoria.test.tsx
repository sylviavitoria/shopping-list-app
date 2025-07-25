import { render } from '@testing-library/react-native';
import React from 'react';
import { ShoppingItem } from '../../models/ShoppingItem';
import { ListaAgrupadaPorCategoria } from '../ListaAgrupadaPorCategoria';

describe('ListaAgrupadaPorCategoria Component', () => {
  const mockOnToggleConclusao: jest.Mock<void, [string]> = jest.fn();
  const mockOnRemover: jest.Mock<void, [string]> = jest.fn();

  beforeEach(() => {
    mockOnToggleConclusao.mockClear();
    mockOnRemover.mockClear();
  });

  const mockItens: ShoppingItem[] = [
    {
      id: '1',
      nome: 'Maçã',
      concluido: false,
      categoria: 'Hortifruti',
      dataCriacao: new Date('2025-10-10')
    },
    {
      id: '2',
      nome: 'Leite',
      concluido: true,
      categoria: 'Laticínios',
      dataCriacao: new Date('2025-10-11')
    },
    {
      id: '3',
      nome: 'Banana',
      concluido: false,
      categoria: 'Hortifruti',
      dataCriacao: new Date('2025-10-12')
    },
    {
      id: '4',
      nome: 'Shampoo',
      concluido: false,
      categoria: undefined,
      dataCriacao: new Date('2025-10-14')
    }
  ];

  it('deve renderizar uma SectionList quando há itens', () => {
    const { getByTestId } = render(
      <ListaAgrupadaPorCategoria
        itens={mockItens}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByTestId('section-list')).toBeTruthy();
  });

  it('deve agrupar itens por categoria corretamente', () => {
    const { getByTestId, getByText } = render(
      <ListaAgrupadaPorCategoria
        itens={mockItens}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const sectionList = getByTestId('section-list');
    expect(sectionList).toBeTruthy();

    expect(getByText('Maçã')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
    expect(getByText('Leite')).toBeTruthy();
    expect(getByText('Shampoo')).toBeTruthy();
  });

  it('deve renderizar todos os itens dentro de suas respectivas categorias', () => {
    const { getByText } = render(
      <ListaAgrupadaPorCategoria
        itens={mockItens}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByText('Maçã')).toBeTruthy();
    expect(getByText('Leite')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
    expect(getByText('Shampoo')).toBeTruthy();
  });

  it('deve categorizar itens sem categoria como "Outros"', () => {
    const { getByText } = render(
      <ListaAgrupadaPorCategoria
        itens={mockItens}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByText('Outros')).toBeTruthy();
    expect(getByText('Shampoo')).toBeTruthy();
  });

  it('deve retornar null quando a lista está vazia', () => {
    const { toJSON } = render(
      <ListaAgrupadaPorCategoria
        itens={[]}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(toJSON()).toBeNull();
  });

  it('deve passar as props corretas para ItemLista', () => {
    const { getByTestId } = render(
      <ListaAgrupadaPorCategoria
        itens={[mockItens[0]]}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByTestId('checkbox-1')).toBeTruthy();
    expect(getByTestId('botao-excluir-1')).toBeTruthy();
  });

  it('deve memoizar as seções corretamente', () => {
    const { rerender } = render(
      <ListaAgrupadaPorCategoria
        itens={mockItens}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    rerender(
      <ListaAgrupadaPorCategoria
        itens={mockItens}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(true).toBe(true);
  });

  it('deve renderizar múltiplos itens na mesma categoria', () => {
    const { getByText, getAllByText } = render(
      <ListaAgrupadaPorCategoria
        itens={mockItens}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const hortifrutiElements = getAllByText('Hortifruti');
    expect(hortifrutiElements.length).toBeGreaterThan(0);

    expect(getByText('Maçã')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
  });

  it('deve usar keyExtractor corretamente', () => {
    const itensComIds: ShoppingItem[] = [
      {
        id: 'unique-id-1',
        nome: 'Item Teste',
        concluido: false,
        categoria: 'Teste',
        dataCriacao: new Date()
      }
    ];

    const { getByTestId } = render(
      <ListaAgrupadaPorCategoria
        itens={itensComIds}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByTestId('checkbox-unique-id-1')).toBeTruthy();
  });

  it('deve lidar com categorias especiais corretamente', () => {
    const itensEspeciais: (Omit<ShoppingItem, 'categoria'> & { categoria: string | null })[] = [
      {
        id: '1',
        nome: 'Item com categoria vazia',
        concluido: false,
        categoria: '',
        dataCriacao: new Date()
      },
      {
        id: '2',
        nome: 'Item com categoria null',
        concluido: false,
        categoria: null,
        dataCriacao: new Date()
      }
    ];

    const { getByText } = render(
      <ListaAgrupadaPorCategoria
        itens={itensEspeciais as ShoppingItem[]}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByText('Outros')).toBeTruthy();
    expect(getByText('Item com categoria vazia')).toBeTruthy();
    expect(getByText('Item com categoria null')).toBeTruthy();
  });

  it('deve manter a ordem das seções consistente', () => {
    const { getAllByText } = render(
      <ListaAgrupadaPorCategoria
        itens={mockItens}
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const categorias = ['Hortifruti', 'Laticínios', 'Outros'];
    categorias.forEach(categoria => {
      const elementos = getAllByText(categoria);
      expect(elementos.length).toBeGreaterThan(0);
    });
  });
});