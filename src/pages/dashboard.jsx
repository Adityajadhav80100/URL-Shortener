import React, { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Filter } from "lucide-react"

import useFetch from "@/hooks/api-fetch"
import { getUrls } from "@/db/apiurls"
import { UrlState } from "@/context"
import { getClicks } from "@/db/apiClicks"

import Linkcard from "./Link-card"
import CreateUrl from "@/components/createUrl"

function Dashboard() {
  const [searchQueary, setSearchQueary] = useState("")

  const { user } = UrlState()

  const {
    data: urls,
    error: urlError,
    loading,
    fn: fnurls,
  } = useFetch(getUrls)

  const {
    data: clicksData,
    error: clicksError,
    loading: clicksLoading,
    fn: fnClicks,
  } = useFetch(getClicks)

  // ==========================================
  // FETCH USER URLS
  // ==========================================

  const fetchUrls = async () => {
    if (!user?.id) return

    await fnurls(user.id)
  }

  // ==========================================
  // LOAD URLS
  // ==========================================

  useEffect(() => {
    fetchUrls()
  }, [user?.id])

  // ==========================================
  // LOAD CLICKS
  // ==========================================

  useEffect(() => {
    if (urls?.length > 0) {
      const urlsId = urls.map((url) => url.id)

      fnClicks(urlsId)
    }
  }, [urls])

  // ==========================================
  // FILTER URLS
  // ==========================================

  const filterUrls = urls?.filter((url) =>
    url?.title
      ?.toLowerCase()
      .includes(searchQueary.toLowerCase())
  )

  return (
    <div className="space-y-8 py-5 pb-8">

      {/* STATS */}

      <div className="grid gap-4 md:grid-cols-2">

        <Card className="border border-white/10 bg-white/5 text-white shadow-lg shadow-black/20 backdrop-blur-sm">

          <CardHeader className="space-y-2 pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Total URLs</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-white">
              {urls?.length || 0}
            </p>
          </CardContent>

        </Card>

        <Card className="border border-white/10 bg-white/5 text-white shadow-lg shadow-black/20 backdrop-blur-sm">

          <CardHeader className="space-y-2 pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Total Clicks</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-semibold tracking-tight text-white">
              {clicksData?.length || 0}
            </p>
          </CardContent>

        </Card>

      </div>

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          My links
        </h1>

        {/* <button className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-5 py-2.5 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-slate-100">
        </button> */}
          <CreateUrl/>

      </div>

      {/* SEARCH */}

      <div className="relative">

        <input
          value={searchQueary}
          type="text"
          placeholder="Search your links"
          onChange={(e) => setSearchQueary(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-slate-400 shadow-sm outline-none transition focus:border-cyan-400/60 focus:bg-white/7 focus:ring-2 focus:ring-cyan-400/20"
        />

        <Filter className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

      </div>

      {/* URL CARDS */}

      {filterUrls?.length > 0 ? (

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

          {filterUrls.map((url) => (

            <Linkcard
              key={url.id}
              url={url}
              fetchUrls={fetchUrls}
            />

          ))}

        </div>

      ) : (

        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-10 text-center text-sm text-slate-400">
          <p>No links found.</p>
        </div>

      )}

    </div>
  )
}

export default Dashboard