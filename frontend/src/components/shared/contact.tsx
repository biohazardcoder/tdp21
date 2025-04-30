"use client"
import  { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { Mail, MapPin, Phone } from 'lucide-react'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTelegramPlane , FaYoutubeSquare  } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Label } from '../ui/label';
import { Fetch } from '../../middlewares/Axios'
import { useTranslation } from 'react-i18next'
import { Input } from '../ui/input'
import { Textarea } from '../ui//textarea'
import { ContactInterface, Icon } from '../../types';

export const Contact = () => {
    const {t}  =useTranslation()
    const contact: ContactInterface = {
        title: t("contact-title"),
        description: t("contact-description"), 
        email: "buxorojahon@gmail.com",
        location: "Uzbekistan, Namangan city",
        phone: "+998 336116383",
        links: [
            { icon: "telegram", link: "http://t.me/truck-delivery" },
            { icon: "instagram", link: "http://t.me/truck-delivery" },
            { icon: "x", link: "http://t.me/truck-delivery" },
            { icon: "youtube", link: "http://t.me/truck-delivery" },
            { icon: "facebook", link: "http://t.me/truck-delivery" },
            { icon: "linkedin", link: "http://t.me/truck-delivery" },
        ],
    }
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")

    const handleSubmit = async () => {
        if(!name || !email || !message) {
            setIsError(true)
            setIsSuccess(false)
            setSuccessMessage("")
            setErrorMessage(t("fill-all"))
            return
        }
        if(!email.includes("@")) {
            setIsError(true)
            setIsSuccess(false)
            setSuccessMessage("")
            setErrorMessage(t("valid-email"))
            return
        }
        if(message.length < 10) {
            setIsError(true)
            setIsSuccess(false)
            setSuccessMessage("")
            setErrorMessage(t("message-length"))
            return
        }
        if(!message.match(/^[a-zA-Z0-9\s.,!?]+$/)) {
            setIsError(true)
            setIsSuccess(false)
            setSuccessMessage("")
            setErrorMessage(t("valid-message"))
            return
        }
        if(!name.match(/^[a-zA-Z0-9\s.,!?]+$/)) {
            setIsError(true)
            setIsSuccess(false)
            setSuccessMessage("")
            setErrorMessage(t("valid-name"))
            return
        } 
        try {
            setIsLoading(true)
            await Fetch.post("/contact",{
                name,
                email,
                message
            })
            setIsSuccess(true)
            setIsError(false)
            setName("")
            setEmail("")
            setMessage("")
            setErrorMessage("")
            setSuccessMessage(t("message-success"))
        }catch (error) {
            const err = error as Error
            setIsError(true)
            console.log(err.message);
            setErrorMessage(err.message ||t("wrong"))
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 w-full p-4 gap-4' id='contact'>
            <Card className='bg-secondary border-t-8 border-primary'>
                <div className='flex flex-col justify-between h-full'>
                <div className='space-y-2'>
                <CardHeader>
                    <CardTitle className='text-2xl font-semibold'>{contact.title}</CardTitle>
                    <CardDescription className='text-sm text-muted-foreground'>{contact.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className='space-y-2'>
                        {
                            contact.email ? <li className='flex items-center gap-1'>
                                <Mail /> {contact.email}
                            </li> : ""
                        }
                        {
                            contact.email ? <li className='flex items-center gap-1'>
                                <Phone /> {contact.phone}
                            </li> : ""
                        }
                        {
                            contact.email ? <li className='flex items-center gap-1'>
                                <MapPin /> {contact.location}
                            </li> : ""
                        }
                    </ul>
                </CardContent>
                </div>
                <CardFooter>
                    <ul className='flex items-center'>
                        {
                            contact.links.map(({ icon, link }: Icon, index: number) => (
                                <div key={index} className='flex items-center'>
                                    {
                                        icon == "telegram" && <a href={link} target='_blank'>
                                            <FaTelegramPlane  className='text-xl ml-2 bg-secondary-foreground text-background p-1 rounded-md' />
                                        </a>
                                    }
                                    {
                                        icon == "instagram" && <a href={link} target='_blank'>
                                            <FaInstagramSquare className='text-2xl ml-2' />
                                        </a>
                                    }
                                    {
                                        icon == "youtube" && <a href={link} target='_blank'>
                                            <FaYoutubeSquare  className='text-2xl ml-2' />
                                        </a>
                                    }
                                    {
                                        icon == "telegram" && <a href={link} target='_blank'>
                                            <FaFacebookSquare className='text-2xl ml-2' />
                                        </a>
                                    }
                                    {
                                        icon == "x" && <a href={link} target='_blank'>
                                            <FaSquareXTwitter className='text-2xl ml-2' />
                                        </a>
                                    }
                                    {
                                        icon == "telegram" && <a href={link} target='_blank'>
                                            <FaLinkedin className='text-2xl ml-2' />
                                        </a>
                                    }
                                </div>
                            ))
                        }
                    </ul>
                </CardFooter>
                </div>
            </Card>
            <Card className='bg-secondary  border-t-8 border-primary'>
                <CardHeader>
                    <CardTitle className='text-2xl font-semibold'>
                        {t("contact-us")}
                    </CardTitle>
                    <CardDescription className='text-sm text-muted-foreground'>
                        {t("contact-card-description")}                    
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Label className='text-sm font-semibold'>{t("your-name")}</Label>
                    <Input onChange={(e: any)=>setName(e.target.value)} value={name} placeholder='John Doe'  type="text" className='w-full bg-secondary-foreground dark:bg-secondary-foreground text-background p-1 rounded-md' />
                    <Label className='text-sm font-semibold'>{t("your-email")}</Label>
                    <Input onChange={(e: any)=>setEmail(e.target.value)} value={email} placeholder='example@gmail.com' type="email" className='w-full bg-secondary-foreground  dark:bg-secondary-foregroundtext-background p-1 rounded-md' />
                    <Label className='text-sm font-semibold'>{t("your-message")}</Label>
                    <Textarea onChange={(e: any)=>setMessage(e.target.value)} value={message} placeholder={t("contact-input")} className='w-full bg-secondary-foreground dark:bg-secondary-foreground text-background p-1 rounded-md' rows={5} />
                </CardContent>
                <CardFooter className='flex flex-col items-center'>
                    {
                        isError && <p className='text-sm text-red-500'>{errorMessage}</p>
                    }
                    {
                        isSuccess && <p className='text-sm text-green-500'>{successMessage}</p>
                    }
                     <button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className='bg-primary w-full cursor-pointer text-white p-2 rounded-md mt-2'>{isLoading? `${t("sending")}...`: t("send")}</button>
                </CardFooter>
            </Card>
        </div>
    )
}
