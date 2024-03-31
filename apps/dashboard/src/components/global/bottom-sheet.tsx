import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useDialogStore } from "@/shared/dialogStore";

function BottomSheet({ children }: { children?: React.ReactNode }) {
  const { dialog, toggleIsOpen } = useDialogStore();
  return (
    <Drawer
      open={dialog.isOpen}
      onOpenChange={toggleIsOpen}
      onClose={() => dialog.onCancel()}
    >
      {/* <DrawerTrigger>Open</DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{dialog.title}</DrawerTitle>
          <DrawerDescription>{dialog.description}</DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter>
          <Button
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              dialog.onConfirm();
            }}
          >
            Submit
          </Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default BottomSheet;
