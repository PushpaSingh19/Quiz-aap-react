import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Btn from "../components/Button/Btn";
import Input from "../components/InputField/Input";
import emailjs from "emailjs-com";
import Heading from "../components/Heading/Heading";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [currentSection, setCurrentSection] = useState("section-1");

  function validateEmail(email) {
    setEmailError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    return true;
  }

  function validatePassword(password) {
    setPasswordError("");
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }

  function validateConfirmPassword(confirmPassword) {
    setConfirmPasswordError("");
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    return true;
  }

  function enableSubmit() {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    fetch(`http://localhost:5000/checkMail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          setEmailError("");
          sendOTP();
          setCurrentSection("section-3");
        } else {
          setEmailError("This email-id does not exist.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  function sendOTP() {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    var minm = 100000;
    var maxm = 999999;
    var randomNumber = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    console.log(randomNumber);

    let subject = "OTP";
    let body = "Your OTP is: " + randomNumber;

    emailjs
      .send(
        "service_3ujca6j",
        "template_wzst0mb",
        {
          to_email: email,
          to_otp: body,
        },
        "PDKeZ8f6IJeq-88Oe"
      )
      .then(
        (response) => {
          alert("OTP sent successfully. Please check your mail.");
          updateOTPIntoDB(email, randomNumber);
        },
        (error) => {
          alert("Error sending OTP: " + error.text);
        }
      );
  }

  function updateOTPIntoDB(email, otp) {
    fetch(`http://localhost:5000/updateotp`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }

  function verifyOTP() {
    fetch("http://localhost:5000/verifynewotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCurrentSection("section-2");
        } else {
          alert("Invalid OTP. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  function updatePassword() {
    if (
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword)
    ) {
      fetch("http://localhost:5000/updatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Password Updated");
        })
        .catch((error) => console.error("Error:", error));
    } else {
      alert("Please fill the password correctly.");
    }
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <>
      <Navbar title="Logout" url="/" />
      <br></br> <br /> <br /> <br />
      <section>
        <div className="container w-75 mb-4 ">
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div
              className="shadow-lg p-5 bg-white   "
              style={{ borderRadius: "1rem" }}
            >
              {currentSection === "section-1" && (
                <ResetPasswordSection1
                  email={email}
                  setEmail={setEmail}
                  emailError={emailError}
                  setEmailError={setEmailError}
                  enableSubmit={enableSubmit}
                />
              )}{" "}
              {currentSection === "section-3" && (
                <ResetPasswordSection3
                  otp={otp}
                  setOtp={setOtp}
                  otpError={otpError}
                  setOtpError={setOtpError}
                  verifyOTP={verifyOTP}
                />
              )}
              {currentSection === "section-2" && (
                <ResetPasswordSection2
                  password={password}
                  setPassword={setPassword}
                  passwordError={passwordError}
                  setPasswordError={setPasswordError}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  confirmPasswordError={confirmPasswordError}
                  setConfirmPasswordError={setConfirmPasswordError}
                  updatePassword={updatePassword}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function ResetPasswordSection1({
  email,
  setEmail,
  emailError,
  setEmailError,
  enableSubmit,
}) {
  return (
    <div className="d-flex justify-content-around">
      <div className="text-center">
        <img
          src="https://img.freepik.com/premium-photo/memo-with-word-password-memo-with-word-password-question-mark-keyboard_121826-2249.jpg?w=740"
          alt="Forgot Password"
          className="w-75"
        />
      </div>
      <form className="w-50">
        <div className="text-center">
          <Heading title="Forget Password " />
        </div>
        <div className="text-center mb-4">
          <p>Enter your email to reset password</p>
        </div>
        <div className=" mb-3">
          <Input
            label="Email"
            type="email"
            id="Email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <span className="text-danger">{emailError}</span>
        </div>
        <div className="text-center mb-3">
          <Btn type="button" title="Submit" onClickBtn={enableSubmit} />
        </div>
        <div className="text-center">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

function ResetPasswordSection3({
  otp,
  setOtp,
  otpError,
  setOtpError,
  verifyOTP,
}) {
  return (
    <div className="d-flex justify-contnet-around">
      <div className="text-center">
        <img
          src="https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7967.jpg?t=st=1715537778~exp=1715541378~hmac=1de2ba55f25be63cc6eb51553b0a2b2de03e2aafc1abd9581a6a428caec06219&w=740"
          alt="Forgot Password"
          className="w-50"
        />
      </div>
      <br></br>
      <form className="w-50">
        <div className="text-center mb-4">
          <Heading title="Enter Your Otp" />
        </div>
        <div className=" mb-3">
          <Input
            label="Otp"
            type="number"
            id="OTP"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <span className="text-danger">{otpError}</span>
        </div>
        <div className="text-center mb-3">
          <Btn type="button" title="Validate OTP" onClickBtn={verifyOTP} />
        </div>
        <div className="text-center">
          <Link to="/Login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

function ResetPasswordSection2({
  password,
  setPassword,
  passwordError,
  setPasswordError,
  confirmPassword,
  setConfirmPassword,
  confirmPasswordError,
  setConfirmPasswordError,
  updatePassword,
}) {
  return (
    <div className="d-flex justify-contnet-around">
      <div className="text-center">
        <img
          src="https://img.freepik.com/free-psd/3d-illustration-online-security-objects_1419-2757.jpg?t=st=1715538095~exp=1715541695~hmac=ce825b52f760ab979529890bcbe5ad70c435f7fe96105c42453bde7109c91975&w=740"
          alt="Forgot Password"
          className="w-75"
        />
      </div>
      <form className="w-50">
        <div className="text-center mb-4">
          <Heading title="Set Your Password Here" />
        </div>
        <div className=" mb-3">
          <Input
            label="Password"
            type="password"
            id="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <span className="text-danger">{passwordError}</span>
        </div>

        <div className=" mb-3">
          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <span className="text-danger">{confirmPasswordError}</span>
        </div>
        <div className="text-center mb-2">
          <Btn
            type="button"
            title="Update Password"
            onClickBtn={updatePassword}
          />
        </div>
        <div className="text-center">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
