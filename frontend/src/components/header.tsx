import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router";

export default function Header() {
  return (
    <div className="pb-1 bg-gradient-to-l from-sky-300  via-white via-85% to-90% to-yellow-300 border-b-2">
      <div className="bg-background flex justify-between items-center py-2 px-4">
        <Link to="/">
          <div className="text-2xl flex items-center gap-2">
            <div>✌️ Oseille</div>
            <div className="mt-1 text-sm px-2 border rounded-full bg-gradient-to-tr from-primary/80 via-primary to-primary/80 text-primary-foreground shadow-2xl">
              Max
            </div>
          </div>
        </Link>
        <div className="flex gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <Button
              onClick={() => {
                fetch(`${import.meta.env.VITE_API_URL}/transactional/send`);
              }}
            >
              Send
            </Button>
            <OrganizationSwitcher />
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
