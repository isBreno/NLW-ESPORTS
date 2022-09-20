// Imports
import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";
import { PublishButton } from "./PublishAnnounce";

// Imports

export const CreateAdBanner = () => {
  return (
    <>
      <div className="pt-1 bg-nlw_gradient self-stretch rounded-lg mt-8 overflow-hidden">
        <div className="bg-[#2A2634] px-8 py-6 rounded-lg flex justify-between">
          <div>
            <strong className="text-white font-black text-2xl block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400 block">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>
          <PublishButton />
        </div>
      </div>
    </>
  );
};
