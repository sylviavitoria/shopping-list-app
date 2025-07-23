import { StyleSheet } from 'react-native';

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

export default styles;
