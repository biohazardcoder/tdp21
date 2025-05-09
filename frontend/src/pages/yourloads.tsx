import { useSelector } from "react-redux"
import { RootState } from "../store"
import { Load, UserProps } from "../types"
import { CalendarPlus2, Eye, Package, } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import Loader from "../components/ui/loader"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel'

export const YourLoads = () => {
    const { t } = useTranslation()
    const { data, isPending } = useSelector((state: RootState) => state.user)
    const user = (data as UserProps) || {}
    const [search, setSearch] = useState("")

    const filteredLoads = user?.myLoads
        ?.filter(load => load.title.toLowerCase().includes(search.toLowerCase()))
        ?.reverse()

        if (isPending) {
            return ( 
                <div className="w-full flex items-center justify-center h-[90vh]">
                    <Loader/>
                </div>
        )}
    return (
        <div className="px-4">
            <h1 className="font-semibold py-2 text-lg">{t("your-loads")}</h1>

            <input
                type="text"
                placeholder={`${t("search")}...`}
                className="w-full p-2 mb-4 border rounded-md lg:w-1/3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    filteredLoads?.length > 0 ?
                    (filteredLoads?.map(({ _id, createdAt, title, images }: Load) => (
                        <div className="bg-primary-foreground p-4 rounded-md mb-4" key={_id}>
                        <Carousel className="w-full h-60 flex items-center justify-center">
                  <CarouselContent>
                    {images?.map((item:string, index:number) => (
                      <CarouselItem key={index} className="flex  justify-center">
                        <img
                          src={item}
                          alt={`image-${index}`}
                          width={100}
                          height={100}
                          className="w-full h-60 object-center rounded-md object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext  />
                </Carousel>
                        <div className="flex items-center justify-between gap-2 pt-2">
                            <div>
                                <h1 className="flex items-center gap-1">
                                    <Package size={18} /> {title}
                                </h1>
                                <h1 className="flex items-center gap-1 text-sm">
                                    <CalendarPlus2 size={18} /> {createdAt.slice(0, 10)}
                                </h1>
                            </div>
                            <Link to={`/yourload/${_id}`}>
                                <Button>
                                    <Eye size={18} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))) : (
                    <h1 className="text-center">No data</h1>
                )}
            </div>
        </div>
    )
}
