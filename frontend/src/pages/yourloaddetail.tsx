import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import { ArrowRight, Ban, CalendarPlus2, Check, CheckCheck, ChevronLeft, Eye,  MapPin,  MessageSquareMore, PackageSearch,  Phone,  Settings2, Snowflake,  Wallet, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import { toast } from 'sonner'
import useSWR from 'swr';
import {  Link, useParams } from "react-router-dom";
import { Fetch } from "../middlewares/Axios";
import { Button } from '../components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Load } from '../types';
import Loader from '../components/ui/loader';
const fetcher = (url: string) => Fetch.get(url).then(res => res.data);

export const YourLoadDetail = () => {
  const {t} = useTranslation()
 const { id } = useParams();
 const { data, error, isLoading,mutate } = useSWR(id ? `/load/${id}` : null, fetcher);
 const load = data?.load as Load

  if (isLoading) return <div className='w-full h-[90vh] flex items-center justify-center'>
    <Loader/>
  </div>;
  if (error) return <div>Error loading data</div>;
    
  const handleConnect = async (driverId:string) => {
      try {
        await Fetch.post("/load/connected",{
          driver: driverId,
          id:id
        })        
        mutate()
        toast.success(t("accept"))
      } catch (error) {
        console.log(error);
      }
  }
  const handleDisconnect = async (driverId: string)=>{
    try {
      await Fetch.post("/load/disconnect",{
        driver: driverId,
        id:id
      })        
      mutate()
      toast.success(t("accept"))
    } catch (error) {
        console.log(error);
    }
  }
    const StartIcon = new L.Icon({
        iconUrl: "/leaflet.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
    const FinishIcon = new L.Icon({
        iconUrl: "/leaflet2.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

  return (
    <div className="h-screen ">
      <div className="p-4 w-full h-auto lg:h-[calc(100vh-64px)] md:px-[10%]">
        <Link to={'/yourloads'}>
          <Button >
            <ChevronLeft size={20} className='mr-1'/> {t("back")}
          </Button>
        </Link>
        <div className="bg-secondary mt-2 shadow-lg rounded-lg w-full p-2">
          <div className='grid grid-cols-1 lg:grid-cols-3'>
          <Carousel className="w-full h-64 flex items-center justify-center">
            <CarouselContent className='w-full'>
              {load?.images?.map((item:string, index:number) => (
                <CarouselItem key={index} className="flex items-center justify-center w-full">
                  <img
                    src={item}
                    alt={`image-${index}`}
                    className="w-full h-64 object-center object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="p-2">
          <h1>{load?.title}</h1>
          <p className="text-sm text-muted-foreground">{load?.description}</p>
            <p className="mt-2 flex items-center font-semibold gap-1"><Wallet size={18} />{t("price")}: {load?.price}$</p>
            <p className="flex items-center font-semibold gap-1"><PackageSearch size={18} />{t("weight")}: {load?.weight.number}{load?.weight.type}</p>
            <h1 className="flex font-semibold items-center gap-1">
                <MapPin size={18} /> <img width={100} height={100} src={`https://flagcdn.com/w40/${load?.location.from.code}.png`} alt="" className="w-5 h-3" /> {load?.location.from.city} <div className="mt-0.5">
                    <ArrowRight size={14} /></div> <img  width={100} height={100} src={`https://flagcdn.com/w40/${load?.location.to.code}.png`} alt="" className="w-5 h-3" />  {load?.location.to.city}
            </h1>
            <p className="flex text-sm items-center gap-1 font-semibold"><Phone size={18} /> {t("contact")}: {load?.contact}</p>
            <p className="flex items-center gap-1 font-semibold">
              <Snowflake size={18} />
              <span className=" font-medium">{t("fridge")}: </span>
              {load?.fridge ? <Check className="text-green-600" /> : <X className="text-red-600" />}
          </p>
          <p className="flex text-sm items-center gap-1 font-semibold"><CalendarPlus2 size={18} />{t("created")}: {load?.createdAt.slice(0, 10)}</p>
          </div>
          <div className="col-span-1 h-[50vh] lg:h-auto">
            {load?.location && (
                <MapContainer
                    center={[41.30649130133829, 69.24682025306217]}
                    zoom={5}
                    className="h-full w-full rounded-md z-0"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[load.location.from.coordinates.lat, load.location.from.coordinates.lng]} icon={StartIcon}>
                        <Popup>
                            {load.location.from.city}, {load.location.from.code.toUpperCase()}
                        </Popup>
                    </Marker>
                    <Polyline positions={[[load.location.from.coordinates.lat, load.location.from.coordinates.lng], [load.location.to.coordinates.lat, load.location.to.coordinates.lng]]}  pathOptions={{ color: '#2880CA', dashArray: '10, 10' }}  />
                    <Marker position={[load.location.to.coordinates.lat, load.location.to.coordinates.lng]} icon={FinishIcon}>
                        <Popup>
                            {load.location.to.city}, {load.location.to.code.toUpperCase()}
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
          </div>
          </div>
          <div className='flex items-center gap-1 mt-2 justify-end'>
            <Button><Settings2 size={20}/> {t("settings")}</Button>
          </div>
        </div>
        <div className='bg-secondary shadow-lg rounded-lg w-full p-2 mt-4'>
          {load?.connentor ? (
            <div>
              <h1 className='py-1 text-xl font-semibold'>{t("driver")}:</h1>
              <div className='flex items-center justify-center'>
                 <div className='flex bg-card w-full rounded-md p-4 items-center justify-between gap-2'>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary'>
                      <img src={load?.connentor.driver.imageUrl? load.connentor.driver.imageUrl :"/not-found.jpg"} alt="driver" className='w-full h-full rounded-full' width={100} height={100} />
                    </div>
                    <div className='flex flex-col'>
                      <span className='font-semibold'>{load?.connentor.driver.firstName} {load?.connentor.driver.lastName}</span>
                      <span className='text-muted-foreground'>
                          {load?.connentor?.driver?.email?.length > 20
                            ? `${load?.connentor?.driver?.email.slice(0, 4)}*****${load?.connentor?.driver?.email.slice(-4)}`
                            : load?.connentor?.driver?.email}
                        </span>                      
                      <span className='text-sm text-muted-foreground'>{load?.createdAt.slice(0,10)}</span>
                    </div> 
                  </div>
                 <div className='flex items-center gap-2'>
                 <Button className='bg-chart-2 hover:bg-chart-2/90'>
                    <MessageSquareMore/>
                  </Button>
                  <Button variant="destructive" onClick={()=>handleDisconnect(load.connentor.driver._id||"")}>
                    <Ban/>
                  </Button>
                 </div>
                </div>
              </div>
            </div>
          ):(
            <div>
            <h1 className='py-1 text-xl font-semibold'>{t("requests")}:</h1>
            {(load?.connections || []).length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                  {
                    load?.connections.map((item) => (
                      <div key={item.driver.clerkId} className='flex bg-card w-full rounded-md p-4 items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                        <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary'>
                        {item?.driver && <img src={item?.driver?.imageUrl? item.driver.imageUrl :"/not-found.jpg"} alt="driver" className='w-10 h-10 rounded-full'  />}
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-semibold text-sm'>{item?.driver?.fullName}</span>
                          <span className='text-muted-foreground'>
                          {item?.driver?.email?.length > 20
                            ? `${item.driver.email.slice(0, 4)}*****${item.driver.email.slice(-4)}`
                            : item?.driver?.email}
                        </span>
                          <span className='text-sm text-muted-foreground'>{item?.date?.slice(0,10)}</span>
                        </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Button variant='secondary'>
                              <Eye/>
                            </Button>
                          <Button onClick={()=>handleConnect(item.driver.clerkId||"")}>
                            <CheckCheck/>
                          </Button>
                        </div>
                      </div>
                    ))

                  }
              </div>
            ) : (
              <h1>No Requests</h1>
            )
              }</div>
          )}
        </div>
        </div>
    </div>
  )
}

