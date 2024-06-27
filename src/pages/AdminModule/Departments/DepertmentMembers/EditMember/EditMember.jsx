import { useState, useEffect, useMemo, Profiler, useRef } from "react";
import BASE_URI from "../../../../../../config";
import ButtonActive from "../../../../../components/Button/ButtonActive";
import ButtonInactive from "../../../../../components/Button/ButtonInactive";
import useFetch from "../../../../../hooks/useFetch";
import formatDateToIST from "../../../../../utils/formatDateToIST";
import "./EditMember.css";
import { PiUploadSimpleLight } from "react-icons/pi";
import TimezoneSelect from "react-timezone-select";
import { PhoneInput } from "react-international-phone";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";

const EditMember = () => {
  const [formData, setFormData] = useState({
    profile: {
      fullname: "",
      phone_Number: "",
      picture: "",
      department_id: "",
    },
    users: {
      email: "",
      role_id: "",
    },
    settings: {
      screen_capture_enabled: 0,
      blur_capture_enabled: 0,
      capture_interval: "",
      capture_quality: "",
      app_tracking_enabled: 0,
      window_title_enabled: 0,
      night_shift_enabled: 0,
      url_tracking_enabled: 0,
      calender_sync_enabled: 0,
      idle_time_interval: "",
      time_zone: "",
      time_format: "",
    },
    tracking_days: {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      tracking_starts: "",
      tracking_ends: "",
    },
    working_days: {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      working_starts: "",
      working_ends: "",
    },
  });
  const [isImage, setIsImage] = useState(false);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/admin/employeeProfile/2`;
  let rolesURL = `${BASE_URI}/roles`;
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);

  const user = useMemo(() => data?.user[0] || {}, [data]);

  const { data: rolesData } = useFetch(rolesURL, fetchOptions);
  const activeRoles =
    rolesData?.data.roles.filter((item) => item.is_active === 1) || [];
  // const activeRoles = [];
  // console.log(rolesData.data.roles);

  useEffect(() => {
    if (data) {
      setFormData({
        profile: {
          fullname: user.fullname,
          phone_Number: user.phone_Number,
          picture: user.picture,
          department_id: user.department_id,
        },
        users: {
          email: user.email,
          role_id: user.role,
        },

        settings: {
          screen_capture_enabled: user.screen_capture_enabled,
          blur_capture_enabled: user.blur_capture_enabled,
          capture_interval: user.capture_interval,
          capture_quality: user.capture_quality,
          app_tracking_enabled: user.app_tracking_enabled,
          window_title_enabled: user.window_title_enabled,
          night_shift_enabled: user.night_shift_enabled,
          url_tracking_enabled: user.url_tracking_enabled,
          calender_sync_enabled: user.calender_sync_enabled,
          idle_time_interval: user.idle_time_interval,
          time_zone: user.time_zone,
          time_format: user.time_format,
        },
        tracking_days: {
          monday: user.monday,
          tuesday: user.tuesday,
          wednesday: user.wednesday,
          thursday: user.thursday,
          friday: user.friday,
          saturday: user.saturday,
          sunday: user.sunday,
          tracking_starts: user.tracking_starts,
          tracking_ends: user.tracking_ends,
        },
        working_days: {
          monday: user.working_monday,
          tuesday: user.working_tuesday,
          wednesday: user.working_wednesda,
          thursday: user.working_thursday,
          friday: user.working_friday,
          saturday: user.working_saturday,
          sunday: user.working_sunday,
          working_starts: user.working_starts,
          working_ends: user.working_ends,
        },

        // created_at: user.created_at,
        // updated_at: user.updated_at,
      });
    }
  }, [data]);

  const handleSaveChanges = () => {
    axios
      .patch(`${BASE_URI}/admin/employeeProfile/2`, formData, fetchOptions)
      .then((resp) => {
        console.log(resp.data);
        refetch;
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nameParts = name.split(".");
    if (nameParts.length > 1) {
      const [category, key] = nameParts;
      setFormData({
        ...formData,
        [category]: {
          ...formData[category],
          [key]: type === "checkbox" ? (checked ? 1 : 0) : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
      });
    }
  };

  const toggleWorkingDay = (day) => {
    setFormData({
      ...formData,
      working_days: {
        ...formData.working_days,
        [day]: formData.working_days[day] ? 0 : 1,
      },
    });
  };
  const toggleTrackingDay = (day) => {
    setFormData({
      ...formData,
      tracking_days: {
        ...formData.tracking_days,
        [day]: formData.tracking_days[day] ? 0 : 1,
      },
    });
  };

  const handlePhoneChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      phoneNo: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,

        profile: {
          picture: file,
        },
      }));
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
    setIsImage(true);
  };
  // console.log(formData);

  return (
    <div className="container-xxl p-0">
      <div className="d-md-flex justify-content-between px-md-5 px-3 py-4 bg-white">
        <div className="mb-4 mb-md-0">
          <h5 className="mb-0 custom-shadow d-inline px-3 py-2 rounded text-capitalize">
            {formData.profile.fullname || "fullname"}
          </h5>
        </div>
        <div className="d-md-flex gap-3 align-items-center">
          <ButtonActive
            heading="Save Changes"
            handleClick={handleSaveChanges}
          />
          <ButtonInactive heading="Reset Settings" />
        </div>
      </div>

      <div className="bg-lightGray1 p-sm-5 p-3">
        <div className="d-custom-flex align-item-center gap-5 mb-5">
          <div className="bg-white p-4 w-md-75 mb-custom-4">
            <h5 className="mb-3">Personal Details</h5>
            <div className="d-flex flex-direction-column gap-4 h-100">
              <div className="d-custom-flex align-items-center gap-5">
                <div>
                  {formData.profile.picture ? (
                    <div>
                      <img
                        src={
                          isImage
                            ? URL.createObjectURL(formData.profile.picture)
                            : formData.profile.picture
                        }
                        alt=""
                        style={{
                          width: "8rem",
                          height: "8rem",
                          objectFit: "cover",
                        }}
                      />

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                      <p
                        className="cursor-pointer mb-0"
                        onClick={handleFileUploadClick}
                      >
                        Upload Image <PiUploadSimpleLight />
                      </p>
                    </div>
                  ) : (
                    // <img
                    //   src={
                    //     isImage
                    //       ? URL.createObjectURL(formData.profile.picture)
                    //       : formData.profile.picture
                    //   }
                    //   alt=""
                    //   className="mb-5 rounded-circle border"
                    //   style={{
                    //     width: "11rem",
                    //     height: "11rem",
                    //     objectFit: "cover",
                    //   }}
                    // />
                    <div
                      className="mb-5 rounded-circle border flex align-items-center justify-content-center position-relative"
                      style={{
                        width: "11rem",
                        height: "11rem",
                        objectFit: "cover",
                      }}
                      onClick={handleFileUploadClick}
                    >
                      <CiImageOn className="fs-1" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                      <p className="position-absolute z-2 top-68 cursor-pointer">
                        Upload Image <PiUploadSimpleLight />
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-md-75">
                  <label htmlFor="profile.fullname" className="d-block">
                    Name
                  </label>
                  <input
                    type="text"
                    name="profile.fullname"
                    value={formData.profile.fullname}
                    onChange={handleChange}
                    className="rounded-2 border py-2 px-3 w-100 text-capitalize"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="id" className="d-block">
                  User ID
                </label>
                <input
                  type="text"
                  name="id"
                  value={user.id}
                  // onChange={handleChange}
                  className="rounded-2 border py-2 px-3 w-100"
                  readOnly
                  disabled
                />
              </div>
              <div>
                <label htmlFor="users.email" className="d-block">
                  Email
                </label>
                <input
                  type="email"
                  name="users.email"
                  value={formData.users.email}
                  onChange={handleChange}
                  className="rounded-2 border py-2 px-3 w-100"
                />
              </div>
              <div>
                <label htmlFor="profile.phone_Number" className="d-block">
                  Phone Number
                </label>
                <PhoneInput
                  value={formData.profile.phone_Number}
                  onChange={handlePhoneChange}
                  // defaultCountry="US"
                  className="rounded-2 border w-100"
                />
              </div>
              <div>
                <p>
                  Created on:{" "}
                  <span>
                    {user.created_at
                      ? formatDateToIST(user.created_at, "dateMonthYear")
                      : "N/A"}
                  </span>
                </p>
                {/* <p className="mb-0">
                  Last Updated on:{" "}
                  <span>
                    {formData.updated_at
                      ? formatDateToIST(formData.updated_at, "dateMonthYear")
                      : "N/A"}
                  </span>
                </p> */}
              </div>
            </div>
          </div>

          <div className="w-md-50 d-flex flex-direction-column gap-4">
            <div className="p-4 bg-white d-flex flex-direction-column gap-3">
              <h5>Working Days</h5>
              <div className="d-flex align-items-center gap-3">
                {[
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                  "sunday",
                ].map((day) => (
                  <p
                    key={day}
                    className={`text-center ${
                      formData.working_days[day]
                        ? "bg-graySecondary cursor-pointer"
                        : "cursor-pointer"
                    } day-circle mb-0 border text-capitalize`}
                    onClick={() => toggleWorkingDay(day)}
                  >
                    {day.slice(0, 3)}
                  </p>
                ))}
              </div>
              <div>
                <label
                  htmlFor="working_days.working_starts"
                  className="d-block"
                >
                  Work Starts
                </label>
                <input
                  type="text"
                  name="working_days.working_starts"
                  value={
                    formData.working_days.working_starts
                      ? formatDateToIST(
                          formData.working_days.working_starts,
                          "time"
                        )
                      : "N/A"
                  }
                  onChange={handleChange}
                  className="rounded-2 border py-2 px-3 w-100"
                />
              </div>
              <div>
                <label htmlFor="working_days.working_ends" className="d-block">
                  Work Ends
                </label>
                <input
                  type="text"
                  name="working_days.working_ends"
                  value={
                    formData.working_days.working_ends
                      ? formatDateToIST(
                          formData.working_days.working_ends,
                          "time"
                        )
                      : "N/A"
                  }
                  onChange={handleChange}
                  className="rounded-2 border py-2 px-3 w-100"
                />
              </div>
            </div>
            <div className="p-4 bg-white d-flex flex-direction-column gap-3">
              <h5>Tracking Days</h5>
              <div className="d-flex align-items-center gap-3">
                {[
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                  "sunday",
                ].map((day) => (
                  <p
                    key={day}
                    className={`text-center ${
                      formData.tracking_days[day]
                        ? "bg-graySecondary cursor-pointer"
                        : "cursor-pointer"
                    } day-circle mb-0 border text-capitalize`}
                    onClick={() => toggleTrackingDay(day)}
                  >
                    {day.slice(0, 3)}
                  </p>
                ))}
              </div>
              <div>
                <label
                  htmlFor="tracking_days.tracking_starts"
                  className="d-block"
                >
                  Tracking Starts
                </label>
                <input
                  type="text"
                  name="tracking_days.tracking_starts"
                  value={
                    formData.tracking_days.tracking_starts
                      ? formatDateToIST(
                          formData.tracking_days.tracking_starts,
                          "time"
                        )
                      : "N/A"
                  }
                  onChange={handleChange}
                  className="rounded-2 border py-2 px-3 w-100"
                />
              </div>
              <div>
                <label
                  htmlFor="tracking_days.tracking_ends"
                  className="d-block"
                >
                  Tracking Ends
                </label>
                <input
                  type="text"
                  name="tracking_days.tracking_ends"
                  value={
                    formData.tracking_days.tracking_ends
                      ? formatDateToIST(
                          formData.tracking_days.tracking_ends,
                          "time"
                        )
                      : "N/A"
                  }
                  onChange={handleChange}
                  className="rounded-2 border py-2 px-3 w-100"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="d-custom-flex align-item-center gap-5 mb-5">
          <div className="p-4 bg-white d-flex flex-direction-column gap-4 w-md-75  mb-custom-4">
            <h5>Screenshots</h5>
            <div className="p-2 border rounded-1 d-flex align-items-center gap-5">
              <input
                type="checkbox"
                name="settings.screen_capture_enabled"
                checked={formData.settings.screen_capture_enabled}
                onChange={handleChange}
                className="text-gray"
                style={{ width: "1.3rem", height: "1.3rem" }}
              />
              <label htmlFor="settings.screen_capture_enabled">
                Enable Screen Capture
              </label>
            </div>
            <div className="p-2 border rounded-1 d-flex align-items-center gap-5">
              <input
                type="checkbox"
                name="settings.blur_capture_enabled"
                checked={formData.settings.blur_capture_enabled}
                onChange={handleChange}
                className="text-gray"
                style={{ width: "1.3rem", height: "1.3rem" }}
              />
              <label htmlFor="settings.blur_capture_enabled">
                Blur Screen Capture
              </label>
            </div>
            <div>
              <label htmlFor="settings.capture_interval" className="d-block">
                Screen Capture Interval
              </label>
              <select
                name="settings.capture_interval"
                value={formData.settings.capture_interval}
                onChange={handleChange}
                className="rounded-2 border py-2 px-3 w-100"
              >
                {[5, 10, 15, 20, 25, 30].map((interval) => (
                  <option key={interval} value={interval}>
                    {interval} min
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="settings.capture_quality" className="d-block">
                Screen Capture Quality
              </label>
              <select
                name="settings.capture_quality"
                value={formData.settings.capture_quality}
                onChange={handleChange}
                className="rounded-2 border py-2 px-3 w-100"
              >
                <option value="">Select Capture Quality</option>
                <option value="1080x720">1080x720 (High)</option>
                <option value="640x480">640x480 (Medium)</option>
                <option value="320x240">320x240 (Low)</option>
              </select>
            </div>
          </div>

          <div className="w-md-50 d-flex flex-direction-column gap-4">
            <div className="p-4 bg-white d-flex flex-direction-column gap-3">
              <h5>Geo Location</h5>
              <div>
                <label htmlFor="settings.time_zone" className="d-block">
                  Time Zone
                </label>
                <TimezoneSelect
                  labelStyle="abbrev"
                  displayValue="UTC"
                  name="settings.time_zone"
                  value={formData.settings.time_zone}
                  // onChange={handleTimezoneChange}
                  className="rounded-2 border w-100"
                />
              </div>
              <div>
                <label htmlFor="settings.time_format" className="d-block">
                  Time Format
                </label>
                <select
                  name="settings.time_format"
                  value={formData.settings.time_format}
                  onChange={handleChange}
                  className="rounded-2 border py-2 px-3 w-100"
                >
                  <option value="12h">12-hour</option>
                  <option value="24h">24-hour</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-white d-flex flex-direction-column gap-3">
              <h5>Adminstration</h5>
              <div>
                <label htmlFor="users.role_id" className="d-block">
                  Select Role
                </label>
                <select
                  name="users.role_id"
                  value={formData.users.role_id}
                  onChange={handleChange}
                  className="rounded-2 border py-2 px-3 w-100 text-capitalize"
                >
                  <option value="">Select a role</option>
                  {activeRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 d-flex flex-direction-column gap-4">
          <h5>Tracking</h5>
          <div className="d-flex gap-5 flex-wrap">
            <div className="p-2 border rounded-1 d-flex align-items-center gap-5 w-md-45">
              <input
                type="checkbox"
                name="settings.app_tracking_enabled"
                checked={formData.settings.app_tracking_enabled}
                onChange={handleChange}
                className="text-gray"
                style={{ width: "1.3rem", height: "1.3rem" }}
              />
              <label htmlFor="settings.app_tracking_enabled">
                Disable App Tracking
              </label>
            </div>
            <div className="p-2 border rounded-1 d-flex align-items-center gap-5 w-md-45">
              <input
                type="checkbox"
                name="settings.url_tracking_enabled"
                checked={formData.settings.url_tracking_enabled}
                onChange={handleChange}
                className="text-gray"
                style={{ width: "1.3rem", height: "1.3rem" }}
              />
              <label htmlFor="settings.url_tracking_enabled">
                Disable URL Tracking
              </label>
            </div>
            <div className="p-2 border rounded-1 d-flex align-items-center gap-5 w-md-45">
              <input
                type="checkbox"
                name="settings.window_title_enabled"
                checked={formData.settings.window_title_enabled}
                onChange={handleChange}
                className="text-gray"
                style={{ width: "1.3rem", height: "1.3rem" }}
              />
              <label htmlFor="settings.window_title_enabled">
                Disable Windows Title
              </label>
            </div>
            <div className="p-2 border rounded-1 d-flex align-items-center gap-5 w-md-45">
              <input
                type="checkbox"
                name="settings.calender_sync_enabled"
                checked={formData.settings.calender_sync_enabled}
                onChange={handleChange}
                className="text-gray"
                style={{ width: "1.3rem", height: "1.3rem" }}
              />
              <label htmlFor="settings.calender_sync_enabled">
                Disable Calender Sync
              </label>
            </div>
            <div className="p-2 border rounded-1 d-flex align-items-center gap-5 w-md-45">
              <input
                type="checkbox"
                name="settings.night_shift_enabled"
                checked={formData.settings.night_shift_enabled}
                onChange={handleChange}
                className="text-gray"
                style={{ width: "1.3rem", height: "1.3rem" }}
              />
              <label htmlFor="settings.night_shift_enabled">
                Disable Night Shifts
              </label>
            </div>
            <div className="w-md-45">
              <label htmlFor="settings.idle_time_interval" className="d-block">
                Idle Time Tracking
              </label>
              <select
                name="settings.idle_time_interval"
                value={formData.settings.idle_time_interval}
                onChange={handleChange}
                className="rounded-2 border py-2 px-3 w-100"
              >
                {[5, 10, 15, 20, 25, 30].map((interval) => (
                  <option key={interval} value={interval}>
                    {interval} minutes
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="w-45">
              <label htmlFor="offline_time" className="d-block">
                Offline Time
              </label>
              <input
                type="text"
                name="offline_time"
                value={formData.offline_time}
                onChange={handleChange}
                className="rounded-2 border py-2 px-3 w-100"
              />
            </div>
            <div className="w-45">
              <label htmlFor="default_app_productivity" className="d-block">
                Default Application Productivity
              </label>
              <input
                type="text"
                name="default_app_productivity"
                value={formData.default_app_productivity}
                onChange={handleChange}
                className="rounded-2 border py-2 px-3 w-100"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMember;
