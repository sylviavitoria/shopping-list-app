import { StyleSheet } from 'react-native';

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

export default styles;
