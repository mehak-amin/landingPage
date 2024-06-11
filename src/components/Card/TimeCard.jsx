import { Card } from "react-bootstrap";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Scatter,
} from "recharts";
export default function TimeCard({ title, data }) {
  function calculateMeanTime(times) {
    const milliseconds = times.map((time) => {
      const [hours, minutes, seconds] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds), 0);
      return date.getTime();
    });

    const meanMilliseconds =
      milliseconds.reduce((acc, curr) => acc + curr, 0) / milliseconds.length;

    const meanDate = new Date(meanMilliseconds);
    const meanTime = meanDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return meanTime;
  }

  const meanTime = data && calculateMeanTime(data);

  const timeToDecimalHours = (timeString) => {
    const [hours, minutes, seconds] = timeString.match(/[0-9]+/g).map(Number);
    const period = timeString.match(/[a-zA-Z]+/)[0].toLowerCase();
    let hourValue = hours;
    if (period === "pm" && hours < 12) {
      hourValue += 12;
    } else if (period === "am" && hours === 12) {
      hourValue = 0;
    }
    return hourValue + minutes / 60 + seconds / 3600;
  };

  const formattedData =
    data &&
    data?.map((item) => ({
      time: timeToDecimalHours(item),
    }));
  const dummyData = [...formattedData, { time: 45 }];

  return (
    <div className="mb-4">
      <Card className="custom-shadow px-2 px-sm-4 ">
        <Card.Body className="w-100 p-2 p-sm-3">
          <Card.Text className="fw-bold">{title}</Card.Text>
          <Card.Title className="text-green">{meanTime}</Card.Title>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                // width={300}
                // height={200}
                // data={formattedData}
                data={formattedData?.length === 1 ? dummyData : formattedData}
                margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis dataKey="index" /> */}
                {/* <YAxis /> */}
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
