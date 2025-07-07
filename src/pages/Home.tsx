import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EstadoLista } from '../components/EstadoLista';
import { FormularioItem } from '../components/FormularioItem';
import { Header } from '../components/Header';
import { ListaAgrupadaPorCategoria } from '../components/ListaAgrupadaPorCategoria';
import { useShoppingList } from '../hooks/useShoppingList';
import { CategoriaCompra } from '../models/ShoppingItem';
import { ShareService } from '../service/ShareService';

export function Home() {
  const {
    itens,
    loading,
    error,
    adicionarItem: adicionarItemFirebase,
    alternarConclusaoItem: alternarConclusaoItemFirebase,
    removerItem: removerItemFirebase,
    carregarItens
  } = useShoppingList();

  const adicionarItem = async (nome: string, categoria: CategoriaCompra) => {
    await adicionarItemFirebase(nome, categoria);
  };

  const alternarConclusaoItem = (id: string) => {
    alternarConclusaoItemFirebase(id);
  };

  const removerItem = (id: string) => {
    removerItemFirebase(id);
  };

  const compartilharLista = async () => {
    await ShareService.compartilharLista(itens);
  };

  return (
    <View style={styles.container}>
      <Header
        titulo="Lista de Compras"
        iconeDireito="share-outline"
        acaoDireita={compartilharLista}
      />

      <FormularioItem onAdicionar={adicionarItem} />

      <EstadoLista
        loading={loading}
        error={error}
        listaVazia={itens.length === 0 && !loading && !error}
        onRecarregar={carregarItens}
      />

      {!loading && !error && itens.length > 0 && (
        <ListaAgrupadaPorCategoria
          onToggleConclusao={alternarConclusaoItem}
          onRemover={removerItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  lista: {
    flex: 1,
    paddingHorizontal: 16,
  },
});