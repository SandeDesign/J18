import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  QueryConstraint,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../config';
import { Collaboration, CollaborationStatus, CollaborationType } from '../types';
import { authService } from './authService';

class CollaborationService {
  private collectionName = 'collaborations';

  async createCollaboration(
    collabData: Omit<Collaboration, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'paidAmount'>
  ): Promise<Collaboration> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can create collaborations');
    }

    try {
      const newCollab = {
        ...collabData,
        paidAmount: 0,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, this.collectionName), newCollab);
      const createdCollab = await this.getCollaborationById(docRef.id);

      if (!createdCollab) {
        throw new Error('Failed to retrieve created collaboration');
      }

      return createdCollab;
    } catch (error: any) {
      console.error('Create collaboration error:', error);
      throw new Error(error.message || 'Failed to create collaboration');
    }
  }

  async getCollaborationById(id: string): Promise<Collaboration | null> {
    try {
      const collabDoc = await getDoc(doc(db, this.collectionName, id));
      if (collabDoc.exists()) {
        return { id: collabDoc.id, ...collabDoc.data() } as Collaboration;
      }
      return null;
    } catch (error) {
      console.error('Get collaboration by ID error:', error);
      return null;
    }
  }

  async getAllCollaborations(options?: {
    status?: CollaborationStatus;
    type?: CollaborationType;
    limitCount?: number;
  }): Promise<Collaboration[]> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can view collaborations');
    }

    try {
      const constraints: QueryConstraint[] = [];

      if (options?.status) {
        constraints.push(where('status', '==', options.status));
      }

      if (options?.type) {
        constraints.push(where('type', '==', options.type));
      }

      constraints.push(orderBy('createdAt', 'desc'));

      if (options?.limitCount) {
        constraints.push(limit(options.limitCount));
      }

      const q = query(collection(db, this.collectionName), ...constraints);
      const querySnapshot = await getDocs(q);

      const collaborations: Collaboration[] = [];
      querySnapshot.forEach((doc) => {
        collaborations.push({ id: doc.id, ...doc.data() } as Collaboration);
      });

      return collaborations;
    } catch (error) {
      console.error('Get all collaborations error:', error);
      throw new Error('Failed to fetch collaborations');
    }
  }

  async getActiveCollaborations(): Promise<Collaboration[]> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can view collaborations');
    }

    try {
      const activeStatuses: CollaborationStatus[] = ['agreed', 'contract_sent', 'signed', 'in_progress'];

      const q = query(
        collection(db, this.collectionName),
        where('status', 'in', activeStatuses),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      const collaborations: Collaboration[] = [];
      querySnapshot.forEach((doc) => {
        collaborations.push({ id: doc.id, ...doc.data() } as Collaboration);
      });

      return collaborations;
    } catch (error) {
      console.error('Get active collaborations error:', error);
      return [];
    }
  }

  async updateCollaboration(id: string, data: Partial<Collaboration>): Promise<void> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can update collaborations');
    }

    try {
      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };

      if (data.status === 'signed' && !data.signedAt) {
        updateData.signedAt = serverTimestamp() as any;
      }

      if (data.status === 'completed' && !data.completedAt) {
        updateData.completedAt = serverTimestamp() as any;
      }

      delete (updateData as any).id;
      delete (updateData as any).createdAt;
      delete (updateData as any).createdBy;

      await updateDoc(doc(db, this.collectionName, id), updateData);
    } catch (error: any) {
      console.error('Update collaboration error:', error);
      throw new Error(error.message || 'Failed to update collaboration');
    }
  }

  async updateStatus(id: string, status: CollaborationStatus): Promise<void> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can update collaboration status');
    }

    try {
      const updateData: any = {
        status,
        updatedAt: serverTimestamp(),
      };

      if (status === 'signed') {
        updateData.signedAt = serverTimestamp();
      }

      if (status === 'completed') {
        updateData.completedAt = serverTimestamp();
      }

      await updateDoc(doc(db, this.collectionName, id), updateData);
    } catch (error: any) {
      console.error('Update collaboration status error:', error);
      throw new Error(error.message || 'Failed to update collaboration status');
    }
  }

  async updatePayment(id: string, paidAmount: number): Promise<void> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can update payments');
    }

    try {
      const collab = await this.getCollaborationById(id);
      if (!collab) {
        throw new Error('Collaboration not found');
      }

      const budget = collab.budget || 0;
      let paymentStatus: Collaboration['paymentStatus'] = 'unpaid';

      if (paidAmount >= budget) {
        paymentStatus = 'paid';
      } else if (paidAmount > 0) {
        paymentStatus = 'partial';
      }

      await updateDoc(doc(db, this.collectionName, id), {
        paidAmount,
        paymentStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Update payment error:', error);
      throw new Error(error.message || 'Failed to update payment');
    }
  }

  async deleteCollaboration(id: string): Promise<void> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can delete collaborations');
    }

    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (error: any) {
      console.error('Delete collaboration error:', error);
      throw new Error(error.message || 'Failed to delete collaboration');
    }
  }

  async getCollaborationStats(): Promise<{
    total: number;
    active: number;
    completed: number;
    totalRevenue: number;
    pendingRevenue: number;
  }> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can view statistics');
    }

    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));

      let total = 0;
      let active = 0;
      let completed = 0;
      let totalRevenue = 0;
      let pendingRevenue = 0;

      const activeStatuses: CollaborationStatus[] = ['agreed', 'contract_sent', 'signed', 'in_progress'];

      querySnapshot.forEach((doc) => {
        const collab = doc.data() as Collaboration;
        total++;

        if (activeStatuses.includes(collab.status)) {
          active++;
        }

        if (collab.status === 'completed') {
          completed++;
          totalRevenue += collab.paidAmount;
        }

        if (collab.status !== 'completed' && collab.status !== 'cancelled') {
          pendingRevenue += (collab.budget || 0) - collab.paidAmount;
        }
      });

      return {
        total,
        active,
        completed,
        totalRevenue,
        pendingRevenue,
      };
    } catch (error) {
      console.error('Get collaboration stats error:', error);
      throw new Error('Failed to fetch collaboration statistics');
    }
  }

  subscribeToCollaborations(
    callback: (collaborations: Collaboration[]) => void,
    filters?: {
      status?: CollaborationStatus;
      type?: CollaborationType;
    }
  ): Unsubscribe {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can subscribe to collaborations');
    }

    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

    if (filters?.status) {
      constraints.push(where('status', '==', filters.status));
    }

    if (filters?.type) {
      constraints.push(where('type', '==', filters.type));
    }

    const q = query(collection(db, this.collectionName), ...constraints);

    return onSnapshot(
      q,
      (querySnapshot) => {
        const collaborations: Collaboration[] = [];
        querySnapshot.forEach((doc) => {
          collaborations.push({ id: doc.id, ...doc.data() } as Collaboration);
        });
        callback(collaborations);
      },
      (error) => {
        console.error('Subscribe to collaborations error:', error);
      }
    );
  }
}

export const collaborationService = new CollaborationService();
