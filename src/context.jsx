import React, { createContext, useEffect } from 'react'
import { getCurrentUser } from './db/apiAuth'
import useFetch from './hooks/api-fetch'

function UrlProvider({children}) {
     const  UrlContext = createContext() ;
     const {user} = getCurrentUser();
    const  {data, error, loading, fn: fetchData } = useFetch();
    const isAuthenticated = user?.role == "authenticated" 
  return (
    <UrlContext.Provider value={{user, isAuthenticated, data, error, loading, fetchData}}>
      {children}
    </UrlContext.Provider>
  )
}

export default UrlProvider
