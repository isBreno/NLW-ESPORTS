import logoImage from "./assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import { useEffect, useState } from "react";
import { CreateAnnounceBanner } from "./components/CreateAnnounceBanner";
import { DialogModal } from "./components/DialogModal";
import { FindDuoModal } from "./components/FindDuoModal";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Code from "phosphor-react/src/icons/Code";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import { api } from "./services/axios";
import React from "react";
import { GameProps } from "./types/GameTypes";

function App() {
  const [games, setGames] = useState<GameProps[] | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameProps>({
    id: "",
    _count: { ads: 0 },
    bannerUrl: "",
    title: "",
  });
  const sliderOptions = {
    loop: true,
    breakpoints: {
      "(min-width: 200px)": {
        slides: { perView: 2.2, spacing: 5 },
      },
      "(min-width: 400px)": {
        slides: { perView: 2.5, spacing: 5 },
      },
      "(min-width: 600px)": {
        slides: { perView: 3.5, spacing: 5 },
      },
      "(min-width: 800px)": {
        slides: { perView: 4.5, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 5.5, spacing: 10 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 6.5, spacing: 10 },
      },
    },
  };
  const [sliderRef, internalSlider] = useKeenSlider(sliderOptions);

  useEffect(() => {
    api.get("/games").then((resp) => setGames(resp.data));
  }, []);

  useEffect(() => {
    internalSlider.current?.update({
      ...sliderOptions,
    });
  }, [sliderRef, sliderOptions]);

  return (
    <>
      <div className="absolute right-10 ">
        <ToastContainer />
      </div>
      <div className="max-w-[1344px] mx-auto flex items-center flex-col ">
        <img
          src={logoImage}
          alt="NLW ESPORTS"
          height={200}
          width={264}
          className="mt-20"
        />
        <h1 className="sm:text-6xl text-4xl text-white font-black mt-20 clam">
          Seu{" "}
          <span className="bg-nlw_gradient bg-clip-text text-transparent">
            duo
          </span>{" "}
          está aqui.
        </h1>
        {games ? (
          <div
            ref={sliderRef}
            className="md:keen-slider sm:keen-slider lg:keen-slider keen-slider mt-16 transition-all"
          >
            <FindDuoModal game={selectedGame}>
              {games?.map((game) => (
                <div className="keen-slider__slide" key={game.id}>
                  <GameBanner
                    game={game}
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                  />
                </div>
              ))}
            </FindDuoModal>
          </div>
        ) : (
          <Skeleton
            width={180}
            height={264}
            count={7}
            containerClassName="flex justify-between mt-16 w-full rounded-lg"
          />
        )}
        <DialogModal>
          <CreateAnnounceBanner />
        </DialogModal>
        <a
          href="/https://github.com/isBreno/NLW-ESPORTS"
          target={"__blank"}
          className="text-white flex items-center gap-3 fixed top-0 text-right opacity-10"
        >
          <Code />
          Link repositório
        </a>
      </div>
    </>
  );
}

export default App;
