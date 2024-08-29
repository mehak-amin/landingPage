import { useState, useEffect, useMemo, useRef } from "react";
import BASE_URI from "../../../../config";
import ButtonActive from "../../../components/Button/ButtonActive";
import ButtonInactive from "../../../components/Button/ButtonInactive";
import useFetch from "../../../hooks/useFetch";
import formatDateToIST from "../../../utils/formatDateToIST";
import TimezoneSelect from "react-timezone-select";
import { CiImageOn } from "react-icons/ci";
import { PiUploadSimpleLight } from "react-icons/pi";
import { PhoneInput } from "react-international-phone";
import axios from "axios";
import toast from "react-hot-toast";
import { ShimmerFeaturedGallery } from "react-shimmer-effects";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";
export default function AdminProfile() {
  const [formData, setFormData] = useState({
    organisations: {
      company_name: "",
      owner: "",
      industry: "",
      address: "",
      created_at: "",
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
  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/admin/adminProfile`;
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);
  const [personalData, setPersonalData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    image: "",
  });
  const adminData = useMemo(() => data?.data, [data]);
  useEffect(() => {
    if (adminData) {
      setFormData({
        organisations: {
          company_name: adminData[0].organisation.company_name,
          owner: adminData[0].organisation.owner,
          industry: adminData[0].organisation.industry,
          address: adminData[0].organisation.address,
          created_at: adminData[0].organisation.created_at,
        },
        settings: {
          screen_capture_enabled: adminData[1].setting.screen_capture_enabled,
          blur_capture_enabled: adminData[1].setting.blur_capture_enabled,
          capture_interval: adminData[1].setting.capture_interval,
          capture_quality: adminData[1].setting.capture_quality,
          app_tracking_enabled: adminData[1].setting.app_tracking_enabled,
          window_title_enabled: adminData[1].setting.window_title_enabled,
          night_shift_enabled: adminData[1].setting.night_shift_enabled,
          url_tracking_enabled: adminData[1].setting.url_tracking_enabled,
          calender_sync_enabled: adminData[1].setting.calender_sync_enabled,
          idle_time_interval: adminData[1].setting.idle_time_interval,
          time_zone: adminData[1].setting.time_zone,
          time_format: adminData[1].setting.time_format,
        },
        tracking_days: {
          monday: adminData[1].setting.monday,
          tuesday: adminData[1].setting.tuesday,
          wednesday: adminData[1].setting.wednesday,
          thursday: adminData[1].setting.thursday,
          friday: adminData[1].setting.friday,
          saturday: adminData[1].setting.saturday,
          sunday: adminData[1].setting.sunday,
          tracking_starts: adminData[1].setting.tracking_starts,
          tracking_ends: adminData[1].setting.tracking_ends,
        },
        working_days: {
          monday: adminData[1].setting.working_monday,
          tuesday: adminData[1].setting.working_tuesday,
          wednesday: adminData[1].setting.working_wednesday,
          thursday: adminData[1].setting.working_thursday,
          friday: adminData[1].setting.working_friday,
          saturday: adminData[1].setting.working_saturday,
          sunday: adminData[1].setting.working_sunday,
          working_starts: adminData[1].setting.working_starts,
          working_ends: adminData[1].setting.working_ends,
        },
      });
    }
  }, [adminData]);

  const [isImage, setIsImage] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { fullname: "", picture: "" };
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // let url = `${BASE_URI}/employee/profile`;

  // const fetchOptions = {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //   },
  // };

  useEffect(() => {
    if (data) {
      setPersonalData({
        fullName: data.user.fullname,
        email: data.user.email,
        phoneNo: data.user.phone_Number || "",
        image: data.user.picture,
      });
    }
  }, [data]);

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
  const handleTimezoneChange = (selectedOption) => {
    setFormData({
      ...formData,
      settings: {
        ...formData.settings,
        time_zone: selectedOption.value,
      },
    });
  };
  const handleSaveChanges = () => {
    let url = `${BASE_URI}/admin/updateOrg`;
    axios
      .patch(url, formData, fetchOptions)
      .then((resp) => {
        toast.success("Updated successfully", {
          position: "top-right",
        });
        refetch();
      })
      .catch((err) => {
        toast.error(err?.message, {
          position: "top-right",
        });
      });
  };

  const handlePhoneChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      phoneNo: value,
    }));
  };
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
    setIsImage(true);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };
  const handleProfileUpdate = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    fetch(`${BASE_URI}/employee/profile`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          toast.success("Updated profile successfully", {
            position: "top-right",
          });
          refetch();
          navigate("/admin/dashboard");
          console.log(data);
          const updatedUser = {
            ...user,
            fullname: data?.user?.fullname,
            picture: data?.user?.picture,
          };

          // Update state
          setUser(updatedUser);

          // Update local storage
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          toast.error("Failed to update profile", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
        });
      });
  };

  const handleSaveAndSubmit = (e) => {
    e.preventDefault();
    handleSaveChanges(); // Call the function to update organisation details
    handleProfileUpdate(); // Call the function to update profile settings
  };

  return (
    <div className="container-xxxl p-0">
      <div className="d-md-flex justify-content-between px-md-5 px-3 py-4 bg-white">
        <div className="mb-4 mb-md-0">
          <h5 className="mb-0 custom-shadow d-inline px-3 py-2 rounded text-capitalize">
            Account
          </h5>
        </div>
        <div className="d-md-flex gap-3 align-items-center">
          <ButtonActive
            heading="Save Changes"
            handleClick={handleSaveAndSubmit}
          />
          <ButtonInactive heading="Delete Account" />
        </div>
      </div>
      {isLoading ? (
        <div className="p-sm-5 p-3">
          <ShimmerFeaturedGallery row={2} col={2} card frameHeight={600} />
        </div>
      ) : (
        <div className="bg-lightGray1 p-sm-5 p-3">
          <div className="d-flex flex-column  gap-5 mb-5">
            <div className="d-flex gap-4">
              <div className="w-60">
                <div className="bg-white p-4 w-md-75 w-100 mb-4">
                  <h5 className="mb-3">Personal Details</h5>
                  <div className="d-flex flex-column gap-5 h-100">
                    <div className="text-center flex align-items-center justify-content-center">
                      {formData.image ? (
                        <div>
                          <img
                            src={
                              isImage && formData?.image instanceof Blob
                                ? URL.createObjectURL(formData?.image)
                                : formData?.image
                            }
                            alt=""
                            className="mb-2 rounded-circle border"
                            style={{
                              width: "11rem",
                              height: "11rem",
                              objectFit: "cover",
                            }}
                          />
                          <p
                            onClick={handleFileUploadClick}
                            className="cursor-pointer"
                          >
                            Change Picture <PiUploadSimpleLight />
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                          />
                        </div>
                      ) : (
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
                    <div>
                      <label htmlFor="fullName" className="d-block">
                        Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData?.fullName || ""}
                        onChange={handleChange}
                        className="rounded-2 border py-2 px-3 w-100 text-capitalize"
                      />
                    </div>
                    <div>
                      <label htmlFor="id" className="d-block">
                        User ID
                      </label>
                      <input
                        type="text"
                        name="id"
                        value={data?.user?.id || ""}
                        readOnly
                        disabled
                        className="rounded-2 border py-2 px-3 w-100 bg-lightGray1"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="d-block">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData?.email || ""}
                        onChange={handleChange}
                        className="rounded-2 border py-2 px-3 w-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="d-block">
                        Phone
                      </label>
                      <PhoneInput
                        value={formData?.phoneNo}
                        onChange={handlePhoneChange}
                        className="rounded-2 border w-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="d-block">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value="Owner"
                        className="rounded-2 border py-2 px-3 w-100"
                        readOnly
                        style={{ backgroundColor: "#e9ecef" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 w-md-75 w-100">
                  <h5 className="mb-3">Company Details</h5>
                  <div className="d-flex flex-direction-column gap-5 h-100">
                    <div>
                      <label
                        htmlFor="organisations.company_name"
                        className="d-block"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="organisations.company_name"
                        value={formData.organisations.company_name}
                        onChange={handleChange}
                        className="rounded-2 border py-2 px-3 w-100 text-capitalize"
                      />
                    </div>
                    <div>
                      <label htmlFor="organisations.owner" className="d-block">
                        Owner
                      </label>
                      <input
                        type="text"
                        name="organisations.owner"
                        value={formData.organisations.owner}
                        onChange={handleChange}
                        className="rounded-2 border py-2 px-3 w-100"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="organisations.industry"
                        className="d-block"
                      >
                        Industry
                      </label>
                      <input
                        type="text"
                        name="organisations.industry"
                        value={formData.organisations.industry}
                        onChange={handleChange}
                        className="rounded-2 border py-2 px-3 w-100"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="organisations.address"
                        className="d-block"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="organisations.address"
                        value={formData.organisations.address}
                        onChange={handleChange}
                        className="rounded-2 border py-2 px-3 w-100"
                      />
                    </div>
                    <p>
                      Created on:{" "}
                      <span>
                        {formData.organisations.created_at
                          ? formatDateToIST(
                              formData.organisations.created_at,
                              "dateMonthYear"
                            )
                          : "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-4">
                <div className="p-4 bg-white d-flex flex-direction-column gap-3">
                  <h5>Working Days</h5>
                  <div className="d-flex flex-wrap align-items-center gap-3">
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
                    <label
                      htmlFor="working_days.working_ends"
                      className="d-block"
                    >
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
                  <div className="d-flex flex-wrap align-items-center gap-3">
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

                <div className="p-4 bg-white d-flex flex-direction-column gap-5 ">
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
                    <label
                      htmlFor="settings.capture_intervall"
                      className="d-block"
                    >
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
                    <label
                      htmlFor="settings.capture_quality"
                      className="d-block"
                    >
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
                      onChange={handleTimezoneChange}
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
              </div>
            </div>

            <div>
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
                      Disable Calendar Sync
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
                    <label
                      htmlFor="settings.idle_time_interval"
                      className="d-block"
                    >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// ---------------------------------------------------------------------------
//   return (
//     <div className="container-xxxl p-0">
//       <div className="d-md-flex justify-content-between px-md-5 px-3 py-4 bg-white">
//         <div className="mb-4 mb-md-0">
//           <h5 className="mb-0 custom-shadow d-inline px-3 py-2 rounded text-capitalize">
//             Account
//           </h5>
//         </div>
//         <div className="d-md-flex gap-3 align-items-center">
//           <ButtonActive
//             heading="Save Changes"
//             handleClick={handleSaveChanges}
//           />
//           <ButtonInactive heading="Delete Account" />
//         </div>
//       </div>
//       {isLoading ? (
//         <div className="p-sm-5 p-3">
//           <ShimmerFeaturedGallery row={2} col={2} card frameHeight={600} />
//         </div>
//       ) : (
//         <div className="bg-lightGray1 p-sm-5 p-3">
//           <div className="d-flex gap-4">
//             <div className="w-60">
//               <div className="bg-white p-4 w-md-75 w-100 mb-45">
//                 <h5 className="mb-3">Personal Details</h5>
//                 <div className="d-flex flex-column gap-5 h-100">
//                   <div className="text-center flex align-items-center justify-content-center">
//                     {formData.image ? (
//                       <div>
//                         <img
//                           src={
//                             isImage && formData?.image instanceof Blob
//                               ? URL.createObjectURL(formData?.image)
//                               : formData?.image
//                           }
//                           alt=""
//                           className="mb-2 rounded-circle border"
//                           style={{
//                             width: "11rem",
//                             height: "11rem",
//                             objectFit: "cover",
//                           }}
//                         />
//                         <p
//                           onClick={handleFileUploadClick}
//                           className="cursor-pointer"
//                         >
//                           Change Picture <PiUploadSimpleLight />
//                         </p>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleFileChange}
//                           ref={fileInputRef}
//                           style={{ display: "none" }}
//                         />
//                       </div>
//                     ) : (
//                       <div
//                         className="mb-5 rounded-circle border flex align-items-center justify-content-center position-relative"
//                         style={{
//                           width: "11rem",
//                           height: "11rem",
//                           objectFit: "cover",
//                         }}
//                         onClick={handleFileUploadClick}
//                       >
//                         <CiImageOn className="fs-1" />
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleFileChange}
//                           ref={fileInputRef}
//                           style={{
//                             position: "absolute",
//                             width: "100%",
//                             height: "100%",
//                             opacity: 0,
//                             cursor: "pointer",
//                           }}
//                         />
//                         <p className="position-absolute z-2 top-68 cursor-pointer">
//                           Upload Image <PiUploadSimpleLight />
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     <label htmlFor="fullName" className="d-block">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={formData?.fullName || ""}
//                       onChange={handleChange}
//                       className="rounded-2 border py-2 px-3 w-100 text-capitalize"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="id" className="d-block">
//                       User ID
//                     </label>
//                     <input
//                       type="text"
//                       name="id"
//                       value={data?.user?.id || ""}
//                       readOnly
//                       disabled
//                       className="rounded-2 border py-2 px-3 w-100 bg-lightGray1"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="d-block">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData?.email || ""}
//                       onChange={handleChange}
//                       className="rounded-2 border py-2 px-3 w-100"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="d-block">
//                       Phone
//                     </label>
//                     <PhoneInput
//                       value={formData?.phoneNo}
//                       onChange={handlePhoneChange}
//                       className="rounded-2 border w-100"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="role" className="d-block">
//                       Role
//                     </label>
//                     <input
//                       type="text"
//                       name="role"
//                       value="Owner"
//                       className="rounded-2 border py-2 px-3 w-100"
//                       readOnly
//                       style={{ backgroundColor: "#e9ecef" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white p-4 w-md-75 mb-custom-4 w-100">
//                 <h5 className="mb-3">Company Details</h5>
//                 <div className="d-flex flex-column gap-5 h-100">
//                   <div>
//                     <label
//                       htmlFor="organisations.company_name"
//                       className="d-block"
//                     >
//                       Company Name
//                     </label>
//                     <input
//                       type="text"
//                       name="organisations.company_name"
//                       value={formData.organisations.company_name}
//                       onChange={handleChange}
//                       className="rounded-2 border py-2 px-3 w-100 text-capitalize"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="organisations.owner" className="d-block">
//                       Owner
//                     </label>
//                     <input
//                       type="text"
//                       name="organisations.owner"
//                       value={formData.organisations.owner}
//                       onChange={handleChange}
//                       className="rounded-2 border py-2 px-3 w-100"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="organisations.industry" className="d-block">
//                       Industry
//                     </label>
//                     <input
//                       type="text"
//                       name="organisations.industry"
//                       value={formData.organisations.industry}
//                       onChange={handleChange}
//                       className="rounded-2 border py-2 px-3 w-100"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="organisations.address" className="d-block">
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       name="organisations.address"
//                       value={formData.organisations.address}
//                       onChange={handleChange}
//                       className="rounded-2 border py-2 px-3 w-100"
//                     />
//                   </div>
//                   <p>
//                     Created on:{" "}
//                     <span>
//                       {formData.organisations.created_at
//                         ? formatDateToIST(
//                             formData.organisations.created_at,
//                             "dateMonthYear"
//                           )
//                         : "N/A"}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="w-md-50 d-flex flex-column gap-4">
//             <div className="p-4 bg-white d-flex flex-direction-column gap-3">
//                 <h5>Working Days</h5>
//                 <div className="d-flex flex-wrap align-items-center gap-3">
//                   {[
//                     "monday",
//                     "tuesday",
//                     "wednesday",
//                     "thursday",
//                     "friday",
//                     "saturday",
//                     "sunday",
//                   ].map((day) => (
//                     <p
//                       key={day}
//                       className={`text-center ${
//                         formData.working_days[day]
//                           ? "bg-graySecondary cursor-pointer"
//                           : "cursor-pointer"
//                       } day-circle mb-0 border text-capitalize`}
//                       onClick={() => toggleWorkingDay(day)}
//                     >
//                       {day.slice(0, 3)}
//                     </p>
//                   ))}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="working_days.working_starts"
//                     className="d-block"
//                   >
//                     Work Starts
//                   </label>
//                   <input
//                     type="text"
//                     name="working_days.working_starts"
//                     value={
//                       formData.working_days.working_starts
//                         ? formatDateToIST(
//                             formData.working_days.working_starts,
//                             "time"
//                           )
//                         : "N/A"
//                     }
//                     onChange={handleChange}
//                     className="rounded-2 border py-2 px-3 w-100"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="working_days.working_ends"
//                     className="d-block"
//                   >
//                     Work Ends
//                   </label>
//                   <input
//                     type="text"
//                     name="working_days.working_ends"
//                     value={
//                       formData.working_days.working_ends
//                         ? formatDateToIST(
//                             formData.working_days.working_ends,
//                             "time"
//                           )
//                         : "N/A"
//                     }
//                     onChange={handleChange}
//                     className="rounded-2 border py-2 px-3 w-100"
//                   />
//                 </div>
//               </div>

//               <div className="p-4 bg-white d-flex flex-column gap-3">
//                 <h5>Time Zone</h5>
//                 <TimezoneSelect
//                   value={formData?.settings?.timezone}
//                   onChange={handleTimezoneChange}
//                   className="rounded-2 border w-100"
//                 />
//               </div>

//               <div className="p-4 bg-white d-flex flex-column gap-3">
//                 <h5>Notification</h5>
//                 <div className="d-flex align-items-center justify-content-between gap-4">
//                   <p className="mb-0">SMS Notifications</p>
//                   <label className="switch">
//                     <input
//                       type="checkbox"
//                       name="settings.isSmsNotificationsEnabled"
//                       checked={
//                         formData?.settings?.isSmsNotificationsEnabled || false
//                       }
//                       onChange={handleChange}
//                     />
//                     <span className="slider round"></span>
//                   </label>
//                 </div>
//                 <div className="d-flex align-items-center justify-content-between gap-4">
//                   <p className="mb-0">Email Notifications</p>
//                   <label className="switch">
//                     <input
//                       type="checkbox"
//                       name="settings.isEmailNotificationsEnabled"
//                       checked={
//                         formData?.settings?.isEmailNotificationsEnabled || false
//                       }
//                       onChange={handleChange}
//                     />
//                     <span className="slider round"></span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
