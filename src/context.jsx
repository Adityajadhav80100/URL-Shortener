import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from './db/apiAuth'
import useFetch from './hooks/api-fetch'

const defaultUrlState = {
  user: null,
  isAuthenticated: false,
  error: null,
  // loading: true,
  fetchUser: async () => {},
}

const UrlContext = createContext(defaultUrlState)

function UrlProvider({children}) {
    const { data: user, error, fn: fetchUser } = useFetch(getCurrentUser)
    const [initializing, setInitializing] = useState(true)
    const isAuthenticated = user?.role === 'authenticated'
    
  useEffect(() => {
    fetchUser().finally(() => setInitializing(false))
  }, [fetchUser])

  return (
    <UrlContext.Provider value={{user, isAuthenticated, error, loading:initializing, fetchUser}}>
      {children}
    </UrlContext.Provider>
  )
}

  export const UrlState = ()=>{
    return useContext(UrlContext);
  }

export default UrlProvider
