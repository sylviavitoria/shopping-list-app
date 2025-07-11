import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { FiltroLista } from '../FiltroLista';

describe('FiltroLista Component', () => {
  const mockOnChangeFiltro = jest.fn();

  beforeEach(() => {
    mockOnChangeFiltro.mockClear();
  });

  it('deve renderizar todos os três botões de filtro', () => {
    const { getByText } = render(
      <FiltroLista filtroAtivo="todos" onChangeFiltro={mockOnChangeFiltro} />
    );

    expect(getByText('Todos')).toBeTruthy();
    expect(getByText('Pendentes')).toBeTruthy();
    expect(getByText('Concluídos')).toBeTruthy();
  });

  it('deve mostrar o filtro "todos" como ativo quando filtroAtivo é "todos"', () => {
    const { getByText } = render(
      <FiltroLista filtroAtivo="todos" onChangeFiltro={mockOnChangeFiltro} />
    );

    const botaoTodos = getByText('Todos');
    expect(botaoTodos.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#fff' })
      ])
    );
  });

  it('deve mostrar o filtro "pendentes" como ativo quando filtroAtivo é "pendentes"', () => {
    const { getByText } = render(
      <FiltroLista filtroAtivo="pendentes" onChangeFiltro={mockOnChangeFiltro} />
    );

    const botaoPendentes = getByText('Pendentes');
    expect(botaoPendentes.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#fff' })
      ])
    );
  });

  it('deve mostrar o filtro "concluidos" como ativo quando filtroAtivo é "concluidos"', () => {
    const { getByText } = render(
      <FiltroLista filtroAtivo="concluidos" onChangeFiltro={mockOnChangeFiltro} />
    );

    const botaoConcluidos = getByText('Concluídos');
    expect(botaoConcluidos.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#fff' })
      ])
    );
  });

  it('deve chamar onChangeFiltro com "todos" quando o botão Todos for pressionado', () => {
    const { getByText } = render(
      <FiltroLista filtroAtivo="pendentes" onChangeFiltro={mockOnChangeFiltro} />
    );

    const botaoTodos = getByText('Todos');
    fireEvent.press(botaoTodos);

    expect(mockOnChangeFiltro).toHaveBeenCalledTimes(1);
    expect(mockOnChangeFiltro).toHaveBeenCalledWith('todos');
  });

  it('deve chamar onChangeFiltro com "pendentes" quando o botão Pendentes for pressionado', () => {
    const { getByText } = render(
      <FiltroLista filtroAtivo="todos" onChangeFiltro={mockOnChangeFiltro} />
    );

    const botaoPendentes = getByText('Pendentes');
    fireEvent.press(botaoPendentes);

    expect(mockOnChangeFiltro).toHaveBeenCalledTimes(1);
    expect(mockOnChangeFiltro).toHaveBeenCalledWith('pendentes');
  });

  it('deve chamar onChangeFiltro com "concluidos" quando o botão Concluídos for pressionado', () => {
    const { getByText } = render(
      <FiltroLista filtroAtivo="todos" onChangeFiltro={mockOnChangeFiltro} />
    );

    const botaoConcluidos = getByText('Concluídos');
    fireEvent.press(botaoConcluidos);

    expect(mockOnChangeFiltro).toHaveBeenCalledTimes(1);
    expect(mockOnChangeFiltro).toHaveBeenCalledWith('concluidos');
  });

  it('deve aplicar estilos corretos para botões inativos', () => {
    const { getByText } = render(
      <FiltroLista filtroAtivo="todos" onChangeFiltro={mockOnChangeFiltro} />
    );

    const botaoPendentes = getByText('Pendentes');
    const botaoConcluidos = getByText('Concluídos');

    expect(botaoPendentes.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#999' })
      ])
    );
    
    expect(botaoConcluidos.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#999' })
      ])
    );
  });

  it('deve ter apenas um filtro ativo por vez', () => {
    const { getByText, rerender } = render(
      <FiltroLista filtroAtivo="todos" onChangeFiltro={mockOnChangeFiltro} />
    );

    expect(getByText('Todos').props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#fff' })
      ])
    );

    rerender(
      <FiltroLista filtroAtivo="pendentes" onChangeFiltro={mockOnChangeFiltro} />
    );

    expect(getByText('Pendentes').props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#fff' })
      ])
    );
    
    expect(getByText('Todos').props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#999' })
      ])
    );
  });

  it('não deve chamar onChangeFiltro quando clicar no filtro já ativo', () => {
    const { getByText } = render(
      <FiltroLista filtroAtivo="todos" onChangeFiltro={mockOnChangeFiltro} />
    );

    const botaoTodos = getByText('Todos');
    fireEvent.press(botaoTodos);

    expect(mockOnChangeFiltro).toHaveBeenCalledTimes(1);
    expect(mockOnChangeFiltro).toHaveBeenCalledWith('todos');
  });
});