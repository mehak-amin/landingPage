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
export default function PercentageCard({ title, data }) {
  const newData = data
    ? data.map((time, index) => ({
        day: index + 1,
        arrivalTime: time.toFixed(2),
      }))
    : [];
  console.log(newData);
  const dummyData = [...newData, { day: 1, arrivalTime: "30" }];

  function calculateMean(durations) {
    const total = durations && durations.reduce((acc, curr) => acc + curr, 0);

    const mean = durations && (total / durations.length).toFixed(2);

    return mean;
  }

  const mean = calculateMean(data);

  return (
    <div className="mb-4">
      <Card className=" shadow px-2 px-sm-4 ">
        <Card.Body className="p-2 p-sm-3">
          <Card.Text className="fw-bold">{title}</Card.Text>
          <Card.Title className="text-green">{mean} %</Card.Title>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                // width={300}
                // height={200}
                data={newData?.length === 1 ? dummyData : newData}
                margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis dataKey="day" /> */}
                {/* <YAxis /> */}
                <Tooltip />
                <Line type="monotone" dataKey="arrivalTime" stroke="#36c449" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
