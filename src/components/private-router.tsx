import initStorage from "@/lib/db"
import { ReactNode, useEffect, useState } from "react"
import { Redirect } from "react-router";

const PrivateRouter : React.FC<{route : ReactNode}>= ({route}) => {

  const [auth , setAuth] = useState<boolean>();

  useEffect(() => {
    const checkToken = async () => {
      const storage = await initStorage();
      const token = await storage.get("token");

      if(token !== null){
        setAuth(true)
      }
    }
    checkToken();
  })

  return auth ? <Redirect to="/main" /> : route
}

export default PrivateRouter