import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ShoppingItem } from '../models/ShoppingItem';

interface ItemListaProps {
  item: ShoppingItem;
  onToggleConclusao: (id: string) => void;
  onRemover: (id: string) => void;
}

export function ItemLista({ item, onToggleConclusao, onRemover }: ItemListaProps) {
  return (
    <View style={styles.containerItem}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => onToggleConclusao(item.id)}
        testID={`checkbox-${item.id}`}
      >
        {item.concluido ? (
          <Ionicons name="checkbox" size={24} color="#4CAF50" />
        ) : (
          <Ionicons name="square-outline" size={24} color="#999" />
        )}
      </TouchableOpacity>
      
      <View style={styles.conteudoItem}>
        <Text 
          style={[
            styles.textoItem,
            item.concluido && styles.textoConcluido
          ]}
        >
          {item.nome}
        </Text>
        
        <View style={styles.infoAdicional}>
          {item.categoria && item.categoria !== 'Outros' && (
            <Text style={styles.textoCategoria}>
              {item.categoria}
            </Text>
          )}
          {item.dataCriacao && (
            <Text style={styles.textoData}>
              {new Date(item.dataCriacao).toLocaleDateString('pt-BR')}
            </Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.botaoExcluir}
        onPress={() => onRemover(item.id)}
        testID={`botao-excluir-${item.id}`}
      >
        <Ionicons name="trash-outline" size={24} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  checkbox: {
    marginRight: 12,
  },
  conteudoItem: {
    flex: 1,
  },
  textoItem: {
    fontSize: 16,
    color: '#333',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  textoCategoria: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  textoData: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
    fontStyle: 'italic',
  },
  infoAdicional: {
    marginTop: 4,
  },
  botaoExcluir: {
    padding: 8,
  },
});