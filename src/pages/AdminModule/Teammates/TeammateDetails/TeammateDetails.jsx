import { useState, useMemo, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import BASE_URI from "../../../../../config";
import Header from "../../../../components/Header";
import { CgSandClock } from "react-icons/cg";
import { BsExclamationSquare } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { VscThumbsup } from "react-icons/vsc";
import { LuUsers2 } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa";
import useFetch from "../../../../hooks/useFetch";
import { convertDate } from "../../../../utils/formattingDate";
import { ShimmerThumbnail } from "react-shimmer-effects";
import "./TeammateDetails.css";

const AdminCard = lazy(() => import("../../../../components/Card/AdminCard"));
const BarChartComponent = lazy(() =>
  import("../../../../components/BarChartComponent")
);
const AppList = lazy(() => import("../../../../components/AppList"));
const Screenshots = lazy(() => import("../../../../components/Screenshots"));

export default function TeammateDetails() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const formattedStartDate = useMemo(() => convertDate(startDate), [startDate]);
  const formattedEndDate = useMemo(() => convertDate(endDate), [endDate]);

  const { id } = useParams();
  const token = localStorage.getItem("token");

  let url = `${BASE_URI}/admin/employee/${id}?from=${formattedStartDate}&to=${formattedEndDate}`;
  const fetchOptions = useMemo(
    () => ({
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
    [token]
  );

  const { data, isLoading, error } = useFetch(url, fetchOptions);

  const userData = data || {};
  const { name, snaps, userUsage } = userData;
  console.log(userUsage);

  const calculateTime = (data) => {
    if (typeof data === "object") {
      const totalSeconds = data?.reduce((acc, time) => acc + time, 0);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      return `${hours}h ${minutes}min`;
    } else {
      const hours = Math.floor(data / 3600);
      const minutes = Math.floor((data % 3600) / 60);

      return `${hours}h ${minutes}min`;
    }
  };

  return (
    <div className="container-xxxl px-0">
      <Header
        heading={name}
        isMonthFilter={true}
        isDate={true}
        selectedStartDate={startDate}
        setSelectedStartDate={setStartDate}
        selectedEndDate={endDate}
        setSelectedEndDate={setEndDate}
      />
      <div className="bg-lightGray1 pb-3">
        <div className="justify-content-between p-3 p-sm-5 responsive-container">
          <div className="gap-4 align-items-center ss-display-flex">
            <Suspense fallback={<ShimmerThumbnail height={100} rounded />}>
              <AdminCard
                icon={<CgSandClock />}
                title="Productivity"
                data={
                  userUsage
                    ? `${Math.round(userUsage?.productivityStamps)}%`
                    : "--"
                }
                page="teammateDetails"
              />
              <AdminCard
                icon={<BsExclamationSquare />}
                title="Left at"
                data={userUsage?.leftTimeStamps}
                page="teammateDetails"
              />
              <AdminCard
                icon={<CiClock2 />}
                title="DeskTime"
                data={userUsage ? calculateTime(userUsage?.desktimes) : "--"}
                page="teammateDetails"
              />
            </Suspense>
          </div>
          <div style={{ maxWidth: "48%" }}>
            <div className="px-3 py-2 border-4 border-white border rounded mb-5">
              <p className="fs-4 fw-medium">Productivity Bar</p>
              {isLoading ? (
                <Suspense fallback={<ShimmerThumbnail height={250} rounded />}>
                  <ShimmerThumbnail height={250} rounded />
                </Suspense>
              ) : userUsage ? (
                <Suspense fallback={<ShimmerThumbnail height={250} rounded />}>
                  <BarChartComponent barData={userUsage?.barData} />
                </Suspense>
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "18rem" }}
                >
                  <h4 className="text-secondary">No data found!</h4>
                </div>
              )}
            </div>
            <div className="d-md-flex gap-3">
              <Suspense fallback={<ShimmerThumbnail height={100} rounded />}>
                <AdminCard
                  icon={<VscThumbsup />}
                  title="Effectiveness"
                  data={
                    userUsage
                      ? `${Math.round(userUsage?.effectivenessStamps)}%`
                      : "--"
                  }
                  page="teammateDetails"
                />
                <AdminCard
                  icon={<CiClock2 />}
                  title="Productive Time"
                  data={
                    userUsage
                      ? calculateTime(userUsage?.productiveTimeStamps)
                      : "--"
                  }
                  page="teammateDetails"
                />
              </Suspense>
            </div>
          </div>
          <div className="gap-4 align-items-center ss-display-flex">
            <Suspense fallback={<ShimmerThumbnail height={100} rounded />}>
              <AdminCard
                icon={<FaUserCheck />}
                title="Arrival Time"
                data={userUsage?.arrivalTimeStamps}
                page="teammateDetails"
              />
              <AdminCard
                icon={<CiClock2 />}
                title="Time at Work"
                data={userUsage ? calculateTime(userUsage?.timeAtWork) : "--"}
                page="teammateDetails"
              />
              <AdminCard
                icon={<LuUsers2 />}
                title="Team Place"
                data={userUsage?.teamPlace}
                page="teammateDetails"
              />
            </Suspense>
          </div>
        </div>
        <div className="app-scroll">
          <Suspense fallback={<ShimmerThumbnail height={250} rounded />}>
            <AppList
              heading="Productive Apps"
              data={userUsage?.productiveUniqueApps}
              backgound="bg-lightgreen"
              loading={isLoading}
            />
          </Suspense>
        </div>
        <div className="app-scroll">
          <Suspense fallback={<ShimmerThumbnail height={250} rounded />}>
            <AppList
              heading="Unproductive Apps"
              data={userUsage?.unproductiveUniqueApps}
              backgound="bg-red"
              loading={isLoading}
            />
          </Suspense>
        </div>
        <div className="app-scroll">
          <Suspense fallback={<ShimmerThumbnail height={250} rounded />}>
            <AppList
              heading="Neutral Apps"
              data={userUsage?.neutralUniqueApps}
              backgound="bg-lightGray"
              loading={isLoading}
            />
          </Suspense>
        </div>

        <Suspense fallback={<ShimmerThumbnail height={250} rounded />}>
          <Screenshots data={snaps} />
        </Suspense>
      </div>
    </div>
  );
}
