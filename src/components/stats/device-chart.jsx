import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#38bdf8', '#14b8a6', '#f59e0b', '#818cf8']

function DeviceChart({ data = [] }) {
  return (
    <section className="flex h-full min-h-0 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 text-white shadow-lg shadow-black/20 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Device Info
          </p>
          <h2 className="mt-1 text-base font-semibold text-white">Clicks by device</h2>
        </div>
      </div>

      <div className="min-h-0 flex-1 h-36 sm:h-40 lg:h-44">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={74}
                innerRadius={42}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`${entry.name}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(2, 6, 23, 0.96)',
                  border: '1px solid rgba(148,163,184,0.2)',
                  borderRadius: '14px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-slate-400">
            No device data yet
          </div>
        )}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-3 py-2 text-xs sm:text-sm"
          >
            <span className="flex items-center gap-2 text-slate-300">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {item.name}
            </span>
            <span className="text-white">{item.count}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DeviceChart
