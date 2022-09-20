// Imports

import { InputHTMLAttributes } from "react";

// Imports

interface ModalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export const ModalInput = (props: ModalInputProps) => {
  return (
    <div>
      <label className="text-white font-semibold " htmlFor={props.id}>
        {props.title}
      </label>
      <input
        className="bg-zinc-900 py-4 px-3 mt-2 w-full border-none rounded-md outline-none placeholder:text-zinc-500 text-sm"
        type={props.type || "text"}
        id={props.id}
        {...props}
      />
    </div>
  );
};
