import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "urql";
import { userQuery } from "../atoms/data";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";

function Setting() {
  const { data: session } = useSession();
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: userQuery,
  });
  console.log("data", data);
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return <div>setting</div>;
}

(Setting as NextPageWithLayout).getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return { props: { loggedIn: true } };
  }
  return { redirect: { destination: "/", permanent: false } };
};
export default Setting;
