// Imports

import GameController from "phosphor-react/src/icons/GameController";
import { toast } from "react-toastify";
import React from "react";
import { AdProps } from "../types/GameTypes";

// Imports

export const AnnounceBox = ({ ad }: { ad: AdProps }) => {
  function handleCopyDiscord() {
    navigator.clipboard.writeText(ad.discord);
    toast.success("Discord copiado com sucesso!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div className="bg-[#39324677] p-6 rounded-md">
      <div className="">
        <h1 className="text-[#C4C4C6] text-sm block">Nome</h1>
        <span className="text-white font-bold">{ad.name}</span>
      </div>
      <div className="my-3">
        <h1 className="text-[#C4C4C6] text-sm block">Tempo de Jogo</h1>
        <span className="text-white font-bold">{ad.yearsPlaying} anos</span>
      </div>
      <div className="my-3">
        <h1 className="text-[#C4C4C6] text-sm block">Disponibilidade</h1>
        <span className="text-white font-bold flex items-center gap-2">
          3 dias{" "}
          <svg
            width="4"
            height="5"
            viewBox="0 0 4 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.5" width="4" height="4" rx="2" fill="#71717A" />
          </svg>
          {ad.hourStart.slice(0, 2)}h - {ad.hourEnd.slice(0, 2)}h
        </span>
      </div>
      <div className="my-3">
        <h1 className="text-[#C4C4C6] text-sm block">Chamada de áudio?</h1>
        {ad.useVoiceChannel ? (
          <span className="text-emerald-500">Sim</span>
        ) : (
          <span className="text-red-600">Não</span>
        )}
      </div>
      <button
        type="button"
        onClick={handleCopyDiscord}
        className="bg-violet-500 flex justify-center items-center rounded-md gap-3 px-5 py-3 hover:bg-violet-600"
      >
        <GameController size={24} />
        Conectar
      </button>
    </div>
  );
};
