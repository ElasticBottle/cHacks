import { Wrapper } from "@googlemaps/react-wrapper";
import { Modal } from "@mantine/core";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "urql";
import {
  locationMutation,
  locationQuery,
  promptQuery,
  updateUserActiveQuery,
  updateUserRepMutation,
  userChallengeQuery,
  userMutation,
  userQuery,
} from "../atoms/data";
import Map from "../component/map";
import Layout from "../components/layout/Layout";
import { NextPageWithLayout } from "../interface/next";

function Dashboard() {
  const { data: session } = useSession();
  const [lati, setlati] = useState(0);
  const [long, setlong] = useState(0);
  const [opened, setOpened] = useState(false);
  const [activeOpen, setActiveOpen] = useState(false);
  const [mutationResult, updateUser] = useMutation(userMutation);
  const [isInChallengeResult, updateActive] = useMutation(
    updateUserActiveQuery
  );
  const [userUpdateRepResult, updateUserRep] = useMutation(
    updateUserRepMutation
  );
  const [locationMutationResult, updateLocation] =
    useMutation(locationMutation);
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: userQuery,
    variables: { email: session?.user?.email || "" },
    pause: !session || !session.user?.email,
    requestPolicy: "network-only",
  });
  const [
    { data: activeChallenge, fetching: fetchingActive, error: activeError },
    refetchActive,
  ] = useQuery({
    query: userChallengeQuery,
    variables: { uid: data?.calgary_hacks_user[0].uid },
    pause: !data?.calgary_hacks_user[0].uid,
    requestPolicy: "network-only",
  });
  const [{ data: locations }, fetchLocations] = useQuery({
    query: locationQuery,
    variables: {
      uid: data?.calgary_hacks_user[0].uid,
    },
    pause: true,
  });
  const [{ data: prompt, error: promptError }, getPrompt] = useQuery({
    query: promptQuery,
    variables: {
      prompt: data?.calgary_hacks_user[0].reputation,
    },
    pause: !data?.calgary_hacks_user[0].reputation,
    requestPolicy: "network-only",
  });
  const userLocations = useMemo(() => {
    return [...(locations?.calgary_hacks_location || [])];
  }, [locations?.calgary_hacks_location]);

  const mapCenter = useMemo(() => {
    return { lat: lati, lng: long };
  }, [lati, long]);
  const ping = async () => {
    await fetchLocations();
    await reexecuteQuery();
    await getPrompt();
    setOpened(true);
  };
  console.log("prompt", prompt);
  useEffect(() => {
    setActiveOpen(activeChallenge?.calgary_hacks_user.length > 0);
  }, [activeChallenge?.calgary_hacks_user.length]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await refetchActive();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [opened, refetchActive]);

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
    let id: number;
    if (location) {
      id = location.watchPosition(
        async (position) => {
          setlati(position.coords.latitude);
          setlong(position.coords.longitude);
          const result = await updateLocation({
            objects: {
              uid: data?.calgary_hacks_user[0].uid,
              location: `(${position.coords.longitude}, ${position.coords.latitude})`,
            },
          });
        },
        (error) => {
          console.log("loc error");
        }
      );
    }
    return () => {
      location.clearWatch(id);
    };
  }, [data?.calgary_hacks_user, updateLocation]);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div className="relative  h-full w-full">
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}>
        <Map center={mapCenter} userLocations={userLocations} />
      </Wrapper>
      <button
        className="absolute left-2 bottom-6 rounded-md bg-blue-500 px-5 py-3 text-white hover:bg-blue-600 active:bg-blue-500"
        onClick={() => {
          ping();
        }}
      >
        Start
      </button>
      {prompt && (
        <Modal
          transition={"fade"}
          centered
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
          title="Challenge"
        >
          <div className="flex flex-col space-y-3">
            <div className="text-xl font-bold">
              {prompt?.calgary_hacks_prompts[0].prompt}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 active:bg-blue-500"
                onClick={async () => {
                  const result = await updateActive({
                    uid: data?.calgary_hacks_user[0].uid,
                  });
                  setOpened(false);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </Modal>
      )}
      <Modal
        transition={"fade"}
        centered
        opened={activeOpen}
        onClose={() => {
          setActiveOpen(false);
        }}
        title="A User is doing a challenge!"
      >
        <div className="flex flex-col space-y-3">
          <div className="text-sm">
            Did you see user {activeChallenge?.calgary_hacks_user[0]?.name}{" "}
            doing the following challenge:
          </div>
          <div className="font-bold">
            {activeChallenge?.calgary_hacks_user[0]?.prompts.prompt}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="rounded-md bg-gray-500 px-5 py-2 text-white hover:bg-gray-600 active:bg-gray-500"
              onClick={async () => {
                setActiveOpen(false);
              }}
            >
              No
            </button>
            <button
              className="rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 active:bg-blue-500"
              onClick={async () => {
                const result = await updateUserRep({
                  id: activeChallenge?.calgary_hacks_user[0]?.uid,
                });
                setActiveOpen(false);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
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
