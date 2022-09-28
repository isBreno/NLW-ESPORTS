// Imports
import * as Dialog from "@radix-ui/react-dialog";
import MagnifyingGlassPlus from "phosphor-react/src/icons/MagnifyingGlassPlus";
import { ButtonHTMLAttributes } from "react";
import React from "react";

// Imports

export const PublishButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <>
      <Dialog.Trigger
        className="bg-violet-500 text-white rounded-md py-3 px-4 flex items-center gap-3 justify-center hover:bg-violet-600"
        {...props}
      >
        <MagnifyingGlassPlus size={24} />
        Publicar anuncio
      </Dialog.Trigger>
    </>
  );
};
