import { Button, Image } from "@mantine/core";
import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "urql";
import { userQuery } from "../atoms/data";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";

function Setting() {
  const { data: session } = useSession();
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: userQuery,
    variables: { email: session?.user?.email },
    pause: !session || !session.user,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-5 pt-9">
      <Image
        src={session?.user?.image || ""}
        alt="user image"
        width={300}
        className="rounded-lg"
      />
      <div className="text-2xl font-bold">{session?.user?.name}</div>
      <div className="text-xl font-bold">
        {data.calgary_hacks_user[0].reputation} Points
      </div>
      <Button
        variant="outline"
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    </div>
  );
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
