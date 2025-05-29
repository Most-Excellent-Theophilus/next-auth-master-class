// import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins, Ubuntu } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const font_ubuntu = Ubuntu({
  weight: ["300"],
  subsets: ["latin"],
});
export default function Home() {
  return (
    <main
      className={
        `${font_ubuntu.className} flex h-full flex-col items-center justify-center bg-sky-400`
      }
    >
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white  drop-shadow-md",
            font.className
          )}
        >
          🔐Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div className="justify-center items-center">
          <LoginButton>
            <Button variant={"secondary"} size={"lg"}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
