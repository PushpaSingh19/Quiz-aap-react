import React, { useState, useContext } from "react";
import { Image, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import Footer from "../components/Footer/Footer";
import Input from "../components/InputField/Input";
import Btn from "../components/Button/Btn";
import Heading from "../components/Heading/Heading";
import { UserContext } from "../App";
import Navbar from "../components/Header/Navbar";

function Signup() {
  const { username, setUsername } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [emailExists, setEmailExists] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Please enter a valid email",
      }));
    }
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password:
          value.length >= 6
            ? ""
            : "Password must be at least 6 characters long",
      }));
      setIsPasswordFilled(value !== "" && formData.confirmPassword !== "");
    }
    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value === formData.password ? "" : "Passwords do not match",
      }));
      setIsPasswordFilled(formData.password !== "" && value !== "");
    }
  };

  const checkEmailExists = async () => {
    try {
      const response = await fetch("http://localhost:5000/checkMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      setEmailExists(data.exists);
      setShowAlert(data.exists);
    } catch (error) {
      console.error("Email check error:", error);
    }
  };

  const sendOTP = async () => {
    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      return;
    }
    if (username.trim() === "") {
      setErrors((prev) => ({ ...prev, username: "Username cannot be empty" }));
      return;
    }
    await checkEmailExists();
    if (emailExists) return;

    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    emailjs
      .send(
        "service_3ujca6j",
        "template_wzst0mb",
        { to_email: formData.email, to_otp: `Your OTP is: ${randomNumber}` },
        "PDKeZ8f6IJeq-88Oe"
      )
      .then(() => {
        if (!emailExists) {
          alert("OTP sent successfully. Please check your email.");
        }
        insertOTPIntoDB(username, formData.email, randomNumber);
      })
      .catch((error) => alert("Error sending OTP: " + error.text));
  };

  const insertOTPIntoDB = async (username, email, otp) => {
    try {
      await fetch("http://localhost:5000/insertData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, otp }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const verifyOTP = async () => {
    if (formData.otp.trim() === "") {
      setErrors((prev) => ({ ...prev, otp: "Please enter OTP" }));
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email: formData.email,
          otp: formData.otp,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("OTP verified successfully.");
        setOtpVerified(true);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegister = async () => {
    if (errors.password || errors.confirmPassword) {
      alert("Please fill in all required fields correctly");
      return;
    }
    try {
      await fetch("http://localhost:5000/updatePassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      setUsername("");
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password. Please try again.");
    }
  };

  return (
    <>
      <Navbar title="Login" url="/login" />
      <br />
      <br />
      <br />
      <br />
      <Container
        className="border shadow-lg mt-3 mb-5"
        style={{ borderRadius: "1rem" }}
      >
        <section>
          <div className="d-flex justify-content-around">
            <Image
              src="https://img.freepik.com/free-photo/person-using-laptop_53876-95246.jpg?w=740&t=st=1715522105~exp=1715522705~hmac=5376702949c4ef87d0d6e9c7aada24cd9866f01f130a6c1956c527341c50de18"
              className="w-50 p-5"
            />
            <form className="w-50 p-5">
              <Heading title="Sign Up" />
              {otpVerified ? (
                <div id="section2">
                  <Input
                    label="Password"
                    type="password"
                    id="Password"
                    placeholder="Enter Password"
                    value={formData.password}
                    name="password"
                    onChange={handleInputChange}
                  />
                  <div className="mb-3">
                    <span className="text-danger">{errors.password}</span>
                  </div>
                  <Input
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    onChange={handleInputChange}
                  />
                  <div className="mb-3">
                    <span className="text-danger">
                      {errors.confirmPassword}
                    </span>
                  </div>
                  <div className="text-center mb-3">
                    <Link to="/popup">
                      <Btn
                        type="button"
                        title="Signup"
                        onClickBtn={handleRegister}
                        disabled={!isPasswordFilled}
                      />
                    </Link>
                  </div>
                </div>
              ) : (
                <div id="section1">
                  <Input
                    label="Name"
                    type="text"
                    id="Username"
                    placeholder="Enter Username"
                    value={username}
                    name="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (e.target.value.trim() === "") {
                        setErrors((prev) => ({
                          ...prev,
                          username: "Username cannot be empty",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, username: "" }));
                      }
                    }}
                  />
                  <div className="mb-3">
                    <span className="text-danger">{errors.username}</span>
                  </div>
                  <Input
                    label="Email"
                    type="email"
                    id="Email"
                    placeholder="Enter Email"
                    value={formData.email}
                    name="email"
                    onChange={handleInputChange}
                  />
                  <div className="mb-3">
                    <span className="text-danger">{errors.email}</span>
                  </div>
                  {showAlert && (
                    <Alert variant="danger">Email already exists.</Alert>
                  )}
                  <div className="text-center mb-3">
                    <Btn type="button" title="Send OTP" onClickBtn={sendOTP} />
                  </div>
                  <Input
                    label="Enter OTP"
                    type="text"
                    id="otp"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    name="otp"
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, otp: e.target.value }))
                    }
                  />{" "}
                  <br />
                  <div className="text-center mb-3">
                    <Btn
                      type="button"
                      title="Verify OTP"
                      onClickBtn={verifyOTP}
                    />
                  </div>
                  <div className="text-center">
                    Already have an account?<Link to="/login"> Sign In</Link>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default Signup;
