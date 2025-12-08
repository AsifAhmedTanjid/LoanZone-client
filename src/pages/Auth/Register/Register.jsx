import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    createUser,
    setLoading,
    updateProfileFunc,
    signInWithGoogleFunc,
    setUser,
  } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data) => {
    const { email, password, name, photo, role } = data;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfileFunc(name, photo)
          .then(() => {
            setUser({
              ...user,
              displayName: name,
              photoURL: photo,
            });
            // Here you would typically save the user role to your database
            console.log("User Role:", role); 
            
            setLoading(false);
            toast.success("Registered successfully!");

            setTimeout(() => {
              navigate("/");
            }, 1000);
          })
          .catch((error) => {
            toast.error("Registration failed: " + error.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        toast.error("Registration failed: " + error.message);
        setLoading(false);
      });
  };

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleGoogleSignin = () => {
    signInWithGoogleFunc()
      .then((res) => {
        setLoading(false);
        setUser(res.user);
        toast.success("Login successful!", {
          duration: 1500,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200 py-12">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-5xl font-bold text-primary">Join LoanZone!</h1>
          <p className="py-6 text-base-content/70">
            Start your journey towards financial freedom today. Create an account to apply for loans, track your applications, and manage your repayments with ease.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.photo ? 'input-error' : ''}`}
                  placeholder="https://example.com/photo.jpg"
                  {...register("photo", { required: "Photo URL is required" })}
                />
                {errors.photo && <span className="text-error text-sm mt-1">{errors.photo.message}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                  placeholder="email@example.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select 
                  className="select select-bordered w-full" 
                  defaultValue="borrower"
                  {...register("role")}
                >
                    <option value="borrower">Borrower</option>
                    <option value="manager">Manager</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                    placeholder="Password"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long"
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                        message: "Password must contain at least one uppercase and one lowercase letter"
                      }
                    })}
                  />
                  <button
                    className="absolute top-3 right-4 text-base-content/50 hover:text-primary"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                    placeholder="Confirm Password"
                    {...register("confirmPassword", { 
                      required: "Please confirm your password",
                      validate: (val) => {
                        if (watch('password') != val) {
                          return "Your passwords do NOT match";
                        }
                      }
                    })}
                  />
                  <button
                    className="absolute top-3 right-4 text-base-content/50 hover:text-primary"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="text-error text-sm mt-1">{errors.confirmPassword.message}</span>}
              </div>
              
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
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
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
