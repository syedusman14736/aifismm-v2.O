import React, { useState } from "react";

import {
    Phone,
    ArrowLeft,
} from "lucide-react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import useAuth from "./hooks/useAuth";


const ForgotPassword = () => {
    const navigate = useNavigate();

    const {
        forgotPassword,
        isLoading,
        error,
        success,
        setError,
        setSuccess,
    } = useAuth();

    const [whatsapp, setWhatsapp] =
        useState("");

    const [validationError, setValidationError] =
        useState("");

    // ==========================================
    // VALIDATE WHATSAPP
    // ==========================================

    const validateWhatsapp = () => {
        const value = whatsapp.trim();

        if (!value) {
            setValidationError(
                "Please enter your WhatsApp number."
            );

            return false;
        }

        // Only check that number starts with +
        if (!value.startsWith("+")) {
            setValidationError(
                "WhatsApp number must start with +."
            );

            return false;
        }

        setValidationError("");

        return true;
    };

    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setValidationError("");

        const isValid = validateWhatsapp();

        if (!isValid) {
            return;
        }

        try {
            const result = await forgotPassword({
                whatsapp: whatsapp.trim(),
            });

            console.log(
                "FORGOT PASSWORD RESULT:",
                result
            );

            // ======================================
            // OTP SENT SUCCESSFULLY
            // ======================================

            if (result?.success === true) {
                sessionStorage.setItem(
                    "resetWhatsapp",
                    whatsapp.trim()
                );

                sessionStorage.removeItem(
                    "resetOtp"
                );

                sessionStorage.removeItem(
                    "resetOtpVerified"
                );

                console.log(
                    "OTP successfully sent."
                );

                console.log(
                    "Navigating to verify-reset-otp..."
                );

                navigate(
                    "/verify-reset-otp",
                    {
                        replace: true,
                    }
                );

                return;
            }

            console.log(
                "Forgot password request failed:",
                result
            );
        } catch (error) {
            console.error(
                "Forgot Password Submit Error:",
                error
            );
        }
    };

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="bg-bg w-full h-svh overflow-hidden">

            <div className="flex max-w-7xl mx-auto flex-col h-full pt-4.5 pb-3 px-4 sm:px-6 lg:px-8 justify-between">

                {/* Header */}
                <div className="flex justify-between items-center w-full">

                    {/* Back to Login */}
                    <Link
                        to="/login"
                        className="
                            inline-flex
                            items-center
                            gap-1.5
                            text-sm
                            text-gray-blue
                            hover:text-dark-blue
                            transition-colors
                        "
                    >
                        <ArrowLeft
                            size={16}
                            className="shrink-0"
                        />

                        <span>
                            Back to login
                        </span>
                    </Link>

                </div>

                {/* Form Area */}
                <div
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

                    {/* Heading */}
                    <div className="text-center w-full">

                        {/* Title */}
                        <h1
                            className="
                                text-[28px]
                                font-medium
                                text-dark-blue
                            "
                        >
                            Forgot Password?
                        </h1>

                        {/* Description */}
                        <p
                            className="
                                mt-1
                                text-gray-blue
                                text-xs
                            "
                        >
                            Enter your WhatsApp number and
                            we'll send you a verification code.
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="mt-4 sm:mt-6 flex flex-col gap-2 w-full"
                    >

                        {/* API Error */}
                        {error && !validationError && (
                            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
                                <p className="text-xs text-red-600 text-center">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2">
                                <p className="text-xs text-green-700 text-center">
                                    {success}
                                </p>
                            </div>
                        )}

                        {/* WhatsApp Number */}
                        <div>

                            <div
                                className={`
                                    border
                                    flex
                                    gap-3
                                    justify-center
                                    items-center
                                    ${validationError || error
                                        ? "border-red-500"
                                        : "border-light-azure"
                                    }
                                    bg-light-blue
                                    rounded-md
                                    py-2.5
                                    px-3
                                    transition-colors
                                    duration-200
                                    focus-within:border-dark-blue/20
                                `}
                            >

                                <Phone
                                    size={18}
                                    className={
                                        validationError || error
                                            ? "text-red-500 shrink-0"
                                            : "text-gray-blue shrink-0"
                                    }
                                />

                                <input
                                    type="text"
                                    value={whatsapp}
                                    onChange={(e) => {
                                        setWhatsapp(
                                            e.target.value
                                        );

                                        setValidationError("");
                                        setError("");
                                    }}
                                    placeholder="+923001234567"
                                    autoComplete="tel"
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
                                />

                            </div>

                            {/* Validation / Helper Text */}
                            {validationError ? (
                                <p className="text-[10px] text-red-500 mt-1">
                                    {validationError}
                                </p>
                            ) : (
                                <p className="text-[10px] text-gray-blue mt-1">
                                    Enter your WhatsApp number
                                    with country code.
                                </p>
                            )}

                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="
                                mt-2
                                bg-dark-blue
                                text-light-gray
                                text-sm
                                rounded-md
                                py-2.5
                                w-full
                                transition-all
                                duration-200
                                hover:opacity-90
                                focus:outline-none
                                focus:ring-dark-blue/20
                                active:scale-[0.99]
                                cursor-pointer
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >
                            {isLoading
                                ? "Sending Code..."
                                : "Send Verification Code"}
                        </button>

                    </form>

                </div>

                {/* Footer */}
                <div className="w-full text-center">

                    <p className="text-gray-blue text-xs sm:text-sm">
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
};

export default ForgotPassword;