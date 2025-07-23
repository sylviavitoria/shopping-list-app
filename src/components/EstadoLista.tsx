import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../components/styles/EstadoLista.styles';

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
      <View style={styles.container} testID="estado-container">
        <ActivityIndicator size="large" color="#4CAF50"  testID="loading-indicator"/>
        <Text style={styles.textoVazio}>Carregando itens...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.container}>
        <Ionicons name="alert-circle-outline" size={64} color="#FF5252"testID="error-icon" />
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
        <Ionicons name="basket-outline" size={64} color="#ccc" testID="empty-basket-icon" />
        <Text style={styles.textoVazio}>Sua lista está vazia</Text>
        <Text style={styles.subtextoVazio}>Adicione itens para começar</Text>
      </View>
    );
  }
  
  return null;
}
