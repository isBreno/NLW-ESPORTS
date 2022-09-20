// Imports
import * as Dialog from "@radix-ui/react-dialog";
import { ButtonHTMLAttributes, MouseEvent, useContext, useState } from "react";
// Imports

interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

interface GameBannerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  game: GameProps;
}

export const GameBanner = (props: GameBannerProps) => {
  return (
    <>
      <Dialog.Trigger
        className="relative rounded-lg overflow-hidden"
        {...props}
      >
        <img src={props.game.bannerUrl} alt="Game 1" />

        <div className="w-full pt-16 pb-4 px-4 bg-game_shadow_gradient absolute bottom-0 text-left">
          <strong className="font-bold text-white block">
            {props.game.title}
          </strong>
          <span className="text-zinc-300 text-sm">
            {props.game._count.ads} anúncios
          </span>
        </div>
      </Dialog.Trigger>
    </>
  );
};
