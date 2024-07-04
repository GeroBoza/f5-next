"use client";
import { ApiService } from "@/lib/apiService";
import PieChart from "../chart/pieChart/PieChart";
import SpiderChart from "../chart/spiderWebChart/SpiderChart";
import "./style.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/lib/definitions";
import Image from "next/image";

interface Props {
  user: User;
  setOpenPlayerDataModal: Dispatch<SetStateAction<boolean>>;
}

const PlayerDataModal = ({ user, setOpenPlayerDataModal }: Props) => {
  const { data: session, status } = useSession();
  const [averages, setAverages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        const avg = await ApiService.getUserSkillsAverage(
          user.id,
          session.user.token,
        );
        const modifiedKeys = avg.map((element: Record<string, any>) => {
          return { name: element.skill, y: element.average };
        });

        setAverages(modifiedKeys);
      }
    };
    fetchData();
  }, [session, status]);

  return (
    <>
      <input type="checkbox" id="player-data-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="flex items-center gap-3">
            <div className="avatar btn btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${user.image_path}`}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <h1 className="font-bold">{user.name}</h1>
          </div>

          <SpiderChart data={averages}></SpiderChart>
          <div className="flex w-full flex-col gap-2 p-3"></div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="player-data-modal"
          onClick={() => setOpenPlayerDataModal(false)}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default PlayerDataModal;
