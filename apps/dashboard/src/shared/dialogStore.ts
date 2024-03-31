import { create } from "zustand";

type DialogState = {
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
};

interface DialogStore {
    dialog: DialogState;
    toggleIsOpen: (open: boolean) => void;
    createDialog: (dialog: Omit<DialogState, "isOpen">) => void;
    openDialog: () => void;
    closeDialog: () => void;
}

const useDialogStore = create<DialogStore>((set) => ({
    dialog: {
        isOpen: false,
        title: "",
        description: "",
        onConfirm: () => { },
        onCancel: () => { },
    },
    toggleIsOpen: (open: boolean) => set((state) => ({ dialog: { ...state.dialog, isOpen: open } })),
    createDialog: (dialog) => set((state) => ({ dialog: { ...(dialog ?? state.dialog), isOpen: false } })),
    openDialog: () => set((state) => ({ dialog: { ...state.dialog, isOpen: true } })),
    closeDialog: () => set((state) => ({ dialog: { ...state.dialog, isOpen: false } })),
}));


export { useDialogStore };