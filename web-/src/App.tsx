import "./styles/main.css";
import logoImage from "./assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import axios from "axios";
import { useEffect, useState } from "react";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { DialogModal } from "./components/DialogModal";
import { FindDuoModal } from "./components/FindDuoModal";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Code } from "phosphor-react";

interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<GameProps[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameProps>({
    id: "",
    _count: { ads: 0 },
    bannerUrl: "",
    title: "",
  });

  const [sliderRef, instanceRef] = useKeenSlider(
    {
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
      mode: "free",
      slides: { origin: "center", perView: 5.5, spacing: 10 },
      // range: {
      //     min: 1,
      //     max: 100,
      //     align: true,
      // },
    },
    [
      // add plugins here
    ]
  );

  useEffect(() => {
    axios
      .get("http://localhost:3333/games")
      .then((resp) => setGames(resp.data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col ">
      <img src={logoImage} className="mt-20" />

      <h1 className="sm:text-6xl text-4xl text-white font-black mt-20 clam">
        Seu{" "}
        <span className="bg-nlw_gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div ref={sliderRef} className="keen-slider mt-16">
        <FindDuoModal game={selectedGame}>
          {games?.map((game) => (
            <div className="keen-slider__slide">
              <GameBanner
                game={game}
                key={game.id}
                onClick={() => setSelectedGame(game)}
              />
            </div>
          ))}
        </FindDuoModal>
      </div>

      <DialogModal>
        <CreateAdBanner />
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
  );
}

export default App;
