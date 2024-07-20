"use client";

import { FootBallIcon } from "@/lib/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ApiService } from "@/lib/apiService";

export default function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [userImage, setUserImage] = useState(null);
  console.log(session);
  console.log(status);

  useEffect(() => {
    const getUserData = async () => {
      if (status === "authenticated") {
        const res = await ApiService.me(
          session.user.userId,
          session.user.token,
        );
        setUserImage(res.data.image_path);
      }
    };
    getUserData();
  }, [status, session]);

  return (
    <div className="navbar fixed z-10 bg-base-100" style={{ padding: "0% 5%" }}>
      <div className="flex-1 gap-3">
        <a href="/" className="btn btn-ghost w-24 text-xl">
          <div className="flex w-full items-center justify-center gap-1 text-[24px]">
            {FootBallIcon} F5
          </div>
        </a>
        {status === "authenticated" && (
          <>
            <button
              onClick={() => router.push("/friends")}
              className="btn bg-gray-600 text-white hover:bg-gray-500"
            >
              Friends
            </button>
            <button
              onClick={() => router.push("/teams")}
              className="btn bg-gray-600 text-white hover:bg-gray-500"
            >
              Teams
            </button>
            <button
              onClick={() => router.push("/matches")}
              className="btn bg-gray-600 text-white hover:bg-gray-500"
            >
              Matches
            </button>
          </>
        )}
      </div>
      <div className="flex-none gap-2">
        {status === "authenticated" ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${userImage}`}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              {/* <li>
                <a>Add friends</a>
              </li> */}
              <li>
                <a onClick={() => signOut()}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="btn bg-gray-600 text-white hover:bg-gray-500"
            onClick={() => router.push("/auth/login")}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
}
