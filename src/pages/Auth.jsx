import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Login from './login'
import SignUp from './signUp'
 import { getCurrentUser } from '@/db/apiAuth'
function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login'
  const {user} = getCurrentUser();

  
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
