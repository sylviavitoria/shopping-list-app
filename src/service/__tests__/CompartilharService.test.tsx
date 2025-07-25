import { ShoppingItem } from '../../models/ShoppingItem';
import { CompartilharService } from '../CompartilharService';

const mockShareFunction = jest.fn();
jest.mock('react-native', () => ({
  Share: {
    share: mockShareFunction,
    dismissedAction: 'dismissed'
  }
}));

describe('CompartilharService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('compartilharLista', () => {
    
    it('deve retornar false quando o compartilhamento for cancelado', async () => {
      mockShareFunction.mockResolvedValue({ action: 'dismissed' });

      const itens: ShoppingItem[] = [
        {
          id: '1',
          nome: 'Feijão',
          concluido: false,
          categoria: 'Alimentos',
          dataCriacao: new Date()
        }
      ];

      const resultado = await CompartilharService.compartilharLista(itens);

      expect(resultado).toBe(false);
    });
  });
});