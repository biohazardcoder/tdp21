import { ArrowRight, CalendarPlus2, Check, Heart, MapPin,   Snowflake,  Wallet, Weight, X } from 'lucide-react'
import { useEffect,  useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css";

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel'
import { Load,  Creator, UserProps } from '../types'
import { Fetch } from '../middlewares/Axios'
import { Button } from '../components/ui/button'
import Loader from '../components/ui/loader'
import { Separator } from '../components/ui/separator'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner';
import { RootState } from '../store';
import { getError, getPending, getUserInfo } from '../toolkits/user-toolkit';
import { useUser } from '@clerk/clerk-react';
export const Detail = () => {
    const {t} = useTranslation()
    const [load, setLoad] = useState<Load>()
    const [creator, setCreator] = useState<Creator>() 
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [already, setAlready] = useState(false)
    const [connecting, setConnecting] = useState(false)
    const UserData = useUser()
    const {data } = useSelector((state:RootState) => state.user)
    const user= data as UserProps || {}
    const currentLoad = user?.myLoads?.find(({_id}:Load) => _id === load?._id) 
    const mine = load?._id === currentLoad?._id ? true : false
    const dispatch = useDispatch();
    
    async function getMyData() {
      try {
        dispatch(getPending());
        const response = await Fetch.post("/user/me", {
          clerkId: UserData?.user?.id
        });
        if (response?.data) {
          dispatch(getUserInfo(response.data));
        } else {
          dispatch(getError("No user data available"));
        }
      } catch (error) {
        const err = error as Error;
        dispatch(getError(err.message || "Unknown Token"));
        console.error(error);
      }
    }
    useEffect(() => {
      const getLoadById = async () => {
        try {
          setLoading(true)
          const response = (await Fetch.get(`/load/${id}`)).data
          setLoad(response.load)
          setCreator(response.creator)
          
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false)
        }
      }
      getLoadById()
    }, [id])
    
    useEffect(() => {
      const savedLoads = JSON.parse(localStorage.getItem('savedLoads') || '[]')
      const found = savedLoads.some((savedLoad: Load) => savedLoad._id === load?._id)
      setIsSaved(found)
    }, [load])
    
    useEffect(() => {
      const checkAlreadyConnected = async () => {
        try {
          user?.connecting?.forEach((item: { load: Load }) => {
            if (item.load._id === id) {
              setAlready(true)
            }
          })
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      }
      checkAlreadyConnected()
        }, [user,id])
    
      const handleConnectingDriver = async () => {
      setConnecting(true)
      if (!user._id) {
          toast.error(t("driver-not-found"))
          setConnecting(false)
          return
      }
      if (!load) {
          toast.error(t("load-not-found"))
          setConnecting(false)
          return
      }
      try {
           await Fetch.post("load/connecting", {
              id: id, 
              driver:user._id
          })            
          getMyData()
          toast.success(t("request"));
      } catch (error) {
          console.log(error);
          toast.error(t("wrong"))
      }finally{
        setConnecting(false)
      }
    }    

    const toggleSaveLoad = () => {
      let savedLoads = JSON.parse(localStorage.getItem('savedLoads') || '[]')
    
      const exists = savedLoads.some((savedLoad: Load) => savedLoad._id === load?._id)
    
      if (exists) {
        const updatedLoads = savedLoads.filter((savedLoad: Load) => savedLoad._id !== load?._id)
        localStorage.setItem('savedLoads', JSON.stringify(updatedLoads))
        setIsSaved(false)
          toast.success(t("load-removed"))
      } else {
        const minimalLoad = {
          _id: load?._id,
          title: load?.title,
          description: load?.description,
          images: load?.images,
        }
        savedLoads.push(minimalLoad)
        localStorage.setItem('savedLoads', JSON.stringify(savedLoads))
        setIsSaved(true)
        toast.success(t("load-saved"))
      }
    }
      
          
      
    const StartIcon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
    const FinishIcon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    if (loading) {
      return (
        <div className="w-full flex items-center justify-center h-[90vh]">
          <Loader/>
        </div>
      )
    }

    return (
        <div className='w-full h-[90vh] overflow-y-auto px-0 md:px-[10%]  lg:h-screen'>
            <div className='grid grid-cols-1 gap-2  p-4 lg:grid-cols-3 w-full h-auto lg:h-[calc(100vh-64px)]'>
                <div className='col-span-1  w-full'>
                <div    className="bg-card rounded-md">
                  <div>
                  <Carousel className="w-full h-64 flex items-center justify-center">
                  <CarouselContent>
                    {load?.images?.map((item:string, index:number) => (
                      <CarouselItem key={index} className="flex  justify-center">
                        <img
                          src={item}
                          alt={`image-${index}`}
                          width={100}
                          height={100}
                          className="w-full h-64 object-center rounded-md object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext  />
                </Carousel>
                  </div>
                  <div className="p-2 ">
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1>{load?.title}</h1>
                            <p className="text-sm text-muted-foreground">{load?.description}</p>
                        </div>
                        <Button onClick={toggleSaveLoad} variant={isSaved ? 'default' : 'secondary'}>
                            <Heart className={isSaved ? 'text-green-500' : 'text-primary'} />
                        </Button>

                    </div>
                    <Separator className='my-2'/>
                    <p className="mt-2 flex items-center font-semibold gap-1"><Wallet size={18} />{t("price")}: {load?.price}$</p>
                    <p className="flex items-center font-semibold gap-1"><Weight size={18} />{t("weight")}: {load?.weight.number}{load?.weight.type}</p>
                    <h1 className="flex font-semibold items-center gap-1">
                        <MapPin size={18} /> <img width={100} height={100} src={`https://flagcdn.com/w40/${load?.location.from.code}.png`} alt="" className="w-5 h-3" /> {load?.location.from.city} <div className="mt-0.5">
                            <ArrowRight size={14} /></div> <img  width={100} height={100} src={`https://flagcdn.com/w40/${load?.location.to.code}.png`} alt="" className="w-5 h-3" />  {load?.location.to.city}
                    </h1>
                    <p className="flex items-center gap-1 font-semibold">
                        <Snowflake size={18} />
                        <span className=" font-medium">{t("fridge")}: </span>
                        {load?.fridge ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                    </p>
                    <p className="flex text-sm items-center gap-1 font-semibold"><CalendarPlus2 size={18} />{t("created")}: {load?.createdAt.slice(0, 10)}</p>
                    <Separator className='my-2'/>
                    <div className="bg-primary-foreground p-2 rounded-lg">
                        <div className="flex items-center gap-1 text-lg font-semibold">
                            <img src={creator?.imageUrl} alt="avatar" className='w-8 h-8 rounded-full' />
                            {creator?.firstName} {creator?.lastName}
                        </div>
                        <p className='text-xs text-muted-foreground mt-2'>{t("wallet-description")}</p>
                    </div>
                    <Separator className='my-2'/>
                  <Button
                    onClick={handleConnectingDriver}
                    className="w-full"
                    disabled={mine || already || connecting}
                  >
                    {mine
                      ? t("This is your load")
                      : already
                      ? t("already-sent")
                      : connecting
                      ? t("pending")
                      : t("send")}
                  </Button>
                </div>
              </div>
                </div>
                <div className="col-span-1 h-[50vh] lg:h-[calc(100vh-80px)] lg:col-span-2 p-2 lg:p-0">
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
        </div>
    )
}

