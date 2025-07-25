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
import {
    CategoriaCompra,
    ShoppingItemRequest,
    ShoppingItemResponse
} from '../models/ShoppingItem';
import { db } from './config/firebase';

const COLLECTION_NAME = 'shopping_items';

export class ShoppingItemService {
    static async adicionarItem(item: ShoppingItemRequest): Promise<string> {
        try {
            const itemRef = await addDoc(collection(db, COLLECTION_NAME), {
                nome: item.nome,
                concluido: item.concluido || false,
                categoria: item.categoria || 'Outros',
                dataCriacao: serverTimestamp()
            });

            return itemRef.id;
        } catch (error) {
            throw error;
        }
    }

    static async obterItens(): Promise<ShoppingItemResponse[]> {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                orderBy('dataCriacao', 'desc')
            );
            const snapshot = await getDocs(q);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome,
                concluido: doc.data().concluido,
                categoria: doc.data().categoria,
                dataCriacao: doc.data().dataCriacao?.toDate()
            }));
        } catch (error) {
            throw error;
        }
    }

      static async alternarConclusao(id: string): Promise<void> {
        try {
          const docRef = doc(db, COLLECTION_NAME, id);
          const snapshot = await getDoc(docRef);

          if (snapshot.exists()) {
            const item = snapshot.data();
            await updateDoc(docRef, {
              concluido: !item.concluido
            });
          }
        } catch (error) {
          throw error;
        }
      }

    static async removerItem(id: string): Promise<void> {
        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id));
        } catch (error) {
            throw error;
        }
    }

    static async obterItensPorCategoria(categoria: CategoriaCompra): Promise<ShoppingItemResponse[]> {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where('categoria', '==', categoria),
                orderBy('dataCriacao', 'desc')
            );

            const snapshot = await getDocs(q);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome,
                concluido: doc.data().concluido,
                categoria: doc.data().categoria,
                dataCriacao: doc.data().dataCriacao?.toDate()
            }));
        } catch (error) {
            throw error;
        }
    }
}
