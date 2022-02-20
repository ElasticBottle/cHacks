import React from "react";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";

function Setting() {
  return <div>setting</div>;
}

(Setting as NextPageWithLayout).getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Setting;
