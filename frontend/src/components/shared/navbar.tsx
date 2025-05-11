import { useTranslation } from "react-i18next"
import { LangChanger } from "./lang-changer"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import {   useUser } from "@clerk/clerk-react"
import { Menu } from "./menu"
import { Logo } from "./logo"
import Loader from "../ui/loader"
import { Box } from "lucide-react"

export const Navbar = ({LoadPage } : {LoadPage :boolean}) => {
  const {t} = useTranslation()
  const {  isSignedIn, isLoaded } = useUser();
  

  return (
    <nav className="bg-accent py-2 px-3 h-[10vh] flex items-center justify-between">
      <Logo/>
      <div className="flex items-center justify-center gap-2">
        <ModeToggle />
        {isLoaded && !isSignedIn && <LangChanger/> }
        {!isLoaded && (
          <div>
            <Loader/>
          </div>
        )}
       {
        !isSignedIn && isLoaded && (
          <div className="flex items-center gap-2">
             <Link to={"/sign-in"}>
        <Button variant="outline" className="md:block hidden">
          {t("login")}
        </Button>

        <Button variant="default" className="black md:hidden">
        {t("login")}
        </Button>
        </Link>
        <Link to={"/sign-up"} className="hidden md:block">
        <Button variant="default">
        {t("register")}
        </Button>
        </Link>
          </div>
        )
       }
       {
        isSignedIn && isLoaded && (
          <div className="flex items-center gap-2">
         {
          LoadPage && (
           <Link to={"/loads"}>
            <Button variant="default">
              <Box size={16}/>
              {t("loads")}
            </Button>
        </Link>)
         }
        <Menu/>
          </div>
        )
       }
      </div>
    </nav>
  )
}
