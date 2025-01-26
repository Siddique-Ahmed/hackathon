import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [data, setData] = useState({});

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center sm:w-[450px] bg-white shadow-2xl px-3 py-3 rounded-2xl"
    >
      <div className="my-2">
        <h1 className="font-bold text-2xl text-green-500">Signup Form</h1>
      </div>
      <div className="flex flex-col mb-2 w-full">
        <label htmlFor="email" className="font-bold">
          Email Address
        </label>
        <input
          onChange={handleInput}
          type="email"
          className="my-0.5 bg-gray-100 px-2 py-3 outline-0 rounded-[5px]"
          placeholder="email"
          name="email"
        />
      </div>
      <div className="flex flex-col mb-2 w-full">
        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <input
          onChange={handleInput}
          type="password"
          className="my-0.5 bg-gray-100 px-2 py-3 outline-0 rounded-[5px]"
          placeholder="password"
          name="password"
        />
      </div>
      <div className="flex flex-col mb-2 gap-2 w-full">
        <button className="bg-green-600 py-3 rounded-[7px] text-white font-bold cursor-pointer hover:bg-green-500">
          Login
        </button>
        <p className="text-gray-600">
          have an account ?{" "}
          <Link className="text-green-500" to={"/signup"}>
            Signup
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
