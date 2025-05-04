import { useTranslation } from 'react-i18next';
import useSWR from "swr"
import { Fetch } from '../../middlewares/Axios';
import { Partner } from '../../types';
const fetcher = (url:string)=>Fetch.get(url).then(res=>res.data)

export const Partners = () => {
  const { t } = useTranslation("common");
      const {data ,isLoading} = useSWR<Partner[]>("/partner", fetcher) || []

      const partners = data || []
      
   if (isLoading) {
    return <div className="text-center py-8 animate-pulse">{t("loading") || "Loading"}...</div>;
   }   
  return (
    <div className='w-full py-10' id='collaborates'>
        <h1 className='text-4xl font-semibold text-center'>{t("collaborates")}:</h1>
           {partners ?  (partners.length > 0 ? 
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-4'>
                {partners.map(({description,images,title,link}:Partner,index:number)=>(
                <a href={link} target='_blank' className='flex rounded-md items-center gap-2 border border-t-8 border-primary bg-secondary p-4 hover:scale-105 transition duration-500 cursor-pointer' key={index}>
                    <img src={images[0]} alt="logo" className='border w-16 h-16 object-cover object-center rounded-full' />
                    <div>
                        <h1 className='text-xl font-semibold'>{title}</h1>
                        <h1 className='text-muted-foreground text-xs'>{description}</h1>
                    </div>
                </a>
            ))}
        </div>
              : <h1 className='text-center pt-5 text-muted-foreground'>{t("collaborators-not-found")}</h1>
            ) : ""}
    </div>
  )
}
