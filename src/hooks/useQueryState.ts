import { produce } from "immer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export function useQueryState(name: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const set = (value: string) => {
    const query = produce(params, (draft) => {
      draft[name] = value;
      return draft;
    });
    const searchQuery = new URLSearchParams(Object.entries(query));

    router.push(pathname + "?" + searchQuery);
  };
  const toggle = (value: string) => {
    if (name === "clear") return router.push(pathname);
    const query = produce(params, (draft) => {
      if (draft[name] == value) {
        delete draft[name];
      } else {
        draft[name] = value;
      }
      return draft;
    });
    const searchQuery = new URLSearchParams(Object.entries(query));

    router.push(pathname + "?" + searchQuery);
  };
  return { set, toggle } as const;
}