import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
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
  botaoTentar: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
