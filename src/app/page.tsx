import { redirect } from "next/navigation";

export default function HomeRedirect() {
  return redirect("/admin");
}
