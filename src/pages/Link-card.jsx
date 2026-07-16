import { deleteUrl } from "@/db/apiurls"
import useFetch from "@/hooks/api-fetch"
import { getShortLinkUrl } from "@/lib/base-url"

import {
  Copy,
  Download,
  Trash2
} from "lucide-react"

import React from "react"

import { Link } from "react-router-dom"

function Linkcard({ url, fetchUrls }) {
  const shortLink = url?.custom_url ? url.custom_url : url?.short_url
  const shortLinkUrl = getShortLinkUrl(shortLink)

  const {
    loading: loadingDelete,
    fn: fndelete
  } = useFetch(deleteUrl)

  // ==========================================
  // DOWNLOAD QR
  // ==========================================

  const handleDownload = () => {
    const imageUrl = url?.QR

    const filename = `${url?.title}.png`

    const anchor = document.createElement("a")

    anchor.href = imageUrl
    anchor.download = filename

    document.body.appendChild(anchor)

    anchor.click()

    document.body.removeChild(anchor)
  }

  // ==========================================
  // DELETE URL
  // ==========================================

  const handleDelete = async () => {
    try {

      console.log("DELETING URL:", url.id)

      await fndelete(url.id)

      console.log("URL DELETED")

      await fetchUrls()

      console.log("URLS REFRESHED")

    } catch (error) {

      console.error("DELETE ERROR:", error)

    }
  }

  return (
    <div className="w-full">

      <div className="w-full rounded-2xl border border-slate-700 bg-slate-950/95 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm">

        <div className="flex items-start gap-4">

          {/* QR CODE */}

          <div className="shrink-0 rounded-xl bg-white p-2 ring-1 ring-slate-200/80">

            <img
              src={url?.QR}
              alt="QR code"
              className="h-28 w-28 object-contain sm:h-32 sm:w-32"
            />

          </div>

          {/* URL INFO */}

          <div className="min-w-0 flex-1 space-y-2 pt-1">

            <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">

              {url?.title}

            </h2>

            <Link
              to={`/link/${url?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block break-all text-sm text-slate-300 transition-colors"
            >

              {/* SHORT URL */}

              <span className="hover:text-cyan-300 hover:underline">

                {shortLinkUrl}

              </span>

              <br />

              {/* ORIGINAL URL */}

              <span className="hover:text-cyan-300 hover:underline">

                {url?.original_url}

              </span>

              <br />

              {/* CREATED DATE */}

              <span className="flex items-end flex-1">

                {new Date(
                  url?.created_at
                ).toLocaleDateString()}

              </span>

            </Link>

            {/* ACTION BUTTONS */}

            <div className="flex items-center justify-between gap-4 pt-2">

              {/* COPY */}

              <button
                className="text-sm text-slate-400 hover:text-cyan-300"
                onClick={() =>
                  navigator.clipboard.writeText(
                    shortLinkUrl
                  )
                }
              >

                <Copy className="mr-1 h-4 w-4" />

              </button>

              {/* DOWNLOAD */}

              <button
                className="text-sm text-slate-400 hover:text-cyan-300"
                onClick={handleDownload}
              >

                <Download className="mr-1 h-4 w-4" />

              </button>

              {/* DELETE */}

              <button
                disabled={loadingDelete}
                className="text-sm text-slate-400 hover:text-red-400 disabled:opacity-50"
                onClick={handleDelete}
              >

                <Trash2 className="mr-1 h-4 w-4" />

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Linkcard