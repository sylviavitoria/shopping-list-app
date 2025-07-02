import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../components/Header';

interface ItemCompra {
  id: string;
  nome: string;
  concluido: boolean;
  categoria?: string;
}

export function Home() {
  const [itens, setItens] = useState<ItemCompra[]>([]);
  const [textoNovoItem, setTextoNovoItem] = useState('');

  const adicionarItem = () => {
    if (textoNovoItem.trim()) {
      const novoItem = {
        id: Date.now().toString(),
        nome: textoNovoItem.trim(),
        concluido: false,
      };
      setItens([...itens, novoItem]);
      setTextoNovoItem('');
    }
  };

  return (
    <View style={styles.container}>
      <Header titulo="Lista de Compras"/>
      
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar novo item..."
          value={textoNovoItem}
          onChangeText={setTextoNovoItem}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarItem}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerInput: {
    flexDirection: 'row',
    margin: 16,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  botaoAdicionar: {
    width: 50,
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  lista: {
    flex: 1,
    paddingHorizontal: 16,
  },
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
  textoItem: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  botaoExcluir: {
    padding: 8,
  },
  containerVazio: {
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
});