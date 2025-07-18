import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ConnectingProps, UserProps } from "../types";
import { useTranslation } from "react-i18next";
import {  Package, BadgeInfo, Eye, CalendarPlus2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export const Requests = () => {
  const { t } = useTranslation();
  const { data } = useSelector((state: RootState) => state.user);
  const user = (data as UserProps) || {};
  const requests = user.connecting   || [];

  return (
    <div className="px-4 md:px-[10%] py-6">
      <h1 className="text-lg font-semibold mb-4">{t("sent-requests")}</h1>

      {requests.length === 0 ? (
        <p className="text-center text-muted-foreground">
          {t("no-requests-sent")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map(({_id,load,status}: ConnectingProps,) => (
            <div
              key={_id}
              className="p-4 border rounded-md shadow-sm bg-white dark:bg-zinc-900"
            >
              {load?.images?.length > 0 && (
                 <Carousel className="w-full h-60 flex items-center justify-center">
                <CarouselContent>
                  {load.images?.map((item: string, index: number) => (
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
              )}

             <div className="flex items-center justify-between gap-2 pt-2">
                <div>
                  <h1 className="flex items-center gap-1">
                    <Package size={18} /> {load.title}
                  </h1>
                  <h1 className="flex items-center gap-1 text-sm">
                    <CalendarPlus2 size={18} /> {load.createdAt.slice(0, 10)}
                  </h1>
                </div>
                <Link to={`/yourload/${_id}`}>
                  <Button>
                    <Eye size={18} />
                  </Button>
                </Link>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <BadgeInfo size={16} /> {t("status")}:{" "}
                <span className="font-medium">{status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
