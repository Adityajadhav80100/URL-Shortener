import React from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import Login from './login'
import SignUp from './signUp'
import { UrlState } from '../context'
function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login'
  const { user, loading } = UrlState();
  const createNew = searchParams.get('CreateNew')

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-8">
        Loading...
      </div>
    )
  }

  if (user) {
    const destination = createNew ? `/dashboard?CreateNew=${encodeURIComponent(createNew)}` : '/dashboard'
    return <Navigate to={destination} replace />
  }

  
  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-8">
      {searchParams.get('CreateNew') && !user  &&  mode === 'signup' ? (
        <SignUp />
      ) : (
        <Login />
      )}
    </div>
  )
}

export default AuthPage
