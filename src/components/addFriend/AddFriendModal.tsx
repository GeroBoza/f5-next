"use client";
import useDebounce from "@/hooks/deboucing";
import { ApiService } from "@/lib/apiService";
import { User } from "@/lib/definitions";
import { SearchIcon } from "@/lib/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  setOpenModal: (param: boolean) => void;
}

export default function AddFriendModal({ setOpenModal }: Props) {
  const [showLoader, setShowLoader] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const debouncedInputValue = useDebounce<string>(inputValue, 500);

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUsers([]);
    setShowLoader(true);
    const name = evt.target.value;
    setInputValue(name);
    if (name === "") {
      setShowLoader(false);
    }
  };

  const fetchData = async () => {
    try {
      const users = await ApiService.findUser(inputValue);
      setUsers(users);
      setShowLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (debouncedInputValue) {
      fetchData();
    }
  }, [debouncedInputValue]);

  return (
    <>
      <input type="checkbox" id="add-friend-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box" style={{ maxHeight: "650px" }}>
          <div className="grid items-center gap-3">
            <label className="input input-bordered flex w-full items-center gap-2">
              <input
                type="text"
                value={inputValue}
                className="grow"
                placeholder="Find your friends"
                onChange={handleChangeInput}
              />
              {SearchIcon}
            </label>
            <div className="grid w-full grid-rows-1 gap-2">
              {showLoader && (
                <div className="flex justify-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              )}
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user.id}>
                    <div className="flex w-full items-center gap-3 rounded-md border-2 border-solid border-gray-200 p-2">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <Image
                            width={200}
                            height={200}
                            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${user.image_path}`}
                            alt={user.username}
                          />
                        </div>
                      </div>
                      <div className="grow">
                        <div className="text-sm font-bold">
                          {user.name} ({user.username})
                        </div>
                      </div>
                      <button className="btn btn-primary self-end">
                        Add friend
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-center font-bold uppercase">
                  No users found
                </h2>
              )}
            </div>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="add-friend-modal"
          onClick={() => setOpenModal(false)}
        >
          Close
        </label>
      </div>
    </>
  );
}
