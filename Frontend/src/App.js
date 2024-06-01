import React, { createContext, useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./Pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import ForgetPassword from "./Pages/ForgetPassword";
import Quiz from "./Pages/Quiz";

import Instruction from "./Pages/Instruction";
import Preview from "./Pages/Preview";
import Result from "./Pages/Result";
import Submit from "./Pages/Submit";
import "./App.css";
import PopUp from "./Pages/PopUp";
import Home from "./Pages/Home";
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedOption, setSelectedOption] = useState({});

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "admin",
          element: <Admin />,
        },
        {
          path: "forgetpassword",
          element: <ForgetPassword />,
        },
        {
          path: "instructions",
          element: <Instruction />,
        },
        {
          path: "/:id",
          element: <Quiz />,
        },
        {
          path: "preview",
          element: <Preview />,
        },
        {
          path: "submit",
          element: <Submit />,
        },
        {
          path: "score",
          element: <Result />,
        },
        {
          path: "popup",
          element: <PopUp />,
        },
        {
          path: "/:subject/:id/:index",
          element: <Quiz />,
        },
      ],
    },
  ]);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          selectedOption,
          setSelectedOption,
          questions,
          setQuestions,
          username,
          setUsername,
        }}
      >
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
