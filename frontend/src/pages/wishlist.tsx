import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Eye, HeartCrack } from "lucide-react"
import Loader from "../components/ui/loader"

type SavedLoad = {
  _id: string
  title: string
  description: string
  images: string[]
}

export const Wishlist = () => {
  const { t } = useTranslation()
  const [savedLoads, setSavedLoads] = useState<SavedLoad[]>([])
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    setLoading(true)
    setTimeout(() => { 
      const loadsFromStorage = JSON.parse(localStorage.getItem("savedLoads") || "[]")
      setSavedLoads(loadsFromStorage)
      setLoading(false)
    }, 500) 
  }, [])

  const removeFromWishlist = (id: string) => {
    const updatedLoads = savedLoads.filter(load => load._id !== id)
    localStorage.setItem("savedLoads", JSON.stringify(updatedLoads))
    setSavedLoads(updatedLoads)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-[90vh]"><Loader /></div>
  }
  if (savedLoads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-2xl font-bold">{t("no-wishlist")}</h1>
        <Link to="/loads" className="mt-4">
          <Button>{t("explore-loads")}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold my-2">{t("wishlist")}</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedLoads.map((load) => (
            <div key={load._id} className="border p-4 rounded-md bg-card shadow">
              <img
                src={load.images?.[0]}
                alt={load.title}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <div className="flex items-center justify-between py-2">
                <div>
                  <h2 className="text-lg font-semibold">{load.title}</h2>
                  <p className="text-sm text-muted-foreground">{load.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/loads/${load._id}`}>
                    <Button><Eye size={16} /></Button>
                  </Link>
                  <Button onClick={() => removeFromWishlist(load._id)} variant="destructive">
                    <HeartCrack size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
