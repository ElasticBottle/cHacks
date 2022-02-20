import Link from "next/link";
import React from "react";
import { MdLeaderboard, MdMap, MdSettings } from "react-icons/md";
import {
  ROUTE_LEADERBOARD,
  ROUTE_MAP,
  ROUTE_SETTINGS,
} from "../../interface/routes";

const Layout = ({ children }: { children: React.ReactChild }) => {
  const iconSize = 20;
  const menuBarItems = [
    { text: "Map", icon: <MdMap size={iconSize} />, link: ROUTE_MAP },
    {
      text: "LeaderBoard",
      icon: <MdLeaderboard size={iconSize} />,
      link: ROUTE_LEADERBOARD,
    },
    {
      text: "Settings",
      icon: <MdSettings size={iconSize} />,
      link: ROUTE_SETTINGS,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-full grow">{children}</div>
      <div className="h-15 flex flex-row justify-around p-2">
        {menuBarItems.map((menuItem) => {
          return (
            <Link href={menuItem.link} key={menuItem.text}>
              <a className="flex flex-col items-center">
                {menuItem.icon}
                <div className="text-sm">{menuItem.text}</div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Layout;
