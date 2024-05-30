import { Card } from "react-bootstrap";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function CustomCard({ title, data }) {
  // const newData = data
  //   ? data.map((time, index) => ({
  //       day: index + 1,
  //       arrivalTime: time,
  //     }))
  //   : [];
  // console.log(newData);

  // const formatDeskTime = (hours, minutes) => {
  //   if (hours === 0) {
  //     return `${minutes}m`;
  //   } else if (minutes === 0) {
  //     return `${hours}h`;
  //   } else {
  //     return `${hours}h ${minutes}m`;
  //   }
  // };

  // const deskTimesGraph = (durationsInSeconds) => {
  // Convert durations from seconds to hours and minutes
  const data1 =
    data &&
    data.map((duration, index) => {
      // const hours = Math.floor(duration / 3600);
      const minutes = Math.floor(duration / 60);
      return { time: minutes, day: index + 1 };
    });

  console.log(data1);
  // };

  // deskTimesGraph(data);

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
      <Card className=" shadow px-2 px-sm-4 ">
        <Card.Body className="p-2 p-sm-3">
          <Card.Text className="fw-bold">{title}</Card.Text>
          <Card.Title className="text-green">
            {hours}h {minutes}m
          </Card.Title>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                // width={300}
                // height={200}
                data={data1}
                margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis dataKey="day" /> */}
                {/* <YAxis dataKey="time" /> */}
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="#36c449"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
