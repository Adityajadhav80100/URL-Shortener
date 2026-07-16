
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import LandingPage from "./pages/landing"
import Dashboard from "./pages/dashboard"
import Links from "./pages/link"
import RedirectLink from "./pages/redirect-link"
import AppLayout from "./layouts/app-layout"
import AuthPage from "./pages/Auth"
import SignUp from "./pages/signUp"
import UrlProvider from "./context"
import RequireAuth from "./components/requireAuth"

function App() {
  const routes = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />
        },
        {
          path: "/dashboard",
          element: <UrlProvider><RequireAuth><Dashboard /></RequireAuth></UrlProvider>
        },
        {
          path: "/auth",
          element: <AuthPage />
        },
        {
          path: "/signUp",
          element: <Navigate to="/auth?mode=signup" replace />
        },
        {
          path: "/link/:id",
          element: <UrlProvider><RequireAuth><Links /></RequireAuth></UrlProvider>
        },
        {
          path: "/:shortUrl",
          element: <UrlProvider><RedirectLink /></UrlProvider>
        },
      ]

    }
  ])
  return (
    <UrlProvider>

      < RouterProvider router={routes} />
    </UrlProvider>
  )
}

export default App