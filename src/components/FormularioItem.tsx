import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../components/styles/FormularioItem.styles';
import { CATEGORIAS_COMPRA, CategoriaCompra } from '../constants/categorias';

interface FormularioItemProps {
  onAdicionar: (nome: string, categoria: CategoriaCompra) => Promise<void>;
}

export function FormularioItem({ onAdicionar }: FormularioItemProps) {
  const [textoNovoItem, setTextoNovoItem] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaCompra>('Outros');

  const categorias = [...CATEGORIAS_COMPRA].sort();

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
