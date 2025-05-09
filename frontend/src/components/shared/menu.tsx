import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Separator } from "../ui/separator"
import { SignOutButton, useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import {  FileText, Headset, Heart, History, Home, LogOut, Package, PackageCheck, PackagePlus, PackageSearch, User,  Wallet } from "lucide-react"
import { useTranslation } from "react-i18next"

export const Menu = () => {
    const {user} = useUser()
      const {t} = useTranslation()
    
  return (
    <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src={user?.imageUrl} alt="User Avatar" />
              <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent >
            <div>
                <div className="flex flex-col">
                  <h1 className="font-semibold">{user?.firstName} {user?.lastName}</h1>
                  <p className="text-sm text-muted-foreground">{user?.emailAddresses[0]?.emailAddress}</p>
              </div>
            </div>
            <Separator className="my-2"/>
            <div className="space-y-1">
              <Link to={"/"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <Home/>
                  {t("home")}
                  </div>
                </Button>
              </Link>
              <Link to={"/profile"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <User/>
                  {t("profile")}
                  </div>
                </Button>
              </Link>
              <Link to={"/wishlist"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <Heart/>
                  {t("wishlist")}
                  </div>
                </Button>
              </Link>
              <Separator/>
              <Link to={"/history"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <History/>
                  {t("history")}
                  </div>
                </Button>
              </Link>
              <Link to={"/balance"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <Wallet/>
                  {t("balance")}
                  </div>
                </Button>
              </Link>
              <Separator/>
              <Link to={"/yourloads"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <Package/>
                  {t("your-loads")}
                  </div>
                </Button>
              </Link>
              <Link to={"/accepted"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <PackageCheck/>
                  {t("accepted")}
                  </div>
                </Button>
              </Link>
              <Link to={"/requests"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <PackageSearch/>
                  {t("requests")}
                  </div>
                </Button>
              </Link>
              <Link to={"/create"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <PackagePlus />
                  {t("create-load")}
                  </div>
                </Button>
              </Link>

              <Separator className="my-2"/>
              <Link to={"/contact"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <Headset/>
                  {t("contact")}
                  </div>
                </Button>
              </Link>
              <Link to={"/about"}>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <FileText/>
                  {t("about")}
                  </div>
                </Button>
              </Link>
              <Separator className="my-2"/>
              <SignOutButton>
                <Button variant="ghost" className="w-full block">
                  <div className="flex items-center gap-2">
                  <LogOut/>
                  {t("logout")}
                  </div>
                </Button>
              </SignOutButton>
            </div>
          </PopoverContent>
        </Popover>
  )
}
