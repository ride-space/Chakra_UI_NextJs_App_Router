"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import { memo, useCallback, useState } from "react";
import { useLoginModal, useSignUpModal, useProfileModal } from "@/app/_hooks";
import { signOut } from "next-auth/react";
import { MenuItemMemo } from "./MenuItem";

const Menu = ({ currentUser }: { currentUser: User | null }) => {
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
      <button className="relative h-10 w-10" onClick={toggleOpen}>
        <Image
          src={currentUser?.image || "/default.png"}
          alt="avatar"
          width={240}
          height={240}
          className="round-full object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-40 overflow-hidden rounded-lg bg-white text-sm shadow-lg shadow-gray-100">
          {currentUser ? (
            <>
              <MenuItemMemo
                label="プロフィール"
                onClick={(e) => {
                  e.preventDefault();
                  profileModal.onOpen();
                  setIsOpen(false);
                }}
              />
              <MenuItemMemo
                label="ログアウト"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                  setIsOpen(false);
                }}
              />
            </>
          ) : (
            <>
              <MenuItemMemo
                label="ログイン"
                onClick={(e) => {
                  e.preventDefault();
                  loginModal.onOpen();
                  setIsOpen(false);
                }}
              />
              <MenuItemMemo
                label="サインアップ"
                onClick={(e) => {
                  e.preventDefault();
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

export const MenuMemo = memo(Menu);
