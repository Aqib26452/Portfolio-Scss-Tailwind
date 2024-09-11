import React from "react";
import HtmlPic from "../asserts/html.png";
import CssPic from "../asserts/CSS-picc.png";
import PHPPic from "../asserts/PHP-logo.png";
import JsPic from "../asserts/js-pic.png";

const Portfolio = () => {
  const CardItem = [
    {
      id: 1,
      logo: HtmlPic,
      name: "Html",
    },
    {
      id: 2,
      logo: CssPic,
      name: "CSS",
    },
    {
      id: 3,
      logo: PHPPic,
      name: "PHP",
    },
    {
      id: 4,
      logo: JsPic,
      name: "JS",
    },
    // {
    //   id: 4,
    //   logo: JsPic,
    //   name: "JS",
    // },
  ];
  return (
    <div
      name="Portfolio"
      className="max-w-[1020px] mx-auto   my-20   px-5 md:px-4 mt-24 space-y-4"
    >
      <h2 className="font-bold text-4xl text-center mb-10">Portfolio</h2>
      <span className="underline font-semibold">Featured Projects</span>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6  mt-6 ">
        {CardItem.map(({ id, logo, name }) => (
          <div
            key={id}
            className="lg:shadow-xl shadow-xl  p-5 rounded-xl  md:hover:scale-110   duration-300  "
          >
            <img
              src={logo}
              className="w-[100px] h-[100px]  rounded-full shadow-2xl object-cover mx-auto"
              alt=""
            />
            <div className="mt-4 text-center">
              <h2 className="font-bold text-2xl">{name}</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex gap-2 justify-center mt-4">
              <button className="bg-lime-700 px-3 py-1 rounded">Vedio</button>
              <button className="bg-green-500 px-4 py-1 rounded">
                {" "}
                Source Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
