import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { EstadoLista } from '../components/EstadoLista';
import { FiltroLista } from '../components/FiltroLista';
import { FormularioItem } from '../components/FormularioItem';
import { Header } from '../components/Header';
import { ListaAgrupadaPorCategoria } from '../components/ListaAgrupadaPorCategoria';
import { useShoppingList } from '../hooks/useShoppingList';
import { CategoriaCompra } from '../models/ShoppingItem';
import { CompartilharService } from '../service/CompartilharService';

type FiltroTipo = 'todos' | 'pendentes' | 'concluidos';

export function Home() {
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroTipo>('todos');
  
  const {
    itens,
    loading,
    error,
    adicionarItem: adicionarItemFirebase,
    alternarConclusaoItem: alternarConclusaoItemFirebase,
    removerItem: removerItemFirebase,
    carregarItens
  } = useShoppingList();

  const itensFiltrados = React.useMemo(() => {
    switch (filtroAtivo) {
      case 'pendentes':
        return itens.filter(item => !item.concluido);
      case 'concluidos':
        return itens.filter(item => item.concluido);
      default:
        return itens;
    }
  }, [itens, filtroAtivo]);

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
    await CompartilharService.compartilharLista(itensFiltrados);
  };

  const alterarFiltro = (filtro: FiltroTipo) => {
    setFiltroAtivo(filtro);
  };

  return (
    <View style={styles.container}>
      <Header
        titulo="Lista de Compras"
        iconeDireito="share-outline"
        acaoDireita={compartilharLista}
      />

      <FormularioItem onAdicionar={adicionarItem} />

      <FiltroLista filtroAtivo={filtroAtivo} onChangeFiltro={alterarFiltro} />

      <EstadoLista
        loading={loading}
        error={error}
        listaVazia={itensFiltrados.length === 0 && !loading && !error}
        onRecarregar={carregarItens}
      />

      {!loading && !error && itensFiltrados.length > 0 && (
        <ListaAgrupadaPorCategoria
          itens={itensFiltrados}
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