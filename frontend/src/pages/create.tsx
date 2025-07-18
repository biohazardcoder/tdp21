'use client'

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"
  
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"
  
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Map, Trash2 } from 'lucide-react'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import axios from 'axios'
import { useUser } from '@clerk/clerk-react'
import { cn } from '../lib/utils'
import MapModal from '../components/shared/map-modal'


export const Create = () => {
  const {t} =useTranslation()
  const [title, setTitle] = useState<string>("")
  const [contact, setContact] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [fridge, setFridge] = useState<boolean>(false)
  const {user} = useUser()
  const [location, setLocation] = useState({
    from: {
        city: "",
        coordinates: { lat: 0, lng: 0 },
        code:""
    },
    to: {
        city: "",
        coordinates: { lat: 0, lng: 0 },
        code:""
    },
});

  const [weight, setWeight] = useState({
    number: 0,
    type: "",
  }) 
  const [modalOpen, setModalOpen] = useState(false);
  const [selecting, setSelecting] = useState<'from' | 'to' | null>(null);
  const [images, setImages] = useState<File[]>([]); 

  const resetForm = ()=>{
    setTitle("")
    setContact("")
    setDescription("")
    setPrice(0)
    setFridge(false)
    setLocation({
      from: {
        city: "",
        coordinates: { lat: 0, lng: 0 },
        code:""
    },
    to: {
        city: "",
        coordinates: { lat: 0, lng: 0 },
        code:""
    },
    })
    setWeight({
      number: 0,
      type: "",
    })
    setImages([])
  }

  const handleCreateLoad = async () => {
    if (!title||!description||!user?.id||!price||!contact||!location||!weight||!images) {
      return toast.warning(`${t("required")} !`,{duration:2000,position:'top-right'})
    }
    try {
      const formData = new FormData();
      formData.append("clerkId", user?.id || "");
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", String(price));
      formData.append("contact", contact);
      formData.append("fridge", String(fridge));
      formData.append("location", JSON.stringify(location));
      formData.append("weight", JSON.stringify(weight));

      images.forEach((image) => {
        formData.append("images", image); 
      });

      await axios.post("https://tdp21com.onrender.com/api/load/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm()
      toast.success(`Successfully!`)
    } catch (error) {
      console.error("Error creating load:", error);
    }
};

  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages((prevImages) => [...prevImages, ...Array.from(event.target.files as FileList)]);
    }
  };
  
  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  
  const handleLocationSelect = (
    selecting: "from" | "to",
    location: { lat: number; lng: number; city: string,code:string }
) => {
    if (selecting) {
        setLocation((prev) => ({
            ...prev,
            [selecting]: {
                city: location.city ,  
                coordinates: {
                    lat: location.lat,
                    lng: location.lng
                },
                code:location.code
            },
        }));
    }
};


  const openModal = (type: 'from' | 'to') => {
    setSelecting(type);
    setModalOpen(true);
  };
  
  return (
    <div className='w-full h-screen'>
        <div className='w-full py-8 overflow-y-auto flex items-center justify-center'>
        <Card>
            <CardHeader >
                <CardTitle>{t("create-new-load")}</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-2'>
             <div  className='grid grid-cols-1 md:grid-cols-2 gap-2'> 
             <div className='space-y-2'>
                <Label>{t("load-title")}</Label>
                <Input onChange={(e)=>setTitle(e.target.value)} required value={title} placeholder={t("enter-title")}/>
              </div>
              <div className='space-y-2'>
                <Label>{t("load-description")}</Label>
                <Input onChange={(e)=>setDescription(e.target.value)} value={description} placeholder={t("enter-description")}/>
              </div>
              <div className='space-y-2'>
                <Label>{t("price")} $</Label>
                <Input type='number' onChange={(e)=>setPrice(Number(e.target.value))} value={price}  />
              </div>
              <div className='space-y-2'>
                <Label>{t("contact")}</Label>
                <Input value={contact} onChange={(e)=>setContact(e.target.value)} placeholder={t("enter-number")}/>
              </div>
             </div>
             <div className='space-y-2'>
              <Label>{t("weight")}</Label>
              <div className='flex items-center gap-1'>
              <Input 
                value={weight.number} 
                onChange={(e) => setWeight({ ...weight, number: Number(e.target.value) })} 
                placeholder="500" 
              />
              <Select onValueChange={(value) => setWeight({ ...weight, type: value })}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder={t("type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">{t("gram")}</SelectItem>
                  <SelectItem value="kg">{t("kilogram")}</SelectItem>
                  <SelectItem value="t">{t("ton")}</SelectItem>
                </SelectContent>
              </Select>
              </div>
             </div>
             <div className='space-y-2'>
             <label>{t("from")} : {location.from?.coordinates?.lat && (
                <p className='text-muted-foreground'>
                  {location.from?.coordinates?.lat ? Number(location.from.coordinates.lat) : t("not-selected")}
                </p>
              )}
            </label>
            <div className='flex items-center gap-2'>
              <Button onClick={() => openModal('from')}>
                <Map className='w-6 h-6' />
              </Button>
              <Input value={location.from.city}  readOnly placeholder={t("select-map")} />
            </div>
          </div>
          <label>{t("to")} : {location.to?.coordinates?.lat && (
                <p className='text-muted-foreground'>
                  {location.to?.coordinates?.lat ? Number(location.to.coordinates.lat) : t("not-selected")}
                </p>
              )}
            </label>
            <div className='flex items-center gap-2'>
              <Button onClick={() => openModal('to')}>
                <Map className='w-6 h-6' />
              </Button>
             <Input value={location.to.city} readOnly  placeholder={t("select-map")} />
              
          </div>
  
              <div className='flex items-center gap-1'>
              <Label>{t("fridge")}</Label>
              <Input 
                type='checkbox' 
                checked={fridge} 
                onChange={(e) => setFridge(e.target.checked)} 
                className='w-5 h-5' 
              />
              <h1 className={cn(fridge ? "text-green-500": "text-red-500")}>{fridge? t("need"): t("not-need")}</h1>
            </div>
            <div className="space-y-2">
              <Label>{t("images")}</Label>
              <Input type="file" multiple onChange={handleFileChange} accept="image/*" />

              {images.length > 0 && (
                <div className="space-y-2">
                  <Label>{t("uploaded")}:</Label>
                  <div className="flex flex-wrap gap-2">
                    {images.map((file, index) => {
                      const src = typeof file === "string" ? file : URL.createObjectURL(file);
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <img 
                            src={src} 
                            alt={`Uploaded ${index}`} 
                            className="rounded-lg  w-20 h-20" 
                          />
                          <div>
                            <div className="flex items-center p-2 gap-2">
                              <Label>{index + 1} - {t("image")}</Label>
                              <Button onClick={() => deleteImage(index)}>
                                <Trash2 />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
              <Button 
              onClick={handleCreateLoad}
              className='w-full cursor-pointer'>
                {t("create")}
              </Button>
              <Link to={"/"} className='w-full'>
              <Button 
              className='w-full cursor-pointer' variant={"destructive"}>
                {t("back")}
              </Button>
              </Link>
            </CardFooter>
        </Card>
        {modalOpen && (
          <MapModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          onSelect={handleLocationSelect} 
          selecting={selecting as "from" | "to"}
        />
      )}
        </div>
    </div>
  )
}
