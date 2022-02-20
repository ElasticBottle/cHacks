import { Image } from "@mantine/core";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { useQuery } from "urql";
import { leaderBoardQuery } from "../atoms/data";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";

function Leaderboard() {
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: leaderBoardQuery,
  });
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const leaders: { name: string; image: string; reputation: string }[] =
    data.calgary_hacks_user;
  return (
    <div className="p-3, flex flex-col px-4 pt-5">
      <div className=" pt-2 pb-4 text-2xl font-bold">Leaderboards</div>
      <div className="space-y-3 ">
        {leaders.map((leader, index: number) => {
          return (
            <div key={index} className="flex justify-between ">
              <div className="flex">
                <Image src={leader.image} alt="user image" width={30} />
                <div className="text-md ml-3 font-bold">{leader.name}</div>
              </div>
              <div>{leader.reputation} Pts</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
(Leaderboard as NextPageWithLayout).getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return { props: { loggedIn: true } };
  }
  return { redirect: { destination: "/", permanent: false } };
};
export default Leaderboard;
