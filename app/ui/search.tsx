"use client";
import { useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  });
  const query = searchParams.get("query")?.toString() || "";
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only relative">
        Search
      </label>
      <form
        className="relative w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (inputRef.current) {
            handleSearch(inputRef.current.value);
          }
        }}
      >
        <input
          ref={inputRef}
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          defaultValue={query}
        />
      </form>
      {query?.length ? (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
          onClick={() => {
            handleSearch("");
            inputRef.current?.focus();
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
        >
          Clear
        </button>
      ) : null}
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
