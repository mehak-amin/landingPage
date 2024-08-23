import { useMemo, useCallback } from "react";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";

const BarChartComponent = ({ barData }) => {
  const aggregateSlotData = useCallback((data) => {
    return (
      data &&
      data.map((slots) => {
        return slots.reduce((acc, slot) => {
          const category = Object.keys(slot)[0];
          acc[category] = (acc[category] || 0) + slot[category];
          return acc;
        }, {});
      })
    );
  }, []);

  const aggregatedSlotDataResult = useMemo(
    () => aggregateSlotData(barData),
    [barData, aggregateSlotData]
  );
  const formatValueWithMinutes = (value) => {
    return `${value.toFixed(1)}m`; // Format value with one decimal place followed by 'm'
  };

  const chartData = useMemo(
    () =>
      aggregatedSlotDataResult &&
      aggregatedSlotDataResult.map((slot, index) => ({
        timeSlot: `${(index + 1) * 10}min`,
        productive: Math.round(slot.productive / 60) || 0,
        unproductive: Math.round(slot.unproductive / 60) || 0,
        neutral: Math.round(slot.neutral / 60) || 0,
        idleTime: Math.round(slot.idleTime / 60) || 0,
      })),
    [aggregatedSlotDataResult]
  );

  //hourly format
  // const formatXAxis = useCallback((tickItem) => {
  //   const minutes = parseInt(tickItem.replace("min", ""), 10);
  //   if (minutes % 60 === 0) {
  //     return `${minutes / 60}h`;
  //   }
  //   return "";
  // }, []);

  //24hr format
  const startTime = new Date("2024-08-23T10:00:00"); // Example start time at 10:00 AM
  const formatXAxis = useCallback(
    (tickItem, index) => {
      const barsPerHour = 6; // Since each bar represents 10 minutes, 6 bars = 1 hour
      if (index % barsPerHour === 0) {
        const currentTime = new Date(startTime);
        currentTime.setMinutes(currentTime.getMinutes() + index * 10); // Calculate the time for the current bar
        const hours = currentTime.getHours().toString().padStart(2, "0");
        const minutes = currentTime.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      }
      return ""; // Return an empty string for bars that do not fall on the hour mark
    },
    [startTime]
  );

  //am/pm format
  // const formatXAxis = useCallback(
  //   (tickItem, index) => {
  //     const barsPerHour = 6; // Since each bar represents 10 minutes, 6 bars = 1 hour
  //     if (index % barsPerHour === 0) {
  //       const currentTime = new Date(startTime);
  //       currentTime.setMinutes(currentTime.getMinutes() + index * 10); // Calculate the time for the current bar

  //       let hours = currentTime.getHours();
  //       const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  //       const ampm = hours >= 12 ? 'PM' : 'AM';

  //       hours = hours % 12;
  //       hours = hours ? hours : 12; // the hour '0' should be '12'

  //       return `${hours}:${minutes} ${ampm}`;
  //     }
  //     return ''; // Return an empty string for bars that do not fall on the hour mark
  //   },
  //   [startTime]
  // );

  if (barData?.length === 0) {
    return (
      <div
        className="text-center d-flex justify-content-center align-items-center px-4 mb-5"
        style={{ border: "4px dashed #efecec", height: "20rem" }}
      >
        <div>
          <h4>No, Bar Data found</h4>
          <p className="fw-light text-secondary">
            There is no tracking for this date, Please select another date!
          </p>
        </div>
      </div>
    );
  }

  // Custom Tooltip function
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip p-3"
          style={{ backgroundColor: "white" }}
        >
          <p className="label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}m`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="text-center mb-4 barChart">
      <BarChart
        width={
          chartData &&
          (chartData.length <= 5
            ? chartData.length * 60
            : chartData.length * 28)
        }
        height={300}
        data={chartData}
        barSize={20}
        barGap={0}
        barCategoryGap={0}
        margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
      >
        <XAxis
          dataKey="timeSlot"
          interval={0}
          height={70}
          tickFormatter={formatXAxis}
          axisLine={{ stroke: "red" }} // Set the X-axis line color to red
          tick={{ fill: "#000" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="productive" fill="#36c449" stackId="a" />
        <Bar dataKey="unproductive" fill="#ff662f" stackId="a" />
        <Bar dataKey="neutral" fill="#D3D3D3" stackId="a" />
        <Bar dataKey="idleTime" fill="#e9ecef" stackId="a" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
