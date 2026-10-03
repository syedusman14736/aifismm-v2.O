import React, {
    useEffect,
    useState,
} from "react";

import {
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    CheckCircle,
} from "lucide-react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import useAuth from "./hooks/useAuth";

const ResetPassword = () => {
    const navigate = useNavigate();

    const {
        resetPassword,
        isLoading,
        error,
        success,
        setError,
        setSuccess,
    } = useAuth();

    const [whatsapp, setWhatsapp] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [validationErrors, setValidationErrors] =
        useState({});

    // ==========================================
    // CHECK RESET SESSION
    // ==========================================

    useEffect(() => {
        const storedWhatsapp =
            sessionStorage.getItem(
                "resetWhatsapp"
            );

        const otpVerified =
            sessionStorage.getItem(
                "resetOtpVerified"
            );

        const storedOtp =
            sessionStorage.getItem(
                "resetOtp"
            );

        if (
            !storedWhatsapp ||
            otpVerified !== "true" ||
            !storedOtp
        ) {
            navigate("/forgot-password", {
                replace: true,
            });

            return;
        }

        setWhatsapp(storedWhatsapp);
    }, [navigate]);

    // ==========================================
    // VALIDATION
    // ==========================================

    const validateForm = () => {
        const errors = {};

        if (!password) {
            errors.password =
                "Password is required.";
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

        if (!confirmPassword) {
            errors.confirmPassword =
                "Please confirm your password.";
        } else if (
            password !== confirmPassword
        ) {
            errors.confirmPassword =
                "Passwords do not match.";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setValidationErrors({});

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        const otp =
            sessionStorage.getItem(
                "resetOtp"
            );

        if (!otp) {
            setError(
                "Verification session has expired. Please request a new OTP."
            );

            navigate("/forgot-password", {
                replace: true,
            });

            return;
        }

        try {
            const result =
                await resetPassword({
                    whatsapp,
                    otp,
                    newPassword:
                        password,
                });

            console.log(
                "RESET PASSWORD RESULT:",
                result
            );

            if (!result?.success) {
                return;
            }

            // ======================================
            // CLEAR RESET SESSION
            // ======================================

            sessionStorage.removeItem(
                "resetWhatsapp"
            );

            sessionStorage.removeItem(
                "resetOtp"
            );

            sessionStorage.removeItem(
                "resetOtpVerified"
            );

            // ======================================
            // GO TO LOGIN
            // ======================================

            setTimeout(() => {
                navigate("/login", {
                    replace: true,
                });
            }, 1200);

        } catch (error) {
            console.error(
                "Reset Password Submit Error:",
                error
            );
        }
    };

    // ==========================================
    // PASSWORD CHANGE
    // ==========================================

    const handlePasswordChange = (e) => {
        const value = e.target.value;

        setPassword(value);
        setError("");
        setSuccess("");

        if (validationErrors.password) {
            setValidationErrors((prev) => ({
                ...prev,
                password: "",
            }));
        }

        if (
            validationErrors.confirmPassword &&
            value === confirmPassword
        ) {
            setValidationErrors((prev) => ({
                ...prev,
                confirmPassword: "",
            }));
        }
    };

    // ==========================================
    // CONFIRM PASSWORD CHANGE
    // ==========================================

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;

        setConfirmPassword(value);
        setError("");
        setSuccess("");

        if (
            validationErrors.confirmPassword
        ) {
            setValidationErrors((prev) => ({
                ...prev,
                confirmPassword: "",
            }));
        }
    };

    return (
        <div className="bg-bg w-full h-svh overflow-hidden">

            <div className="flex max-w-7xl mx-auto flex-col h-full py-4.5 px-4 sm:px-6 lg:px-8 justify-between">

                {/* ==========================================
                    HEADER
                ========================================== */}

                <div className="flex justify-between items-center w-full">

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

                {/* ==========================================
                    MAIN
                ========================================== */}

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

                    {/* ======================================
                        HEADING
                    ====================================== */}

                    <div className="text-center w-full">

                        <h1
                            className="
                                text-[28px]
                                font-medium
                                text-dark-blue
                            "
                        >
                            Reset Password
                        </h1>

                        <p
                            className="
                                mt-1
                                text-gray-blue
                                text-[11px]
                            "
                        >
                            Create a new password for
                            your AiFi SMM account.
                        </p>

                    </div>

                    {/* ======================================
                        FORM
                    ====================================== */}

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

                        {/* ==================================
                            SUCCESS
                        ================================== */}

                        {success && (
                            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2">

                                <div className="flex items-center justify-center gap-2">

                                    <CheckCircle
                                        size={15}
                                        className="text-green-600 shrink-0"
                                    />

                                    <p className="text-xs text-green-600 text-center">
                                        {success}
                                    </p>

                                </div>

                            </div>
                        )}

                        {/* ==================================
                            API ERROR
                        ================================== */}

                        {error && (
                            <div className="rounded-md border border-red-600 bg-light-blue px-3 py-2">

                                <p className="text-xs text-red-600 text-center">
                                    {error}
                                </p>

                            </div>
                        )}


                        {/* ==================================
                            NEW PASSWORD
                        ================================== */}

                        <div>

                            <div
                                className={`
                                    border
                                    flex
                                    items-center
                                    bg-light-blue
                                    rounded-md
                                    py-2.5
                                    px-3
                                    transition-colors
                                    duration-200
                                    ${validationErrors.password ||
                                        error
                                        ? "border-red-500"
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
                                        mr-2
                                    "
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={
                                        handlePasswordChange
                                    }
                                    placeholder="New password"
                                    autoComplete="new-password"
                                    className="
                                        w-full
                                        text-dark-blue
                                        text-[13px]
                                        placeholder:text-gray-blue
                                        outline-none
                                        bg-transparent
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="
                                        text-gray-blue
                                        hover:text-dark-blue
                                        transition-colors
                                        cursor-pointer
                                        shrink-0
                                    "
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            size={18}
                                        />
                                    ) : (
                                        <Eye
                                            size={18}
                                        />
                                    )}
                                </button>

                            </div>



                        </div>

                        {/* ==================================
                            CONFIRM PASSWORD
                        ================================== */}

                        <div>

                            <div
                                className={`
                                    border
                                    flex
                                    items-center
                                    bg-light-blue
                                    rounded-md
                                    py-2.5
                                    px-3
                                    transition-colors
                                    duration-200
                                    ${validationErrors.confirmPassword ||
                                        error
                                        ? "border-red-500"
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
                                        mr-2
                                    "
                                />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        confirmPassword
                                    }
                                    onChange={
                                        handleConfirmPasswordChange
                                    }
                                    placeholder="Confirm new password"
                                    autoComplete="new-password"
                                    className="
                                        w-full
                                        text-dark-blue
                                        text-sm
                                        placeholder:text-gray-blue
                                        outline-none
                                        bg-transparent
                                    "
                                />



                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="
                                        text-gray-blue
                                        hover:text-dark-blue
                                        transition-colors
                                        cursor-pointer
                                        shrink-0
                                    "
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff
                                            size={18}
                                        />
                                    ) : (
                                        <Eye
                                            size={18}
                                        />
                                    )}
                                </button>

                            </div>

                            {validationErrors.confirmPassword && (
                                <p className="text-[10px] text-red-500 mt-1">
                                    {
                                        validationErrors.confirmPassword
                                    }
                                </p>
                            )}

                        </div>
                        {validationErrors.password ? (
                            <p className="text-[10px] text-red-500 mt-1">
                                {
                                    validationErrors.password
                                }
                            </p>
                        ) : (
                            <p className="text-[10px] text-gray-blue mt-1">
                                Minimum 8 characters with
                                uppercase, lowercase and
                                a number.
                            </p>
                        )}
                        {/* ==================================
                            SUBMIT
                        ================================== */}

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
                                ? "Resetting..."
                                : "Reset Password"}
                        </button>

                    </form>



                </div>

                {/* ==========================================
                    FOOTER
                ========================================== */}

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
};

export default ResetPassword;