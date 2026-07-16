
import React from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Error from "@/components/error"
import * as yup from "yup"
import useFetch from "@/hooks/api-fetch"
import { login } from "@/db/apiAuth"

function Login() {
  const navigate = useNavigate()
  const [errors, setErrors] = React.useState({})
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setErrors({})

      const schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
      })

      await schema.validate(formData, { abortEarly: false })

      const response = await fnlogin(formData)

      if (response?.error) {
        setErrors({ form: response.error.message || "Login failed" })
        return
      }

      navigate(`/dashboard?${longlink ? `CreateNew=${encodeURIComponent(longlink)}` : ""}`)
    } catch (e) {
      if (e.inner) {
        setErrors(e.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message
          return acc
        }, {}))
      } else {
        setErrors({ form: e.message || "Login failed" })
      }
    }
  }

  const { data, loading, error, fn: fnlogin } = useFetch(login)
  const [useParam] = useSearchParams();

  const longlink = useParam.get("CreateNew")

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-1 shadow-2xl shadow-black/40 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
      <Card className="relative border-0 bg-transparent text-white ring-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Login to your account
          </CardTitle>
          <CardDescription className="max-w-sm text-sm leading-6 text-slate-300">
            Enter your email and password to continue to your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                onChange={handleInputChange}
                name="email"
                value={formData.email}
                placeholder="m@example.com"
                required
                className="h-12 border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus-visible:border-cyan-400/60 focus-visible:ring-cyan-400/20"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="password" className="text-sm font-medium text-slate-200">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-sm text-slate-300 underline-offset-4 transition hover:text-white hover:underline"
                >
                  Forgot your password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                onChange={handleInputChange}
                name="password"
                value={formData.password}
                required
                className="h-12 border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus-visible:border-cyan-400/60 focus-visible:ring-cyan-400/20"
              />

            </div>
            {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}

            {errors.form && <p className="text-red-400 text-sm">{errors.form}</p>}

            <Button type="submit" className="h-12 w-full rounded-2xl bg-cyan-400 text-slate-950 hover:bg-cyan-300">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t border-white/10 bg-white/5 px-6 py-5">
          <Button
            variant="outline"
            className="h-12 w-full rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
            // onClick={() => navigate("/dashboard")}
            type="button"
          >
            Login with Google
          </Button>
          <p className="text-center text-sm text-slate-300">
            New here?{' '}
            <Link to={
              longlink
                ? `/auth?mode=signup&CreateNew=${encodeURIComponent(longlink)}`
                : "/auth?mode=signup"
                     } 
            className="font-medium text-white underline-offset-4 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
