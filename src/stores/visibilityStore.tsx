// src/store.ts
import { create } from 'zustand';

interface VisibilityState {
  mainMenuVisibility: boolean;
  mainMenuOpened: () => void;
  mainMenuClosed: () => void;

  createPopupVisibility: boolean;
  createPopupOpened: () => void;
  createPopupClosed: () => void;

  showTreesPopupVisibility: boolean;
  showTreesPopupOpened: () => void;
  showTreesPopupClosed: () => void;
}

const useVisibilityStore = create<VisibilityState>((set) => ({
  mainMenuVisibility: true, 
  mainMenuOpened: () => set(() => ({ mainMenuVisibility: true })),
  mainMenuClosed: () => set(() => ({ mainMenuVisibility: false })),


  createPopupVisibility: false, 
  createPopupOpened: () => set(() => ({ createPopupVisibility: true })),
  createPopupClosed: () => set(() => ({ createPopupVisibility: false })),
  

  showTreesPopupVisibility: false, 
  showTreesPopupOpened: () => set(() => ({ showTreesPopupVisibility: true })),
  showTreesPopupClosed: () => set(() => ({ showTreesPopupVisibility: false })),
}));

export default useVisibilityStore;
