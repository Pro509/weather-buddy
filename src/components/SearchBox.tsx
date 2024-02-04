import { cn } from "@/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form
      action=""
      onSubmit={props.onSubmit}
      className={cn("flex relative items-center justify-center h-10", props.className)}
    >
      <input
        type="text"
        placeholder="Search location"
        value={props.value}
        onChange={props.onChange}
        className="px-4 py-2 w-[230px] border border-gray-400 rounded-l-md focus:outline-none
                focus:border-blue-700 h-full"
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-800 h-full">
        <IoSearch />
      </button>
    </form>
  );
}
