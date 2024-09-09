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
        <div className="flex justify-center text-2xl gap-5">
          <FaTelegram />
          <FaNodeJs />
          <FaReact />
          <BsFillBootstrapFill />
        </div>
        <div className="SETLINE">
          <p className="SETLINE"></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
