import { Card } from "react-bootstrap";

import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function CustomCard({ title, data }) {
  const data1 =
    data &&
    data.map((duration, index) => {
      const minutes = Math.floor(duration / 60);
      return { time: minutes, day: index + 1 };
    });

  function calculateTotalDeskTimeInHoursAndMinutes(durationsInSeconds) {
    const totalSeconds =
      durationsInSeconds &&
      durationsInSeconds.reduce((acc, curr) => acc + curr, 0);

    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
  }

  const { hours, minutes } = calculateTotalDeskTimeInHoursAndMinutes(data);

  return (
    <div className="mb-4">
      <Card className="custom-shadow px-2 px-sm-4 ">
        <Card.Body className="p-2 p-sm-3">
          <Card.Text className="fw-bold">{title}</Card.Text>
          <Card.Title className="text-green">
            {hours}h {minutes}m
          </Card.Title>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data1}
                margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="#36c449"
                  dot={false}
                  activeDot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
