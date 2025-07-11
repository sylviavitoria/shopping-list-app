import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { FormularioItem } from '../FormularioItem';

describe('FormularioItem Component', () => {
  const mockOnAdicionar = jest.fn();

  beforeEach(() => {
    mockOnAdicionar.mockClear();
  });

  it('deve renderizar o input de texto corretamente', () => {
    const { getByPlaceholderText } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    expect(getByPlaceholderText('Adicionar novo item...')).toBeTruthy();
  });

  it('deve renderizar o botão de adicionar', () => {
    const { getByTestId } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    expect(getByTestId('botao-adicionar')).toBeTruthy();
  });

  it('deve renderizar todas as categorias disponíveis', () => {
    const { getByText } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    const categorias = ['Hortifruti', 'Bebidas', 'Limpeza', 'Laticínios', 'Alimentos', 'Higiene', 'Outros'];
    
    categorias.forEach(categoria => {
      expect(getByText(categoria)).toBeTruthy();
    });
  });

  it('deve ter "Outros" como categoria padrão selecionada', () => {
    const { getByText } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    const botaoOutros = getByText('Outros');
    expect(botaoOutros.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#fff' })
      ])
    );
  });

  it('deve atualizar o texto do input quando o usuário digita', () => {
    const { getByPlaceholderText } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    const input = getByPlaceholderText('Adicionar novo item...');
    fireEvent.changeText(input, 'Leite');

    expect(input.props.value).toBe('Leite');
  });

  it('deve alterar a categoria selecionada quando um botão de categoria é pressionado', () => {
    const { getByText } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    const botaoHortifruti = getByText('Hortifruti');
    fireEvent.press(botaoHortifruti);

    expect(botaoHortifruti.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#fff' })
      ])
    );
  });

  it('deve chamar onAdicionar com os dados corretos quando o botão adicionar é pressionado', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    const input = getByPlaceholderText('Adicionar novo item...');
    const botaoAdicionar = getByTestId('botao-adicionar');
    const botaoHortifruti = getByText('Hortifruti');

    fireEvent.changeText(input, 'Maçã');
    fireEvent.press(botaoHortifruti);
    fireEvent.press(botaoAdicionar);

    await waitFor(() => {
      expect(mockOnAdicionar).toHaveBeenCalledWith('Maçã', 'Hortifruti');
    });
  });

  it('deve limpar o input após adicionar um item', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    const input = getByPlaceholderText('Adicionar novo item...');
    const botaoAdicionar = getByTestId('botao-adicionar');

    fireEvent.changeText(input, 'Banana');
    fireEvent.press(botaoAdicionar);

    await waitFor(() => {
      expect(input.props.value).toBe('');
    });
  });

  it('não deve chamar onAdicionar quando o input está vazio', () => {
    const { getByTestId } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    const botaoAdicionar = getByTestId('botao-adicionar');
    fireEvent.press(botaoAdicionar);

    expect(mockOnAdicionar).not.toHaveBeenCalled();
  });

  it('não deve chamar onAdicionar quando o input contém apenas espaços', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    const input = getByPlaceholderText('Adicionar novo item...');
    const botaoAdicionar = getByTestId('botao-adicionar');

    fireEvent.changeText(input, '   ');
    fireEvent.press(botaoAdicionar);

    expect(mockOnAdicionar).not.toHaveBeenCalled();
  });

  it('deve renderizar o label das categorias', () => {
    const { getByText } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    expect(getByText('Categoria:')).toBeTruthy();
  });

  it('deve manter a categoria selecionada após adicionar um item', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <FormularioItem onAdicionar={mockOnAdicionar} />
    );

    const input = getByPlaceholderText('Adicionar novo item...');
    const botaoAdicionar = getByTestId('botao-adicionar');
    const botaoBebidas = getByText('Bebidas');

    fireEvent.press(botaoBebidas);
    fireEvent.changeText(input, 'Água');
    fireEvent.press(botaoAdicionar);

    await waitFor(() => {
      expect(botaoBebidas.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ color: '#fff' })
        ])
      );
    });
  });
});