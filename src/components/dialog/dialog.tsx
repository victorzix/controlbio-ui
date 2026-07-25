import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";
import { forwardRef } from "react";
import { X } from "lucide-react";
import { Button, type ButtonProps } from "../button";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogCloseButton = ({ onClick, className }: { onClick?: () => void; className?: string }) => (
  <DialogPrimitive.Close 
    onClick={onClick}
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
      className
    )}
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </DialogPrimitive.Close>
);

const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { showClose?: boolean }
>(({ className, children, showClose = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      {showClose && <DialogCloseButton />}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/**
 * Botão de cancelar do rodapé de diálogos. Delega ao `Button` da lib.
 *
 * Padrão: `variant="outline"` + `tone="neutral"`. Para o cancelar destrutivo
 * (contorno vermelho) dos diálogos de confirmação, basta `tone="destructive"`.
 */
export type DialogCancelButtonProps = ButtonProps & { onCancel?: () => void };

const DialogCancelButton = forwardRef<HTMLButtonElement, DialogCancelButtonProps>(
  ({ variant = "outline", tone = "neutral", onCancel, onClick, ...props }, ref) => (
    <Button
      ref={ref}
      variant={variant}
      tone={tone}
      onClick={(e) => {
        onCancel?.();
        onClick?.(e);
      }}
      {...props}
    />
  )
);
DialogCancelButton.displayName = "DialogCancelButton";

/**
 * Botão de confirmar do rodapé de diálogos. Delega ao `Button` da lib.
 *
 * Padrão: `variant="solid"` + `tone="primary"`. Para a confirmação destrutiva
 * (excluir / inativar / revogar), basta `tone="destructive"`.
 */
export type DialogConfirmButtonProps = ButtonProps & { onConfirm?: () => void };

const DialogConfirmButton = forwardRef<HTMLButtonElement, DialogConfirmButtonProps>(
  ({ variant = "solid", tone = "primary", onConfirm, onClick, ...props }, ref) => (
    <Button
      ref={ref}
      variant={variant}
      tone={tone}
      onClick={(e) => {
        onConfirm?.();
        onClick?.(e);
      }}
      {...props}
    />
  )
);
DialogConfirmButton.displayName = "DialogConfirmButton";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
  DialogCancelButton,
  DialogConfirmButton,
};
