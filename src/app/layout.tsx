import "./globals.css";
import { Inter } from "next/font/google";
import {
  Navigation,
  SignUpModal,
  LoginModal,
  ProfileModal,
} from "@/app/_components";
import getCurrentUser from "@/app/_action/getCurrentUser";
import { AuthContext, ToasterContext } from "@/app/_context";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prisma Auth",
  description: "Prisma Auth",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html>
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <SignUpModal />
          <LoginModal />
          <ProfileModal currentUser={currentUser} />
          <div>
            <div className="flex min-h-screen flex-col">
              <Navigation currentUser={currentUser} />

              <main className="container mx-auto max-w-screen-sm flex-1 px-1 py-5">
                {children}
              </main>

              <footer className="py-5">
                <div className="text-center text-sm">
                  Copyright © All rights reserved | Prisma Auth
                </div>
              </footer>
            </div>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
