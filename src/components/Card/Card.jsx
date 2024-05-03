import { Card } from "react-bootstrap";
import "../../pages/MyScreen/MyScreen.css";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
export default function CustomCard({ title, text }) {
  // const data = [
  //   {
  //     startTime: new Date("2024-05-02T10:03:52.000Z").getTime(),
  //     duration:
  //       new Date("2024-05-02T10:06:13.000Z").getTime() -
  //       new Date("2024-05-02T10:03:52.000Z").getTime(),
  //   },
  //   {
  //     startTime: new Date("2024-05-02T10:15:23.000Z").getTime(),
  //     duration:
  //       new Date("2024-05-02T10:15:38.000Z").getTime() -
  //       new Date("2024-05-02T10:15:23.000Z").getTime(),
  //   },
  //   {
  //     startTime: new Date("2024-05-02T10:16:46.000Z").getTime(),
  //     duration:
  //       new Date("2024-05-02T10:16:53.000Z").getTime() -
  //       new Date("2024-05-02T10:16:46.000Z").getTime(),
  //   },
  // ].sort((a, b) => a.startTime - b.startTime);
  // <LineChart
  //       width={600}
  //       height={300}
  //       data={data}
  //       margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
  //     >
  //       <CartesianGrid strokeDasharray="3 3" />
  //       <XAxis dataKey="startTime" />
  //       <YAxis />
  //       <Tooltip />
  //       <Legend />
  //       <Line type="monotone" dataKey="duration" stroke="#8884d8" />
  //     </LineChart>
  return (
    <div className="col-md-4 mb-4">
      <Card className=" shadow px-4 ">
        <Card.Body>
          <Card.Text className="fw-bold">{title}</Card.Text>
          <Card.Title className="text-green">{text}</Card.Title>
          <Card.Img src="src/assets/Chart.png" />
        </Card.Body>
      </Card>
    </div>
  );
}
