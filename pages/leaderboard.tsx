import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";

function Leaderboard() {
  return <div>leaderboard</div>;
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
