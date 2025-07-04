import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FormularioItem } from '../components/FormularioItem';
import { Header } from '../components/Header';
import { useShoppingList } from '../hooks/useShoppingList';
import { CategoriaCompra } from '../models/ShoppingItem';

export function Home() {
  const {
    adicionarItem: adicionarItemFirebase,
  } = useShoppingList();

  const adicionarItem = async (nome: string, categoria: CategoriaCompra) => {
    await adicionarItemFirebase(nome, categoria);
  };

  return (
    <View style={styles.container}>
      <Header
        titulo="Lista de Compras"
        iconeDireito="share-outline"
      />
      <FormularioItem onAdicionar={adicionarItem} />
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