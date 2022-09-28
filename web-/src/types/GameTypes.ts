export interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export interface GameAdProps {
  game: GameProps;
  children: React.ReactNode;
}

export interface AdProps {
  id: string;
  name: string;
  weekDays: number[];
  useVoiceChannel: boolean;
  hourStart: string;
  hourEnd: string;
  yearsPlaying: number;
  discord: string;
}
