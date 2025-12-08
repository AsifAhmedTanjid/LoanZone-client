import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signInWithEmailAndPasswordFunc, signInWithGoogleFunc, setLoading, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    signInWithEmailAndPasswordFunc(email, password)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Login failed: " + error.message);
      });
  };

  const handleGoogleSignin = () => {
    signInWithGoogleFunc()
      .then((res) => {
        setUser(res.user);
        setLoading(false);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200 py-12">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-5xl font-bold text-primary">Welcome Back!</h1>
          <p className="py-6 text-base-content/70">
            Login to access your account, manage your loans, and stay updated with your financial progress.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-error text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`input input-bordered w-full pr-10 ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute top-3 right-4 z-10 text-base-content/50 hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-error text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
           
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary w-full">Login</button>
              </div>
            </form>

            <div className="divider">OR</div>

            <button
              onClick={handleGoogleSignin}
              className="btn btn-outline btn-primary w-full"
            >
              <FaGoogle className="mr-2" />
              Continue with Google
            </button>

            <p className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary font-bold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;