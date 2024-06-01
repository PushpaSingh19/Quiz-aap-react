import React, { useState, useContext } from "react";
import { Container, Image, Alert } from "react-bootstrap";
import Input from "../components/InputField/Input";
import Heading from "../components/Heading/Heading";
import { MdMarkEmailUnread, MdOutlinePassword } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../components/Button/Btn";
import Navbar from "..//components/Header/Navbar";
import { UserContext } from "../App";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { username, setUsername } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [error, setError] = useState("");
  const [emailExists, setEmailExists] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!selectedType) {
        setError("Please select a user type.");
        return;
      }

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUsername(data.username);
        if (selectedType === "Admin") {
          navigate("/admin");
        } else {
          navigate("/instructions");
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const checkEmailExists = async () => {
    try {
      const response = await fetch("http://localhost:5000/checkMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setEmailExists(data.exists);
    } catch (error) {
      console.error("Email check error:", error);
      setEmailExists(false);
    }
  };

  return (
    <>
      <Navbar title="Logout" url="/" name={username} /> <br /> <br /> <br />
      <Container
        className="d-flex justify-content-between border border-success mt-5"
        style={{
          borderRadius: "1rem",
          boxShadow: "0 20px 15px rgba(0,0,0,0.5)",
        }}
      >
        <Image
          src="https://img.freepik.com/premium-photo/protect-security-database-businessman-using-laptop-login-private-by-username-password-login-system-by-username-password-protecting-private-data_271541-997.jpg?w=740"
          className="w-50"
        />

        <form className="w-50 p-2" onSubmit={handleLogin}>
          <Heading title=" Sign In " />

          <br />
          <Input
            type="email"
            placeholder="Enter your email"
            label="Email"
            icon={<MdMarkEmailUnread />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={checkEmailExists}
          />
          {!emailExists && (
            <Alert variant="danger">Email does not exist.</Alert>
          )}
          <br />

          <Input
            type="password"
            placeholder="Enter a strong password"
            label="Password"
            icon={<MdOutlinePassword />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {error && <span className="text-danger">{error}</span>}
          <br />
          <div className="d-flex justify-content-end">
            <Link to="/forgetpassword">Forget Password</Link>
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <DropdownButton
              id="dropdown-basic-button"
              title={`Select Type: ${selectedType || "Choose an option"}`}
            >
              <Dropdown.Item onClick={() => setSelectedType("User")}>
                User
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedType("Admin")}>
                Admin
              </Dropdown.Item>
            </DropdownButton>

            <Btn
              type="submit"
              title="Login"
              onClickBtn={handleLogin}
              disabled={!selectedType || !emailExists}
            />
          </div>
          <br />
        </form>
      </Container>
    </>
  );
}

export default Login;
