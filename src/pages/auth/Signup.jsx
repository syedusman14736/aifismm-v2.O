import React, { useState } from "react";

import {
    User,
    Mail,
    Phone,
    Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import google from "/src/assets/images/google.webp";
import useAuth from "./hooks/useAuth";
import "./login.css";

// ==========================================
// SIGNUP
// ==========================================

function Signup() {
    const navigate = useNavigate();

    const {
        signup,
        isLoading,
    } = useAuth();

    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        whatsappNumber: "",
        password: "",
    });

    // ==========================================
    // VALIDATION ERRORS
    // ==========================================

    const [validationErrors, setValidationErrors] =
        useState({});

    // ==========================================
    // HANDLE NORMAL INPUT CHANGE
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

        setValidationErrors((prev) => {
            const updated = {
                ...prev,
            };

            delete updated[name];
            delete updated.general;

            return updated;
        });
    };

    // ==========================================
    // VALIDATE FORM
    // ==========================================

    const validateForm = () => {
        const errors = {};

        // ------------------------------------------
        // FULL NAME
        // ------------------------------------------

        const fullName =
            formData.fullName.trim();

        if (!fullName) {
            errors.fullName =
                "Please enter your full name.";
        } else if (fullName.length < 3) {
            errors.fullName =
                "Full name must be at least 3 characters.";
        }

        // ------------------------------------------
        // USERNAME
        // ------------------------------------------

        const username =
            formData.username.trim();

        if (!username) {
            errors.username =
                "Please enter a username.";
        } else if (
            username.length < 3 ||
            username.length > 20
        ) {
            errors.username =
                "Username must be between 3 and 20 characters.";
        } else if (
            !/^[a-zA-Z0-9_]+$/.test(username)
        ) {
            errors.username =
                "Username can only contain letters, numbers, and underscores.";
        }

        // ------------------------------------------
        // EMAIL
        // ------------------------------------------

        const email =
            formData.email.trim();

        if (!email) {
            errors.email =
                "Please enter your email address.";
        } else {
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                errors.email =
                    "Please enter a valid email address.";
            }
        }

        // ------------------------------------------
        // WHATSAPP
        // ------------------------------------------

        const whatsapp =
            formData.whatsappNumber.trim();

        if (!whatsapp) {
            errors.whatsappNumber =
                "Please enter your WhatsApp number.";
        } else if (!whatsapp.startsWith("+")) {
            errors.whatsappNumber =
                "Please enter your WhatsApp number with country code.";
        } else if (
            !/^\+[1-9]\d{7,14}$/.test(whatsapp)
        ) {
            errors.whatsappNumber =
                "Please enter a valid WhatsApp number.";
        }

        // ------------------------------------------
        // PASSWORD
        // ------------------------------------------

        const password =
            formData.password;

        if (!password) {
            errors.password =
                "Please enter a password.";
        } else if (password.length < 8) {
            errors.password =
                "Password must be at least 8 characters.";
        } else if (!/[A-Z]/.test(password)) {
            errors.password =
                "Password must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(password)) {
            errors.password =
                "Password must contain at least one lowercase letter.";
        } else if (!/[0-9]/.test(password)) {
            errors.password =
                "Password must contain at least one number.";
        }

        setValidationErrors(errors);

        return errors;
    };

    // ==========================================
    // HANDLE SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setValidationErrors({});

        // ------------------------------------------
        // FRONTEND VALIDATION
        // ------------------------------------------

        const errors =
            validateForm();

        if (
            Object.keys(errors).length > 0
        ) {
            return;
        }

        // ------------------------------------------
        // PREPARE BACKEND DATA
        // ------------------------------------------

        const signupData = {
            name:
                formData.fullName.trim(),

            username:
                formData.username.trim(),

            email:
                formData.email.trim(),

            whatsapp:
                formData.whatsappNumber.trim(),

            password:
                formData.password,
        };

        // ------------------------------------------
        // API REQUEST
        // ------------------------------------------

        try {
            const result =
                await signup(signupData);

            // --------------------------------------
            // BACKEND ERROR
            // --------------------------------------

            if (!result?.success) {
                const backendField =
                    result?.data?.field;

                // ----------------------------------
                // BACKEND FIELD → FRONTEND FIELD
                // ----------------------------------

                if (backendField) {
                    const fieldMap = {
                        name: "fullName",
                        username: "username",
                        email: "email",
                        whatsapp: "whatsappNumber",
                        password: "password",
                    };

                    const frontendField =
                        fieldMap[backendField] ||
                        backendField;

                    setValidationErrors({
                        [frontendField]:
                            result?.data?.message ||
                            result?.message ||
                            result?.error ||
                            "Invalid value.",
                    });

                    return;
                }

                // ----------------------------------
                // GENERAL ERROR
                // ----------------------------------

                setValidationErrors({
                    general:
                        result?.data?.message ||
                        result?.message ||
                        result?.error ||
                        "Unable to create your account.",
                });

                return;
            }

            // ------------------------------------------
            // WHATSAPP VERIFICATION REQUIRED
            // ------------------------------------------

            if (result?.verificationRequired) {
                const whatsapp = result?.whatsapp || formData.whatsappNumber;

                sessionStorage.setItem("verificationWhatsapp", whatsapp);

                navigate("/verify-whatsapp",);
                return;
            }

        } catch (error) {
            console.error(
                "Signup error:",
                error
            );

            setValidationErrors({
                general:
                    "Something went wrong. Please try again.",
            });
        }
    };

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="bg-bg w-full h-svh">

            <div
                className="
                    flex
                    max-w-7xl
                    mx-auto
                    flex-col
                    min-h-full
                    py-3
                    px-4
                    sm:px-6
                    lg:px-8
                    justify-between
                "
            >

                {/* ======================================
                    HEADER
                ====================================== */}

                <div
                    className="
                        flex
                        justify-between
                        items-center
                        w-full
                    "
                >

                    {/* LOGO */}

                    <div>
                        <h1
                            className="
                                text-[16px]
                                text-dark-blue
                                font-medium
                            "
                        >
                            AiFi SMM
                        </h1>
                    </div>

                    {/* LOGIN */}

                    <div
                        className="
                            flex
                            items-center
                            gap-1.5
                            sm:gap-2
                        "
                    >

                        <p
                            className="
                                hidden
                                sm:block
                                text-[10px]
                                sm:text-xs
                                text-gray-blue
                            "
                        >
                            Already have an account?
                        </p>

                        <Link
                            to="/login"
                            className="
                                border
                                border-light-azure
                                rounded-md
                                bg-light-blue
                                px-3 py-1.5
                                text-sm
                                text-dark-blue
                                transition-all
                                duration-200
                                hover:opacity-90
                                focus:outline-none
                                focus:ring-dark-blue/20
                                active:scale-[0.99]
                                cursor-pointer
                            "
                        >
                            Login
                        </Link>

                    </div>

                </div>

                {/* ======================================
                    FORM
                ====================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        flex
                        flex-1
                        flex-col
                        justify-center
                        items-center
                        w-full
                        max-w-[320px]
                        sm:max-w-[340px]
                        md:max-w-[360px]
                        lg:max-w-[380px]
                        mx-auto
                        px-0
                    "
                >

                    {/* ==================================
                        FORM HEADER
                    ================================== */}

                    <div
                        className="
                            text-center
                            w-full
                        "
                    >

                        <h1
                            className="
                                text-[26px]
                                font-medium
                                text-dark-blue
                            "
                        >
                            Create your account
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

                    {/* ==================================
                        FIELDS
                    ================================== */}

                    <div
                        className="
                            mt-4
                            sm:mt-6
                            flex
                            flex-col
                            gap-2.5
                            w-full
                        "
                    >

                        {/* ==================================
                            GENERAL ERROR
                        ================================== */}

                        {validationErrors.general && (
                            <div className="relative">

                                <div
                                    className="
                                        border
                                        border-red-300
                                        bg-light-blue
                                        rounded-md
                                        px-3
                                        py-2
                                        text-red-500
                                        text-xs
                                    "
                                >
                                    {validationErrors.general}
                                </div>

                            </div>
                        )}

                        {/* ==================================
                            FULL NAME
                        ================================== */}

                        <div
                            className="
                                relative
                                w-full
                            "
                        >

                            {validationErrors.fullName && (
                                <span
                                    className="
                                        absolute
                                        z-10
                                        -top-[5px]
                                        left-3
                                        px-1
                                        bg-light-blue
                                        text-red-500
                                        text-[10px]
                                        sm:text-xs
                                        leading-none
                                        whitespace-nowrap
                                    "
                                >
                                    {validationErrors.fullName}
                                </span>
                            )}

                            <div
                                className={`
                                    border
                                    flex
                                    gap-3
                                    justify-center
                                    items-center
                                    bg-light-blue
                                    rounded-md
                                    py-2.5
                                    px-3
                                    transition-colors
                                    duration-200
                                    ${validationErrors.fullName
                                        ? "border-red-300"
                                        : "border-light-azure"
                                    }
                                    focus-within:border-dark-blue/20
                                `}
                            >

                                <User
                                    size={18}
                                    className="
                                        text-gray-blue
                                        shrink-0
                                    "
                                />

                                <input
                                    name="fullName"
                                    value={
                                        formData.fullName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="
                                        text-sm
                                        w-full
                                        text-dark-blue
                                        placeholder:text-gray-blue
                                        placeholder:text-xs
                                        h-full
                                        outline-none
                                        bg-transparent
                                    "
                                    type="text"
                                    placeholder="Full Name"
                                    autoComplete="name"
                                />

                            </div>

                        </div>

                        {/* ==================================
                            USERNAME
                        ================================== */}

                        <div
                            className="
                                relative
                                w-full
                            "
                        >

                            {validationErrors.username && (
                                <span
                                    className="
                                        absolute
                                        z-10
                                        -top-[5px]
                                        left-3
                                        px-1
                                        bg-light-blue
                                        text-red-500
                                        text-[10px]
                                        sm:text-xs
                                        leading-none
                                        whitespace-nowrap
                                    "
                                >
                                    {validationErrors.username}
                                </span>
                            )}

                            <div
                                className={`
                                    border
                                    flex
                                    gap-3
                                    justify-center
                                    items-center
                                    bg-light-blue
                                    rounded-md
                                    py-2.5
                                    px-3
                                    sm:py-2.5
                                    transition-colors
                                    duration-200
                                    ${validationErrors.username
                                        ? "border-red-300"
                                        : "border-light-azure"
                                    }
                                    focus-within:border-dark-blue/20
                                `}
                            >

                                <User
                                    size={18}
                                    className="
                                        text-gray-blue
                                        shrink-0
                                    "
                                />

                                <input
                                    name="username"
                                    value={
                                        formData.username
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                    placeholder="Username"
                                    autoComplete="username"
                                />

                            </div>

                        </div>

                        {/* ==================================
                            EMAIL
                        ================================== */}

                        <div
                            className="
                                relative
                                w-full
                            "
                        >

                            {validationErrors.email && (
                                <span
                                    className="
                                        absolute
                                        z-10
                                        -top-[5px]
                                        left-3
                                        px-1
                                        bg-light-blue
                                        text-red-500
                                        text-[10px]
                                        sm:text-xs
                                        leading-none
                                        whitespace-nowrap
                                    "
                                >
                                    {validationErrors.email}
                                </span>
                            )}

                            <div
                                className={`
                                    border
                                    flex
                                    gap-3
                                    justify-center
                                    items-center
                                    bg-light-blue
                                    rounded-md
                                    py-2.5
                                    px-3
                                    sm:py-2.5
                                    transition-colors
                                    duration-200
                                    ${validationErrors.email
                                        ? "border-red-300"
                                        : "border-light-azure"
                                    }
                                    focus-within:border-dark-blue/20
                                `}
                            >

                                <Mail
                                    size={18}
                                    className="
                                        text-gray-blue
                                        shrink-0
                                    "
                                />

                                <input
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                    type="email"
                                    placeholder="Email Address"
                                    autoComplete="email"
                                />

                            </div>

                        </div>

                        {/* ==================================
                            WHATSAPP
                        ================================== */}

                        <div
                            className="
                                relative
                                w-full
                            "
                        >

                            {validationErrors.whatsappNumber && (
                                <span
                                    className="
                                        absolute
                                        z-10
                                        -top-[5px]
                                        left-3
                                        px-1
                                        bg-light-blue
                                        text-red-500
                                        text-[10px]
                                        sm:text-xs
                                        leading-none
                                        whitespace-nowrap
                                    "
                                >
                                    {validationErrors.whatsappNumber}
                                </span>
                            )}

                            <div
                                className={`
                                    border
                                    flex
                                    gap-3
                                    justify-center
                                    items-center
                                    bg-light-blue
                                    rounded-md
                                    py-2.5
                                    px-3
                                    sm:py-2.5
                                    transition-colors
                                    duration-200
                                    ${validationErrors.whatsappNumber
                                        ? "border-red-300"
                                        : "border-light-azure"
                                    }
                                    focus-within:border-dark-blue/20
                                `}
                            >

                                <Phone
                                    size={18}
                                    className="
                                        text-gray-blue
                                        shrink-0
                                    "
                                />

                                <input
                                    name="whatsappNumber"
                                    value={
                                        formData.whatsappNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                    type="tel"
                                    placeholder="Whatsapp Number with country code"
                                    autoComplete="tel"
                                />

                            </div>

                        </div>

                        {/* ==================================
                            PASSWORD
                        ================================== */}

                        <div
                            className="
                                relative
                                w-full
                            "
                        >

                            {validationErrors.password && (
                                <span
                                    className="
                                        absolute
                                        z-10
                                        -top-[5px]
                                        left-3
                                        px-1
                                        bg-light-blue
                                        text-red-500
                                        text-[10px]
                                        sm:text-xs
                                        leading-none
                                        whitespace-nowrap
                                    "
                                >
                                    {validationErrors.password}
                                </span>
                            )}

                            <div
                                className={`
                                    border
                                    flex
                                    gap-3
                                    justify-center
                                    items-center
                                    bg-light-blue
                                    rounded-md
                                    py-2.5
                                    px-3
                                    sm:py-2.5
                                    transition-colors
                                    duration-200
                                    ${validationErrors.password
                                        ? "border-red-300"
                                        : "border-light-azure"
                                    }
                                    focus-within:border-dark-blue/20
                                `}
                            >

                                <Lock
                                    size={18}
                                    className="
                                        text-gray-blue
                                        shrink-0
                                    "
                                />

                                <input
                                    name="password"
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                    placeholder="Password"
                                    autoComplete="new-password"
                                />

                            </div>

                        </div>

                        {/* ==================================
                            CREATE ACCOUNT
                        ================================== */}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="
                                mt-1
                                bg-dark-blue
                                text-light-gray
                                text-sm
                                rounded-md
                                py-2
                                sm:py-2.5
                                w-full
                                transition-all
                                duration-200
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
                                ? "Creating account..."
                                : "Create account"}
                        </button>

                        {/* ==================================
                            OR
                        ================================== */}

                        {/* <div
                            className="
                                flex
                                gap-2
                                justify-center
                                items-center
                            "
                        >

                            <div
                                className="
                                    border
                                    border-light-azure
                                    w-full
                                "
                            />

                            <p
                                className="
                                    text-[10px]
                                    sm:text-xs
                                    text-gray-blue
                                    shrink-0
                                "
                            >
                                or
                            </p>

                            <div
                                className="
                                    border
                                    border-light-azure
                                    w-full
                                "
                            />

                        </div> */}

                        {/* ==================================
                            GOOGLE
                        ================================== */}

                        {/* <button
                            type="button"
                            className="
                                flex
                                gap-2
                                justify-center
                                items-center
                                bg-light-blue
                                text-dark-blue
                                border
                                border-light-azure
                                text-xs
                                sm:text-sm
                                rounded-md
                                py-2
                                sm:py-2.5
                                w-full
                                transition-all
                                duration-200
                                hover:opacity-90
                                focus:outline-none
                                focus:ring-dark-blue/20
                                active:scale-[0.99]
                                cursor-pointer
                            "
                        >

                            <img
                                className="
                                    w-4
                                    h-4
                                    sm:w-[18px]
                                    sm:h-[18px]
                                "
                                src={google}
                                alt="Google"
                            />

                            Signup with Google

                        </button> */}

                        {/* ==================================
                            TERMS
                        ================================== */}

                        <div
                            className="
                                text-xs
                                text-gray-blue
                                text-center mt-2
                            "
                        >

                            <p>
                                By creating account, you agree to our
                            </p>

                            <p>

                                <span className="text-dark-blue">
                                    Terms of Service
                                </span>

                                {" "}

                                and

                                {" "}

                                <span className="text-dark-blue">
                                    Privacy Policy
                                </span>

                            </p>

                        </div>

                    </div>

                </form>
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

export default Signup;