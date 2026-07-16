import { useMemo } from 'react'
import DeviceChart from './device-chart'
import LocationChart from './location-chart'

function LinkStatsPanel({ stats = [], loading = false }) {
  const totalClicks = stats?.length || 0

  const locationData = useMemo(() => {
    const counts = new Map()

    stats.forEach((item) => {
      const name = item?.city || item?.country || 'Unknown'
      counts.set(name, (counts.get(name) || 0) + 1)
    })

    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((first, second) => second.count - first.count)
      .slice(0, 6)
  }, [stats])

  const deviceData = useMemo(() => {
    const counts = new Map()

    stats.forEach((item) => {
      const name = item?.device || 'unknown'
      counts.set(name, (counts.get(name) || 0) + 1)
    })

    return Array.from(counts.entries())
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((first, second) => second.count - first.count)
  }, [stats])

  return (
    <div className="grid h-full min-h-0 gap-4 lg:grid-cols-2 lg:grid-rows-[auto_minmax(0,1fr)]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-4 text-white shadow-lg shadow-black/20 backdrop-blur-sm lg:col-span-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Stats</p>
        <div className="mt-3 rounded-2xl border border-white/10 bg-black/10 p-3">
          <p className="text-xs text-slate-300">Total Clicks</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
            {loading ? '...' : totalClicks}
          </p>
        </div>
      </section>

      <LocationChart data={locationData} />
      <DeviceChart data={deviceData} />
    </div>
  )
}

export default LinkStatsPanel
