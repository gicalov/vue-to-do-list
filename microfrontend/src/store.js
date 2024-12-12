import { create } from "zustand";

const useStore = create((set) => ({
  isShowWidget: false,
  toggleWidget: () => set((state) => ({ isShowWidget: !state.isShowWidget })),
}));

export default useStore;
