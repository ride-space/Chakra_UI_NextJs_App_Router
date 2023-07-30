"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { memo, useCallback, useState } from "react";
import { useLoginModal, useSignUpModal, useProfileModal } from "@/app/_hooks";
import { signOut } from "next-auth/react";
import { MenuItem } from "./MenuItem";
import Link from "next/link";

export const Menu = ({ currentUser }: { currentUser: User | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const loginModal = useLoginModal();
  const signUpModal = useSignUpModal();
  const profileModal = useProfileModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => {
      return !value;
    });
  }, []);
  return (
    <div className="relative">
      <div className="relative h-10 w-10" onClick={toggleOpen}>
        <Image
          src={currentUser?.image || "/default.png"}
          alt="avatar"
          width={240}
          height={240}
          className="round-full object-cover"
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-40 overflow-hidden rounded-lg bg-white text-sm shadow-lg shadow-gray-100">
          {currentUser ? (
            <>
              <MenuItem
                label="プロフィール"
                onClick={() => {
                  profileModal.onOpen();
                  setIsOpen(false);
                }}
              />
              <Link href="/post/create"
              onClick={()=> {
                setIsOpen(false);
              }}
              className="px-4 py-3 text-center font-bold transition hover:bg-neutral-100 block"
              >
                新規投稿
              </Link>
              <MenuItem
                label="ログアウト"
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
              />
            </>
          ) : (
            <>
              <MenuItem
                label="ログイン"
                onClick={() => {
                  loginModal.onOpen();
                  setIsOpen(false);
                }}
              />
              <MenuItem
                label="サインアップ"
                onClick={() => {
                  signUpModal.onOpen();
                  setIsOpen(false);
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
