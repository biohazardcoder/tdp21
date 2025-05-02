import useSWR from "swr"
import { useState } from "react"
import { Load } from "../types"
import { Fetch } from "../middlewares/Axios"
import Loader from "../components/ui/loader"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"
import { Link } from "react-router-dom"
import { ArrowRight, Check, MapPin, PackageSearch, Snowflake, Wallet, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel"
import { Separator } from "../components/ui/separator"

const fetcher = (url: string) => Fetch.get(url).then(res => res.data)

export const Loads = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const { data, isLoading } = useSWR(`/load?page=${page}&limit=12`, fetcher)
  if (isLoading) {
    return <div className="flex justify-center items-center h-[90vh]"><Loader /></div>
  }

  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold my-2">{t("loads")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {data?.loads?.map(({ _id,  images, location, price, title, weight, fridge }: Load) => (
          <div key={_id} className="bg-card p-2">
            <Carousel className="w-full h-64 flex items-center justify-center">
              <CarouselContent>
                {images?.map((item: string, index: number) => (
                  <CarouselItem key={index} className="flex justify-center">
                    <img src={item} alt={`image-${index}`} className="w-full h-64 object-cover rounded-md" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <Link to={`/loads/${_id}`}>
              <div className="p-2">
                <h1 className="text-xl font-bold">{title}</h1>
            <Separator  className="mt-2"/>
                <p className="mt-2 flex items-center font-semibold gap-1"><Wallet size={18} /> {t("price")}: {price}$</p>
                <p className="flex items-center font-semibold gap-1"><PackageSearch size={18} /> {t("weight")}: {weight.number}{weight.type}</p>
                <h1 className="flex font-semibold flex-wrap items-center gap-1">
                  <MapPin size={18} />
                  <img src={`https://flagcdn.com/w40/${location.from.code}.png`} alt="" className="w-5 h-3" />
                  {location.from.city}
                  <ArrowRight size={14} />
                  <img src={`https://flagcdn.com/w40/${location.to.code}.png`} alt="" className="w-5 h-3" />
                  {location.to.city}
                </h1>
                <p className="flex items-center gap-1 font-semibold"><Snowflake size={18} /> {t("fridge")}: {fridge ? <Check className="text-green-600" /> : <X className="text-red-600" />}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious onClick={() => setPage((p) => Math.max(p - 1, 1))} />
    </PaginationItem>

    {Array.from({ length: data?.totalPages || 1 }, (_, i) => (
      <PaginationItem key={i}>
        <PaginationLink
          href="#"
          isActive={page === i + 1}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ))}
  <PaginationEllipsis/>
    <PaginationItem>
      <PaginationNext
        onClick={() => {
          if (page < data?.totalPages) setPage(page + 1)
        }}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>


    </div>
  )
}
