import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

type UseScrollDirType = Parameters<typeof useScroll>["0"] & {
  onHoldDelay?: number,
  defaultDir?: 1 | -1 | 0
}
const defaults: UseScrollDirType = {
  defaultDir: 0,
  axis: "y",
  offset: ["start start", "end end"],
  layoutEffect: true,
};

export function useScrollDir(parameters?: UseScrollDirType) {
  const values = {
    ...defaults,
    ...parameters
  }
  const { onHoldDelay = 2, defaultDir, ...useScrollOptions } = values

  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>()
  const [dir, setdir] = useState(defaultDir);
  const { scrollY, scrollX } = useScroll(useScrollOptions);

  const scrollValue = useScrollOptions?.axis == "y" ? scrollY : scrollX

  useMotionValueEvent(scrollValue, "change", (scroll) => {
    const prev = scrollValue.getPrevious() ?? 0;
    if (scroll >= prev && dir !== 1) {
      setdir(1);
    } else if (scroll < prev && dir !== -1) {
      setdir(-1);
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setdir(0);
    }, onHoldDelay * 1000);
  });

  return dir
}