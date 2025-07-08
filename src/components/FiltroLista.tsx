import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FiltroTipo = 'todos' | 'pendentes' | 'concluidos';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  botaoFiltro: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
  },
  botaoAtivo: {
    backgroundColor: '#4CAF50',
  },
  textoBotao: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  textoAtivo: {
    color: '#fff',
  },
});