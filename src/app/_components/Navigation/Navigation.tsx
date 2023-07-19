'use client'

import { User } from "@prisma/client"
import Link from "next/link"
import {memo} from "react"
import { MenuMemo } from "./Menu"

const Navigation = ({currentUser}:{currentUser: User | null}) => {
  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="container mx-auto flex max-w-screen-sm items-center justify-between px-1 py-5">
        <Link href="/" className="cursor-pointer text-xl font-bold">
        Prisma Auth Next App
        </Link>
        <div className="flex items-center justify-center space-x-2">
          <MenuMemo currentUser={currentUser} />
        </div>
      </div>
    </header>
  )
}

export const NavigationMemo =memo(Navigation)


