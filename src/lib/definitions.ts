export type Score = {
  score: number;
  date: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  password?: string;
  image_path: string;
  given_scores: Score[];
  recieved_scores: Score[];
};
