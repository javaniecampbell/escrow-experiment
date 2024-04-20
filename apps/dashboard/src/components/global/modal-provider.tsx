"use client";

import { Agency, User } from "@/shared/app.types";
import {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface ModalProviderProps {
  //   user: User;
  children: React.ReactNode;
}

export type ModalData = {
  user?: User;
  agency?: Agency;
};

type ModalContextType = {
  data: ModalData;
  isOpen: boolean;
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void;
  setClose: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  data: {},
  isOpen: false,
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
  setClose: () => {},
});

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ModalData>({});
  const [showingModal, setShowingModal] = useState<React.ReactNode | null>(
    null
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setOpen = useCallback(
    async (modal: React.ReactNode, fetchData?: () => Promise<any>) => {
      if (modal) {
        if (fetchData) {
          const fetchedData = await fetchData();
          setData({ ...data, ...(fetchedData || {}) });
        }
        setShowingModal(modal);
        setIsOpen(true);
      }
    },
    [data]
  );

  const setClose = () => {
    setIsOpen(false);
    setShowingModal(null);
    setData({});
  };
  const contextValue = useMemo(
    () => ({ data, setOpen, setClose, isOpen }),
    [data, isOpen, setOpen]
  );
  if (!isMounted) {
    return null;
  }

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }

    return context;
}


export default ModalProvider;