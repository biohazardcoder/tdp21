import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPending, setUser } from "./toolkit/UserSlicer";
import { useEffect, useMemo } from "react";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Error from "./pages/Error";
import { RootState } from "./store/RootStore";
import { Fetch } from "./middlewares/Fetch";
import Admins from "./pages/Admins";
import Partners from "./pages/Partners";
import Contacts from "./pages/Contacts";

function App() {
  const { isPending, isAuth } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getMyData() {
      try {
        dispatch(setPending());
        const response = await Fetch.get("admin/me");
        if (response.data) {
          dispatch(setUser(response.data));
        } else {
          dispatch(setError("No user data available"));
        }
      } catch (error) {
        const err = error as Error;
        dispatch(setError(err.message || "Unknown error"));
        console.error(error);
      }
    }
    getMyData();
  }, [dispatch]);

  const router = useMemo(() => {
    if (isPending) {
      return createBrowserRouter([
        {
          path: "/",
          element: <Loading />,
        },
      ]);
    }
    if (isAuth) {
      return createBrowserRouter([
        {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              path: "/",
              element: <Partners/>,
              index: true,
            },
            {
              path: "/admins",
              element: <Admins />,
            },
            {
              path: "/admins",
              element: <Admins />,
            },
            {
              path:"/contacts",
              element:<Contacts/>
            },
            {
              path: "*",
              element: <Error />,
            },
          ],
        },
      ]);
    } else {
      return createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ]);
    }
  }, [isAuth, isPending]);

  return <RouterProvider router={router} />;
}

export default App;
