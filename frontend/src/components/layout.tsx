import Header from "@/components/header";
import { Outlet } from "react-router";
import Navigation from "./navigation";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex p-4 gap-4 grow justify-stretch bg-gradient-to-b from-secondary to-background">
        <div>
          <Navigation />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
