import { Share } from 'react-native';
import { ShoppingItem } from '../models/ShoppingItem';

export class CompartilharService {
  static async compartilharLista(itens: ShoppingItem[]): Promise<boolean> {
    try {
      const itensPorCategoria: Record<string, ShoppingItem[]> = {};
      
      itens.forEach(item => {
        const categoria = item.categoria || 'Outros';
        if (!itensPorCategoria[categoria]) {
          itensPorCategoria[categoria] = [];
        }
        itensPorCategoria[categoria].push(item);
      });

      let mensagem = 'Minha Lista de Compras:\n\n';
      
      Object.entries(itensPorCategoria).forEach(([categoria, itensCategoria]) => {
        mensagem += `${categoria}\n`;
        
        itensCategoria.forEach(item => {
          mensagem += `${item.concluido ? '✓' : '☐'} ${item.nome}\n`;
        });
        
        mensagem += '\n';
      });

      const resultado = await Share.share({
        message: mensagem,
        title: 'Lista de Compras'
      });

      return resultado.action !== Share.dismissedAction;
    } catch (erro) {
      console.error('Erro ao compartilhar:', erro);
      return false;
    }
  }
}