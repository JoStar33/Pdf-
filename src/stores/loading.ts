import { create } from 'zustand';

interface ILoadingStore {
  isLoading: boolean;
  setIsLoading: (fn: ((prev: boolean) => boolean) | boolean) => void;
}

/**
 * 로딩 노출을 관리하는 스토어
 */
export const useLoadingStore = create<ILoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (fn: ((prev: boolean) => boolean) | boolean) => {
    set((state) => ({ isLoading: typeof fn === 'boolean' ? fn : fn(state.isLoading) }));
  },
}));
