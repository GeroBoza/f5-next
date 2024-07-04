"use client";
import { ApiService } from "@/lib/apiService";
import { User } from "@/lib/definitions";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";

interface Props {
  user: User;
  setOpenModal: (param: boolean) => void;
}

interface Skill {
  id: number;
  name: string;
}

interface PlayerPunctuation {
  ataque: number;
  defensa: number;
  pase: number;
  resistencia: number;
}

export default function VotesModal({ user, setOpenModal }: Props) {
  const { data: session } = useSession();
  const [skills, setSkills] = useState([]);
  const [playerPunctuation, setPlayerPunctuation] = useState<any>();

  useEffect(() => {
    const fetchSkillsAndScores = async () => {
      const skillsData = await ApiService.getSkills();
      setSkills(skillsData);
      const scores = user.recieved_scores.filter(
        (score) => score.user_voter_id === session?.user.userId,
      );
      let previousScore = {
        ataque: 0,
        defensa: 0,
        pase: 0,
        resistencia: 0,
      };
      if (scores) {
        scores.forEach((score) => {
          const skll = skillsData.find(
            (sd: Record<string, any>) => sd.id === score.skill_id,
          );
          const key = skll.name.toLowerCase();
          previousScore = {
            ...previousScore,
            [key]: score.score,
          };
        });
      }
      setPlayerPunctuation(previousScore);
    };

    fetchSkillsAndScores();
  }, []);

  const punctuations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handlePunctuation = (
    skill: Skill,
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    switch (skill.name.toLowerCase()) {
      case "ataque":
        setPlayerPunctuation({
          ...playerPunctuation,
          ataque: parseInt(event.target.value),
        });
        break;
      case "defensa":
        setPlayerPunctuation({
          ...playerPunctuation,
          defensa: parseInt(event.target.value),
        });
        break;
      case "pase":
        setPlayerPunctuation({
          ...playerPunctuation,
          pase: parseInt(event.target.value),
        });
        break;
      case "resistencia":
        setPlayerPunctuation({
          ...playerPunctuation,
          resistencia: parseInt(event.target.value),
        });

        break;

      default:
        break;
    }
  };

  const handleSave = () => {
    console.log(playerPunctuation);
  };
  return (
    <>
      <input type="checkbox" id="vote-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          Votar al jugador: <strong>{user !== null ? user.name : ""}</strong>
          <div className="flex w-full flex-col gap-2 p-10">
            {skills.map((skill: Skill) => (
              <Fragment key={skill.id}>
                <label>{skill.name}</label>
                <select
                  className="select select-bordered mb-4 w-full"
                  aria-label={skill.name}
                  value={
                    playerPunctuation[
                      skill.name.toLowerCase() as keyof PlayerPunctuation
                    ] || 0
                  }
                  onChange={(evt) => handlePunctuation(skill, evt)}
                >
                  <option disabled value={0}>
                    {skill.name}
                  </option>
                  {punctuations.map((punctuation: number) => (
                    <option key={punctuation} value={punctuation}>
                      {punctuation}
                    </option>
                  ))}
                </select>
              </Fragment>
            ))}
            <button
              className="btn btn-primary w-56 self-center"
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="vote-modal"
          onClick={() => setOpenModal(false)}
        >
          Close
        </label>
      </div>
    </>
  );
}
