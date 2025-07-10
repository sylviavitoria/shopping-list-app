import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { CategoriaCompra } from '../models/ShoppingItem';

interface FormularioItemProps {
  onAdicionar: (nome: string, categoria: CategoriaCompra) => Promise<void>;
}

export function FormularioItem({ onAdicionar }: FormularioItemProps) {
  const [textoNovoItem, setTextoNovoItem] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaCompra>('Outros');

  const categorias: CategoriaCompra[] = ['Hortifruti', 'Bebidas', 'Limpeza', 'Laticínios', 'Alimentos', 'Higiene', 'Outros'].sort();

  const adicionarItem = async () => {
    if (textoNovoItem.trim()) {
      await onAdicionar(textoNovoItem, categoriaSelecionada);
      setTextoNovoItem('');
    }
  };

  return (
    <View style={styles.container} testID="formulario-item">
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar novo item..."
          value={textoNovoItem}
          onChangeText={setTextoNovoItem}
        />
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarItem}
          testID="botao-adicionar"
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.containerCategorias}>
        <Text style={styles.labelCategoria}>Categoria:</Text>
        <View style={styles.grupoCategorias}>
          {categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria}
              style={[
                styles.botaoCategoriaSeletor,
                categoriaSelecionada === categoria && styles.categoriaSelecionada
              ]}
              onPress={() => setCategoriaSelecionada(categoria)}
            >
              <Text style={[
                styles.textoCategoria,
                categoriaSelecionada === categoria && styles.textoCategoriaSelecionada
              ]}>
                {categoria}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  containerInput: {
    flexDirection: 'row',
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
  containerCategorias: {
    marginTop: 12,
  },
  labelCategoria: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
    fontWeight: '500',
  },
  grupoCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  botaoCategoriaSeletor: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  categoriaSelecionada: {
    backgroundColor: '#4CAF50',
  },
  textoCategoria: {
    color: '#555',
    fontSize: 13,
    fontWeight: '500',
  },
  textoCategoriaSelecionada: {
    color: '#fff',
  },
});