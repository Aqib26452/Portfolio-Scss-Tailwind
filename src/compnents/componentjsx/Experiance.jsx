import React from "react";
import "../sass/Experiance.scss";
import HtmlPic from "../asserts/html.png";
import CSSPic from "../asserts/CSS-picc.png";
import JSPic from "../asserts/js-pic.png";
import PHPPic from "../asserts/PHP.png";
import laravelPic from "../asserts/Laravel.png";
import MYSQLPic from "../asserts/SQL.png";
import ReactjsPic from "../asserts/reactjspic.png";
import TailwindPic from "../asserts/TailwindCSS.png";
import BootstrapPic from "../asserts/bootstrap.png";

const Experiance = () => {
  const ExpConcept = [
    {
      id: 1,
      imageExp: HtmlPic,
      ExpName: "HTML",
    },
    {
      id: 2,
      imageExp: CSSPic,
      ExpName: "CSS",
    },
    {
      id: 3,
      imageExp: JSPic,
      ExpName: "JAVASCRIPT",
    },
    {
      id: 4,
      imageExp: BootstrapPic,
      ExpName: "BOOTSTRAP",
    },
    {
      id: 5,
      imageExp: TailwindPic,
      ExpName: "TAILWIND",
    },
    {
      id: 6,
      imageExp: ReactjsPic,
      ExpName: "REACTJS",
    },

    {
      id: 7,
      imageExp: PHPPic,
      ExpName: "PHP",
    },
    {
      id: 8,
      imageExp: laravelPic,
      ExpName: "lARAVEL",
    },

    {
      id: 9,
      imageExp: MYSQLPic,
      ExpName: "SQL DB",
    },
  ];
  return (
    <div>
      <div className="max-w-[1020px] mx-auto   my-20   px-5 md:px-4 mt-24 space-y-4">
        <h1 className="H1Set SETCenter">Experiance</h1>
        <p className="SETCenter">
          I've more than 2 year of experiance in below technologies
        </p>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {ExpConcept.map(({ id, imageExp, ExpName }) => (
            <div className="p-4  rounded-full BGsET SHADOW-sET">
              <div className="" key={id}>
                <div className="SETCenter SetwidthHeight mx-auto">
                  <img
                    className="rounded-full object-cover "
                    src={imageExp}
                    alt=""
                  />
                </div>
                <div className="SETCenter mt-4 h-[50%] ">
                  <h2>{ExpName}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiance;
