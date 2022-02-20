import { Button } from "@mantine/core";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { ROUTE_MAP } from "../interface/routes";

const Home = ({ loggedIn }: { loggedIn: boolean }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="text-4xl font-bold">Gun Game but it is fitness</div>
      <Button
        className="mt-4"
        onClick={() => {
          if (loggedIn) {
            window.location.href = ROUTE_MAP;
          }
          signIn();
        }}
        variant="outline"
      >
        {loggedIn ? "Go to challenges" : "Get started"}
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return { props: { loggedIn: true } };
  }
  return { props: { loggedIn: false } };
};
export default Home;
