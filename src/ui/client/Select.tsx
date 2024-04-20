"use client";
import type {
  SetStateAction,
  ComponentProps,
  Dispatch,
  ElementRef,
  ComponentPropsWithoutRef,
} from "react";
import {
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Btn, type BtnProps } from "~/ui";
import { cn } from "~/lib/cva";
import { createPortal } from "react-dom";

interface SelectProps extends ComponentProps<"input"> {
  open?: boolean;
  defaultSelected?: string;
  errorMSG?: string;
}
type SelectContextProps = {
  isOpen: boolean;
  errorMSG?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selected: string;
  placeholder: string;
  selectHandler: ({ name, value }: { name: string; value: string }) => void;
};
const Context = createContext<SelectContextProps>({
  isOpen: false,
  setIsOpen: () => false,
  selected: "",
  selectHandler: () => false,
  errorMSG: "",
  placeholder: "select",
});
const useSelectContext = () => useContext(Context);

export const root = forwardRef<
  ElementRef<"input">,
  SelectProps & {
    onSelectChange?: ({ name, value }: { name: string; value: string }) => void;
  }
>(
  (
    {
      children,
      className,
      open = false,
      defaultSelected = "",
      errorMSG = "",
      placeholder = "select",
      onSelectChange,
      ...props
    },
    forwardedRef,
  ) => {
    const [isOpen, setIsOpen] = useState(open);
    const [selected, setSelected] = useState(defaultSelected);
    const [triggerPlaceholder, setTriggerPlaceholder] = useState(placeholder);
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(forwardedRef, () => innerRef.current!, []);
    const selectHandler = ({
      name,
      value,
    }: {
      name: string;
      value: string;
    }) => {
      setTriggerPlaceholder(() => name);
      setSelected(() => value);
      if (onSelectChange) {
        onSelectChange({ name, value });
      }
    };
    return (
      <Context.Provider
        value={{
          isOpen,
          setIsOpen,
          placeholder: triggerPlaceholder,
          selected,
          selectHandler,
          errorMSG,
        }}
      >
        <div
          data-isopen={isOpen}
          className={cn(" relative w-40   ", className)}
        >
          {children}
          <input
            className="sr-only"
            ref={innerRef}
            {...props}
            type="text"
            defaultValue={selected}
            value={selected}
          />
        </div>
      </Context.Provider>
    );
  },
);
export const content = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { isOpen } = useSelectContext();

  return (
    <>
      {isOpen && (
        <div
          {...props}
          className={cn(
            " absolute -top-1/2 left-0 flex h-80 w-full flex-col gap-0.5 overflow-y-scroll rounded  bg-neutral-white  p-1",
            className,
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};
export const trigger = ({ className, children, ...props }: BtnProps) => {
  const { setIsOpen, errorMSG, placeholder } = useSelectContext();
  return (
    <div className="relative flex flex-col justify-start pb-5">
      <Btn
        className={cn(
          " form-select w-full bg-neutral-white  text-neutral-black",
          className,
        )}
        {...props}
        onClick={() => setIsOpen((pre) => !pre)}
      >
        {children ? children : placeholder}
      </Btn>
      {errorMSG && (
        <span className="absolute bottom-0  w-full  text-center text-sm text-amber-500">
          {errorMSG}
        </span>
      )}
    </div>
  );
};
export const item = ({
  name,
  value,
  children,
  className,
  ...props
}: ComponentProps<"button"> & { name: string; value: string }) => {
  const { selected, setIsOpen, selectHandler } = useSelectContext();
  return (
    <button
      data-active={selected === value}
      className={cn(
        " border-neutrial-white  data-[active=true]:border-2",
        className,
      )}
      onClick={() => {
        selectHandler({ name, value });
        setIsOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
};
export const overlayer = ({
  className,
  onClick,
  ...props
}: ComponentPropsWithoutRef<"section">) => {
  const { isOpen, setIsOpen } = useSelectContext();
  return (
    isOpen &&
    createPortal(
      <div
        onClick={(e) => {
          setIsOpen(false);
          if (onClick) {
            onClick(e);
          }
        }}
        className={cn(" fixed inset-0 z-[999] ", className)}
        {...props}
      />,
      document.body,
    )
  );
};
