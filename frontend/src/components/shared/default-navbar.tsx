import { ModeToggle } from "./mode-toggle"
import { LangChanger } from "./lang-changer"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Logo } from "./logo"


export const DefaultNavbar = ({isLoginPage}:{isLoginPage:boolean}) => {
  return (
    <nav className="bg-accent py-2 px-3 h-[10vh] flex items-center justify-between">
      <Logo/>
        <div className="flex items-center justify-center gap-2">
        <ModeToggle />
        <LangChanger/>
        {isLoginPage ? (
           <Link to={"/sign-up"}>
           <Button variant="default">
               Register
           </Button>
       </Link>
        ):
        <Link to={"/sign-in"}>
            <Button variant="default">
                Log in
            </Button>
          </Link>
        }
        </div>
    </nav>
  )
}
