import { UrlState } from '@/context'
import { getClicksForUrl } from '@/db/apiClicks'
import { deleteUrl, getUrl } from '@/db/apiurls'
import useFetch from '@/hooks/api-fetch'
import LinkStatsPanel from '@/components/stats/link-stats-panel'
import { getShortLinkUrl } from '@/lib/base-url'
import { Copy, Download, LinkIcon, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Links() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { user } = UrlState()

  const {
    loading,
    data: url,
    error,
    fn,
  } = useFetch(getUrl)

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl)

  const {
    loading: loadingDelete,
    fn: fndelete,
  } = useFetch(deleteUrl)

  const handleDownload = () => {
    const imageUrl = url?.QR
    const filename = `${url?.title}.png`
    const anchor = document.createElement('a')

    anchor.href = imageUrl
    anchor.download = filename

    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  const handleDelete = async () => {
    try {
      console.log('DELETING URL:', url.id)

      await fndelete(url.id)

      console.log('URL DELETED')

      await fetchUrls()

      console.log('URLS REFRESHED')
    } catch (error) {
      console.error('DELETE ERROR:', error)
    }
  }

  useEffect(() => {
    if (user) {
      fn({
        id,
        user_id: user.id,
      })
    }
  }, [user, id])

  useEffect(() => {
    if (id) {
      fnStats(id)
    }
  }, [id])

  useEffect(() => {
    if (error) {
      navigate('/dashboard')
    }
  }, [error, navigate])

  let link = ' '
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url
  }

  const shortLinkUrl = getShortLinkUrl(link)

  return (
    <div className="grid gap-6 p-4 lg:h-[calc(100vh-8rem)] lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:overflow-hidden">
      <section className="flex h-full min-h-0 flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 text-white shadow-xl shadow-black/20 backdrop-blur-sm sm:p-5">
        {(loading || loadingStats) && (
          <h1 className="text-sm text-slate-400">Loading...</h1>
        )}

        <div className="flex min-h-0 flex-col gap-4 sm:flex-row sm:items-start">
          <div className="shrink-0 rounded-2xl bg-white p-2.5 ring-1 ring-slate-200/80">
            <img
              src={url?.QR}
              alt="QR code"
              className="h-28 w-28 object-contain sm:h-32 sm:w-32"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <div className="space-y-1">
              <span className="block truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
                {url?.title}
              </span>

              <a
                href={shortLinkUrl}
                target="_blank"
                rel="noreferrer"
                className="block break-all text-xs text-cyan-300 transition hover:text-cyan-200 sm:text-sm"
              >
                {shortLinkUrl}
              </a>

              <a
                href={url?.original_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 break-all text-xs text-slate-300 transition hover:text-white sm:text-sm"
              >
                <LinkIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>{url?.original_url}</span>
              </a>

              <span className="block text-[11px] text-slate-400">
                {new Date(url?.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white sm:px-4 sm:py-2 sm:text-sm"
                onClick={() => navigator.clipboard.writeText(shortLinkUrl)}
              >
                <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Copy
              </button>

              <button
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white sm:px-4 sm:py-2 sm:text-sm"
                onClick={handleDownload}
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Download
              </button>

              <button
                disabled={loadingDelete}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50 sm:px-4 sm:py-2 sm:text-sm"
                onClick={handleDelete}
              >
                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>

      <aside className="min-h-0 overflow-hidden lg:sticky lg:top-4">
        <LinkStatsPanel stats={stats || []} loading={loadingStats} />
      </aside>
    </div>
  )
}

export default Links
