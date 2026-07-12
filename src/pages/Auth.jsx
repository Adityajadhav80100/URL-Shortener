import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
 
function AuthPage() {
  const [searchParams] = useSearchParams();
  const handlesignup = () => {
    useNavigate("/auth");
  }
  return (
  
    <div>
       <h1 className='text-6xl font-bold'>
        {searchParams.get('CreateNew') ?  
        <div className='flex flex-col gap-4 p-9 items-center justify-center'>
           <h1 className=''>
          hold up login first .....
           </h1>  
            <button onClick={()=>{handlesignup()}}>login/signup</button>
        </div>
        : "login/signup to continue"}
       </h1>
    </div>
  )
}

export default AuthPage
