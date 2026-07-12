
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LandingPage from "./pages/landing"
import Dashboard from "./pages/dashboard"
import Links from "./pages/link"
import RedirectLink from "./pages/redirect-link"
import AppLayout from "./layouts/app-layout"
import AuthPage from "./pages/Auth"

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
          element : <Dashboard/>
         },
         {
          path : "/auth" ,
          element : <AuthPage/>
         },
         {
          path : "/links/:id" ,
          element : <Links/>
         },
         {
          path : "/:id" ,
          element : <RedirectLink/>
         },
      ]

    }
  ])
  return (
  < RouterProvider router={routes}/>
  )
}

export default App