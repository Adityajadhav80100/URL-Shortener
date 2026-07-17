
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
import { signUP } from "@/db/apiAuth"
import { UrlState } from "@/context"

function SignUp() { // Renamed function to SignUp
  const navigate = useNavigate()
  const [errors, setErrors] = React.useState({})
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null
  })
  const { fetchUser } = UrlState()

  const handleInputChange = (event) => {
    const { name, value, files } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loading) return;
    try {
      setErrors({})

      const schema = yup.object().shape({
        name: yup
          .string()
          .trim()
          .min(2, "Name must be at least 2 characters")
          .required("Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        profile_pic: yup
          .mixed()
          .nullable()
      })

      await schema.validate(formData, { abortEarly: false })

      const response = await fnsignUP(formData)

      await fetchUser()

      if (response?.error) {
        setErrors({ form: response.error.message || "SignUp failed" })
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
        setErrors({ form: e.message || "SignUp failed" })
      }
    }
  }

  const { data, loading, error, fn: fnsignUP } = useFetch(signUP) // Corrected fn name and passed signUP
  const [searchParams] = useSearchParams(); // Renamed useParam to searchParams

  const longlink = searchParams.get("CreateNew") // Used searchParams

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-1 shadow-2xl shadow-black/40 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
      <Card className="relative border-0 bg-transparent text-white ring-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            SignUp to your account
          </CardTitle>
          <CardDescription className="max-w-sm text-sm leading-6 text-slate-300">
            Enter your email and password to continue to your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-200">
                Name
              </Label>
              <Input
                id="name"
                type="name"
                onChange={handleInputChange}
                name="name"
                value={formData.name}
                placeholder="write your name"
                required
                className="h-12 border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus-visible:border-cyan-400/60 focus-visible:ring-cyan-400/20"
              />
            </div>
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

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
              <Label htmlFor="profile_pic" className="text-sm font-medium text-slate-200">
                Profile pic
              </Label>
              <Input
                id="profile_pic"
                type="file"
                onChange={handleInputChange}
                name="profile_pic"

                accept="image/*"

                className="h-12 border-white/15 bg-white/10 text-white placeholder:text-slate-400 focus-visible:border-cyan-400/60 focus-visible:ring-cyan-400/20"
              />
            </div>
            {errors.profile_pic && <p className="text-red-400 text-sm">{errors.profile_pic}</p>}

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

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-2xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Sign Up"}
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
            SignUp with Google
          </Button>
          <p className="text-center text-sm text-slate-300">
            Already have an account?{' '}
            <Link to={
              longlink
                ? `/auth?mode=login&CreateNew=${encodeURIComponent(longlink)}`
                : "/auth?mode=login"
            }
              className="font-medium text-white underline-offset-4 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div >
  )
}

export default SignUp
