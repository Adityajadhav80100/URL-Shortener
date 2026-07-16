import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'

import { supabase } from './db/supabase'

const defaultUrlState = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: true
}

const UrlContext = createContext(defaultUrlState)

function UrlProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const {
                    data: { user },
                    error
                } = await supabase.auth.getUser()

                if (error) {
                    setUser(null)
                } else {
                    setUser(user)
                }
            } catch (error) {
                setError(error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        initializeAuth()

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log("AUTH EVENT:", event)

                setUser(session?.user ?? null)

                setLoading(false)
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const isAuthenticated = !!user

    return (
        <UrlContext.Provider
            value={{
                user,
                isAuthenticated,
                error,
                loading
            }}
        >
            {children}
        </UrlContext.Provider>
    )
}

export const UrlState = () => {
    return useContext(UrlContext)
}

export default UrlProvider