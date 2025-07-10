import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { EstadoLista } from '../EstadoLista';

describe('EstadoLista Component', () => {
  const mockOnRecarregar = jest.fn();

  beforeEach(() => {
    mockOnRecarregar.mockClear();
  });

  it('deve renderizar estado de carregamento quando loading é true', () => {
    const { getByText, getByTestId } = render(
      <EstadoLista loading={true} />
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
    expect(getByText('Carregando itens...')).toBeTruthy();
  });

  it('deve renderizar estado de erro quando error está presente', () => {
    const mensagemErro = 'Erro ao carregar dados';
    const { getByText } = render(
      <EstadoLista error={mensagemErro} />
    );

    expect(getByText(mensagemErro)).toBeTruthy();
  });

  it('deve renderizar ícone de erro quando error está presente', () => {
    const { getByTestId } = render(
      <EstadoLista error="Erro teste" />
    );

    expect(getByTestId('error-icon')).toBeTruthy();
  });

  it('deve renderizar botão "Tentar novamente" quando error e onRecarregar estão presentes', () => {
    const { getByText } = render(
      <EstadoLista error="Erro teste" onRecarregar={mockOnRecarregar} />
    );

    expect(getByText('Tentar novamente')).toBeTruthy();
  });

  it('não deve renderizar botão "Tentar novamente" quando onRecarregar não está presente', () => {
    const { queryByText } = render(
      <EstadoLista error="Erro teste" />
    );

    expect(queryByText('Tentar novamente')).toBeNull();
  });

  it('deve chamar onRecarregar quando botão "Tentar novamente" for pressionado', () => {
    const { getByText } = render(
      <EstadoLista error="Erro teste" onRecarregar={mockOnRecarregar} />
    );

    const botaoTentar = getByText('Tentar novamente');
    fireEvent.press(botaoTentar);

    expect(mockOnRecarregar).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar estado de lista vazia quando listaVazia é true', () => {
    const { getByText } = render(
      <EstadoLista listaVazia={true} />
    );

    expect(getByText('Sua lista está vazia')).toBeTruthy();
    expect(getByText('Adicione itens para começar')).toBeTruthy();
  });

  it('deve renderizar ícone de cesta quando lista está vazia', () => {
    const { getByTestId } = render(
      <EstadoLista listaVazia={true} />
    );

    expect(getByTestId('empty-basket-icon')).toBeTruthy();
  });

 it('deve renderizar o estado de loading corretamente', () => {
    const { getByTestId, getByText } = render(
      <EstadoLista loading={true} />
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
    expect(getByText('Carregando itens...')).toBeTruthy();
  });

  it('deve renderizar o estado de erro corretamente', () => {
    const { getByText } = render(
      <EstadoLista error="Erro ao carregar dados" onRecarregar={mockOnRecarregar} />
    );

    expect(getByText('Erro ao carregar dados')).toBeTruthy();
    expect(getByText('Tentar novamente')).toBeTruthy();
  });

  it('deve priorizar loading sobre outros estados', () => {
    const { getByText, queryByText } = render(
      <EstadoLista loading={true} error="Erro" listaVazia={true} />
    );

    expect(getByText('Carregando itens...')).toBeTruthy();
    expect(queryByText('Erro')).toBeNull();
    expect(queryByText('Sua lista está vazia')).toBeNull();
  });

  it('deve priorizar error sobre listaVazia quando loading é false', () => {
    const { getByText, queryByText } = render(
      <EstadoLista loading={false} error="Erro teste" listaVazia={true} />
    );

    expect(getByText('Erro teste')).toBeTruthy();
    expect(queryByText('Sua lista está vazia')).toBeNull();
  });

  it('deve aplicar estilos corretos no container', () => {
    const { getByTestId } = render(
      <EstadoLista loading={true} />
    );

    const container = getByTestId('estado-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      })
    );
  });

  it('deve permitir múltiplas chamadas do botão recarregar', () => {
    const { getByText } = render(
      <EstadoLista error="Erro" onRecarregar={mockOnRecarregar} />
    );

    const botaoTentar = getByText('Tentar novamente');
    
    fireEvent.press(botaoTentar);
    fireEvent.press(botaoTentar);
    fireEvent.press(botaoTentar);

    expect(mockOnRecarregar).toHaveBeenCalledTimes(3);
  });
});