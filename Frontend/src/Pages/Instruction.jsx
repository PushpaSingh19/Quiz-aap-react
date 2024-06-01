import React, { useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

function Instruction() {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <>
      <Navbar title="Logout" url="/" />
      <br /> <br /> <br /> <br /> <br /> <br />
      <Container>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Select Subject
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/100">
              HTML
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/200">
              CSS
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/300">
              Python
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/400">
              JavaScript
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {showInstructions && (
          <div id="instructions-section">
            <div
              className="m-5 border p-5"
              style={{
                borderRadius: "10px",
                boxShadow: "0 20px 15px rgba(0,0,0,0.5)",
              }}
            >
              <div className="text-center">
                <h2>Instructions</h2>
              </div>
              <div className="mt-4">
                <p>Here are the instructions for attempting this quiz:</p>
                <ul>
                  <li>Read each question carefully.</li> <br />
                  <li>
                    You can navigate between questions using the Previous and
                    Next buttons.
                  </li>
                  <br />
                  <li>Review your answers before submitting the quiz.</li>{" "}
                  <br />
                  <li>
                    Once you submit the quiz, you will not be able to change
                    your answers.
                  </li>
                  <br />
                  <li>All answers are final once the quiz is submitted.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Instruction;
