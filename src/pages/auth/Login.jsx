import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import google from "/src/assets/images/google.webp";
import {
    Link,
    useNavigate,
} from "react-router-dom";

import useAuth from "./hooks/useAuth";
import {
    useAuthContext,
} from "/src/context/AuthContext";

import "./login.css";

function Login() {
    const navigate = useNavigate();

    const {
        login,
        isLoading,
        error,
        setError,
    } = useAuth();

    const {
        setUser,
    } = useAuthContext();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [validationErrors, setValidationErrors] =
        useState({});

    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setError("");
    };

    // ==========================================
    // VALIDATION
    // ==========================================

    const validateForm = () => {
        const errors = {};

        if (!formData.email.trim()) {
            errors.email =
                "Email is required.";
        }

        if (!formData.password) {
            errors.password =
                "Password is required.";
        }

        setValidationErrors(errors);

        return (
            Object.keys(errors).length === 0
        );
    };

    // ==========================================
    // LOGIN
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setValidationErrors({});

        const isValid =
            validateForm();

        if (!isValid) {
            return;
        }

        const loginData = {
            email:
                formData.email.trim(),
            password:
                formData.password,
        };

        try {
            const result =
                await login(loginData);


            // ==========================================
            // WHATSAPP VERIFICATION REQUIRED
            // ==========================================

            if (
                result?.verificationRequired ===
                true
            ) {
                const whatsapp =
                    result?.whatsapp;

                if (whatsapp) {
                    sessionStorage.setItem(
                        "verificationWhatsapp",
                        whatsapp
                    );
                }

                navigate(
                    "/verify-whatsapp",
                    {
                        replace: true,
                    }
                );

                return;
            }


            // ==========================================
            // LOGIN FAILED
            // ==========================================

            if (!result?.success) {
                return;
            }


            // ==========================================
            // LOGIN SUCCESS
            // ==========================================

            const loggedInUser =
                result?.user;


            // ==========================================
            // SAVE USER TO AUTH CONTEXT
            // ==========================================

            if (loggedInUser) {
                setUser(
                    loggedInUser
                );

                localStorage.setItem(
                    "aifi_user",
                    JSON.stringify(
                        loggedInUser
                    )
                );
            }


            // ==========================================
            // DASHBOARD
            // ==========================================

            navigate(
                "/dashboard",
                {
                    replace: true,
                }
            );

        } catch (error) {
            console.error(
                "Login Submit Error:",
                error
            );
        }
    };

    return (
        <div className="bg-bg w-full h-svh ">
            <div className="flex max-w-7xl mx-auto flex-col min-h-full py-3 px-4 sm:px-6 lg:px-8 justify-between">

                {/* Header */}
                <div className="flex justify-between items-center w-full">
                    <div>
                        <h1 className="text-[16px] sm:text-base text-dark-blue font-medium">
                            AiFi SMM
                        </h1>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <p className="hidden sm:block text-xs text-gray-blue">
                            Didn't have an account?
                        </p>

                        <Link
                            to="/signup"
                            className="
                                border border-light-azure
                                rounded-md
                                bg-light-blue
                                px-3 py-1.5
                                text-sm
                                text-dark-blue
                                transition-all duration-200
                                hover:opacity-90
                                focus:outline-none
                                focus:ring-dark-blue/20
                                active:scale-[0.99]
                                cursor-pointer
                            "
                        >
                            Signup
                        </Link>
                    </div>
                </div>

                {/* Form Area */}
                <div
                    className="
                        flex flex-1 flex-col justify-center items-center
                        w-full
                        max-w-[320px]
                        sm:max-w-[340px]
                        md:max-w-[360px]
                        lg:max-w-[380px]
                        mx-auto
                        px-0
                    "
                >

                    {/* Heading */}
                    <div className="text-center w-full">
                        <h1
                            className="
                                text-[30px]
                                font-medium
                                text-dark-blue
                            "
                        >
                            Welcome Back!
                        </h1>

                        <p
                            className="
                                text-gray-blue
                                text-xs
                            "
                        >
                            Get started with your free account today.
                        </p>
                    </div>

                    {/* Inputs */}
                    <form
                        onSubmit={handleSubmit}
                        className="mt-4 sm:mt-6 flex flex-col gap-2 w-full"
                    >
                        {/* API Error */}
                        {error &&
                            !validationErrors.email &&
                            !validationErrors.password && (
                                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
                                    <p className="text-xs text-red-600 text-center">
                                        {error}
                                    </p>
                                </div>
                            )}

                        {/* Email / Username */}
                        <div>
                            <div
                                className={`
                                    border flex gap-3 justify-center items-center
                                    ${validationErrors.email || error
                                        ? "border-red-500"
                                        : "border-light-azure"
                                    }
                                    bg-light-blue
                                    rounded-md
                                    py-2.5 px-3
                                    transition-colors duration-200
                                    focus-within:border-dark-blue/20
                                `}
                            >
                                <Mail
                                    size={18}
                                    className={
                                        validationErrors.email || error
                                            ? "text-red-500 shrink-0"
                                            : "text-gray-blue shrink-0"
                                    }
                                />

                                <input
                                    className="
                                        text-dark-blue
                                        text-sm
                                        w-full
                                        placeholder:text-gray-blue
                                        placeholder:text-xs
                                        h-full
                                        outline-none
                                        bg-transparent
                                    "
                                    type="text"
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Email"
                                    autoComplete="email"
                                />
                            </div>

                            {validationErrors.email && (
                                <p className="text-[10px] text-red-500 mt-1">
                                    {
                                        validationErrors.email
                                    }
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div
                                className={`
                                    border flex gap-3 justify-center items-center
                                    ${validationErrors.password || error
                                        ? "border-red-500"
                                        : "border-light-azure"
                                    }
                                    bg-light-blue
                                    rounded-md
                                    py-2.5 px-3
                                    transition-colors duration-200
                                    focus-within:border-dark-blue/20
                                `}
                            >
                                <Lock
                                    size={18}
                                    className={
                                        validationErrors.password || error
                                            ? "text-red-500 shrink-0"
                                            : "text-gray-blue shrink-0"
                                    }
                                />

                                <input
                                    className="
                                        text-dark-blue
                                        text-sm
                                        w-full
                                        placeholder:text-gray-blue
                                        placeholder:text-xs
                                        h-full
                                        outline-none
                                        bg-transparent
                                    "
                                    type="password"
                                    name="password"
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Password"
                                    autoComplete="current-password"
                                />
                            </div>

                            {validationErrors.password && (
                                <p className="text-[10px] text-red-500 mt-1">
                                    {
                                        validationErrors.password
                                    }
                                </p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="
                                    text-xs
                                    text-gray-blue
                                    hover:text-dark-blue
                                    transition-colors
                                "
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="
                                my-1
                                bg-dark-blue
                                text-light-gray
                                text-sm
                                rounded-md
                                py-2.5
                                w-full
                                transition-all duration-200
                                hover:opacity-90
                                focus:outline-none
                                focus:ring-1
                                focus:ring-dark-blue/20
                                active:scale-[0.99]
                                cursor-pointer
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >
                            {isLoading
                                ? "Logging in..."
                                : "Login"}
                        </button>

                        {/* Divider */}
                        {/* <div className="flex gap-2 justify-center items-center">
                            <div className="border border-light-azure w-full" />

                            <p className="text-[10px] sm:text-xs text-gray-blue shrink-0">
                                or
                            </p>

                            <div className="border border-light-azure w-full" />
                        </div> */}

                        {/* Google */}
                        {/* <button
                            type="button"
                            className="
                                flex gap-2 justify-center items-center
                                mt-1
                                bg-light-blue
                                text-dark-blue
                                border border-light-azure
                                text-xs
                                sm:text-sm
                                rounded-md
                                py-2
                                sm:py-2.5
                                w-full
                                transition-all duration-200
                                hover:opacity-90
                                focus:outline-none
                                focus:ring-dark-blue/20
                                active:scale-[0.99]
                                cursor-pointer"
                        >
                            <img
                                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                                src={google}
                                alt="Google"
                            />

                            Continue with Google
                        </button> */}
                    </form>
                </div>

                {/* Footer */}
                <div className="w-full text-center">
                    <p className="text-gray-blue text-sm">
                        © 2026{" "}
                        <span className="text-dark-blue">
                            AiFi SMM.
                        </span>{" "}
                        All Rights Reserved
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;