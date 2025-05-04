import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useUser } from '@clerk/clerk-react';

export function Footer() {
    const { t} = useTranslation()
    const {isSignedIn} = useUser()
  return (
    <div className='bg-primary-foreground  p-10'>
        <section className=' max-w-[1200px] mx-auto text-secondary-foreground '>
            <div className='grid md:grid-cols-3 py-5'>
                <div className='first'>
                    <h1 className=' text-xl sm:text-3xl font-bold sm:text-left text-justify mb-3'>{t("title")}</h1>
                    <p className='text-muted-foreground'>{t("footer-description")}</p>
                    <br />
                    {
                        isSignedIn ? (
                            <></>
                        ):(
                            <div className=' flex items-center h-10'>
                            <input type="text"
                                   className=' py-1 px-3 w-full h-[100%] inline-block outline-none  bg-muted '
                                   placeholder={t("your-email")} />
                            <Link to={"/sign-in"} className='h-full'>
                            <Button className='rounded-none h-full'>{t("verify")}</Button>
                            </Link>
                        </div>
                        )
                    }
                </div>
                <div className="second grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
                    <div>
                        <div className="py-8 px-4">
                            <h1 className='text-xl font-bold mb-3 '>{t("quick-links")}</h1>
                            <ul className='flex flex-col  gap-3'>
                                <li>
                                    <a href="/">{t("home")}</a>
                                </li>
                                <li>
                                    {
                                        isSignedIn ? (
                                            <a href="/loads">{t("loads")}</a>
                                        ) :(
                                            <a href="/sign-in">{t("login")}</a>
                                        )
                                    }
                                </li>
                                <li>
                                    <a href="#contact">{t("contact")}</a>
                                </li>
                                <li>
                                    <a href="#statistics">{t("statistics")}</a>
                                </li>
                                <li>
                                    <a href="#collaborates">{t("collaborates")}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sm:block border-t-2  py-8'>
                <div className='flex font-semibold justify-between'>
                    <span className='text-xs'>© 2025 Powered by TDP21 Corp. </span>
                    <div className='flex flex-col items-center gap-1 text-xs lg:flex-row'>
                    <span >Privacy Policy </span>
                    <span className='ml-2'> Terms & Conditions</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
