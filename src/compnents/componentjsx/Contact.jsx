import React, { useState } from "react";
import Input from "../Reusecomponent/Input.jsx";
import "../sass/Contact.scss";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
      <hr />
      <div
        name="Contact"
        className="max-w-[1020px] mx-auto   my-20   px-5 md:px-4 mt-24 space-y-4"
      >
        <div className="text-center ">
          <h2 className="text-2xl">Contact me</h2>
          <p>Please fll out the form below to contact me</p>
        </div>

        <div className="max-w-[620px] mx-auto border-2 py-5 rounded-2xl setFoamBG">
          <h2 className="text-center text-xl">Send Your Message</h2>
          <form
            className="  lg:max-w-[500px] sm:max-w-[400px] max-w-[250px] mx-auto mt-7"
            action="https://getform.io/f/YOUR_KEY"
            method="POST"
          >
            <div className="flex flex-col">
              <label htmlFor="" className="font-bold">
                Full Name
              </label>
              <Input
                //   type="text"
                placeholder="Enter your email  "
                name="name"
                value={name}
                className="border-2 px-3 bg-slate-400 opacity-90 placeholder-gray-500 border-cyan-950 rounded mt-2"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="" className="font-bold">
                Email Addrees
              </label>
              <Input
                //   type="text"
                placeholder="Enter your Address  "
                value={email}
                name="email"
                className="border-2 px-3 bg-slate-400 opacity-90 placeholder-gray-500 border-cyan-950 rounded mt-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="" className="font-bold">
                Field
              </label>
              <Input
                //   type="text"
                placeholder="Enter your Field "
                value={field}
                name="field"
                className="border-2 px-3 bg-slate-400 opacity-90 placeholder-gray-500 border-cyan-950 rounded mt-2"
                onChange={(e) => setField(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="" className="font-bold">
                Message
              </label>
              <textarea
                //   type="text"
                placeholder="Type your message here... "
                value={message}
                name="message"
                className="border-2 px-3 bg-slate-400 opacity-90 placeholder-gray-500 border-cyan-950 rounded mt-2"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="SetBtn py-1 px-10 mt-7  rounded">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
