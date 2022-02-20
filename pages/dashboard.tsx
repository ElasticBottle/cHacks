import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";
import Map from "../component/map"
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useQuery } from "urql";
import { userQuery } from "../atoms/data";

/*
const Todos = () => {
  const [result, reexecuteQuery] = useQuery({
    query: userQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) console.log('Loading...</p>');
  if (error) return console.log('Error');

  return (
    <ul>
      {data.calgary_hacks_location.map(people => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};*/
function getMyLocation() {
  const location = window.navigator && window.navigator.geolocation
  if (location) {
    location.getCurrentPosition((position) => {
      console.log(position);
    }, (error) => {
      console.log('loc error');
    })
  }

}

function Dashboard() {
  useEffect(() => {
    getMyLocation();
  }, [])

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
