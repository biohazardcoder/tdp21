import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Creator, Load, UserProps } from "../types";
import { useTranslation } from "react-i18next";
import {
  Wallet,
  PackageSearch,
  MapPin,
  ArrowRight,
  Snowflake,
  Check,
  X,
  Loader,
  Eye,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Link } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import { Navbar } from "../components/shared/navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import ChatModal from "../components/shared/chat-modal";
import { Fetch } from "../middlewares/Axios";

export const Accepteds = () => {
  const { t } = useTranslation();
  const { data, isPending, isError } = useSelector(
    (state: RootState) => state.user
  );
    const [creator, setCreator] = useState<Creator>() 
  const user = (data as UserProps) || {};
  const [search, setSearch] = useState("");

  const filteredLoads = user?.loads?.filter((load) =>
    load.title.toLowerCase().includes(search.toLowerCase())
  );
  
      const getLoadById = async (id:string) => {
        try {
          const response = (await Fetch.get(`/load/${id}`)).data
          setCreator(response.creator)
          
        } catch (error) {
          console.log(error);
        }
      }

  if (isPending) {
    return (
      <div>
        <Navbar LoadPage={false} />
        <div className="flex items-center justify-center h-[90vh]">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Navbar LoadPage={false} />
        <div className="flex items-center justify-center h-[90vh]">
          <p className="text-destructive text-lg font-medium">
            {t("something-went-wrong")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-[10%] py-6">
<h1 className="text-lg font-semibold mb-4">{t("accepted-loads")}</h1>
      <div className="mb-6 max-w-sm">
        <Input
          placeholder={t("search-by-title") || "Title bo‘yicha qidiring"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredLoads?.length === 0 ? (
        <p className="text-center text-muted-foreground">
          {t("no-requests-sent")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLoads?.map(
            ({ _id, images, location, price, title, weight, fridge,clerkId,connentor }: Load) => (
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
                    {fridge ? (
                      <Check className="text-green-600" />
                    ) : (
                      <X className="text-red-600" />
                    )}
                  </p>
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/loads/${_id}`}>
                      <Button variant={"outline"}>
                        <Eye />
                      </Button>
                    </Link>
                    <Button
                      className="p-0"
                    variant={"default"} onClick={()=>getLoadById(_id)}>
                      <ChatModal image={creator?.imageUrl || ""} client={clerkId} driver={connentor.driver.clerkId}/>
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
