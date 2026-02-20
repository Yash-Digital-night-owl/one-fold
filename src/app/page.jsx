import { redirect } from "next/navigation";

export default function Page() {
  // Redirect users to the privacy policy
  redirect("/privacy-policy");
}