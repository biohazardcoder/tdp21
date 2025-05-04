import { Fetch } from "@/middlewares/Fetch"
import { ContactTypes } from "@/types/RootTypes"
import { useEffect, useState } from "react"

const Contacts = () => {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        const fetchContacts = async () => {
            const response = (await Fetch.get('/contact')).data
            setContacts(response)
console.log(response)
        }
        fetchContacts()


    }, [])

    return (
        <div className="p-4 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Contacts</h1>
      </div>

      {contacts.length <= 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-sky-400">
            Нет ни одного админа
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {contacts.map(({message,_id,email,name,createdAt,}:ContactTypes) => (
                <div key={_id} className="bg-[#202020] text-white rounded-lg p-4 flex flex-col gap-3 relative">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p className="text-gray-500">{email}</p>
                    <p className="text-gray-500">{message}</p>
                    <p className="text-gray-500">{createdAt.slice(0,10)}</p>
                </div>
            ))}
        </div>
      )}
    </div>
    )
}

export default Contacts