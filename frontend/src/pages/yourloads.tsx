import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { CalendarPlus2, Eye, Package } from "lucide-react";
import useSWR from "swr";
import { useUser } from "@clerk/clerk-react";

import { Button } from "../components/ui/button";
import Loader from "../components/ui/loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import { Fetch } from "../middlewares/Axios";
import { Load } from "../types";

const fetcher = (url: string, body: object) =>
  Fetch.post(url, body).then((res) => res.data);

export const YourLoads = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();
  const [search, setSearch] = useState("");

  if (isLoaded && !isSignedIn) {
    navigate("/sign-in");
  }

  const { data, isLoading, error } = useSWR(
    isSignedIn && isLoaded && user?.id ? ["/user/me", { clerkId: user.id }] : null,
    ([url, body]) => fetcher(url, body)
  );

  if (!isLoaded || isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-[90vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{t("error-loading-data")}</div>;
  }

  const filteredLoads = data?.myLoads
    ?.filter((load: Load) =>
      load.title.toLowerCase().includes(search.toLowerCase())
    )
    ?.reverse();

  return (
    <div className="px-4 md:px-[10%]">
      <h1 className="font-semibold py-2 text-lg">{t("your-loads")}</h1>
      <input
        type="text"
        placeholder={`${t("search")}...`}
        className="w-full p-2 mb-4 border rounded-md lg:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
        {filteredLoads?.length > 0 ? (
          filteredLoads.map(({ _id, createdAt, title, images }: Load) => (
            <div className="bg-primary-foreground p-4 rounded-md mb-4" key={_id}>
              <Carousel className="w-full h-60 flex items-center justify-center">
                <CarouselContent>
                  {images?.map((item: string, index: number) => (
                    <CarouselItem key={index} className="flex justify-center">
                      <img
                        src={item}
                        alt={`image-${index}`}
                        className="w-full h-60 object-cover rounded-md"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
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
          ))
        ) : (
          <h1 className="text-center">{t("no-data")}</h1>
        )}
      </div>
    </div>
  );
};
