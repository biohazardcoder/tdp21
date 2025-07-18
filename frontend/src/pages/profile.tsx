import { SignOutButton, useUser } from "@clerk/clerk-react"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../components/ui/loader"
import { Separator } from "../components/ui/separator"
import { Button } from "../components/ui/button"
import { CheckCheck, Home, Image, LogOut, Pencil, PencilOff, } from "lucide-react"
import React, { useState,  } from "react"
import { useTranslation } from 'react-i18next'
import { toast } from "sonner"
import { Input } from "../components/ui/input"
import { Navbar } from "../components/shared/navbar"

export const Profile = () => {
  const {t} = useTranslation()
  const { isLoaded, isSignedIn, user } = useUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [firstNameLoading, setFirstNameLoading] = useState(false)
  const [editName, setEditName] = useState(false)
  const [lastName, setLastName] = useState('')
  const [lastNameLoading, setLastNameLoading] = useState(false)
  const [editLastName, setEditLastName] = useState(false)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setLoading(true)
      await user?.setProfileImage({ file }) 
      toast.success("Profil rasmi muvaffaqiyatli yangilandi!")
    } catch (err) {
      console.error("Rasm yuklashda xatolik:", err)
      toast.error("Rasmni yuklashda xatolik yuz berdi.")
    } finally {
      setLoading(false)
    }
  }

  const handleChangeFirstName = async () => {
    if (!firstName.trim()) return toast.warning("Ism bo'sh bo'lishi mumkin emas")
    try {
      setFirstNameLoading(true)
      await user?.update({
        firstName,
        lastName: user?.lastName || ""
      })
      setFirstName("")
      setEditName(false)
      toast.success("Ism muvaffaqiyatli yangilandi!")
    } catch (error) {
      console.error("Ismni yangilashda xatolik:", error)
      toast.error("Ismni yangilashda muammo yuz berdi.")
    } finally {
      setFirstNameLoading(false)
    }
  }

  const handleChangeLastName = async () => {
    if (!lastName.trim()) return toast.warning("Familiya bo'sh bo'lishi mumkin emas")
    try {
      setLastNameLoading(true)
      await user?.update({
        lastName,
        firstName: user?.firstName || ""
      })
      setLastName("")
      setEditLastName(false)
      toast.success("Familiya muvaffaqiyatli yangilandi!")
    } catch (error) {
      console.error("Familiyani yangilashda xatolik:", error)
      toast.error("Familiyani yangilashda muammo yuz berdi.")
    } finally {
      setLastNameLoading(false)
    }
  }



  if (!isLoaded) {
    return (
      <div>
        <Navbar LoadPage={false} />
        <div className="flex items-center justify-center h-[90vh]">
          <Loader />
        </div>
      </div>
    )
  }

  if (isLoaded && !isSignedIn) {
    navigate("/sign-in")
  }

  return (
    <div>
      <Navbar  LoadPage={false}/>
      <div className="h-[86vh] p-4">
        <div className="mt-2 flex items-center gap-2 text-sm">
          <h1>{t("Firstname")}:</h1>
          {
            firstNameLoading ? <div><Loader /> </div> : <div className="flex items-center gap-4">
              {!editName && <h1>{user?.firstName}</h1>}
              <div>
                {editName ? <div className="flex items-center gap-2">
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
                  <Button onClick={handleChangeFirstName}><CheckCheck /></Button>
                  <Button onClick={() => setEditName(false)} variant={'destructive'}><PencilOff /></Button>
                </div> :
                  <Button variant={"outline"} onClick={() => setEditName(true)}><Pencil /> Tahrirlash</Button>
                }
              </div>
            </div>
          }
        </div>
        <Separator className="mt-2" />
        <div className="mt-2 flex items-center gap-2 text-sm">
          <h1>Familiya:</h1>
          {
            lastNameLoading ? <div><Loader /> </div> : <div className="flex items-center gap-4">
              {!editLastName && <h1>{user?.lastName}</h1>}
              <div>
                {editLastName ? <div className="flex items-center gap-2">
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
                  <Button onClick={handleChangeLastName}><CheckCheck /></Button>
                  <Button onClick={() => setEditLastName(false)} variant={'destructive'}><PencilOff /></Button>
                </div> :
                  <Button variant={"outline"} onClick={() => setEditLastName(true)}><Pencil /> Tahrirlash</Button>
                }
              </div>
            </div>
          }
        </div>
        <Separator className="mt-2" />
        <div className="flex items-center gap-2 text-sm">
          <h1>{t("image")}:</h1>
          <div className="mt-2 flex items-center gap-4">
            {loading ? <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full"><Loader /></div> : <img src={user?.imageUrl} alt="logo" className="w-8 h-8 rounded-full" />}
            <div>
              <label htmlFor="profile-upload" className="cursor-pointer">
                <Button variant={"outline"} asChild>
                  <div className="flex items-center gap-2">
                    <Image />
                    Yuklash
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
        <Separator className="my-2" />

        <div className="flex items-center gap-2 text-sm">
          <h1>Tizimdan:</h1>
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="profile-upload" className="cursor-pointer">
                <SignOutButton>
                  <Button variant={"outline"}>
                    <LogOut />
                    Chiqish
                  </Button>
                </SignOutButton>
              </label>
            </div>
          </div>
        </div>
        <Separator className="my-2" />
        <Link to={"/"}>
          <Button>
            <Home />
            Bosh saxifa
          </Button>
        </Link>
      </div>
    </div>
  )
}
