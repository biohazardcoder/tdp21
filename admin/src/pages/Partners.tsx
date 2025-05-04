import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet } from "@/components/ui/sheet"
import { Fetch } from "@/middlewares/Fetch"
import { AddPartner } from "@/modules/AddPartner"
import { PartnerTypes } from "@/types/RootTypes"
import { EllipsisVertical, Trash } from "lucide-react"
import { useEffect, useState } from "react"

const Partners = () => {
  const [partners, setPartners] = useState<PartnerTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true)
      try {
        const response = await (await Fetch.get("partner")).data
        setPartners(response)
        
     } catch (error) {
        const err = error as Error;
        setError(err.message || "Unknown error");
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    fetchPartners()
  }
, [])

 const handleDeletePartner = async (id: string) => {
    try {
      (await Fetch.delete(`partner/${id}`)).data;
      setPartners(partners.filter((partner) => partner._id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-sky-400">Loading...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    )
  }
  

  return (
    <div className="p-4 h-screen overflow-y-auto">
    <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
      <h1 className="text-2xl font-bold">Partners</h1>
      <Sheet>
        <AddPartner />
      </Sheet>
    </div>

    {partners.length === 0 ? (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg font-medium ">No partners found</p> 
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <div key={partner._id} className="bg-white relative flex items-center gap-2 shadow-md rounded-lg p-4">
            <img src={partner?.images[0] || "https://i.pinimg.com/1200x/7c/1c/a4/7c1ca448be31c489fb66214ea3ae6deb.jpg"} alt="" className="w-16 h-16 rounded-full object-cover object-center" />
           <div>
           <h2 className="text-xl font-bold mb-2">{partner.title}</h2>
            <p className="text-muted-foreground mb-2">{partner.description}</p>
            <a href={partner.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {partner.link}
            </a>
           </div>
           <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2">
                  <EllipsisVertical size={24} className="text-black" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none">
                  <DropdownMenuItem
                    onClick={() => handleDeletePartner(partner._id)}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <Trash size={20} /> Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default Partners