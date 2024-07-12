import { ResponsiveContainer, AreaChart, Area } from "recharts";

export default function ChartCard({ title, data, color }) {
  return (
    <div className="container border rounded custom-shadow px-0 mb-3 mb-md-0">
      <h5 className="p-sm-4 p-3">{title}</h5>
      <div style={{ width: "100%", height: 230 }}>
        <ResponsiveContainer>
          {data?.length > 0 ? (
            <AreaChart data={data}>
              <Area
                type="monotone"
                dataKey={title.toLowerCase()}
                stroke={color}
                fill={color}
              />
            </AreaChart>
          ) : (
            <div className="px-4 d-flex align-items-center justify-content-center h-75">
              <div>
                <h5 className="text-center fw-light text-secondary">
                  No, data found!
                </h5>
              </div>
            </div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
