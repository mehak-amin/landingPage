import BASE_URI from "../../../../config";
import ButtonActive from "../../../components/Button/ButtonActive";
import ButtonInactive from "../../../components/Button/ButtonInactive";
import useFetch from "../../../hooks/useFetch";
import { useState, useEffect, useRef } from "react";
import { CiImageOn } from "react-icons/ci";
import { PiUploadSimpleLight } from "react-icons/pi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./UserProfile.css";

export default function UserProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    image: "",
  });
  const [isImage, setIsImage] = useState(false);
  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/employee/profile`;

  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (data) {
      setFormData({
        fullName: data.user.fullname,
        email: data.user.email,
        phoneNo: data.user.phone_Number || "",
        image: data.user.picture,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        image: file,
      }));
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
    setIsImage(true);
  };

  const handleSubmit = (e) => {
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
        if (data.success) {
          refetch();
        } else {
          console.error("Failed to update profile");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="container-xxl p-0">
      <div className="d-md-flex justify-content-between px-sm-5 px-3 py-4 bg-white">
        <div className="mb-4 mb-md-0">
          <h5 className="mb-0 custom-shadow d-inline px-3 py-2 rounded text-capitalize">
            My Profile
          </h5>
        </div>
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <ButtonActive heading="Save Changes" handleClick={handleSubmit} />
          <ButtonInactive heading="Change Password" />
        </div>
      </div>

      <div className="bg-lightGray1 p-sm-5 p-3">
        <div className="d-md-flex align-item-center gap-5">
          <div className="bg-white p-5 w-100 mb-5 mb-md-0 h-100">
            <h4 className="mb-4 text-center">Personal Details</h4>
            <div className="text-center flex align-items-center justify-content-center">
              {formData.image ? (
                <img
                  src={
                    isImage
                      ? URL.createObjectURL(formData.image)
                      : formData.image
                  }
                  alt=""
                  className="mb-5 rounded-circle border"
                  style={{
                    width: "11rem",
                    height: "11rem",
                    objectFit: "cover",
                  }}
                />
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
            <div className="d-flex flex-wrap align-items-center gap-sm-5 gap-3 h-100">
              <div className="w-md-45">
                <label htmlFor="fullName" className="d-block">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName || ""}
                  onChange={handleChange}
                  className="rounded-2 border py-2 px-3 w-100 text-capitalize"
                />
              </div>
              <div className="w-md-45">
                <label htmlFor="id" className="d-block">
                  User ID
                </label>
                <input
                  type="text"
                  name="id"
                  value={data.user.id || ""}
                  readOnly
                  disabled
                  className="rounded-2 border py-2 px-3 w-100 bg-lightGray1"
                />
              </div>
              <div className="w-md-45">
                <label htmlFor="email" className="d-block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="rounded-2 border py-2 px-3 w-100"
                />
              </div>
              <div className="w-md-45">
                <label htmlFor="phoneNo" className="d-block">
                  Phone Number
                </label>
                <PhoneInput
                  value={formData.phoneNo}
                  onChange={handlePhoneChange}
                  // defaultCountry="US"
                  className="rounded-2 border w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
