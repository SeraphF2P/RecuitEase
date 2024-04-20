import { Btn, type BtnProps } from "~/ui";
import { cn } from "~/lib/cva";
import type { DialogContentProps } from "@radix-ui/react-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import type { RefAttributes } from "react";

const Modale = (props: JSX.IntrinsicAttributes & Dialog.DialogProps) => (
  <Dialog.Root {...props}>{props.children}</Dialog.Root>
);
const Button = (props: BtnProps) => (
  <Dialog.Trigger asChild>
    <Btn {...props} />
  </Dialog.Trigger>
);
const Close = ({ children, ...props }: BtnProps) => (
  <Dialog.Close asChild>
    <Btn {...props}>{children}</Btn>
  </Dialog.Close>
);

const Overlayer = ({
  className,
  ...props
}: Dialog.DialogOverlayProps & RefAttributes<HTMLDivElement>) => {
  return (
    <Dialog.Overlay
      {...props}
      className={cn(
        " fixed inset-0 isolate  z-50 flex items-center justify-center bg-gray-700/30 pb-10 opacity-0 backdrop-blur-sm data-[state=closed]:animate-fadeout data-[state=open]:animate-fadein",
        className,
      )}
    />
  );
};
const Content = ({
  className,
  ...props
}: DialogContentProps & RefAttributes<HTMLDivElement>) => {
  return (
    <Dialog.Content
      {...props}
      className={cn(
        " -translate-y-16 opacity-0 data-[state=closed]:animate-fadeout data-[state=open]:animate-fadein ",
        className,
      )}
    />
  );
};
Modale.Close = Close;
Modale.Title = Dialog.Title;
Modale.Description = Dialog.Description;
Modale.Portal = Dialog.Portal;
Modale.Content = Content;
Modale.overlayer = Overlayer;
Modale.Btn = Button;
export default Modale;
