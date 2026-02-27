"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/validation";
import { logIn } from "@/lib/auth"; 
import css from "./AuthForm.module.css";
import toast from "react-hot-toast";
import { LogInData } from "@/types/auth";

interface Props {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: Props) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LogInData) => {
    setError("");
    try {
      await logIn({
        email: data.email,
        password: data.password,
      });
      toast.success("You have successfully logged in!", {
        className: 'custom-toast',
        icon: '✅',
      });
      onSuccess(); 
    } catch (err: any) {
      const code = err.code;

      if (code === "auth/invalid-credential" || code === "auth/user-not-found" || code === "auth/wrong-password") {
        setError("Incorrect email or password. Please try again.");
        toast.error("Incorrect email or password. Please try again.", {
          className: 'custom-toast',
          icon: '❌',
        });
      } else if (code === "auth/too-many-requests") {
        setError("Too many failed attempts. Try again later.");
        toast.error("Too many failed attempts. Try again later.", {
          className: 'custom-toast',
          icon: '⏳',
        });
      } else {
        setError(err.message || "Oops... some error");
        toast.error(err.message || "Oops... some error", {
          className: 'custom-toast',
          icon: '⚠️',
        });
      }
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.formTitle}>Log In</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.formGroup}>
          <input
            {...register("email")}
            placeholder="Email"
            className={`${css.input} ${errors.email ? css.inputError : ""}`}
          />
          {errors.email && <p className={css.errorText}>{errors.email.message}</p>}
        </div>

        <div className={css.formGroup}>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`${css.input} ${errors.password ? css.inputError : ""}`}
          />
          <button
            type="button"
            className={css.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            <svg className={css.eyeIcon} width="20" height="20">
              <use href={`/symbol-defs.svg#${showPassword ? "icon-eye-off" : "icon-eye"}`} />
            </svg>
          </button>

          {errors.password && <p className={css.errorText}>{errors.password.message}</p>}
        </div>

        {error && <p className={css.firebaseError}>{error}</p>}

        <button type="submit" className={css.submitButton}>
          Log In
        </button>
      </form>
    </div>
  );
}