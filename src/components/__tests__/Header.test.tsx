import { render } from '@testing-library/react-native';
import React from 'react';
import { Header } from '../Header';

describe('Header Component', () => {
  it('deve renderizar o título corretamente', () => {
    const titulo = 'Teste de Header';
    
    const { getByText } = render(
      <Header titulo={titulo} />
    );
    
    expect(getByText(titulo)).toBeTruthy();
  });

  it('deve renderizar sem botão voltar por padrão', () => {
    const { queryByTestId } = render(
      <Header titulo="Teste" />
    );
    
    expect(queryByTestId('botao-voltar')).toBeNull();
  });

  it('deve renderizar com botão voltar quando especificado', () => {
    const mockAcaoVoltar = jest.fn();
    
    const { getByTestId } = render(
      <Header 
        titulo="Teste" 
        mostrarBotaoVoltar={true} 
        acaoVoltar={mockAcaoVoltar} 
      />
    );
    
    expect(getByTestId('botao-voltar')).toBeTruthy();
  });
});
