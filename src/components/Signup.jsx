import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Logo,Spinner } from "./index";
import { useForm } from "react-hook-form";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signup = async (data) => {
    setError("");
    try {
      setLoading(true);
      const session = await authService.createUser(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Name"
              type="text"
              className=""
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <p className="text-red-600">{errors.name?.message}</p>

            <Input
              label="Email"
              type="email"
              className=""
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <p className="text-red-600">{errors.email?.message}</p>

            <Input
              label="Password"
              type="password"
              className=""
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Password must be at most 15 characters",
                },
              })}
            />
            <p className="text-red-600">{errors.password?.message}</p>
            {loading && <Spinner /> }
            <Button type="submit" className="w-full">
              Signup
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
