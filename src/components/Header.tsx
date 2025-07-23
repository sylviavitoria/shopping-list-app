import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../components/styles/Header.styles';

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
