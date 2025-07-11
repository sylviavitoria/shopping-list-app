import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface PropsHeader {
  titulo: string;
  mostrarBotaoVoltar?: boolean;
  acaoVoltar?: () => void;
  acaoDireita?: () => void;
  iconeDireito?: string;
}

export function Header({ 
  titulo, 
  mostrarBotaoVoltar = false, 
  acaoVoltar,
  acaoDireita,
  iconeDireito
}: PropsHeader) {
  return (
    <View style={styles.container}>
      {mostrarBotaoVoltar ? (
        <TouchableOpacity 
          onPress={acaoVoltar} 
          style={styles.botaoVoltar}
          testID="botao-voltar"
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      ) : <View style={styles.espacoVazio} />}
      
      <Text style={styles.titulo}>{titulo}</Text>
      
      {iconeDireito ? (
        <TouchableOpacity 
          onPress={acaoDireita} 
          style={styles.botaoDireito}
          testID="botao-direito"
        >
          <Ionicons name={iconeDireito as any} size={24} color="#333" />
        </TouchableOpacity>
      ) : <View style={styles.espacoVazio} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  botaoVoltar: {
    padding: 8,
  },
  botaoDireito: {
    padding: 8,
  },
  espacoVazio: {
    width: 40,
  }
});