import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect, usePathname } from "next/navigation";

export default async function ProtectedRoute() {
  const path = usePathname();
  const session = await getServerSession(options);

  console.log("session", session);
  if (!session || !session.user) {
    redirect("/");
  }

  if (session && path === "/") {
    redirect("/boards");
  }
}
