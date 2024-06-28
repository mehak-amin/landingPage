import "./AdminDashboard.css";
import AdminCard from "../../../components/Card/AdminCard";
import { BsExclamationSquare } from "react-icons/bs";
import { LuUserCheck2 } from "react-icons/lu";
import { GiSandsOfTime } from "react-icons/gi";
import { RxEyeNone } from "react-icons/rx";
import { useState, lazy, Suspense, useMemo } from "react";
import useFetch from "../../../hooks/useFetch";
import BASE_URI from "../../../../config";
import { convertDate } from "../../../utils/formattingDate";
import BarChartComponent from "../../../components/BarChartComponent";
import ChartCard from "../../../components/ChartCard";
import NoData from "../../../components/NoData";

const EmployeeList = lazy(() => import("../../../components/EmployeeList"));
const AppList = lazy(() => import("../../../components/AppList"));
const Screenshots = lazy(() => import("../../../components/Screenshots"));
const Header = lazy(() => import("../../../components/Header"));
export default function AdminDashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const formattedStartDate = convertDate(startDate);
  const token = localStorage.getItem("token");
  let fetchUrl = `${BASE_URI}/admin/allEmplReport?date=${formattedStartDate}`;
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(fetchUrl, fetchOptions);

  const usersData = data || {};
  console.log(data);
  console.log("Hello");
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
    <div className="container-xxl px-0">
      <Suspense fallback={<div>Loading...</div>}>
        <Header
          heading="Dashboard"
          isMonthFilter={false}
          isDate={true}
          selectedStartDate={startDate}
          setSelectedStartDate={setStartDate}
        />
      </Suspense>
      <NoData />
    </div>;
  }
  return (
    <div className="container-xxl px-0">
      <Suspense fallback={<div>Loading...</div>}>
        <Header
          heading="Dashboard"
          isMonthFilter={false}
          isDate={true}
          selectedStartDate={startDate}
          setSelectedStartDate={setStartDate}
        />
      </Suspense>

      <div className="px-sm-5 p-2 border-lightgreen custom-shadow display-tabs">
        <ul className="list-unstyled d-flex gap-4 mb-0">
          <li className="py-2 px-1 bg-darkGray rounded text-white cursor-pointer">
            Team Members
          </li>
          <li className="py-2 px-1 tab-item-hidden cursor-pointer">
            Without Team
          </li>
          <li className="py-2 px-1 tab-item-hidden cursor-pointer">
            Accounting
          </li>
          <li className="py-2 px-1 tab-item-hidden cursor-pointer">
            Management
          </li>
          <li className="py-2 px-1 tab-item-hidden cursor-pointer">
            Product Oversight
          </li>
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

      <div className="p-3 p-sm-5 d-xxl-flex  justify-content-between">
        <div className="d-md-flex gap-4 d-xxl-block">
          <AdminCard
            icon={<GiSandsOfTime />}
            title="Productivity"
            data={
              usersData ? `${Math.round(usersData?.totalProductivity)}%` : "--"
            }
          />
          <AdminCard
            icon={<BsExclamationSquare />}
            title="Late"
            data={usersData.lateCount}
          />
        </div>
        <div
          className="d-flex flex-column justify-content-between w-100 max-w-41"
          // style={{ minWidth: "41%" }}
        >
          <div className="d-lg-flex  gap-5 py-4 justify-content-center custom-wrap-420">
            <p>Productivity Bar</p>
            <ul className="d-flex  list-unstyled gap-4">
              <li className="text-green">Productive</li>
              <li className="text-red">Unproductive</li>
              <li className="text-blue">Neutral</li>
            </ul>
          </div>
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <BarChartComponent barData={barData} />
          {/* </Suspense> */}
        </div>
        <div className="d-md-flex gap-4 d-xxl-block">
          <AdminCard
            icon={<LuUserCheck2 />}
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
        <div className="container-fluid px-3">
          <div className="row mb-5">
            <div className="col-md-6 pe-md-4 ps-md-0 mb-5 mb-md-0">
              <Suspense fallback={<div>Loading...</div>}>
                <EmployeeList heading="Most Productive" data={mostProductive} />
              </Suspense>
            </div>
            <div className="col-md-6 pe-md-0 ps-md-4">
              <Suspense fallback={<div>Loading...</div>}>
                <EmployeeList heading="Most Effective" data={mostEffective} />
              </Suspense>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 pe-md-4 ps-md-0 mb-5 mb-md-0">
              <Suspense fallback={<div>Loading...</div>}>
                <EmployeeList
                  heading="Most Unproductive"
                  data={mostUnproductive}
                />
              </Suspense>
            </div>
            <div className="col-md-6 pe-md-0 ps-md-4">
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
    </div>
  );
}
