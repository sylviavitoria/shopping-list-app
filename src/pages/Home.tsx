import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { EstadoLista } from '../components/EstadoLista';
import { FiltroLista } from '../components/FiltroLista';
import { FormularioItem } from '../components/FormularioItem';
import { Header } from '../components/Header';
import { ListaAgrupadaPorCategoria } from '../components/ListaAgrupadaPorCategoria';
import { FiltroTipo } from '../constants/filtros';
import { useShoppingList } from '../hooks/useShoppingList';
import { CompartilharService } from '../service/CompartilharService';
import styles from './styles/Home.styles';

export function Home() {
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroTipo>('todos');

  const {
    itens,
    loading,
    error,
    adicionarItem,
    alternarConclusaoItem,
    removerItem,
    carregarItens
  } = useShoppingList();

  const itensFiltrados = useMemo(() => {
    switch (filtroAtivo) {
      case 'pendentes':
        return itens.filter(item => !item.concluido);
      case 'concluidos':
        return itens.filter(item => item.concluido);
      default:
        return itens;
    }
  }, [itens, filtroAtivo]);

  const compartilharLista = useCallback(async () => {
    await CompartilharService.compartilharLista(itensFiltrados);
  }, [itensFiltrados]);

  const alterarFiltro = useCallback((filtro: FiltroTipo) => {
    setFiltroAtivo(filtro);
  }, []);

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
