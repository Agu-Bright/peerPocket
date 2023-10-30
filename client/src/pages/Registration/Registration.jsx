import "./Registration.css";
import React, { useState } from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import Button from "../../components/Button";
import logo from "../../assets/logo.svg";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { states } from "./states";
import { authState } from "../../context/authContext";
import axios from "axios";
import PositionedSnackbar from "./Alert";

const cities = [
  "Lagos",
  "Abuja",
  "Kano",
  "Ibadan",
  "Port Harcourt",
  "Benin City",
  "Jos",
  "Aba",
  "Ilorin",
  "Owerri",
  "Abeokuta",
  "Onitsha",
  "Warri",
  "Uyo",
  "Kaduna",
  "Maiduguri",
  "Enugu",
  "Zaria",
  "Sapele",
  "Calabar",
];
import RegModal from "./RegModal";
const Registration = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const handleAClose = () => {
    setAlert(false);
  };
  const [index, setIndex] = useState(0);
  const { user, setUser, data, setData, loading, setLoading } = authState();
  const navigate = useNavigate();
  const [index1, setIndex1] = useState({
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    bvnMobileNumber: "",
    preferredMobileNumber: "",
    email: "",
  });
  const [index2, setIndex2] = useState({
    motherMaidenName: "",
    maritalStatus: "",
    occupation: "",
    employmentStatus: "",
    bvn: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    setIndex1((prev) => {
      console.log(index1);
      return { ...prev, [name]: value };
    });
  };
  const handleChange2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setIndex2((prev) => {
      console.log(index2);
      return { ...prev, [name]: value };
    });
  };

  const handleIndex1Change = () => {
    console.log(index1);
    setData((prev) => {
      return { ...prev, ...index1 };
    });
    setIndex(1);
  };

  const handleRegisterUser = async () => {
    try {
      setOpen(true);
      const res = await axios.post(`/api/v1/register`, data, {
        withCredentials: true,
        credentials: "include",
      });
      setUser(res?.data?.user);
      setOpen(false);
      navigate("/dashboard");
    } catch (error) {
      setIndex(2);
      setOpen(false);
      console.log(error?.response?.data?.errMessage);
      setMessage(error?.response?.data?.errMessage);
      setAlert(true);
    }
  };

  const handleIndex2Change = async () => {
    console.log(index2);
    setData((prev) => {
      return { ...prev, ...index2 };
    });
    setIndex(2);
  };

  console.log(data);

  return (
    <Stack direction="row" className="container">
      {/* left side */}
      <Box className="left-side">
        <div>
          <img
            style={{
              width: "200px",
              height: "150px",
            }}
            src={logo}
            alt="logo"
          />
          <div className="steps">
            <ul>
              <li
                className="li"
                style={{ position: "relative" }}
                onClick={() => setIndex(0)}
              >
                {index > 0 ? (
                  <CheckIcon
                    className="icon"
                    sx={{
                      color: "white",
                      background: "#2eb796",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                ) : (
                  "1"
                )}

                <span
                  className="span"
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 55,
                    width: "250px",
                  }}
                >
                  Personal & Contact Information
                </span>
              </li>
              <div
                style={{
                  marginLeft: "25px",
                  width: "50px",
                  height: "30px",
                  borderLeft: "1px dotted black",
                }}
              ></div>
              <li
                className="li"
                style={{ position: "relative" }}
                onClick={() => setIndex(1)}
              >
                {index > 1 ? (
                  <CheckIcon
                    className="icon"
                    sx={{
                      color: "white",
                      background: "#2eb796",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                ) : (
                  "2"
                )}
                <span
                  className="span"
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 55,
                    width: "250px",
                  }}
                >
                  Additional & Address Information
                </span>
              </li>
              <div
                style={{
                  marginLeft: "25px",
                  width: "50px",
                  height: "30px",
                  borderLeft: "1px dotted black",
                }}
              ></div>
              <li
                className="li"
                style={{ position: "relative" }}
                onClick={() => setIndex(2)}
              >
                {index > 2 ? (
                  <CheckIcon
                    className="icon"
                    sx={{
                      color: "white",
                      background: "#2eb796",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                ) : (
                  "3"
                )}
                <span
                  className="span"
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 55,
                    width: "250px",
                  }}
                >
                  upload Picture{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Box>
      {/* Right side  */}
      <Box
        className="right-side"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          padding: { md: "20px", xs: "0px" },
        }}
      >
        <Box
          className="mobile-step"
          sx={{ display: { md: "none", xs: "flex" } }}
        >
          <ul className="main-mobile-step">
            <li
              className="li"
              style={{ position: "relative" }}
              onClick={() => setIndex(0)}
            >
              {index > 0 ? (
                <CheckIcon
                  className="icon"
                  sx={{
                    color: "white",
                    background: "#2eb796",
                    width: "50px",
                    height: "50px",
                  }}
                />
              ) : (
                "1"
              )}
            </li>
            <div
              style={{
                width: "50px",
                height: "30px",
                borderBottom: "1px dotted #2eb796",
              }}
            ></div>
            <li
              className="li"
              style={{ position: "relative" }}
              onClick={() => setIndex(1)}
            >
              {index > 1 ? (
                <CheckIcon
                  className="icon"
                  sx={{
                    color: "white",
                    background: "#2eb796",
                    width: "50px",
                    height: "50px",
                  }}
                />
              ) : (
                "2"
              )}
            </li>
            <div
              style={{
                width: "50px",
                height: "30px",
                borderBottom: "1px dotted #2eb796",
              }}
            ></div>
            <li
              className="li"
              style={{ position: "relative" }}
              onClick={() => setIndex(2)}
            >
              {index > 2 ? (
                <CheckIcon
                  className="icon"
                  sx={{
                    color: "white",
                    background: "#2eb796",
                    width: "50px",
                    height: "50px",
                  }}
                />
              ) : (
                "3"
              )}
            </li>
          </ul>
        </Box>
        {index === 0 && (
          <Box
            sx={{
              width: "70%",
              height: "100%",
              marginBottom: "50px",
            }}
            className="page-1"
          >
            <Box className="welcome">
              <p className="text"> Welcome!</p>
              <h5 className="text-2">Sign Up to create your account</h5>
            </Box>
            <Box
              className="personal-information"
              sx={{ width: "90%", padding: "20px 0px 0px 0px" }}
            >
              <p className="personal-information"> Personal Information</p>
              <hr className="line" />
            </Box>
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="salutation" className="label">
                  Title
                </label>
                <select
                  id="salutation"
                  name="salutation"
                  className="select"
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>
                    Select Title
                  </option>
                  <option value="Mr" onClick={(e) => console.log(e)}>
                    Mr
                  </option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="first-name" className="label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  onChange={handleChange}
                  value={index1.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last-name" className="label">
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  placeholder="Doe"
                  value={index1.middleName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last-name" className="label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Mark"
                  value={index1.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="label">
                  Gender
                </label>
                <select
                  id="category"
                  name="gender"
                  className="select"
                  value={index1.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date" className="label">
                  Date of birth
                </label>
                <input
                  type="date"
                  id="date"
                  name="dateOfBirth"
                  value={index1.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Box className="personal-information" sx={{ width: "90%" }}>
              <p className="personal-information"> Contact Information</p>
              <hr className="line" />
            </Box>
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="first-name" className="label">
                  BVN Mobiel Number
                </label>
                <input
                  type="text"
                  id="bvnMobileNumber"
                  name="bvnMobileNumber"
                  value={index1?.bvnMobileNumber}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="first-name" className="label">
                  Preferred Mobile Number
                </label>
                <input
                  type="text"
                  id="preferredMobileNumber"
                  name="preferredMobileNumber"
                  value={index1.preferredMobileNumber}
                  onChange={handleChange}
                  placeholder="Enter Mobiie Number"
                />
              </div>
              <div className="form-group-single form-group">
                <label htmlFor="last-name" className="label">
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={index1.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                />
              </div>
            </div>
            <div style={{ width: "90%" }} className="continue">
              <Button text="continue" onClick={() => handleIndex1Change()} />
            </div>
            <Typography className="typo">
              Already have an account? <span className="sign-in">Sign In</span>
            </Typography>
          </Box>
        )}
        {index === 1 && (
          <Box
            sx={{
              width: "70%",
              height: "100%",
            }}
            className="page-1"
          >
            <Box className="welcome">
              <p className="text"> Welcome!</p>
              <h5 className="text-2">Sign Up to create your account</h5>
            </Box>
            <Box
              className="personal-information"
              sx={{ width: "90%", padding: "20px 0px 0px 0px" }}
            >
              <p className="personal-information"> Additional Information</p>
              <hr className="line" />
            </Box>
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="first-name" className="label">
                  Mother’s madien name
                </label>
                <input
                  type="text"
                  id="motherMaidenName"
                  name="motherMaidenName"
                  value={index2.motherMaidenName}
                  onChange={handleChange2}
                  placeholder="Enter Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="label">
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  className="select"
                  onChange={handleChange2}
                >
                  {" "}
                  <option value="" disabled selected hidden>
                    Select Marital Status
                  </option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="last-name" className="label">
                  Occupation{" "}
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={index2.occupation}
                  onChange={handleChange2}
                  placeholder="Enter Occupation"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="label">
                  Employment Status
                </label>
                <select
                  id="employmentStatus"
                  name="employmentStatus"
                  className="select"
                  value={index2.employmentStatus}
                  onChange={handleChange2}
                >
                  <option value="" disabled selected hidden>
                    Select Employment Status
                  </option>
                  <option value="Student">Student</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Employed">Employed</option>
                  <option value="Self-Employed">Self-Employed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="last-name" className="label">
                  BVN{" "}
                </label>
                <input
                  type="text"
                  id="bvn"
                  name="bvn"
                  value={index2.bvn}
                  placeholder="Choose a BVN"
                  onChange={handleChange2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last-name" className="label">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={index2.password}
                  placeholder="Enter password"
                  onChange={handleChange2}
                />
              </div>
              <div className=" form-group form-group-single">
                <label htmlFor="last-name" className="label">
                  Confirm Password
                </label>
                <input
                  type="text"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={index2.confirmPassword}
                  placeholder="Confirm password"
                  onChange={handleChange2}
                />
              </div>
            </div>
            <Box className="personal-information" sx={{ width: "90%" }}>
              <p className="personal-information"> Address Information</p>
              <hr className="line" />
            </Box>
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="first-name" className="label">
                  Address Line{" "}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={index2.address}
                  placeholder="Enter Address Line"
                  onChange={handleChange2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="first-name" className="label">
                  House Number{" "}
                </label>
                <input
                  type="text"
                  id="house_number"
                  name="house_number"
                  placeholder="Enter house number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="first-name" className="label">
                  Street Name{" "}
                </label>
                <input
                  type="text"
                  id="street_name"
                  name="street_name"
                  placeholder="Enter street name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="label">
                  City{" "}
                </label>
                <select
                  id="city"
                  name="city"
                  className="select"
                  onChange={handleChange2}
                >
                  <option value="" disabled selected hidden>
                    Select your City
                  </option>
                  {cities.map((city) => {
                    return <option value={city}> {city}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category" className="label">
                  Country{" "}
                </label>
                <select
                  id="country"
                  name="country"
                  className="select"
                  onChange={handleChange2}
                >
                  <option value="" disabled selected hidden>
                    Select your Country
                  </option>
                  <option value="Nigeria">Nigeria</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category" className="label">
                  State{" "}
                </label>
                <select
                  id="State"
                  name="state"
                  value={index2.state}
                  onChange={handleChange2}
                  className="select"
                >
                  <option value="" disabled selected hidden>
                    Select your state
                  </option>
                  {states.map((state) => {
                    return <option value={state}> {state}</option>;
                  })}
                </select>
              </div>
            </div>

            <div style={{ width: "90%" }} className="continue">
              <Button text="continue" onClick={() => handleIndex2Change()} />
            </div>
            <Typography className="typo">
              Already have an account? <span className="sign-in">Sign In</span>
            </Typography>
          </Box>
        )}
        {index === 2 && (
          <Box
            sx={{
              width: "70%",
              height: "100%",
            }}
            className="page-1"
          >
            <Box className="img-upload">
              <Box className="welcome">
                <p className="text"> Upload You Image</p>
                <Typography className="text-2">
                  We know that you’re a human, we just need to confirm via your
                  picture.
                </Typography>
              </Box>
              <Box className="avatar-box">
                <div>
                  <svg
                    style={{ display: "block" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="68"
                    height="68"
                    viewBox="0 0 68 68"
                    fill="none"
                  >
                    <path
                      d="M34 28.125C40.2132 28.125 45.25 23.0882 45.25 16.875C45.25 10.6618 40.2132 5.625 34 5.625C27.7868 5.625 22.75 10.6618 22.75 16.875C22.75 23.0882 27.7868 28.125 34 28.125Z"
                      stroke="#0C3397"
                      stroke-width="4.21875"
                    />
                    <path
                      d="M56.5 49.2188C56.5 56.2078 56.5 61.875 34 61.875C11.5 61.875 11.5 56.2078 11.5 49.2188C11.5 42.2297 21.5744 36.5625 34 36.5625C46.4256 36.5625 56.5 42.2297 56.5 49.2188Z"
                      stroke="#0C3397"
                      stroke-width="4.21875"
                    />
                  </svg>
                </div>
              </Box>
              <Stack
                direction={{ md: "row", xs: "column" }}
                justifyContent="space-between"
                sx={{
                  opacity: ".4",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { md: "space-between", xs: "center" },
                }}
              >
                <button className="img-button">Open Camera</button>
                <button className="img-button">Choose from file</button>
              </Stack>
              <Typography sx={{ color: "red" }}>
                {" "}
                Image upload feature not available, continue to signup
              </Typography>

              <div style={{ width: "100%" }} className="continue">
                <Button
                  text="continue"
                  onClick={() => {
                    setIndex(3);
                    handleRegisterUser();
                  }}
                />
              </div>
            </Box>

            <Typography className="typo">
              Already have an account? <span className="sign-in">Sign In</span>
            </Typography>
          </Box>
        )}
        <RegModal
          open={open}
          close={close}
          handleClose={handleClose}
          handleOpen={handleOpen}
          message="Creating Account ..."
        />
        <PositionedSnackbar
          open={alert}
          message={message}
          handleClose={handleAClose}
        />
      </Box>
    </Stack>
  );
};
export default Registration;
