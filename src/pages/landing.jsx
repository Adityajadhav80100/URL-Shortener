import React, { useState } from 'react'
import { ArrowRight, Link2, Sparkles } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import { UrlState } from '../context'

function LandingPage() {
  const [longURL, setlongURL] = useState('')
  const navigate = useNavigate()
  const { user } = UrlState()

  const handleshorten = (e) => {
    e.preventDefault()

    if (longURL) {
      const destination = user ? '/dashboard' : '/auth'
      navigate(`${destination}?CreateNew=${encodeURIComponent(longURL)}`)
    }
  }
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.24),transparent_35%),linear-gradient(180deg,#050816_0%,#070b18_45%,#03050b_100%)] px-6 py-10 text-white">
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
        <section className="relative w-full max-w-5xl rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <div className="pointer-events-none absolute inset-0 rounded-4xl bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
          <div className="relative z-10 flex flex-col">
          <div className="flex justify-center">
            <Badge className="gap-2 border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-cyan-100">
              <Sparkles className="h-4 w-4" />
              built for fast sharing
            </Badge>
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-balance text-4xl font-black tracking-tight text-white sm:text-6xl">
              the only url shortener
              <br />
              you&rsquo;ll ever need
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Create clean, short links in seconds. Keep your workflow simple,
              your links readable, and your landing page centered where it should
              be.
            </p>
          </div>

          <form
            className="mx-auto mt-8 w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-lg shadow-black/20 sm:p-6"
            onSubmit={handleshorten}
          >
            <Field>
              <FieldLabel htmlFor="input-badge" className="mb-2 text-left text-sm font-medium text-slate-200">
                Website URL
              </FieldLabel>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Link2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="input-badge"
                    type="url"
                    value={longURL}
                    onChange={(e) => setlongURL(e.target.value)}
                    placeholder="https://api.example.com/"
                    className="h-14 border-white/10 bg-white/5 pl-11 text-base text-white placeholder:text-slate-500 focus-visible:border-cyan-400/60 focus-visible:ring-cyan-400/20"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Shorten link
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Field>
          </form>

          <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Clean links</p>
              <p className="mt-1 text-sm text-slate-300">Turn long URLs into short, shareable links.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Fast workflow</p>
              <p className="mt-1 text-sm text-slate-300">Paste, shorten, copy, and move on.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Centered design</p>
              <p className="mt-1 text-sm text-slate-300">The whole hero now sits in the middle of the screen.</p>
            </div>
          </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage
