import { Route, Routes } from "react-router-dom"
import "./App.css"
import { ThemeProvider } from "./components/providers/theme-provider"
import { Home } from "./pages/home"
import Error from "./pages/error"
import { SignIn, SignUp, useUser } from "@clerk/clerk-react"
import { useEffect } from "react"
import { Fetch } from "./middlewares/Axios"
import { useDispatch } from "react-redux"
import { getError, getPending, getUserInfo } from "./toolkits/user-toolkit"

const App = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    const CreateUser = async () => {
      if (isSignedIn && isLoaded && user?.unsafeMetadata?.initialized !== true) {
        try {
          await user?.update({
            unsafeMetadata: {
              initialized: true,
            },
          });
  
          const response = await Fetch.post("/user/create", {
            clerkId: user.id,
          });
  
          console.log("User synced:", response.data);
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      }
    };
    const GetMe = async () => {
      if (isSignedIn && isLoaded) {
        dispatch(getPending())
        try {
          const response = await Fetch.post("/user/me", {
              clerkId: user?.id,
          });
         dispatch(getUserInfo(response.data))
        } catch (error) {
          dispatch(getError((error)))
        } finally{
        }
      }
    };
    CreateUser();
    GetMe();
  }, [isSignedIn, isLoaded, user]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="tdp21-theme">
  
    <Routes>
  
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in/*" element={
        <section className="min-h-screen flex items-center justify-center">
          <SignIn routing="path" path="/sign-in" />
        </section>
      } />
      <Route path="/sign-up/*" element={
        <section className="min-h-screen flex items-center justify-center">
          <SignUp routing="path" path="/sign-up" />
        </section>
      } />
      <Route path="*" element={<Error/>}/>
  
    </Routes>
  </ThemeProvider>
)}

export default App