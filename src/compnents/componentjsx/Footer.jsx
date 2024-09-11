import React from "react";
import { FaTelegram } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { BsFillBootstrapFill } from "react-icons/bs";
import "../sass/Footer.scss";

const Footer = () => {
  return (
    <div>
      {" "}
      <hr />
      <div className="max-w-[1020px] mx-auto   my-20   px-5 md:px-4 mt-24 space-y-4">
        <div className="flex justify-center text-2xl gap-5 mb-14 ">
          <FaTelegram />
          <FaNodeJs />
          <FaReact />
          <BsFillBootstrapFill />
        </div>
        <div className="lg:w-[600px] md:w-[450px] max-w-[400px] border-t border-gray-700 pt-8  flex flex-col items-center mx-auto">
          <p className="">&copy; 2024 your company.All rights reserved.</p>
          <p className="">Supported Partner Rajpoots...</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
