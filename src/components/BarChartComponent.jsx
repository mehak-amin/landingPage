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
        timeSlot: `${(index + 1) * 10}min`,
        productive: slot.productive || 0,
        unproductive: slot.unproductive || 0,
        neutral: slot.neutral || 0,
        idleTime: slot.idleTime || 0,
      })),
    [aggregatedSlotDataResult]
  );

  // console.log(chartData);

  const formatXAxis = useCallback((tickItem) => {
    const minutes = parseInt(tickItem.replace("min", ""), 10);
    if (minutes % 60 === 0) {
      return `${minutes / 60}h`;
    }
    return "";
  }, []);

  if (barData?.length === 0) {
    return (
      <div
        className="text-center h-100 d-flex justify-content-center align-items-center px-4 mb-4"
        style={{ border: "4px dashed #efecec" }}
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

  return (
    <div className="text-center mb-4 barChart">
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
