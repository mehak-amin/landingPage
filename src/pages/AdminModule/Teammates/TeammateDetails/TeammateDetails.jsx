import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../../../../../config";
import Header from "../../../../components/Header";
import AdminCard from "../../../../components/Card/AdminCard";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { CgSandClock } from "react-icons/cg";
import { BsExclamationSquare } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { VscThumbsup } from "react-icons/vsc";
import { LuUsers2 } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa";
import useFetch from "../../../../hooks/useFetch";
import AppList from "../../../../components/AppList";
import Screenshots from "../../../../components/Screenshots";
export default function TeammateDetails() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { id } = useParams();
  const token = localStorage.getItem("token");

  let url = `${BASE_URI}/admin/employee/${id}?from=2024-05-17&to=2024-05-17`;
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error } = useFetch(url, fetchOptions);

  const userData = data || {};
  const { name, snaps, userUsage } = userData;

  const calculateTime = (data) => {
    if (typeof data === "object") {
      const totalSeconds = data?.reduce((acc, time) => acc + time, 0);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      const formattedTime = `${hours}h ${minutes}min`;

      return formattedTime;
    } else {
      const hours = Math.floor(data / 3600);
      const minutes = Math.floor((data % 3600) / 60);

      const formattedTime = `${hours}h ${minutes}min`;

      return formattedTime;
    }
  };

  const aggregateSlotData = (data) => {
    const aggregated = data?.map((slots) => {
      const slotData = slots.reduce((acc, slot) => {
        const category = Object.keys(slot)[0];
        acc[category] = (acc[category] || 0) + slot[category];
        return acc;
      }, {});
      return slotData;
    });
    return aggregated;
  };

  // console.log(barData);
  const aggregatedSlotDataResult = aggregateSlotData(userUsage?.barData);
  // console.log(aggregatedSlotDataResult);

  const chartData = aggregatedSlotDataResult?.map((slot, index) => ({
    timeSlot: `Slot ${index + 1}`,
    productive: slot.productive || 0,
    unproductive: slot.unproductive || 0,
    neutral: slot.neutral || 0,
  }));

  const formatXAxis = (tickItem) => {
    // console.log(tickItem);
    if (
      tickItem === "10:00 AM" ||
      tickItem === "01:00 PM" ||
      tickItem === "04:00 PM"
    ) {
      // console.log(tickItem);
      return tickItem;
    } else {
      return "";
    }
  };

  return (
    <div>
      <Header
        heading={name}
        isMonthFilter={true}
        isDate={true}
        selectedStartDate={startDate}
        setSelectedStartDate={setStartDate}
        selectedEndDate={endDate}
        setSelectedEndDate={setEndDate}
      />
      <div className="bg-lightGray1">
        <div className="d-md-flex gap-3 p-5">
          <div>
            <AdminCard
              icon={<CgSandClock />}
              title="Productivity"
              data={`${Math.round(userUsage?.productivityStamps)}%`}
            />
            <AdminCard
              icon={<BsExclamationSquare />}
              title="Left at"
              data={userUsage?.leftTimeStamps}
            />
            <AdminCard
              icon={<CiClock2 />}
              title="DeskTime"
              data={calculateTime(userUsage?.desktimes)}
            />
          </div>
          <div>
            <div className="px-3 py-2 border-4 border-white border rounded mb-5">
              <p className="fs-4 fw-medium">Productivity Bar</p>
              {isLoading ? (
                <ShimmerThumbnail height={250} rounded />
              ) : (
                <div
                  className="text-center barChart"
                  // style={{ overflowX: "auto", maxWidth: "100%" }}
                >
                  <BarChart
                    // width={1200}
                    width={
                      chartData?.length <= 2
                        ? chartData?.length * 60
                        : chartData?.length * 28
                    }
                    height={350}
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
                  </BarChart>
                </div>
              )}
            </div>
            <div className="d-md-flex gap-3">
              <AdminCard
                icon={<VscThumbsup />}
                title="Effectiveness"
                data={`${Math.round(userUsage?.effectivenessStamps)}%`}
              />
              <AdminCard
                icon={<CiClock2 />}
                title="Productive Time"
                data={calculateTime(userUsage?.productiveTimeStamps)}
              />
            </div>
          </div>
          <div>
            <AdminCard
              icon={<FaUserCheck />}
              title="Arrival Time"
              data={userUsage?.arrivalTimeStamps}
            />
            <AdminCard
              icon={<CiClock2 />}
              title="Time at Work"
              data={calculateTime(userUsage?.timeAtWork)}
            />
            <AdminCard
              icon={<LuUsers2 />}
              title="Team Place"
              data={userUsage?.teamPlace}
            />
          </div>
        </div>

        <AppList
          heading="Productive Apps"
          data={userUsage?.productiveUniqueApps}
          backgound="bg-lightgreen"
          loading={isLoading}
        />
        <AppList
          heading="Unproductive Apps"
          data={userUsage?.unproductiveUniqueApps}
          backgound="bg-red"
          loading={isLoading}
        />
        <AppList
          heading="Neutral Apps"
          data={userUsage?.neutralUniqueApps}
          backgound="bg-lightGray"
          loading={isLoading}
        />
        {/* <div>
          <div className="px-5 py-2 bg-gray d-flex align-items-center justify-content-between">
            <div className="bg-white px-3 py-1 rounded-1 shadow fw-bolder">
              Screenshots Selected 0
            </div>
            <div className="d-flex gap-3 align-items-center">
              <button className="px-3 py-1 border-0 rounded-1 fw-bolder">
                Select all
              </button>
              <RiDeleteBin6Line className="fs-3" />
            </div>
          </div> */}
        <Screenshots data={snaps} />
        {/* </div> */}
      </div>
    </div>
  );
}
