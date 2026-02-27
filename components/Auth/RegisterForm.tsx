"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUp } from "@/lib/auth"; 
import css from "./AuthForm.module.css";
import { registerSchema } from "@/lib/validation";
import { toast } from "react-hot-toast";
import { SignUpData } from "@/types/auth";
import { useAuthStore } from "@/lib/stores/authStore";
import { auth } from "@/lib/firebase";


interface Props {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: Props) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpData) => {
    setError("");
    try {
      await signUp({
        email: data.email,
        password: data.password,
        username: data.username,
      });
const currentUser = auth.currentUser;
    if (currentUser) {
  const userData = {
    uid: currentUser.uid,
    email: currentUser.email,
    username: data.username, 
    
  };

  useAuthStore.getState().setUser(userData as any); 
}

      toast.success("You have successfully registered!", {
        className: 'custom-toast',
        icon: '✅',
      });
      onSuccess(); 
    } catch (err: any) {
      
      const errorCode = err.code;
      const errorMessage = err.message;

      if (errorCode === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please sign in.");
        toast.error("An account with this email already exists. Please sign in.", {
          className: 'custom-toast',
          icon: '❌',
        });
      } else if (errorCode === "auth/weak-password") {
        setError("The password is too weak. Try at least 6 symbols.");
        toast.error("The password is too weak. Try at least 6 symbols.", {
          className: 'custom-toast',
          icon: '⚠️',
        });
      } else if (errorCode === "auth/invalid-email") {
        setError("Invalid email address. Try again.");
        toast.error("Invalid email address. Try again.", {
          className: 'custom-toast',
          icon: '⚠️',
        });
      } else {
        
        setError(errorMessage || "Oops... something went wrong");
        toast.error(errorMessage || "Oops... something went wrong", {
          className: 'custom-toast',
          icon: '⚠️',
        });
      }
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.formTitle}>Registration</h2>
      <p className={css.text}>
       Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        
        <div className={css.formGroup}>
          <input
            {...register("username")}
            placeholder="Name"
            className={`${css.input} ${errors.username ? css.inputError : ""}`}
          />
          {errors.username && <p className={css.errorText}>{errors.username.message}</p>}
        </div>

        
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
          Sign Up
        </button>
      </form>
    </div>
  );
}