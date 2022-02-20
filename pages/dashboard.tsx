import { Wrapper } from "@googlemaps/react-wrapper";
import { Button } from "@mantine/core";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { userMutation, userQuery } from "../atoms/data";
import Map from "../component/map";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";
import { Switch } from '@mantine/core';


function Dashboard() {
  const { data: session } = useSession();
  const [lati, setlati] = useState(0);
  const [long, setlong] = useState(0);
  const [mutationResult, updateUser] = useMutation(userMutation);
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: userQuery,
    variables: { email: session?.user?.email || "" },
    pause: !session || !session.user?.email,
    requestPolicy: "network-only",
  });

  useEffect(() => {
    if (
      !fetching &&
      !error &&
      !data?.calgary_hacks_user?.length &&
      session?.user?.email
    ) {
      updateUser({
        objects: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          image: session?.user?.image || "",
        },
      });
      reexecuteQuery();
    }
  }, [
    data?.calgary_hacks_user?.length,
    error,
    fetching,
    reexecuteQuery,
    session?.user?.email,
    session?.user?.image,
    session?.user?.name,
    updateUser,
  ]);

  useEffect(() => {
    const location = window.navigator && window.navigator.geolocation;
    console.log(1);
    if (location) {
      location.getCurrentPosition(
        (position) => {
          setlati(position.coords.latitude);
          setlong(position.coords.longitude);
          return position;
        },
        (error) => {
          console.log("loc error");
        }
      );
    }
  }, []);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div className="relative h-full w-full">
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}>
        <Map zoom={2} center={{ lat: lati, lng: long }} />
      </Wrapper>
      <Switch
        label="I agree to sell my privacy"
      />
    </div >
  );
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
