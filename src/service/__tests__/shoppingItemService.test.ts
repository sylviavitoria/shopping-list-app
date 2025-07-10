import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { CategoriaCompra, ShoppingItemRequest } from '../../models/ShoppingItem';
import { ShoppingItemService } from '../shoppingItemService';

jest.mock('firebase/firestore');
jest.mock('../config/firebase', () => ({
    db: {}
}));

const mockAddDoc = addDoc as jest.MockedFunction<typeof addDoc>;
const mockCollection = collection as jest.MockedFunction<typeof collection>;
const mockDeleteDoc = deleteDoc as jest.MockedFunction<typeof deleteDoc>;
const mockDoc = doc as jest.MockedFunction<typeof doc>;
const mockGetDoc = getDoc as jest.MockedFunction<typeof getDoc>;
const mockGetDocs = getDocs as jest.MockedFunction<typeof getDocs>;
const mockOrderBy = orderBy as jest.MockedFunction<typeof orderBy>;
const mockQuery = query as jest.MockedFunction<typeof query>;
const mockServerTimestamp = serverTimestamp as jest.MockedFunction<typeof serverTimestamp>;
const mockUpdateDoc = updateDoc as jest.MockedFunction<typeof updateDoc>;
const mockWhere = where as jest.MockedFunction<typeof where>;

describe('ShoppingItemService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockServerTimestamp.mockReturnValue({} as any);
        
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('adicionarItem', () => {
        it('deve adicionar um item com sucesso', async () => {
            const mockItemRequest: ShoppingItemRequest = {
                nome: 'Arroz',
                concluido: false,
                categoria: 'Alimentos'
            };

            const mockDocRef = { id: 'id123' };
            mockAddDoc.mockResolvedValue(mockDocRef as any);
            mockCollection.mockReturnValue({} as any);

            const result = await ShoppingItemService.adicionarItem(mockItemRequest);

            expect(mockCollection).toHaveBeenCalledWith({}, 'shopping_items');
            expect(mockAddDoc).toHaveBeenCalledWith({}, {
                nome: 'Arroz',
                concluido: false,
                categoria: 'Alimentos',
                dataCriacao: {}
            });
            expect(result).toBe('id123');
        });
    });

    describe('obterItens', () => {
        it('deve retornar lista de itens ordenados por data', async () => {
            const mockData = [
                {
                    id: 'id1',
                    data: () => ({
                        nome: 'Arroz',
                        concluido: false,
                        categoria: 'Alimentos',
                        dataCriacao: { toDate: () => new Date('2025-10-11') }
                    })
                },
                {
                    id: 'id2',
                    data: () => ({
                        nome: 'Leite',
                        concluido: true,
                        categoria: 'Laticínios',
                        dataCriacao: { toDate: () => new Date('2025-10-12') }
                    })
                }
            ];

            const mockSnapshot = {
                docs: mockData
            };

            mockQuery.mockReturnValue({} as any);
            mockCollection.mockReturnValue({} as any);
            mockOrderBy.mockReturnValue({} as any);
            mockGetDocs.mockResolvedValue(mockSnapshot as any);

            const result = await ShoppingItemService.obterItens();

            expect(mockCollection).toHaveBeenCalledWith({}, 'shopping_items');
            expect(mockOrderBy).toHaveBeenCalledWith('dataCriacao', 'desc');
            expect(mockQuery).toHaveBeenCalled();
            expect(mockGetDocs).toHaveBeenCalled();

            expect(result).toEqual([
                {
                    id: 'id1',
                    nome: 'Arroz',
                    concluido: false,
                    categoria: 'Alimentos',
                    dataCriacao: new Date('2025-10-11')
                },
                {
                    id: 'id2',
                    nome: 'Leite',
                    concluido: true,
                    categoria: 'Laticínios',
                    dataCriacao: new Date('2025-10-12')
                }
            ]);
        });

        it('deve retornar lista vazia quando não há itens', async () => {
            const mockSnapshot = { docs: [] };

            mockQuery.mockReturnValue({} as any);
            mockCollection.mockReturnValue({} as any);
            mockOrderBy.mockReturnValue({} as any);
            mockGetDocs.mockResolvedValue(mockSnapshot as any);

            const result = await ShoppingItemService.obterItens();

            expect(result).toEqual([]);
        });
    });

    describe('alternarConclusao', () => {
        it('deve alternar conclusão de false para true', async () => {
            const mockDocSnap = {
                exists: () => true,
                data: () => ({ concluido: false })
            };

            mockDoc.mockReturnValue({} as any);
            mockGetDoc.mockResolvedValue(mockDocSnap as any);
            mockUpdateDoc.mockResolvedValue(undefined as any);

            await ShoppingItemService.alternarConclusao('test-id');

            expect(mockDoc).toHaveBeenCalledWith({}, 'shopping_items', 'test-id');
            expect(mockGetDoc).toHaveBeenCalledWith({});
            expect(mockUpdateDoc).toHaveBeenCalledWith({}, { concluido: true });
        });

        it('deve alternar conclusão de true para false', async () => {
            const mockDocSnap = {
                exists: () => true,
                data: () => ({ concluido: true })
            };

            mockDoc.mockReturnValue({} as any);
            mockGetDoc.mockResolvedValue(mockDocSnap as any);
            mockUpdateDoc.mockResolvedValue(undefined as any);

            await ShoppingItemService.alternarConclusao('test-id');

            expect(mockUpdateDoc).toHaveBeenCalledWith({}, { concluido: false });
        });

        it('deve lançar erro quando getDoc falha', async () => {
            const mockError = new Error('Firebase error');

            mockDoc.mockReturnValue({} as any);
            mockGetDoc.mockRejectedValue(mockError);

            await expect(ShoppingItemService.alternarConclusao('test-id'))
                .rejects.toThrow('Firebase error');
        });
    });

    describe('removerItem', () => {
        it('deve remover item com sucesso', async () => {
            mockDoc.mockReturnValue({} as any);
            mockDeleteDoc.mockResolvedValue(undefined as any);

            await ShoppingItemService.removerItem('test-id');

            expect(mockDoc).toHaveBeenCalledWith({}, 'shopping_items', 'test-id');
            expect(mockDeleteDoc).toHaveBeenCalledWith({});
        });

        it('deve lançar erro quando deleteDoc falha', async () => {
            const mockError = new Error('Delete failed');

            mockDoc.mockReturnValue({} as any);
            mockDeleteDoc.mockRejectedValue(mockError);

            await expect(ShoppingItemService.removerItem('test-id'))
                .rejects.toThrow('Delete failed');
        });
    });

    describe('obterItensPorCategoria', () => {
        it('deve retornar itens filtrados por categoria', async () => {
            const categoria: CategoriaCompra = 'Alimentos';

            const mockData = [
                {
                    id: 'id1',
                    data: () => ({
                        nome: 'Arroz',
                        concluido: false,
                        categoria: 'Alimentos',
                        dataCriacao: { toDate: () => new Date('2025-10-11') }
                    })
                }
            ];

            const mockSnapshot = { docs: mockData };

            mockQuery.mockReturnValue({} as any);
            mockCollection.mockReturnValue({} as any);
            mockWhere.mockReturnValue({} as any);
            mockOrderBy.mockReturnValue({} as any);
            mockGetDocs.mockResolvedValue(mockSnapshot as any);

            const result = await ShoppingItemService.obterItensPorCategoria(categoria);

            expect(mockCollection).toHaveBeenCalledWith({}, 'shopping_items');
            expect(mockWhere).toHaveBeenCalledWith('categoria', '==', 'Alimentos');
            expect(mockOrderBy).toHaveBeenCalledWith('dataCriacao', 'desc');
            expect(mockQuery).toHaveBeenCalled();
            expect(mockGetDocs).toHaveBeenCalled();

            expect(result).toEqual([
                {
                    id: 'id1',
                    nome: 'Arroz',
                    concluido: false,
                    categoria: 'Alimentos',
                    dataCriacao: new Date('2025-10-11')
                }
            ]);
        });

        it('deve retornar lista vazia quando não há itens da categoria', async () => {
            const categoria: CategoriaCompra = 'Bebidas';
            const mockSnapshot = { docs: [] };

            mockQuery.mockReturnValue({} as any);
            mockCollection.mockReturnValue({} as any);
            mockWhere.mockReturnValue({} as any);
            mockOrderBy.mockReturnValue({} as any);
            mockGetDocs.mockResolvedValue(mockSnapshot as any);

            const result = await ShoppingItemService.obterItensPorCategoria(categoria);

            expect(result).toEqual([]);
        });

        it('deve lançar erro quando query falha', async () => {
            const categoria: CategoriaCompra = 'Hortifruti';
            const mockError = new Error('Query failed');

            mockQuery.mockReturnValue({} as any);
            mockCollection.mockReturnValue({} as any);
            mockWhere.mockReturnValue({} as any);
            mockOrderBy.mockReturnValue({} as any);
            mockGetDocs.mockRejectedValue(mockError);

            await expect(ShoppingItemService.obterItensPorCategoria(categoria))
                .rejects.toThrow('Query failed');
        });
    });
});