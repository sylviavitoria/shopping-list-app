import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface EstadoListaProps {
  loading?: boolean;
  error?: string | null;
  listaVazia?: boolean;
  onRecarregar?: () => void;
}

export function EstadoLista({ 
  loading, 
  error, 
  listaVazia, 
  onRecarregar 
}: EstadoListaProps) {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.textoVazio}>Carregando itens...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.container}>
        <Ionicons name="alert-circle-outline" size={64} color="#FF5252" />
        <Text style={styles.textoVazio}>{error}</Text>
        {onRecarregar && (
          <TouchableOpacity style={styles.botaoTentar} onPress={onRecarregar}>
            <Text style={styles.textoBotao}>Tentar novamente</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  
  if (listaVazia) {
    return (
      <View style={styles.container}>
        <Ionicons name="basket-outline" size={64} color="#ccc" />
        <Text style={styles.textoVazio}>Sua lista está vazia</Text>
        <Text style={styles.subtextoVazio}>Adicione itens para começar</Text>
      </View>
    );
  }
  
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoVazio: {
    fontSize: 18,
    color: '#888',
    marginTop: 16,
    fontWeight: 'bold',
  },
  subtextoVazio: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 8,
  },
  botaoTentar: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});