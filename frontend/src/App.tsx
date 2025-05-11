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
import { Profile } from "./pages/profile"
import { Navbar } from "./components/shared/navbar"
import { DefaultNavbar } from "./components/shared/default-navbar"
import {Create} from "./pages/create"
import Loader from "./components/ui/loader"
import { Loads } from "./pages/loads"
import { Detail } from "./pages/detail"
import { Toaster } from "sonner"
import { Wishlist } from "./pages/wishlist"
import { Balance } from "./pages/balance"
import { Requests } from "./pages/requests"
import { YourLoads } from "./pages/yourloads"
import { ProfileLayout } from "./layouts/profile-layout"
import { YourLoadDetail } from "./pages/yourloaddetail"
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
      <Toaster position="top-center"/> 
    <Routes>
  
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in/*" element={
       isLoaded ?
       <div>
          <DefaultNavbar isLoginPage={true}/>
         <section className="h-[90vh] flex items-center justify-center">
          <SignIn routing="path" path="/sign-in" />
        </section>
       </div>: <div>
        <DefaultNavbar isLoginPage={true}/>
        <section className="h-[90vh] flex items-center justify-center">
        <Loader/>
        </section>
        </div>
      } />
      <Route path="/sign-up/*" element={
        isLoaded ?
        <div>
        <DefaultNavbar isLoginPage={false}/>
        <section className="min-h-screen flex items-center justify-center">
        <SignUp routing="path" path="/sign-up" />
      </section>
      </div>: <div>
        <DefaultNavbar isLoginPage={false}/>
        <section className="h-[90vh] flex items-center justify-center">
        <Loader/>
        </section>
        </div>
      } />
      <Route path="/create" element={
        isLoaded ?
        <div>
         {isSignedIn ?  <div>
          <Navbar LoadPage={true}/>
        <section className="min-h-screen flex items-center justify-center">
          <Create/>
        </section>
         </div>:
          <div><Error/></div>
         }
          </div>: <div>
          <Navbar  LoadPage={true}/>
          <section className="h-[90vh] flex items-center justify-center">
          <Loader/>
          </section>
          </div>
      }/>
      <Route path="*" element={<Error/>}/>
      <Route path="/loads" element={
        <div>
          <Navbar LoadPage={false}/>
          <Loads/>
        </div>
      }/>
      <Route path="/loads/:id" element={
        <div>
          <Navbar LoadPage={true}/>
          <Detail/>
        </div>
      }/>

      <Route path="/wishlist" element={
        <div>
          <Navbar LoadPage={true}/>
          <Wishlist/>
        </div>
      }/>

      <Route path="/balance" element={
        <div>
        <Navbar LoadPage={true}/>
        <Balance/>
      </div>
      }/>
      
    <Route path="/yourloads" element={
        <div>
        <Navbar LoadPage={true}/>
        <YourLoads/>
      </div>
      }/>

    <Route path="/requests" element={
        <div>
        <Navbar LoadPage={true}/>
        <Requests/>
      </div>
    }/>

    <Route path="/profile" element={
      <ProfileLayout>
          <Profile/>
      </ProfileLayout>
    }/>
    <Route path="/yourload/:id" element={
      <div>
        <Navbar LoadPage={false}/>
        <YourLoadDetail/>
      </div>
    }/>
    </Routes>
  </ThemeProvider>
)}

export default App