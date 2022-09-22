// Imports
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { ArchiveBox, X } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { api } from "../services/axios";
import { AnnounceBox } from "./AnnounceBox";
import { CreateAnnounceBanner } from "./CreateAnnounceBanner";
import { DialogModal } from "./DialogModal";
import { PublishButton } from "./PublishAnnounce";

// Imports

interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

interface GameAdProps {
  game: GameProps;
  children: React.ReactNode;
}

interface AdProps {
  id: string;
  name: string;
  weekDays: number[];
  useVoiceChannel: boolean;
  hourStart: string;
  hourEnd: string;
  yearsPlaying: number;
  discord: string;
}

export const FindDuoModal = ({ children, game }: GameAdProps) => {
  const [isOpen, setOpen] = useState(false);
  const [ads, setAds] = useState<AdProps[]>([] as AdProps[]);

  useEffect(() => {
    if (game.id) {
      api
        .get(`http://localhost:3333/games/${game.id}/ads`)
        .then((resp) => {
          setAds(resp.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isOpen]);

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setOpen}>
        {children}
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed top-[25px] left-1/2 -translate-x-1/2 bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[98%] sm:w-[600px] shadow-black/25 shadow-lg h-[480px] overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-stone-900">
            <Dialog.Title className="text-2xl font-black mb-8 flex items-center justify-between">
              {game.title}
              <Dialog.Close>
                <X />
              </Dialog.Close>
            </Dialog.Title>

            {ads.length > 0 ? (
              <div className="flex flex-col gap-12">
                {ads.map((ad) => (
                  <AnnounceBox ad={ad} key={ad.id} />
                ))}
              </div>
            ) : (
              <div className="h-[320px] flex flex-col items-center justify-around">
                <div className="flex items-center flex-col opacity-50">
                  <ArchiveBox size={84} />
                  <h1>Ainda não existem anúncios para este jogo</h1>
                  <span>Crie seu próprio!</span>
                </div>
                <div className="flex gap-4">
                  <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 rounded-md px-5 py-3">
                    Cancelar
                  </Dialog.Close>
                  <DialogModal>
                    <PublishButton />
                  </DialogModal>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
