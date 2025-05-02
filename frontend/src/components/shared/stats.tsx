"use client"
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
import { Fetch } from '../../middlewares/Axios'
import { StatsInterface } from '../../types'

const fetcher = (url:string)=>Fetch.get(url).then(res=>res.data)
export const Stats = () => {
      const { t } = useTranslation("common");
      const UserData = useSWR("/count", fetcher)
      const LoadData = useSWR("/load", fetcher)
      const user = UserData?.data?.totalCount
    const load = LoadData?.data?.data?.length

     const stats  = [
            {
                title: t("users"),
                length: user || 0,
                image: "/customer.jpg",
            },
            {
                title: t("loads"),
                length: load || 0,
                image: "/load.jpg",
            },
        ]
  return (
    <div className='w-full p-4 border-t' id='statistics'>
        <h1 className='text-4xl font-semibold text-center'>{t("statistics")}:</h1>        
        <div className='w-full grid grid-cols-1 md:grid-cols-2 mt-4  gap-4 items-center'>
            {stats.map(({image,length,title}:StatsInterface, index:number)=>(
                <div key={index} className='bg-secondary p-2 border-t-8 border-primary rounded-lg flex items-center gap-1'>
                    <img src={image} alt="" className='rounded-full w-10 h-10' />
                    <div>
                        <h1 className='text-lg font-semibold'>{title}</h1>
                        <p className='text-sm text-muted-foreground'>{length}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
