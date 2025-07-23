import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  botaoFiltro: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
  },
  botaoAtivo: {
    backgroundColor: '#4CAF50',
  },
  textoBotao: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  textoAtivo: {
    color: '#fff',
  },
});

export default styles;
