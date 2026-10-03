import { useEffect, useState } from "react";

import {
    Phone,
    ArrowLeft,
} from "lucide-react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import useAuth from "./hooks/useAuth";


export default function VerifyWhatsApp() {
    const navigate = useNavigate();

    const {
        verifyWhatsApp,
        resendOtp,
        isLoading,
        error,
        success,
        setError,
        setSuccess,
    } = useAuth();

    const [whatsapp, setWhatsapp] = useState("");
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");

    // ==========================================
    // GET WHATSAPP FROM SESSION
    // ==========================================

    useEffect(() => {
        const savedWhatsapp =
            sessionStorage.getItem(
                "verificationWhatsapp"
            );

        // No number found
        if (!savedWhatsapp) {
            navigate("/signup", {
                replace: true,
            });

            return;
        }

        setWhatsapp(savedWhatsapp);
    }, [navigate]);

    // ==========================================
    // OTP CHANGE
    // ==========================================

    const handleOtpChange = (e) => {
        const value = e.target.value
            .replace(/\D/g, "")
            .slice(0, 6);

        setOtp(value);
        setOtpError("");
        setError("");
        setSuccess("");
    };

    // ==========================================
    // VERIFY OTP
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setOtpError("");
        setError("");

        if (!otp) {
            setOtpError(
                "Please enter your verification code."
            );

            return;
        }

        if (otp.length !== 6) {
            setOtpError(
                "Verification code must be 6 digits."
            );

            return;
        }

        const result = await verifyWhatsApp({
            whatsapp,
            otp,
        });

        if (!result?.success) {
            return;
        }

        // Verification completed
        sessionStorage.removeItem(
            "verificationWhatsapp"
        );

        navigate("/dashboard", {
            replace: true,
        });
    };

    // ==========================================
    // RESEND OTP
    // ==========================================

    const handleResend = async () => {
        setOtp("");
        setOtpError("");
        setError("");
        setSuccess("");

        await resendOtp({
            whatsapp,
        });
    };

    return (
        <div className="bg-bg w-full h-svh overflow-hidden">

            <div className="flex max-w-7xl mx-auto flex-col h-full py-4.5 px-4 sm:px-6 lg:px-8 justify-between">

                {/* ==================================
                    HEADER
                ================================== */}

                <div className="flex justify-between items-center w-full">

                    {/* Back to Signup */}
                    <Link
                        to="/signup"
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
                            Back to signup
                        </span>
                    </Link>

                </div>

                {/* ==================================
                    FORM AREA
                ================================== */}

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
                            Verify your WhatsApp
                        </h1>

                        {/* Description */}
                        <p
                            className="
                                mt-1
                                text-gray-blue
                                text-xs
                            "
                        >
                            We sent a 6-digit verification code
                            to your WhatsApp number.
                        </p>

                    </div>

                    {/* ==================================
                        WHATSAPP NUMBER
                    ================================== */}



                    {/* ==================================
                        FORM
                    ================================== */}

                    <form
                        onSubmit={handleSubmit}
                        className="
                            mt-4
                            sm:mt-5
                            flex
                            flex-col
                            gap-2
                            w-full
                        "
                    >

                        {/* API Error */}
                        {error && !otpError && (
                            <div className="rounded-md border border-red-600 bg-light-blue px-3 py-2">
                                <p className="text-xs text-red-600 text-center">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Success */}
                        {success && (
                            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2">
                                <p className="text-xs text-green-600 text-center">
                                    {success}
                                </p>
                            </div>
                        )}

                        {/* OTP */}
                        <div>

                            <div
                                className={`
                                    border
                                    flex
                                    justify-center
                                    items-center
                                    bg-light-blue
                                    rounded-md
                                    py-2.5
                                    px-3
                                    transition-colors
                                    duration-200
                                    ${otpError || error
                                        ? "border-red-500"
                                        : "border-light-azure"
                                    }
                                    focus-within:border-dark-blue/20
                                `}
                            >

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    placeholder="Enter 6-digit code"
                                    maxLength={6}
                                    className="
                                        w-full
                                        text-dark-blue
                                        text-sm
                                        text-center
                                        font-medium
                                        tracking-[6px]
                                        placeholder:text-gray-blue
                                        placeholder:tracking-normal
                                        placeholder:font-normal
                                        outline-none
                                        bg-transparent
                                    "
                                />

                            </div>

                            {/* Validation Error */}
                            {otpError && (
                                <p className="text-[10px] text-red-500 mt-1">
                                    {otpError}
                                </p>
                            )}

                        </div>

                        {/* Verify Button */}
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
                                ? "Verifying..."
                                : "Verify WhatsApp"}
                        </button>

                    </form>

                    {/* ==================================
                        RESEND
                    ================================== */}

                    <div className="text-center mt-4">

                        <p className="text-xs text-gray-blue">
                            Didn't receive the code?
                        </p>

                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isLoading}
                            className="
                                mt-1
                                text-xs
                                text-orange
                                hover:underline
                                disabled:opacity-50
                                cursor-pointer
                                disabled:cursor-not-allowed
                            "
                        >
                            Resend verification code
                        </button>

                    </div>

                </div>

                {/* ==================================
                    FOOTER
                ================================== */}

                <div className="w-full text-center">

                    <p className="text-gray-blue text-sm">
                        © 2026{" "}
                        <span className="text-dark-blue">
                            AiFi SMM.
                        </span>{" "}
                        All Rights Reserved
                    </p>

                </div>

            </div >

        </div >
    );
}
