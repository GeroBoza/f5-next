export type Score = {
  id: number;
  score: number;
  user_voter_id: number;
  user_voted_id: number;
  skill_id: number;
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

export type Match = {
  id: number;
  date: string;
  winner_team_goals: number;
  loser_team_goals: number;
  tie: boolean;
  winner_team: string;
  loser_team: string;
};
