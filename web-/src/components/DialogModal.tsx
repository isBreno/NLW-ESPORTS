import * as Dialog from "@radix-ui/react-dialog";
import Check from "phosphor-react/src/icons/Check";
import GameController from "phosphor-react/src/icons/GameController";
import { ModalInput } from "./ModalInputs";
import * as Checkbox from "@radix-ui/react-checkbox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormEvent, useEffect, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { api } from "../services/axios";
import React from "react";

// Imports

// Imports

interface DialogButton {
  children: JSX.Element;
}

export const DialogModal = ({ children }: DialogButton) => {
  const [games, setGames] = useState<{ title: string; id: string }[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    api.get("/games").then((resp) => setGames(resp.data));
  }, []);

  async function handleCreateAd(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    await api
      .post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.nickname,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      })
      .then(() => {
        toast.success("Anúncio criado com sucesso!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((err) => {
        toast.error("Algo deu errado!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log(err);
      });

    setIsOpen(false);
  }

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        {children}
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed top-[50px] left-1/2 -translate-x-1/2 bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[98%] sm:w-[600px] shadow-black/25 shadow-lg">
            <Dialog.Title className="text-3xl font-black mb-8">
              Publique um anúncio
            </Dialog.Title>
            <form onSubmit={handleCreateAd} className="flex flex-col gap-4">
              <select
                defaultValue=""
                id="game"
                name="game"
                className="bg-zinc-900 py-4 px-3 mt-2 w-full border-none rounded-md outline-none placeholder:text-zinc-500 text-sm appearance-none"
              >
                <option disabled value="">
                  Selecione o game que deseja jogar
                </option>
                {games?.map((game) => {
                  return (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  );
                })}
              </select>
              <ModalInput
                title="Seu nome (ou nickname)"
                id="nickname"
                name="nickname"
                placeholder="Como te chamam dentro do jogo?"
              />
              <div className="flex gap-6">
                <ModalInput
                  className=" w-full min-w-[200px] bg-zinc-900 py-4 px-3 mt-2 border-none rounded-md outline-none placeholder:text-zinc-500 text-sm"
                  title="Joga há quantos anos?"
                  id="yearsPlaying"
                  placeholder="Tudo bem ser ZERO"
                  type="number"
                  min={0}
                  max={100}
                  name="yearsPlaying"
                />
                <ModalInput
                  className=" w-full bg-zinc-900 py-4 px-3 mt-2 border-none rounded-md outline-none placeholder:text-zinc-500 text-sm"
                  title="Qual seu discord?"
                  id="discord"
                  placeholder="Usuário#0000"
                  name="discord"
                />
              </div>
              <div className="flex gap-6 justify-between">
                <div>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <ToggleGroup.Root
                    type="multiple"
                    className="grid grid-cols-4 gap-2 mt-2"
                    value={weekDays}
                    onValueChange={setWeekDays}
                  >
                    <ToggleGroup.Item
                      value="0"
                      title="domingo"
                      className={`w-8 h-8 rounded-md ${
                        weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                    >
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="1"
                      title="segunda"
                      className={`w-8 h-8 rounded-md ${
                        weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="2"
                      title="terça"
                      className={`w-8 h-8 rounded-md ${
                        weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                    >
                      T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="3"
                      title="quarta"
                      className={`w-8 h-8 rounded-md ${
                        weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="4"
                      title="quinta"
                      className={`w-8 h-8 rounded-md ${
                        weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      title="sexta"
                      value="5"
                      className={`w-8 h-8 rounded-md ${
                        weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      title="sabado"
                      value="6"
                      className={`w-8 h-8 rounded-md ${
                        weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                      }`}
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </div>
                <div>
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      id="hourStart"
                      name="hourStart"
                      className="bg-zinc-900 py-4 px-3 mt-2 w-full border-none rounded-md outline-none placeholder:text-zinc-500 text-sm"
                      placeholder="De"
                    />
                    <input
                      className="timepicker bg-zinc-900 py-4 px-3 mt-2 w-full border-none rounded-md outline-none placeholder:text-zinc-500 text-sm"
                      type="time"
                      id="hourEnd"
                      name="hourEnd"
                      placeholder="Até"
                    />
                  </div>
                </div>
              </div>
              <label className="flex gap-2 mt-6 items-center">
                <Checkbox.Root
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      setUseVoiceChannel(true);
                    } else {
                      setUseVoiceChannel(false);
                    }
                  }}
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-sm">
                  Costumo me conectar ao chat de voz
                </span>
              </label>
              <footer className="ml-auto w-full flex gap-4 justify-end mt-4">
                <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 rounded-md px-5 py-3">
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 flex justify-center items-center rounded-md gap-3 px-5 py-3 hover:bg-violet-600"
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
