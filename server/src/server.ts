import express from "express";
import { PrismaClient } from "@prisma/client";
import { convertHoursStringToMinutes } from "./utils/convertStringToMinutes";
import { convertMinutesToHoursString } from "./utils/convertMinutesToHoursString";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourEnd: convertHoursStringToMinutes(body.hourEnd),
      hourStart: convertHoursStringToMinutes(body.hourStart),
      useVoiceChannel: body.useVoiceChannel,
      gameId,
    },
  });

  return res.status(201).json(ad);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      hourStart: true,
      hourEnd: true,
      yearsPlaying: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Buscar do banco de dados o id especifico
  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHoursString(ad.hourStart),
        hourEnd: convertMinutesToHoursString(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  // Buscar do banco de dados o id especifico
  return res.json(ad.discord);
});

app.listen(3333, () => console.log("Listening on port 3333"));
