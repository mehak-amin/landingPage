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

  const chartData = useMemo(
    () =>
      aggregatedSlotDataResult &&
      aggregatedSlotDataResult.map((slot, index) => ({
        timeSlot: `Slot ${index + 1}`,
        productive: slot.productive || 0,
        unproductive: slot.unproductive || 0,
        neutral: slot.neutral || 0,
        idleTime: slot.idleTime || 0,
      })),
    [aggregatedSlotDataResult]
  );

  const formatXAxis = useCallback((tickItem) => {
    if (
      tickItem === "10:00 AM" ||
      tickItem === "01:00 PM" ||
      tickItem === "04:00 PM"
    ) {
      return tickItem;
    } else {
      return "";
    }
  }, []);

  return (
    <div className="text-center barChart">
      <BarChart
        width={
          chartData &&
          (chartData.length <= 2
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
        />
        <Tooltip />
        <Bar dataKey="productive" fill="#36c449" stackId="a" />
        <Bar dataKey="unproductive" fill="#ff662f" stackId="a" />
        <Bar dataKey="neutral" fill="#D3D3D3" stackId="a" />
        <Bar dataKey="idleTime" fill="#e9ecef" stackId="a" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
