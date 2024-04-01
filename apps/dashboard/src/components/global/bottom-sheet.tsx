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

function BottomSheet({
  children,
  targetForm,
}: {
  children?: React.ReactNode;
  targetForm?: string;
}) {
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
              const target = e.target as HTMLButtonElement;
              const form = document.getElementById(
                targetForm!
              ) as HTMLFormElement;
              console.log("Form:", form);
              if (form) {
                if (form.reportValidity()) {
                  form.submit();
                  dialog.onConfirm();
                } else {
                  return;
                }
              } else {
                dialog.onConfirm();
              }
            }}
            type="submit"
            form={targetForm}
          >
            Submit
          </Button>

          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default BottomSheet;
