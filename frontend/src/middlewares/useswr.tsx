import useSWR from "swr";
import { useDispatch, } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { Fetch } from "./Axios";
import { getError, getPending, getUserInfo } from "../toolkits/user-toolkit";

const useSyncUser = () => {
  const dispatch = useDispatch();
  const { user, isSignedIn, isLoaded } = useUser();
  
  const shouldFetch = isSignedIn && isLoaded;

  useSWR(
    shouldFetch && user?.unsafeMetadata?.initialized !== true ? "create-user" : null,
    async () => {
      try {
        
        const response = await Fetch.post("/user/create", {
          clerkId: user?.id,
        });
        await user?.update({
          unsafeMetadata: {
            userId: response.data._id,
          },
        });
        
        return response.data;
      } catch (error) {
        console.error("User sync error:", error);
      }
    },
    {
      revalidateOnFocus: false,
    }
  );

useSWR(
  shouldFetch && user?.id ? `get-me-${user.id}` : null,
  async () => {
    dispatch(getPending());
    const response = await Fetch.get(`/user/getme/${user?.id}`);
    dispatch(getUserInfo(response.data));
    return response.data;
  },
  {
    onError: (error) => {
      dispatch(getError(error?.response?.data?.message || "Xatolik"));
    },
    revalidateOnFocus: false,
  }
);

};

export default useSyncUser;
