
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import LandingPage from "./pages/landing"
import Dashboard from "./pages/dashboard"
import Links from "./pages/link"
import RedirectLink from "./pages/redirect-link"
import AppLayout from "./layouts/app-layout"
import AuthPage from "./pages/Auth"
import SignUp from "./pages/signUp"
import UrlProvider from "./context"

function App() {
  const routes = createBrowserRouter([
    {
      element:<AppLayout/> ,
      children:[
         {
          path : "/" ,
          element : <LandingPage/>
         },
         {
          path : "/dashboard" ,
          element : <UrlProvider><Dashboard/></UrlProvider>
         },
         {
          path : "/auth" ,
          element : <AuthPage/>
         },
         {
          path : "/signUp" ,
          element : <Navigate to="/auth?mode=signup" replace />
         },
         {
          path : "/links/:id" ,
          element : <UrlProvider><Links/></UrlProvider>
         },
         {
          path : "/:id" ,
          element : <UrlProvider><RedirectLink/></UrlProvider>
         },
      ]

    }
  ])
  return ( 
    <UrlProvider> 

      < RouterProvider router={routes}/>
    </UrlProvider>
  )
}

export default App