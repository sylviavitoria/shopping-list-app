import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { ItemLista } from '../components/ItemLista';
import { useShoppingList } from '../hooks/useShoppingList';
import { ShoppingItem } from '../models/ShoppingItem';

interface ListaAgrupadaPorCategoriaProps {
  onToggleConclusao: (id: string) => void;
  onRemover: (id: string) => void;
}

export function ListaAgrupadaPorCategoria({ 
  onToggleConclusao, 
  onRemover 
}: ListaAgrupadaPorCategoriaProps) {
  const { itens, loading, error } = useShoppingList();
  
  const secoesPorCategoria = React.useMemo(() => {
    const categorizados: Record<string, ShoppingItem[]> = {};
    
    itens.forEach(item => {
      const categoria = item.categoria || 'Outros';
      if (!categorizados[categoria]) {
        categorizados[categoria] = [];
      }
      categorizados[categoria].push(item);
    });
    
    return Object.keys(categorizados).map(categoria => ({
      titulo: categoria,
      data: categorizados[categoria]
    }));
  }, [itens]);
  
  if (loading || error || itens.length === 0) {
    return null;
  }
  
  return (
    <SectionList
      sections={secoesPorCategoria}
      keyExtractor={(item) => item.id}
      style={styles.lista}
      renderItem={({ item }) => (
        <ItemLista 
          item={item} 
          onToggleConclusao={onToggleConclusao}
          onRemover={onRemover}
        />
      )}
      renderSectionHeader={({ section: { titulo } }) => (
        <View style={styles.cabecalhoCategoria}>
          <Text style={styles.tituloCategoria}>{titulo}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cabecalhoCategoria: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 8,
  },
  tituloCategoria: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});