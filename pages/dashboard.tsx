import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";
import Map from "../component/map"
import { Wrapper, Status } from "@googlemaps/react-wrapper";


function Dashboard() {
  return <div className="relative w-full h-full">
    <Wrapper apiKey={"AIzaSyCCjVW2VkxkLyrc2Jp-7BxQMeO3wMDNWrQ"}>
      <Map zoom={2} center={{ lat: 10, lng: 10 }} />
    </Wrapper>
  </div>;
}

(Dashboard as NextPageWithLayout).getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return { props: { loggedIn: true } };
  }
  return { redirect: { destination: "/", permanent: false } };
};
export default Dashboard;
