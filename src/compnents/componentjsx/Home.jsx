import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { BsFillBootstrapFill } from "react-icons/bs";
import AqiPic from "../asserts/AqibPIC.jpg";
import { ReactTyped, Typed } from "react-typed";

import "../sass/home.scss";

const Home = () => {
  return (
    <div
      name="Home"
      className="max-w-[1020px] mx-auto   my-20  flex flex-col-reverse md:flex-row items-center px-5 md:px-4"
    >
      <div className="sm:w-3/3 md:w-1/2 mt-12 md:mt-24 space-y-2 px-4 md:px-1 ">
        <h3 className="font-bold">Welcome In My Portfolio... </h3>
        <div className="flex items-center text-2xl gap-2">
          <h2>Hello, I'm a </h2>
          {/* <span className="text-red-700 font-bold text-2xl">Developer</span> */}
          <ReactTyped
            className="text-red-700 font-bold text-2xl"
            // typedRef={setTyped}
            strings={["Developer", "Programmer", "Coder"]}
            typeSpeed={40}
            // backSpeed={50}
            loop={true}
          />
        </div>
        <br />
        <p className="text-sm md:text-md text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
          voluptates quisquam blanditiis ab adipisci numquam ratione pariatur in
          laboriosam, exercitationem eligendi libero corrupti. Tenetur, quae.
          Asperiores sit minima quaerat facilis?
        </p>
        <br />
        <div className="flex md:justify-between justify-center flex-col md:flex-row ">
          <div className="mx-auto md:mx-0 space-y-1">
            <div className="font-bold text-center">
              <h2>Availale on</h2>
            </div>
            <div className="flex justify-center space-x-3 text-xl">
              <FaFacebookSquare />
              <FaLinkedin />
              <FaYoutube />
              <FaTelegram />
            </div>
          </div>
          <div className="mx-auto md:mx-0 space-y-1 mt-10 md:mt-0">
            <div className="font-bold">
              <h2>Currently working on</h2>
            </div>
            <div className="flex space-x-4 justify-center text-xl">
              <FaNodeJs />
              <FaReact />
              <BsFillBootstrapFill />
              <FaTelegram />
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 flex justify-center items-center md:w-1/2  md:justify-end mx-auto mt-12 md:mt-24">
        <div className="w-4/5 h-4/5 md:h-4/5 md:w-2/3 bg-back justify-center ">
          <img className="rounded-full" src={AqiPic} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
