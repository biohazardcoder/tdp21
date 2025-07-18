import useSWR from "swr";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { Fetch } from "./Axios";
import { getError, getPending, getUserInfo } from "../toolkits/user-toolkit";

const useSyncUser = () => {
  const dispatch = useDispatch();
  const { user, isSignedIn, isLoaded } = useUser();

  const shouldFetch = isSignedIn && isLoaded;

  useSWR(
    shouldFetch ? "create-user" : null,
    async () => {
      if (user?.unsafeMetadata?.initialized !== true) {
        await user?.update({
          unsafeMetadata: {
            initialized: true,
          },
        });

        const response = await Fetch.post("/user/create", {
          clerkId: user?.id,
        });

        console.log("User synced:", response.data);
      }
      return true;
    },
    {
      revalidateOnFocus: false,
    }
  );

  useSWR(
    shouldFetch ? "get-me" : null,
    async () => {
      dispatch(getPending());

      const response = await Fetch.post("/user/me", {
        clerkId: user?.id,
      });

      dispatch(getUserInfo(response.data));
      return response.data;
    },
    {
      onError: (error) => dispatch(getError(error)),
      revalidateOnFocus: false,
    }
  );
};

export default useSyncUser;
