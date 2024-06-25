"use client";
import { useAuth } from "@/hooks/user";
import { FootBallIcon } from "@/lib/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const { token, logout } = useAuth();
  return (
    <div className="navbar fixed z-10 bg-base-100" style={{ padding: "0% 5%" }}>
      <div className="flex-1 gap-3">
        <a href="/" className="btn btn-ghost w-24 text-xl">
          <div className="flex w-full items-center justify-center gap-1 text-[24px]">
            {FootBallIcon} F5
          </div>
        </a>
        {token !== null && (
          <>
            <button className="btn bg-gray-600 text-white hover:bg-gray-500">
              Teams
            </button>
            <button className="btn bg-gray-600 text-white hover:bg-gray-500">
              Matches
            </button>
          </>
        )}
      </div>
      <div className="flex-none gap-2">
        {token !== null ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src={"/profile-image.jpg"}
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
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={() => logout()}>Logout</a>
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
