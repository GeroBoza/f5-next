"use client";

import { useState } from "react";
import AddFriendModal from "./AddFriendModal";

export default function AddFriend() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <label
        className="btn btn-primary"
        onClick={() => setOpenModal(true)}
        htmlFor="add-friend-modal"
      >
        Add friend
      </label>

      {openModal && (
        <AddFriendModal setOpenModal={setOpenModal}></AddFriendModal>
      )}
    </>
  );
}
