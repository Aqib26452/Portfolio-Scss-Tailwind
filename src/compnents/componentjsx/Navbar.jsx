import React, { useState } from "react";
import LogoImg from "../asserts/logoo-img.png";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import "../sass/App.css";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const Navitems = [
    {
      id: 1,
      textUL: "Name",
    },
    {
      id: 2,
      textUL: "About",
    },
    {
      id: 3,
      textUL: "Portfolio",
    },
    {
      id: 4,
      textUL: "Experiance",
    },
    {
      id: 5,
      textUL: "Contact",
    },
  ];
  return (
    <div className=" ">
      <div className="shadow ">
        <div className="max-w-screen-2xl container mx-auto flex justify-between items-center px-4 md:px-20  py-5  shadow-xl">
          <div className="flex items-center gap-2">
            <img
              className="w-[50px]"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              src={LogoImg}
              alt=""
            />
            <h1 className="font-bold">
              Aqib <br />
              <span>Web Developer</span>
            </h1>
          </div>
          <div
            className="
        "
          >
            <ul className="md:hidden lg:flex hidden  justify-around space-x-8">
              {Navitems.map(({ id, textUL }) => (
                <li key={id}>{textUL}</li>
              ))}
            </ul>
          </div>
          <div
            onClick={() => setMenu(!menu)}
            className="lg:hidden md:hidden sm-block"
          >
            {menu ? (
              <MdOutlineRestaurantMenu className="text-3xl" />
            ) : (
              <IoMdMenu className="text-3xl" />
            )}
          </div>
        </div>
      </div>
      {menu && (
        <div className="flex items-center justify-center h-screen">
          <ul className="md:hidden lg:hidden  sm:block space-y-5 text-center">
            {Navitems.map(({ id, textUL }) => (
              <li key={id}>{textUL}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
