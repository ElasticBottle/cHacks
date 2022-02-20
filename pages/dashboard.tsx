import React from "react";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";

function Dashboard() {
  return <div className="relative">Map goes here</div>;
}

(Dashboard as NextPageWithLayout).getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
