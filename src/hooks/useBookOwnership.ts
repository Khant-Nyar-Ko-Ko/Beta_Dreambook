/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "@/service/authService"
import { useUserApi } from "./useUserApi";
import { useEffect, useState } from "react";
import { fetchSingleBook } from "@/api";

const useBookOwnership = (slug : any) => {
  const token = getToken() || "";
  const {data: user} = useUserApi(token);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkOwnership = async () => {
      try{
        const book = await fetchSingleBook(slug);
        if(book?.userId === user?.id){
          setIsOwner(true)
        }
      }catch(err : any){
        setError(err);
      }finally{
        setLoading(false);
      }
    }

    if(slug && user){
      checkOwnership();
    }
  },[slug, user])
  return {isOwner, loading, error}
}

export default useBookOwnership;