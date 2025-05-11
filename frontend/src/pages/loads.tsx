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
import {
  ArrowRight,
  Check,
  ListFilter,
  MapPin,
  PackageSearch,
  Snowflake,
  Wallet,
  X,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel"
import { Separator } from "../components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

const fetcher = (url: string) => Fetch.get(url).then((res) => res.data)

export const Loads = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [filterDate, setFilterDate] = useState("")
  const [filterPrice, setFilterPrice] = useState("")
  const [filterWeight, setFilterWeight] = useState("")
  const [filterLocationFrom, setFilterLocationFrom] = useState("")
  const [filterLocationTo, setFilterLocationTo] = useState("")
  const [filterFridge, setFilterFridge] = useState(false)
  const [search, setSearch] = useState("")
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const { data, isLoading } = useSWR(`/load?page=${page}&limit=4`, fetcher)

  const resetFilters = () => {
    setFilterDate("")
    setFilterPrice("")
    setFilterWeight("")
    setFilterLocationFrom("")
    setFilterLocationTo("")
    setFilterFridge(false)
    setSearch("")
  }

  const sheetCloser = () => {
    setIsSheetOpen(false)
  }

  const filteredLoads = data?.loads
    ?.filter((load: Load) => {
      const isDateMatch = filterDate ? load.createdAt.slice(0, 10) === filterDate : true
      const isPriceMatch = filterPrice ? load.price >= Number(filterPrice) : true
      const isWeightMatch = filterWeight ? load.weight.number <= Number(filterWeight) : true
      const isLocationFromMatch = filterLocationFrom
        ? load.location.from.city.toLowerCase().includes(filterLocationFrom.toLowerCase())
        : true
      const isLocationToMatch = filterLocationTo
        ? load.location.to.city.toLowerCase().includes(filterLocationTo.toLowerCase())
        : true
      const isFridgeMatch = filterFridge ? load.fridge === true : true
      const isCustomerMatch = !load.connentor

      return (
        isDateMatch &&
        isPriceMatch &&
        isWeightMatch &&
        isLocationFromMatch &&
        isLocationToMatch &&
        isFridgeMatch &&
        isCustomerMatch
      )
    })
    .filter((load: Load) => load.title.toLowerCase().includes(search.toLowerCase()))

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <Loader />
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-2">{t("loads")}</h1>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button className="p-1 font-semibold rounded-md flex items-center gap-1">
              <ListFilter size={18} />
              {t("filter")}
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">{t("filter")}</SheetTitle>
              <SheetDescription>{t("filter-description")}</SheetDescription>
            </SheetHeader>

            <div className="px-4 flex flex-col gap-2">
              <Label className="text-lg">{t("date")}:</Label>
              <Input
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                type="date"
                className="w-full"
              />

              <Label className="text-lg">{t("lowest-price")}:</Label>
              <Input
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                type="text"
                placeholder={t("price")}
                className="w-full bg-secondary"
              />

              <Label className="text-lg">{t("weight")}:</Label>
              <Input
                value={filterWeight}
                onChange={(e) => setFilterWeight(e.target.value)}
                type="text"
                placeholder={t("weight")}
                className="w-full bg-secondary"
              />

              <Label className="text-lg">{t("location")}:</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={filterLocationFrom}
                  onChange={(e) => setFilterLocationFrom(e.target.value)}
                  placeholder={t("from")}
                  className="bg-secondary"
                />
                <Input
                  value={filterLocationTo}
                  onChange={(e) => setFilterLocationTo(e.target.value)}
                  placeholder={t("to")}
                  className="bg-secondary"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-lg">{t("fridge")}:</Label>
                <Input
                  type="checkbox"
                  checked={filterFridge}
                  onChange={(e) => setFilterFridge(e.target.checked)}
                  className="w-5 h-5"
                />
              </div>

              <Button className="w-full mt-2 " onClick={sheetCloser}>
                {t("apply")}
              </Button>
              <Button className="w-full" onClick={resetFilters} variant="destructive">
                {t("reset")}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="my-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search")}
          className="w-full bg-secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {filteredLoads?.length > 0 ? (
          <>
            {filteredLoads.map(
              ({ _id, images, location, price, title, weight, fridge }: Load) => (
                <div key={_id} className="bg-card p-2 rounded-md">
                  <Carousel className="w-full h-64">
                    <CarouselContent>
                      {images?.map((img, idx) => (
                        <CarouselItem key={idx} className="flex justify-center">
                          <img
                            src={img}
                            alt={`image-${idx}`}
                            className="w-full h-64 object-cover rounded-md"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                  <Link to={`/loads/${_id}`}>
                    <div className="p-2">
                      <h1 className="text-xl font-bold">{title}</h1>
                      <Separator className="mt-2" />
                      <p className="mt-2 flex items-center font-semibold gap-1">
                        <Wallet size={18} /> {t("price")}: {price}$
                      </p>
                      <p className="flex items-center font-semibold gap-1">
                        <PackageSearch size={18} /> {t("weight")}: {weight.number}
                        {weight.type}
                      </p>
                      <h1 className="flex font-semibold flex-wrap items-center gap-1">
                        <MapPin size={18} />
                        <img
                          src={`https://flagcdn.com/w40/${location.from.code}.png`}
                          alt=""
                          className="w-5 h-3"
                        />
                        {location.from.city}
                        <ArrowRight size={14} />
                        <img
                          src={`https://flagcdn.com/w40/${location.to.code}.png`}
                          alt=""
                          className="w-5 h-3"
                        />
                        {location.to.city}
                      </h1>
                      <p className="flex items-center gap-1 font-semibold">
                        <Snowflake size={18} /> {t("fridge")}:{" "}
                        {fridge ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                      </p>
                    </div>
                  </Link>
                </div>
              )
            )}

            {/* Pagination */}
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

                <PaginationEllipsis />

                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (page < data?.totalPages) setPage(page + 1)
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        ) : (
          <div className="text-center col-span-4 text-muted-foreground">{t("no-data")}</div>
        )}
      </div>
    </div>
  )
}
