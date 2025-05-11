import { useSelector } from "react-redux"
import { RootState } from "../store"

export const Requests = () => {
  const { data } = useSelector((state:RootState)=>state.user)
  console.log(data.connection);
  
  return (
    <div></div>
  )
}
