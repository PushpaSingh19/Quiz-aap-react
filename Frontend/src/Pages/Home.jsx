import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import "./Home.css";
import Btn from "../components/Button/Btn";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar title="Login" url="/login" />
      <br />
      <br />
      <br />
      <Container className="mt-5 shadow p-3 ">
        <Row>
          <Col>
            <h1 className="text-center text-white heading ">
              Welcome to the Quiz Application
            </h1>

            <ul className="mt-4">
              <li>
                This is a quiz application where you will learn about various
                types of quiz questions containing different types of subjects
                related to programming languages.
              </li>
              <br />
              <li>
                Whether you are a beginner or an expert, our quiz application
                provides a fun and interactive way to test your knowledge and
                improve your skills.
              </li>
              <br />
              <li className="mt-3">
                This application is made by Proteconts company, dedicated to
                providing high-quality educational tools and resources for
                learners around the world.
              </li>
              <br />
              <li>
                Our goal is to help you achieve your learning objectives and
                advance your career in the field of programming.
              </li>
              <br />
              <li>
                To know more about this quiz application, click on the button
                below.
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/signup">
                <Btn title="Explore More" />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <br />

      <Footer />
    </>
  );
}

export default Home;
