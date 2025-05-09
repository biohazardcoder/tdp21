"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { ChevronLeft,  History,  Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { UserProps } from '../types'
import { RootState } from '../store'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import PayPalButton from '../middlewares/paypal'

export const Balance = () => {
  const { t } = useTranslation("common");
  const {data} = useSelector((state: RootState) => state.user)
  const user = data as UserProps || {}
  interface Coin {
    coin : number
    price: number
  }
  const coins = [
    {coin: 5, price: 5},
    {coin: 10, price: 9},
    {coin: 50, price: 45},
    {coin: 100, price: 85},
    {coin: 500, price: 400},
    {coin: 1000, price: 750}
  ]
  const [selectedCoin, setSelectedCoin] = React.useState<Coin | null>(null)
  const [paymentMethod, setPaymentMethod] = React.useState<boolean>(false)
  const handleCoinSelect = (coin: Coin) => {
    setSelectedCoin(coin)
    setPaymentMethod(true)
  }
  const [paypal, setPaypal] = React.useState(false)
  return (
    <div>
        <div className="grid grid-cols-1 p-4 gap-2 md:grid-cols-2 h-[calc(100vh-64px)]">
            <div className='bg-secondary p-4'>
              <div className=' flex items-center justify-between'>
                <Link to={'/'}>
                <Button >
                  <ChevronLeft size={20} className='mr-1'/> {t("back")}
                </Button>
                </Link>
              <h1 className="text-xl font-bold text-center py-2">{t("your-coins")}</h1>
              <span></span>
              </div>
                <div>
                    <div className="flex mt-2 flex-col items-center justify-center h-full">
                        <div className="bg-card p-4 rounded-lg shadow-md w-full max-w-md">
                            <h2 className="text-xl font-bold mb-2 flex items-center gap-1"><Wallet size={22}/>{t("your-balance")}:</h2>
                            <p className="text-lg">{t("you-have")} <span className='text-primary font-semibold'>{user.coins || 0}</span>  {t("coins")}</p>
                            <p className='text-xs text-muted-foreground mt-2'>{t("wallet-description")}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center '>
                  <div className='bg-card p-4 rounded-lg shadow-md w-full max-w-md mt-4'>
                    <h1 className='text-xl font-bold flex items-center gap-1'><History size={22}/> {t("history")}</h1>
                    <p className='text-muted-foreground text-sm'>{t("history-description")}</p>
                  </div>
                </div>
            </div>
            <div className='bg-secondary p-4'>
                <h1 className="text-2xl font-bold text-center">{t("buy-more")}</h1>
                <p className="text-center text-muted-foreground text-sm">{t("buy-description")}</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                  {coins.map((coin: Coin, index: number) => (
                    <div key={index} className="bg-card rounded-lg shadow-md flex  items-center justify-between p-2">
                      <h2 className="text-xl font-bold">{coin.coin} {t("coins")}</h2>
                      <p className="text-lg font-semibold">${coin.price}</p>
                      <Button onClick={() => handleCoinSelect(coin)}>{t("buy")}</Button>
                      </div>
                  ))}
                  </div>
                  <div className='p-2 mt-2 bg-card rounded-md shadow-md'>
                    <p className='text-xl font-bold text-center'>{t("we-accept")}</p>  
                  <div className='flex flex-wrap items-center p-2 mt-2 gap-2'>
                    <img  width={100} height={100} src="https://1000logos.net/wp-content/uploads/2017/05/Paypal-Logo-2022.png" alt="" className=' dark:bg-secondary-foreground  bg-transparent w-14 h-10 lg:w-32 p-2 lg:h-16 rounded-md'/>
                    <img  width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="" className=' dark:bg-secondary-foreground  bg-transparent w-16 h-10 lg:w-32 p-3 lg:p-4 lg:h-16 rounded-md'/>
                    <img  width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="" className=' dark:bg-secondary-foreground  bg-transparent w-14 h-10 lg:w-20 p-2 lg:p-3 lg:h-16 rounded-md'/>
                    <img  width={100} height={100} src="https://api.logobank.uz/media/logos_png/Click-01_hjB080W.png" alt="" className='dark:bg-secondary-foreground  bg-transparent w-12 h-10 lg:w-20 lg:h-16 rounded-md'/>
                  </div>
                  </div>
            </div>
            {paymentMethod && selectedCoin && (
              <div className='fixed top-0 left-0 w-full p-4 h-full bg-black/50 flex items-center justify-center z-50'>
                <div className='bg-card p-4 rounded-lg shadow-md w-full max-w-md'>
                  <h1 className='text-2xl font-bold text-center'>{t("payment-method")}</h1>
                  <p className='text-center text-muted-foreground'>You selected {selectedCoin.coin} coins for ${selectedCoin.price}</p>
                  {paypal ? (
                  <div>
                      <PayPalButton driverId={user._id ||""} selectedCoins={selectedCoin}/>
                    <Button onClick={() => setPaypal(false)} variant={"destructive"} className='w-full mt-2'>
                    Close
                  </Button>  
                  </div>
                  ): (
                    <div>
                       <div className='grid grid-cols-2  gap-2 mt-2'>
                     <Button variant={"default"} className='w-full' onClick={() => setPaypal(true)}>
                     <img  width={100} height={100} src="https://www.edigitalagency.com.au/wp-content/uploads/PayPal-logo-white-png-horizontal-900x239.png"  alt="" className='bg-transparent w-16 p-1 h-8 '/>
                     </Button>
                 </div> 
                 <Button onClick={() => setPaymentMethod(false)} variant={"destructive"} className='w-full mt-2'>
                    Close
                  </Button>  
                    </div>
                 )}            
                     
              </div>                    
            </div>)}                    
        </div>
    </div>
  )
}

