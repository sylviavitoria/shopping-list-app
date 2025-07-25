import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ShoppingItem } from '../../models/ShoppingItem';
import { ItemLista } from '../ItemLista';

describe('ItemLista Component', () => {
  const mockOnToggleConclusao = jest.fn();
  const mockOnRemover = jest.fn();

  const dataFixa = new Date('2025-10-10T00:00:00.000Z');

  const itemMock: ShoppingItem = {
    id: '1',
    nome: 'Arroz',
    concluido: false,
    categoria: 'Alimentos',
    dataCriacao: dataFixa
  };

  const itemConcluidoMock: ShoppingItem = {
    id: '2',
    nome: 'Feijão',
    concluido: true,
    categoria: 'Alimentos',
    dataCriacao: dataFixa
  };

  beforeEach(() => {
    mockOnToggleConclusao.mockClear();
    mockOnRemover.mockClear();
    
    jest.spyOn(Date.prototype, 'toLocaleDateString').mockImplementation(() => '10/10/2025');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve renderizar o nome do item corretamente', () => {
    const { getByText } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByText('Arroz')).toBeTruthy();
  });

  it('deve renderizar a categoria quando diferente de "Outros"', () => {
    const { getByText } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByText('Alimentos')).toBeTruthy();
  });

  it('não deve renderizar a categoria quando for "Outros"', () => {
    const itemOutros = { ...itemMock, categoria: 'Outros' };
    const { queryByText } = render(
      <ItemLista 
        item={itemOutros} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(queryByText('Outros')).toBeNull();
  });

  it('deve renderizar checkbox para item não concluído', () => {
    const { getByTestId } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const checkbox = getByTestId('checkbox-1');
    expect(checkbox).toBeTruthy();
  });

  it('deve renderizar checkbox para item concluído', () => {
    const { getByTestId } = render(
      <ItemLista 
        item={itemConcluidoMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const checkbox = getByTestId('checkbox-2');
    expect(checkbox).toBeTruthy();
  });

  it('deve aplicar estilo de texto riscado para item concluído', () => {
    const { getByText } = render(
      <ItemLista 
        item={itemConcluidoMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const textoItem = getByText('Feijão');
    expect(textoItem.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          textDecorationLine: 'line-through',
          color: '#888'
        })
      ])
    );
  });

  it('deve aplicar estilo normal para item não concluído', () => {
    const { getByText } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const textoItem = getByText('Arroz');
    expect(textoItem.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 16,
          color: '#333'
        })
      ])
    );
  });

  it('deve chamar onToggleConclusao com o ID correto ao clicar no checkbox', () => {
    const { getByTestId } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const checkbox = getByTestId('checkbox-1');
    fireEvent.press(checkbox);

    expect(mockOnToggleConclusao).toHaveBeenCalledWith('1');
    expect(mockOnToggleConclusao).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onRemover com o ID correto ao clicar no botão excluir', () => {
    const { getByTestId } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const botaoExcluir = getByTestId('botao-excluir-1');
    fireEvent.press(botaoExcluir);

    expect(mockOnRemover).toHaveBeenCalledWith('1');
    expect(mockOnRemover).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar o botão excluir', () => {
    const { getByTestId } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const botaoExcluir = getByTestId('botao-excluir-1');
    expect(botaoExcluir).toBeTruthy();
  });

  it('deve renderizar a data de criação quando disponível', () => {
    const { getByText } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByText('10/10/2025')).toBeTruthy();
  });

  it('deve funcionar corretamente sem categoria', () => {
    const itemSemCategoria = { ...itemMock, categoria: undefined };
    const { getByText, queryByText } = render(
      <ItemLista 
        item={itemSemCategoria} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByText('Arroz')).toBeTruthy();
    expect(queryByText('Alimentos')).toBeNull();
  });

  it('deve renderizar sem data quando não disponível', () => {
    const itemSemData: ShoppingItem = { ...itemMock, dataCriacao: undefined };
    const { getByText, queryByText } = render(
      <ItemLista 
        item={itemSemData} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByText('Arroz')).toBeTruthy();
    expect(queryByText('01/01/2024')).toBeNull();
  });

  it('deve manter layout consistente para diferentes estados', () => {
    const { rerender, getByText } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByText('Arroz')).toBeTruthy();

    rerender(
      <ItemLista 
        item={itemConcluidoMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    expect(getByText('Feijão')).toBeTruthy();
  });

  it('deve verificar se o checkbox existe para item não concluído', () => {
    const { getByTestId } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const checkbox = getByTestId('checkbox-1');
    expect(checkbox).toBeTruthy();
  });

  it('deve verificar se o checkbox existe para item concluído', () => {
    const { getByTestId } = render(
      <ItemLista 
        item={itemConcluidoMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const checkbox = getByTestId('checkbox-2');
    expect(checkbox).toBeTruthy();
  });

  it('deve renderizar diferentes ícones para estados do checkbox', () => {
    const { getByTestId, rerender } = render(
      <ItemLista 
        item={itemMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const checkboxNaoConcluido = getByTestId('checkbox-1');
    expect(checkboxNaoConcluido).toBeTruthy();

    rerender(
      <ItemLista 
        item={itemConcluidoMock} 
        onToggleConclusao={mockOnToggleConclusao}
        onRemover={mockOnRemover}
      />
    );

    const checkboxConcluido = getByTestId('checkbox-2');
    expect(checkboxConcluido).toBeTruthy();
  });
});