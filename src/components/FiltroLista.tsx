import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../components/styles/FiltroLista.styles';
import { FiltroTipo } from '../constants/filtros';
interface FiltroListaProps {
  filtroAtivo: FiltroTipo;
  onChangeFiltro: (filtro: FiltroTipo) => void;
}

export function FiltroLista({ filtroAtivo, onChangeFiltro }: FiltroListaProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.botaoFiltro, filtroAtivo === 'todos' && styles.botaoAtivo]}
        onPress={() => onChangeFiltro('todos')}
      >
        <Text style={[styles.textoBotao, filtroAtivo === 'todos' && styles.textoAtivo]}>Todos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botaoFiltro, filtroAtivo === 'pendentes' && styles.botaoAtivo]}
        onPress={() => onChangeFiltro('pendentes')}
      >
        <Text style={[styles.textoBotao, filtroAtivo === 'pendentes' && styles.textoAtivo]}>Pendentes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botaoFiltro, filtroAtivo === 'concluidos' && styles.botaoAtivo]}
        onPress={() => onChangeFiltro('concluidos')}
      >
        <Text style={[styles.textoBotao, filtroAtivo === 'concluidos' && styles.textoAtivo]}>Concluídos</Text>
      </TouchableOpacity>
    </View>
  );
}
