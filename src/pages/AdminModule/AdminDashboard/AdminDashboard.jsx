import "./AdminDashboard.css";
import AdminCard from "../../../components/Card/AdminCard";
import { CgSandClock } from "react-icons/cg";
import { BsExclamationSquare } from "react-icons/bs";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { FaUserCheck } from "react-icons/fa";
import { RxEyeNone } from "react-icons/rx";
import { useState, lazy, Suspense, useMemo } from "react";
import useFetch from "../../../hooks/useFetch";
import BASE_URI from "../../../../config";
import { convertDate } from "../../../utils/formattingDate";

const BarChartComponent = lazy(() =>
  import("../../../components/BarChartComponent")
);
const EmployeeList = lazy(() => import("../../../components/EmployeeList"));
const AppList = lazy(() => import("../../../components/AppList"));
const Screenshots = lazy(() => import("../../../components/Screenshots"));
const Header = lazy(() => import("../../../components/Header"));
export default function AdminDashboard() {
  // const [showAllSnaps, setShowAllSnaps] = useState(false);
  const token = localStorage.getItem("token");
  const [startDate, setStartDate] = useState(new Date());
  const formattedStartDate = convertDate(startDate);

  let fetchUrl = `${BASE_URI}/admin/allEmplReport?sort_by=name&date=${formattedStartDate}`;
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(fetchUrl, fetchOptions);

  const usersData = data || {};
  const {
    mostProductive,
    mostEffective,
    mostUnproductive,
    mostOffline,
    productiveApps,
    unproductiveApps,
    neutralApps,
    allSnaps,
    barData,
  } = usersData;

  const flattenedArray = useMemo(() => barData?.flat(), [barData]);

  const productiveArray = useMemo(() => {
    return flattenedArray?.filter((item) => item.hasOwnProperty("productive"));
  }, [flattenedArray]);

  const unproductiveArray = useMemo(() => {
    return flattenedArray?.filter((item) =>
      item.hasOwnProperty("unproductive")
    );
  }, [flattenedArray]);

  // const snaps = showAllSnaps ? snaps : allSnaps?.slice(0, 8);
  if (error && !data) {
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header
          heading="Dashboard"
          isMonthFilter={false}
          isDate={true}
          selectedStartDate={startDate}
          setSelectedStartDate={setStartDate}
        />
      </Suspense>
      <p>No data found for this date!</p>
    </>;
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header
          heading="Dashboard"
          isMonthFilter={false}
          isDate={true}
          selectedStartDate={startDate}
          setSelectedStartDate={setStartDate}
        />
      </Suspense>

      <div className="px-sm-5 px-2 py-1 border-lightgreen shadow display-tabs">
        <ul className="list-unstyled d-flex gap-4 mb-0">
          <li className="py-2 px-1 bg-darkGray rounded text-white">
            Team Members
          </li>
          <li className="py-2 px-1 tab-item-hidden">Without Team</li>
          <li className="py-2 px-1 tab-item-hidden">Accounting</li>
          <li className="py-2 px-1 tab-item-hidden">Management</li>
          <li className="py-2 px-1 tab-item-hidden">Product Oversight</li>
        </ul>
        <select className="py-2 px-2 w-auto rounded border dropdown-tabs">
          <option value="" disabled selected>
            More
          </option>
          <option value="withoutTeam">Without Team</option>
          <option value="accounting">Accounting</option>
          <option value="management">Management</option>
          <option value="productOversight">Product Oversight</option>
        </select>
      </div>

      <div className="p-3 p-sm-5 d-lg-flex justify-content-between">
        <div className="d-md-flex gap-4 d-lg-block">
          <AdminCard
            icon={<CgSandClock />}
            title="Productivity"
            data={Math.round(usersData.totalProductivity)}
          />
          <AdminCard
            icon={<BsExclamationSquare />}
            title="Late"
            data={usersData.lateCount}
          />
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ maxWidth: "41%" }}
        >
          <div className="d-lg-flex gap-5 py-4 justify-content-center">
            <p>Productivity Bar</p>
            <ul className="d-flex flex-wrap list-unstyled gap-4">
              <li className="text-green">Productive</li>
              <li className="text-red">Unproductive</li>
              <li className="text-blue">Neutral</li>
            </ul>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            {/* <div style={{ maxWidth: "90%" }}> */}
            <BarChartComponent barData={barData} />
            {/* </div> */}
          </Suspense>
        </div>
        <div className="d-md-flex gap-4 d-lg-block">
          <AdminCard
            icon={<FaUserCheck />}
            title="Arrived"
            data={usersData.arrivedCount}
          />
          <AdminCard
            icon={<RxEyeNone />}
            title="Absent"
            data={usersData.absentCount}
          />
        </div>
      </div>

      <div className="d-md-flex gap-5 px-sm-5 px-3 mb-5">
        <ChartCard title="Productive" data={productiveArray} color="#36c449" />
        <ChartCard title="Slacking" data={unproductiveArray} color="#ff662f" />
      </div>

      <div className="px-sm-5 mb-5">
        <div className="container px-3">
          <div className="row mb-5">
            <div className="col-md-6 pe-sm-4 ps-sm-0 mb-5 mb-md-0">
              <Suspense fallback={<div>Loading...</div>}>
                <EmployeeList heading="Most Productive" data={mostProductive} />
              </Suspense>
            </div>
            <div className="col-md-6 pe-sm-0 ps-sm-4">
              <Suspense fallback={<div>Loading...</div>}>
                <EmployeeList heading="Most Effective" data={mostEffective} />
              </Suspense>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 pe-sm-4 ps-sm-0 mb-5 mb-md-0">
              <Suspense fallback={<div>Loading...</div>}>
                <EmployeeList
                  heading="Most Unproductive"
                  data={mostUnproductive}
                />
              </Suspense>
            </div>
            <div className="col-md-6 pe-sm-0 ps-sm-4">
              <Suspense fallback={<div>Loading...</div>}>
                <EmployeeList heading="Most Offline" data={mostOffline} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="app-scroll">
          <AppList
            heading="Productive Apps"
            data={productiveApps}
            backgound="bg-lightgreen"
            loading={false}
          />
        </div>
        <div className="app-scroll">
          <AppList
            heading="Unproductive Apps"
            data={unproductiveApps}
            backgound="bg-red"
            loading={false}
          />
        </div>
        <div className="app-scroll">
          <AppList
            heading="Neutral Apps"
            data={neutralApps}
            backgound="bg-lightGray"
            loading={false}
          />
        </div>
        <Screenshots data={allSnaps} />
      </Suspense>
    </>
  );
}

function ChartCard({ title, data, color }) {
  return (
    <div className="container border rounded shadow px-0 mb-3 mb-md-0">
      <h3 className="p-4">{title}</h3>
      <div style={{ width: "100%", height: 230 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <Area
              type="monotone"
              dataKey={title.toLowerCase()}
              stroke={color}
              fill={color}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
