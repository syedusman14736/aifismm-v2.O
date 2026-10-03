import {
    ArrowLeft,
    Eye,
    EyeOff,
    RefreshCw,
    Server,
    CheckCircle2,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function CreateProvider() {

    const API_URL =
        import.meta.env.VITE_API_URL;

    const navigate =
        useNavigate();


    const [form, setForm] = useState({
        name: "",
        apiUrl: "",
        apiKey: "",
        apiType: "standard_smm",
        status: "active",
    });


    const [showApiKey, setShowApiKey] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");


    const handleChange = (
        event
    ) => {

        const {
            name,
            value,
        } = event.target;


        setForm((current) => ({
            ...current,
            [name]: value,
        }));


        if (error) {
            setError("");
        }
    };


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        setError("");


        if (!form.name.trim()) {
            setError(
                "Provider name is required."
            );
            return;
        }


        if (!form.apiUrl.trim()) {
            setError(
                "API URL is required."
            );
            return;
        }


        if (!form.apiKey.trim()) {
            setError(
                "API key is required."
            );
            return;
        }


        setSaving(true);


        try {

            const token =
                localStorage.getItem(
                    "aifi_token"
                );


            const response =
                await fetch(
                    `${API_URL}/providers`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`,
                        },

                        body: JSON.stringify({
                            name:
                                form.name.trim(),

                            apiUrl:
                                form.apiUrl.trim(),

                            apiKey:
                                form.apiKey.trim(),

                            apiType:
                                "standard_smm",

                            status:
                                form.status,
                        }),
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to create provider."
                );
            }


            navigate(
                "/admin/providers"
            );

        } catch (error) {

            console.error(
                "Create provider error:",
                error
            );


            setError(
                error.message ||
                "Failed to create provider."
            );

        } finally {

            setSaving(false);

        }
    };


    return (
        <div className="max-w-3xl mx-auto space-y-5">

            {/* Header */}

            <div className="flex items-center gap-3">

                <Link
                    to="/admin/providers"
                    className="p-2 rounded-lg border border-light-azure bg-light-blue text-dark-gray hover:bg-bg"
                >
                    <ArrowLeft
                        size={18}
                        strokeWidth={1.8}
                    />
                </Link>


                <div>

                    <h1 className="text-primary text-xl sm:text-2xl font-semibold">
                        Add Provider
                    </h1>

                    <p className="text-dark-gray text-sm mt-1">
                        Connect a new SMM service provider.
                    </p>

                </div>

            </div>


            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="bg-light-blue border border-light-azure rounded-xl overflow-hidden"
            >

                {/* Connection */}

                <div className="p-4 sm:p-5 border-b border-light-azure">

                    <div className="flex items-center gap-3 mb-5">

                        <div className="w-9 h-9 rounded-lg bg-bg border border-light-azure flex items-center justify-center">

                            <Server
                                size={18}
                                className="text-dark-gray"
                                strokeWidth={1.8}
                            />

                        </div>


                        <div>

                            <h2 className="text-primary text-sm font-semibold">
                                Provider Connection
                            </h2>

                            <p className="text-dark-gray text-xs mt-0.5">
                                Enter the API details of your SMM provider.
                            </p>

                        </div>

                    </div>


                    <div className="space-y-4">

                        {/* Name */}

                        <div>

                            <label className="block text-xs font-medium text-primary mb-1.5">
                                Provider Name
                                <span className="text-red-500 ml-1">
                                    *
                                </span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    form.name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. PakStarSMM"
                                required
                                className="w-full bg-bg border border-light-azure rounded-lg px-3 py-2.5 text-sm text-primary outline-none placeholder:text-gray focus:border-gray-blue"
                            />

                        </div>


                        {/* API URL */}

                        <div>

                            <label className="block text-xs font-medium text-primary mb-1.5">
                                API URL
                                <span className="text-red-500 ml-1">
                                    *
                                </span>
                            </label>

                            <input
                                type="url"
                                name="apiUrl"
                                value={
                                    form.apiUrl
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="https://example.com/v2"
                                required
                                className="w-full bg-bg border border-light-azure rounded-lg px-3 py-2.5 text-sm text-primary outline-none placeholder:text-gray focus:border-gray-blue"
                            />

                            <p className="text-dark-gray text-[11px] mt-1.5">
                                The provider's API endpoint used for service requests.
                            </p>

                        </div>


                        {/* API Key */}

                        <div>

                            <label className="block text-xs font-medium text-primary mb-1.5">
                                API Key
                                <span className="text-red-500 ml-1">
                                    *
                                </span>
                            </label>


                            <div className="relative">

                                <input
                                    type={
                                        showApiKey
                                            ? "text"
                                            : "password"
                                    }
                                    name="apiKey"
                                    value={
                                        form.apiKey
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter provider API key"
                                    required
                                    autoComplete="new-password"
                                    className="w-full bg-bg border border-light-azure rounded-lg px-3 py-2.5 pr-11 text-sm text-primary outline-none placeholder:text-gray focus:border-gray-blue"
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowApiKey(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-dark-gray hover:bg-light-azure"
                                    title={
                                        showApiKey
                                            ? "Hide API key"
                                            : "Show API key"
                                    }
                                >

                                    {showApiKey ? (
                                        <EyeOff
                                            size={16}
                                            strokeWidth={
                                                1.8
                                            }
                                        />
                                    ) : (
                                        <Eye
                                            size={16}
                                            strokeWidth={
                                                1.8
                                            }
                                        />
                                    )}

                                </button>

                            </div>


                            <p className="text-dark-gray text-[11px] mt-1.5">
                                This key is stored securely and should not be exposed in the client UI.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Configuration */}

                <div className="p-4 sm:p-5 border-b border-light-azure">

                    <div className="mb-4">

                        <h2 className="text-primary text-sm font-semibold">
                            Configuration
                        </h2>

                        <p className="text-dark-gray text-xs mt-0.5">
                            Configure how this provider should be handled.
                        </p>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* API Type */}

                        <div>

                            <label className="block text-xs font-medium text-primary mb-1.5">
                                API Type
                            </label>

                            <select
                                value={
                                    form.apiType
                                }
                                disabled
                                className="w-full bg-bg border border-light-azure rounded-lg px-3 py-2.5 text-sm text-dark-gray outline-none opacity-80"
                            >

                                <option value="standard_smm">
                                    Standard SMM
                                </option>

                            </select>

                            <p className="text-dark-gray text-[11px] mt-1.5">
                                Currently supported provider API type.
                            </p>

                        </div>


                        {/* Status */}

                        <div>

                            <label className="block text-xs font-medium text-primary mb-1.5">
                                Status
                            </label>

                            <select
                                name="status"
                                value={
                                    form.status
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full bg-bg border border-light-azure rounded-lg px-3 py-2.5 text-sm text-dark-gray outline-none focus:border-gray-blue"
                            >

                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* Error */}

                {error && (

                    <div className="mx-4 sm:mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">

                        <p className="text-red-600 text-xs">
                            {error}
                        </p>

                    </div>

                )}


                {/* Footer */}

                <div className="p-4 sm:p-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div className="flex items-center gap-2 text-dark-gray">

                        <CheckCircle2
                            size={16}
                            strokeWidth={1.8}
                        />

                        <span className="text-xs">
                            API credentials are required to connect the provider.
                        </span>

                    </div>


                    <div className="flex items-center gap-2">

                        <Link
                            to="/admin/providers"
                            className="px-4 py-2.5 rounded-lg border border-light-azure text-sm text-dark-gray"
                        >
                            Cancel
                        </Link>


                        <button
                            type="submit"
                            disabled={
                                saving
                            }
                            className="inline-flex items-center justify-center gap-2 bg-primary text-light-blue rounded-lg px-4 py-2.5 text-sm font-medium disabled:opacity-50"
                        >

                            {saving && (
                                <RefreshCw
                                    size={15}
                                    className="animate-spin"
                                />
                            )}

                            {saving
                                ? "Creating..."
                                : "Create Provider"}

                        </button>

                    </div>

                </div>

            </form>

        </div>
    );
}


export default CreateProvider;