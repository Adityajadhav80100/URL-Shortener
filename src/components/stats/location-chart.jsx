import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function LocationChart({ data = [] }) {
  return (
    <section className="flex h-full min-h-0 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 text-white shadow-lg shadow-black/20 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Location Data
          </p>
          <h2 className="mt-1 text-base font-semibold text-white">Clicks by city</h2>
        </div>
      </div>

      <div className="min-h-0 flex-1 h-36 sm:h-40 lg:h-44">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.12)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <Tooltip
                cursor={{ stroke: 'rgba(148,163,184,0.18)' }}
                contentStyle={{
                  backgroundColor: 'rgba(2, 6, 23, 0.96)',
                  border: '1px solid rgba(148,163,184,0.2)',
                  borderRadius: '14px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#7dd3fc"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0, fill: '#7dd3fc' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-slate-400">
            No location data yet
          </div>
        )}
      </div>
    </section>
  )
}

export default LocationChart
