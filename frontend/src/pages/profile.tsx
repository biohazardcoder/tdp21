import {  SignOutButton, useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import Loader from "../components/ui/loader"
import { Separator } from "../components/ui/separator"
import { Button } from "../components/ui/button"
import {  CheckCheck, Image,     LogOut,     Pencil, PencilOff, } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import { Input } from "../components/ui/input"
import { Menu } from "../components/shared/menu"
import { ModeToggle } from "../components/shared/mode-toggle"
import { useTranslation } from "react-i18next"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog"
import { SidebarTrigger } from "../components/ui/sidebar"

export const Profile = () => {
  const {t} = useTranslation()
  const {isLoaded,isSignedIn,user} = useUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [firstNameLoading, setFirstNameLoading] = useState(false)
  const [editName, setEditName ] = useState(false)
  const [lastName, setLastName] = useState('')
  const [lastNameLoading, setLastNameLoading] = useState(false)
  const [editLastName, setEditLastName ] = useState(false)
  
  
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    setLoading(true)
    await user?.setProfileImage({ file })
    toast.success("Profile image updated!")
  } catch (err) {
    console.error("Error uploading image:", err)
    toast.error("Failed to upload image.")
  } finally {
    setLoading(false)
  }
}

const handleChangeFirstName = async () => {
  if (!firstName.trim()) return toast.warning("First name can't be empty")
    try {
      setFirstNameLoading(true)
      await user?.update({ firstName })
      setFirstName("")
      setEditName(false)
      toast.success("First name updated!")
    } catch (error) {
      console.error("Error updating first name:", error)
      toast.error("Failed to update name.")
    } finally {
      setFirstNameLoading(false)
    }
}

const handleChangeLastName = async () => {
    if (!lastName.trim()) return toast.warning("First name can't be empty")

    try {
      setLastNameLoading(true)
      await user?.update({ lastName })
      setLastName("")
      setEditLastName(false)
      toast.success("First name updated!")
    } catch (error) {
      console.error("Error updating first name:", error)
      toast.error("Failed to update name.")
    } finally {
      setLastNameLoading(false)
    }
  }

const handleDelete = async () => {
    try {
      await user?.delete();
      toast.success("Hisob o‘chirildi.");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      toast.error("Hisobni o‘chirishda xatolik yuz berdi.");
    }
  };
  
  if(!isLoaded){
    return(
       <div className="w-screen lg:w-[83vw] flex items-center justify-center h-[90vh]">
          <Loader/>
        </div>
    )
  }

  if(isLoaded && !isSignedIn){
    navigate("/sign-in")
  }

  return (
    <div className="">

     <div className="flex items-center justify-between bg-secondary p-2">
      <h1 className="font-semibold text-xl">Account</h1> 
      <div className="flex items-center gap-2">
      <ModeToggle/>
      <Menu/>
      </div>
     </div>
      <SidebarTrigger />
      <div className="p-2">
            <div className="mt-2 flex items-center gap-2 text-sm">
        <h1>Firstname:</h1>
          {
            firstNameLoading ? <div><Loader/> </div> : <div className="flex items-center gap-4">
              {!editName &&   <h1>{user?.firstName}</h1>}
          <div>
            {editName ? <div className="flex items-center gap-2">
              <Input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFirstName(e.target.value)}/> 
              <Button   onClick={handleChangeFirstName}><CheckCheck/></Button> 
              <Button  onClick={()=>setEditName(false)} variant={'destructive'}><PencilOff/></Button> 
              </div>: 
              <Button variant={"outline"} onClick={()=>setEditName(true)}><Pencil/> {t("edit")}</Button>
            }
          </div>
          </div>
          }
        </div>
      <Separator className="mt-2"/>
       <div className="mt-2 flex items-center gap-2 text-sm">
        <h1>Lastname:</h1>
          {
            lastNameLoading ? <div><Loader/> </div> : <div className="flex items-center gap-4">
              {!editLastName &&   <h1>{user?.lastName}</h1>}
          <div>
            {editLastName ? <div className="flex items-center gap-2">
              <Input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLastName(e.target.value)}/> 
              <Button  onClick={handleChangeLastName}><CheckCheck/></Button> 
              <Button onClick={()=>setEditLastName(false)} variant={'destructive'}><PencilOff/></Button> 
              </div>: 
              <Button  variant={"outline"} onClick={()=>setEditLastName(true)}><Pencil/> {t("edit")}</Button>
            }
          </div>
          </div>
          }
        </div>
      <Separator className="mt-2"/>
      <div className="flex items-center gap-2 text-sm">
          <h1>{t("image")}:</h1>
          <div className="mt-2 flex items-center gap-4">
          {loading ? <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full"><Loader/></div> : <img src={user?.imageUrl} alt="logo" className="w-8 h-8 rounded-full" />}
        <div>
         <label htmlFor="profile-upload" className="cursor-pointer">
        <Button variant={"outline"} asChild>
          <div className="flex items-center gap-2">
            <Image/>
            {t("upload")}
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={loading}
              className="hidden"
            />
          </div>
        </Button>
      </label>
        </div>

        </div>
      </div>
      <Separator className="mt-2"/>
      <div className="text-sm flex items-center gap-2">
        <h1>Danger zone:</h1>
         <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>
            Delete account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle >Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      </div>
      <Separator className="my-2"/>

         <SignOutButton>
           <Button>
            <LogOut/>
            {t("logout")}
          </Button>
         </SignOutButton>
      </div>
    </div>
  )
}
