import { create } from "zustand";
import { ModalType } from "@/app/_types/hooks";

export const useProfileModal = create<ModalType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
