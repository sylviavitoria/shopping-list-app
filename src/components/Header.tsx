import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../components/styles/Header.styles';
type IoniconsName = keyof typeof Ionicons.glyphMap;

interface PropsHeader {
  titulo: string;
  mostrarBotaoVoltar?: boolean;
  acaoVoltar?: () => void;
  acaoDireita?: () => void;
  iconeDireito?:  IoniconsName;
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
        <Ionicons name={iconeDireito} size={24} color="#333" />
        </TouchableOpacity>
      ) : <View style={styles.espacoVazio} />}
    </View>
  );
}
