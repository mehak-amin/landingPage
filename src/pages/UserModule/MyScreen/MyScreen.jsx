import HSBar from "react-horizontal-stacked-bar-chart";
import { useState, useMemo, lazy, Suspense } from "react";
import { ShimmerSimpleGallery, ShimmerThumbnail } from "react-shimmer-effects";
import { Row, Col } from "react-bootstrap";

import useFetch from "../../../hooks/useFetch";
import BASE_URI from "../../../../config";
import { convertDate } from "../../../utils/formattingDate";
import "./MyScreen.css";
import Header from "../../../components/Header";
import NoData from "../../../components/NoData";

const Card = lazy(() => import("../../../components/Card/Card"));
const TimeCard = lazy(() => import("../../../components/Card/TimeCard"));
const PercentageCard = lazy(() =>
  import("../../../components/Card/PercentageCard")
);
const BarChartComponent = lazy(() =>
  import("../../../components/BarChartComponent")
);
const AppList = lazy(() => import("../../../components/AppList"));

function MyScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const token = localStorage.getItem("token");
  const formattedStartDate = convertDate(startDate);
  const formattedEndDate = convertDate(endDate);

  let url = `${BASE_URI}/employee/myReport?from=${formattedStartDate}&to=${formattedEndDate}`;

  const { data, isLoading, error } = useFetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const userData = data ? data : {};

  const { report } = userData;

  const getCategoryColor = (category) => {
    switch (category) {
      case "unassigned":
        return "#404040";
      case "social media":
        return "#FF662F";
      case "news":
        return "#36C449";
      case "entertainment":
        return "#882FFF";
      case "office apps":
        return "#003074";
      case "email":
        return "#3D78CA";
      default:
        return "gray";
    }
  };

  const timeData = useMemo(
    () =>
      report?.appTypes &&
      Object.keys(report?.appTypes).map((category) => ({
        label: category,
        value: report?.appTypes[category],
        color: getCategoryColor(category),
      })),
    [report?.appTypes]
  );

  const legendItems = useMemo(
    () => [
      { color: "#3D78CA", label: "Email" },
      { color: "#FF662F", label: "Social Media" },
      { color: "#003074", label: "Office Apps" },
      { color: "#36C449", label: "News" },
      { color: "#882FFF", label: "Entertainment" },
      { color: "#404040", label: "Unassigned" },
    ],
    []
  );
  if (error && !data) {
    return (
      <div className=" container-xxl px-0 mt-1  w-100">
        <Header
          heading="My Screen"
          isMonthFilter={true}
          isDate={true}
          selectedStartDate={startDate}
          setSelectedStartDate={setStartDate}
          selectedEndDate={endDate}
          setSelectedEndDate={setEndDate}
        />
        <NoData />
      </div>
    );
  }

  return (
    <div className="container-fluid mt-1 p-0 mx-0 w-100">
      <Header
        heading="My Screen"
        isMonthFilter={true}
        isDate={true}
        selectedStartDate={startDate}
        setSelectedStartDate={setStartDate}
        selectedEndDate={endDate}
        setSelectedEndDate={setEndDate}
      />

      <div className="custom-bg-opacity px-md-5 px-3 pb-4">
        {isLoading ? (
          <ShimmerSimpleGallery card imageHeight={300} />
        ) : (
          <div className="py-4 px-0 container-fluid">
            <Row>
              <Col sm={6} md={6} lg={6} xl={4}>
                <TimeCard
                  title="Arrival Time"
                  data={report?.arrivalTimeStamps}
                />
              </Col>
              <Col sm={6} md={6} lg={6} xl={4}>
                <Card title="Desktime" data={report?.desktimes} />
              </Col>
              <Col sm={6} md={6} lg={6} xl={4}>
                <Card
                  title="Productive Time"
                  data={report?.productiveTimeStamps}
                />
              </Col>
              <Col sm={6} md={6} lg={6} xl={4}>
                <PercentageCard
                  title="Productivity"
                  data={report?.productivityStamps}
                />
              </Col>
              <Col sm={6} md={6} lg={6} xl={4}>
                <PercentageCard
                  title="Effectiveness"
                  data={report?.effectivenessStamps}
                />
              </Col>
              <Col sm={6} md={6} lg={6} xl={4}>
                <TimeCard title="Left Time" data={report?.leftTimeStamps} />
              </Col>
            </Row>
          </div>
        )}

        <div className="px-3 px-sm-5 py-2 border-4 border-white border rounded mb-5">
          <p className="fs-4 fw-medium">Productivity Bar</p>
          {isLoading ? (
            <ShimmerThumbnail height={250} rounded />
          ) : (
            <Suspense fallback={<ShimmerThumbnail height={250} rounded />}>
              <BarChartComponent barData={report?.barData} />
            </Suspense>
          )}
        </div>

        <div className="app-scroll">
          <AppList
            heading="Productive Apps"
            data={report?.productiveUniqueApps}
            backgound="bg-lightgreen"
            loading={isLoading}
          />
        </div>
        <div className="app-scroll">
          <AppList
            heading="Unproductive Apps"
            data={report?.unproductiveUniqueApps}
            backgound="bg-red"
            loading={isLoading}
          />
        </div>
        <div className="app-scroll">
          <AppList
            heading="Neutral Apps"
            data={report?.neutralUniqueApps}
            backgound="bg-lightGray"
            loading={isLoading}
          />
        </div>

        <div className="bg-white rounded  px-sm-5 px-3 pb-4">
          <p className="py-3 px-1 fs-4 fw-medium">Categories</p>

          <div className="legend-container">
            {legendItems.map((item, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="legend-label">{item.label}</span>
              </div>
            ))}
          </div>
          {isLoading ? (
            <ShimmerThumbnail height={50} rounded />
          ) : (
            // <div style={{ height: "5rem" }}>
            <HSBar
              id="hsbarExample"
              data={timeData}
              showLegend={false}
              height={50}
            />
            // </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyScreen;
