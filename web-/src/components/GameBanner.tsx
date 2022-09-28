// Imports
import * as Dialog from "@radix-ui/react-dialog";
import { ButtonHTMLAttributes } from "react";
import React from "react";
import { GameProps } from "../types/GameTypes";

// Imports

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
        <img
          src={props.game.bannerUrl}
          alt={props.game.title}
          width={285}
          height={300}
        />

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
