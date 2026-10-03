import axios from "axios";
import { useState } from "react";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

export default function useAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ==========================================
    // SIGNUP
    // ==========================================

    const signup = async (formData) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                `${API_URL}/auth/signup/`,
                {
                    name: formData.name,
                    username: formData.username,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    password: formData.password,
                },
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data = response.data;

            setSuccess(
                data.message ||
                "Account created successfully."
            );

            return {
                success: true,
                data,

                verificationRequired:
                    data.verificationRequired ||
                    false,

                whatsapp:
                    data.whatsapp ||
                    formData.whatsapp,
            };
        } catch (error) {
            console.error(
                "Signup API Error:",
                error
            );

            if (error.response) {
                const data =
                    error.response.data;

                setError(
                    data.message ||
                    "Unable to create your account."
                );

                return {
                    success: false,
                    data,
                };
            }

            const message =
                "Unable to connect to the server. Please try again.";

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================================
    // LOGIN
    // ==========================================

    const login = async (formData) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                `${API_URL}/auth/login/`,
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data = response.data;

            console.log(
                "LOGIN SUCCESS RESPONSE:",
                data
            );

            // ==========================================
            // WHATSAPP VERIFICATION REQUIRED
            // ==========================================

            if (
                data?.verificationRequired === true
            ) {
                return {
                    success: false,
                    verificationRequired: true,
                    whatsapp: data.whatsapp,
                    data,
                };
            }

            // ==========================================
            // SAVE JWT
            // ==========================================

            if (data?.token) {
                localStorage.setItem(
                    "aifi_token",
                    data.token
                );
            }

            // ==========================================
            // SAVE USER
            // ==========================================

            if (data?.user) {
                localStorage.setItem(
                    "aifi_user",
                    JSON.stringify(data.user)
                );
            }

            setSuccess(
                data?.message ||
                "Login successful."
            );

            return {
                success: true,
                verificationRequired: false,
                token: data.token,
                user: data.user,
                data,
            };
        } catch (error) {
            console.error(
                "Login API Error:",
                error
            );

            if (error.response) {
                const data =
                    error.response.data;

                console.log(
                    "LOGIN ERROR RESPONSE:",
                    data
                );

                // ==========================================
                // WHATSAPP VERIFICATION REQUIRED
                // ==========================================

                if (
                    data?.verificationRequired ===
                    true
                ) {
                    return {
                        success: false,
                        verificationRequired: true,
                        whatsapp: data.whatsapp,
                        data,
                    };
                }

                setError(
                    data?.message ||
                    "Invalid email/username or password."
                );

                return {
                    success: false,
                    verificationRequired: false,
                    data,
                };
            }

            const message =
                "Unable to connect to the server. Please try again.";

            setError(message);

            return {
                success: false,
                verificationRequired: false,
                error: message,
            };
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================================
    // VERIFY WHATSAPP
    // ==========================================

    const verifyWhatsApp = async ({
        whatsapp,
        otp,
    }) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                `${API_URL}/auth/verify-whatsapp/`,
                {
                    whatsapp,
                    otp,
                },
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data = response.data;

            setSuccess(
                data.message ||
                "WhatsApp number verified successfully."
            );

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error(
                "Verify WhatsApp API Error:",
                error
            );

            if (error.response) {
                const data =
                    error.response.data;

                setError(
                    data.message ||
                    "Unable to verify your WhatsApp number."
                );

                return {
                    success: false,
                    data,
                };
            }

            const message =
                "Unable to connect to the server. Please try again.";

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================================
    // RESEND WHATSAPP OTP
    // ==========================================

    const resendOtp = async ({
        whatsapp,
    }) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                `${API_URL}/auth/resend-whatsapp-otp/`,
                {
                    whatsapp,
                },
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data = response.data;

            setSuccess(
                data.message ||
                "A new verification code has been sent to your WhatsApp."
            );

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error(
                "Resend WhatsApp OTP API Error:",
                error
            );

            if (error.response) {
                const data =
                    error.response.data;

                setError(
                    data.message ||
                    "Unable to resend verification code."
                );

                return {
                    success: false,
                    data,
                };
            }

            const message =
                "Unable to connect to the server. Please try again.";

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================================
    // FORGOT PASSWORD
    // ==========================================

    const forgotPassword = async ({
        whatsapp,
    }) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                `${API_URL}/auth/forgot-password/`,
                {
                    whatsapp,
                },
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data = response.data;

            setSuccess(
                data.message ||
                "Verification code sent to your WhatsApp."
            );

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error(
                "Forgot Password API Error:",
                error
            );

            if (error.response) {
                const data =
                    error.response.data;

                setError(
                    data.message ||
                    "Unable to send verification code."
                );

                return {
                    success: false,
                    data,
                };
            }

            const message =
                "Unable to connect to the server. Please try again.";

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================================
    // VERIFY RESET OTP
    // ==========================================

    const verifyResetOtp = async ({
        whatsapp,
        otp,
    }) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                `${API_URL}/auth/verify-reset-otp/`,
                {
                    whatsapp,
                    otp,
                },
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data = response.data;

            setSuccess(
                data.message ||
                "Verification code verified successfully."
            );

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error(
                "Verify Reset OTP API Error:",
                error
            );

            if (error.response) {
                const data =
                    error.response.data;

                setError(
                    data.message ||
                    "Invalid or expired verification code."
                );

                return {
                    success: false,
                    data,
                };
            }

            const message =
                "Unable to connect to the server. Please try again.";

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================================
    // RESEND RESET OTP
    // ==========================================

    const resendResetOtp = async ({
        whatsapp,
    }) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                `${API_URL}/auth/forgot-password/`,
                {
                    whatsapp,
                },
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data = response.data;

            setSuccess(
                data.message ||
                "A new verification code has been sent to your WhatsApp."
            );

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error(
                "Resend Reset OTP API Error:",
                error
            );

            if (error.response) {
                const data =
                    error.response.data;

                setError(
                    data.message ||
                    "Unable to resend verification code."
                );

                return {
                    success: false,
                    data,
                };
            }

            const message =
                "Unable to connect to the server. Please try again.";

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================================
    // RESET PASSWORD
    // ==========================================

    const resetPassword = async ({
        whatsapp,
        otp,
        newPassword,
    }) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                `${API_URL}/auth/reset-password/`,
                {
                    whatsapp,
                    otp,
                    newPassword,
                },
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data = response.data;

            console.log(
                "RESET PASSWORD API RESPONSE:",
                data
            );

            setSuccess(
                data.message ||
                "Password reset successfully."
            );

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error(
                "Reset Password API Error:",
                error
            );

            if (error.response) {
                const data =
                    error.response.data;

                setError(
                    data.message ||
                    "Unable to reset password."
                );

                return {
                    success: false,
                    data,
                };
            }

            const message =
                "Unable to connect to the server. Please try again.";

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setIsLoading(false);
        }
    };


    // ==========================================
    // LOGOUT
    // ==========================================




    // ==========================================
    // RETURN
    // ==========================================

    return {
        signup,
        login,
        verifyWhatsApp,
        resendOtp,

        forgotPassword,
        verifyResetOtp,
        resendResetOtp,
        resetPassword,

        isLoading,
        error,
        success,
        setError,
        setSuccess,
    };
}