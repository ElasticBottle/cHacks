import React from "react";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";

function Leaderboard() {
  return <div>leaderboard</div>;
}
(Leaderboard as NextPageWithLayout).getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Leaderboard;
