import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    CircleAlert,
    Clock3,
    Copy,
    ExternalLink,
    KeyRound,
    Loader2,
    Pencil,
    Play,
    RefreshCw,
    Server,
    ShieldCheck,
    Trash2,
    XCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ProviderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showApiKey, setShowApiKey] = useState(false);

    const token = localStorage.getItem("aifi_token");

    const authHeaders = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const getProvider = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/providers/${id}`,
                {
                    method: "GET",
                    headers: authHeaders,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to load provider."
                );
            }

            setProvider(data?.provider || data?.data || data);
        } catch (err) {
            setError(err.message || "Failed to load provider.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProvider();
    }, [id]);

    const clearFeedback = () => {
        setMessage("");
        setError("");
    };

    const handleTestConnection = async () => {
        try {
            clearFeedback();
            setActionLoading("test");

            const response = await fetch(
                `${API_URL}/providers/${id}/test`,
                {
                    method: "POST",
                    headers: authHeaders,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Provider connection test failed."
                );
            }

            setMessage(
                data?.message ||
                "Provider connection tested successfully."
            );
        } catch (err) {
            setError(
                err.message || "Provider connection test failed."
            );
        } finally {
            setActionLoading("");
        }
    };

    const handleSyncServices = async () => {
        try {
            clearFeedback();
            setActionLoading("sync");

            const response = await fetch(
                `${API_URL}/providers/${id}/sync-services`,
                {
                    method: "POST",
                    headers: authHeaders,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to sync provider services."
                );
            }

            const syncedCount =
                data?.syncedCount ??
                data?.createdCount ??
                data?.count ??
                data?.services?.length;

            if (typeof syncedCount === "number") {
                setMessage(
                    `Provider services synced successfully. ${syncedCount} service(s) processed.`
                );
            } else {
                setMessage(
                    data?.message ||
                    "Provider services synced successfully."
                );
            }
        } catch (err) {
            setError(
                err.message || "Failed to sync provider services."
            );
        } finally {
            setActionLoading("");
        }
    };

    const handleToggleStatus = async () => {
        if (!provider) return;

        const nextStatus =
            provider.status === "active" ? "inactive" : "active";

        try {
            clearFeedback();
            setActionLoading("status");

            const response = await fetch(
                `${API_URL}/providers/${id}/status`,
                {
                    method: "PATCH",
                    headers: authHeaders,
                    body: JSON.stringify({
                        status: nextStatus,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to update provider status."
                );
            }

            const updatedProvider =
                data?.provider || data?.data || data;

            setProvider((current) => ({
                ...current,
                ...(updatedProvider || {}),
                status:
                    updatedProvider?.status || nextStatus,
            }));

            setMessage(
                `Provider ${nextStatus === "active" ? "activated" : "deactivated"} successfully.`
            );
        } catch (err) {
            setError(
                err.message || "Failed to update provider status."
            );
        } finally {
            setActionLoading("");
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this provider? This action cannot be undone."
        );

        if (!confirmed) return;

        try {
            clearFeedback();
            setActionLoading("delete");

            const response = await fetch(
                `${API_URL}/providers/${id}`,
                {
                    method: "DELETE",
                    headers: authHeaders,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to delete provider."
                );
            }

            navigate("/admin/providers");
        } catch (err) {
            setError(err.message || "Failed to delete provider.");
            setActionLoading("");
        }
    };

    const copyToClipboard = async (value, successMessage) => {
        if (!value) return;

        try {
            await navigator.clipboard.writeText(value);
            setMessage(successMessage);
        } catch {
            setError("Could not copy to clipboard.");
        }
    };

    const formatDate = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleString();
    };

    const getApiKeyDisplay = () => {
        if (!provider?.apiKey) {
            return "API key is hidden";
        }

        if (showApiKey) {
            return provider.apiKey;
        }

        return "••••••••••••••••";
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex items-center gap-2 text-dark-gray">
                    <Loader2
                        size={20}
                        className="animate-spin"
                    />
                    <span className="text-sm">
                        Loading provider...
                    </span>
                </div>
            </div>
        );
    }

    if (!provider) {
        return (
            <div className="space-y-4">
                <Link
                    to="/admin/providers"
                    className="inline-flex items-center gap-2 text-sm text-dark-gray hover:text-dark-blue"
                >
                    <ArrowLeft size={17} />
                    Back to Providers
                </Link>

                <div className="rounded-lg border border-light-azure bg-light-blue p-6">
                    <div className="flex items-center gap-2 text-red-500">
                        <CircleAlert size={19} />
                        <p className="text-sm font-medium">
                            {error || "Provider not found."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const isActive = provider.status === "active";

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                    <Link
                        to="/admin/providers"
                        className="mb-3 inline-flex items-center gap-2 text-sm text-dark-gray transition hover:text-dark-blue"
                    >
                        <ArrowLeft size={17} />
                        Back to Providers
                    </Link>

                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-semibold text-dark-blue sm:text-2xl">
                            {provider.name}
                        </h2>

                        <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            {isActive ? (
                                <CheckCircle2 size={13} />
                            ) : (
                                <XCircle size={13} />
                            )}
                            {isActive ? "Active" : "Inactive"}
                        </span>
                    </div>

                    <p className="mt-1 text-sm text-dark-gray">
                        Manage provider connection, API access and service
                        synchronization.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Link
                        to={`/admin/providers/${id}/edit`}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-light-azure bg-light-blue px-3 py-2 text-sm font-medium text-dark-blue transition hover:bg-bg"
                    >
                        <Pencil size={16} />
                        Edit
                    </Link>

                    <button
                        type="button"
                        onClick={handleTestConnection}
                        disabled={actionLoading !== ""}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-light-azure bg-light-blue px-3 py-2 text-sm font-medium text-dark-blue transition hover:bg-bg disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {actionLoading === "test" ? (
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        ) : (
                            <Play size={16} />
                        )}
                        Test API
                    </button>

                    <button
                        type="button"
                        onClick={handleSyncServices}
                        disabled={actionLoading !== ""}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-light-blue transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {actionLoading === "sync" ? (
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        ) : (
                            <RefreshCw size={16} />
                        )}
                        Sync Services
                    </button>
                </div>
            </div>

            {/* Feedback */}
            {message && (
                <div className="flex items-start gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0"
                    />
                    <span>{message}</span>
                </div>
            )}

            {error && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <CircleAlert
                        size={18}
                        className="mt-0.5 shrink-0"
                    />
                    <span>{error}</span>
                </div>
            )}

            {/* Provider overview */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="rounded-lg border border-light-azure bg-light-blue p-5 xl:col-span-2">
                    <div className="mb-5 flex items-center gap-2">
                        <Server
                            size={19}
                            className="text-dark-blue"
                        />
                        <h3 className="font-semibold text-dark-blue">
                            Provider Information
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InfoItem
                            label="Provider Name"
                            value={provider.name}
                        />

                        <InfoItem
                            label="API Type"
                            value={
                                provider.apiType ||
                                "standard_smm"
                            }
                        />

                        <InfoItem
                            label="Status"
                            value={
                                isActive ? "Active" : "Inactive"
                            }
                        />

                        <InfoItem
                            label="Provider ID"
                            value={provider._id || provider.id}
                            copyable
                            onCopy={() =>
                                copyToClipboard(
                                    provider._id || provider.id,
                                    "Provider ID copied."
                                )
                            }
                        />

                        <div className="sm:col-span-2">
                            <InfoItem
                                label="API URL"
                                value={provider.apiUrl}
                                copyable
                                onCopy={() =>
                                    copyToClipboard(
                                        provider.apiUrl,
                                        "API URL copied."
                                    )
                                }
                                link
                            />
                        </div>
                    </div>
                </div>

                {/* Status card */}
                <div className="rounded-lg border border-light-azure bg-light-blue p-5">
                    <div className="mb-5 flex items-center gap-2">
                        <ShieldCheck
                            size={19}
                            className="text-dark-blue"
                        />
                        <h3 className="font-semibold text-dark-blue">
                            Provider Status
                        </h3>
                    </div>

                    <div
                        className={`rounded-md p-4 ${isActive
                            ? "bg-green-50"
                            : "bg-gray-100"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {isActive ? (
                                <CheckCircle2
                                    size={24}
                                    className="text-green-600"
                                />
                            ) : (
                                <XCircle
                                    size={24}
                                    className="text-gray-500"
                                />
                            )}

                            <div>
                                <p className="text-sm font-semibold text-dark-blue">
                                    {isActive
                                        ? "Provider is active"
                                        : "Provider is inactive"}
                                </p>
                                <p className="mt-0.5 text-xs text-dark-gray">
                                    {isActive
                                        ? "Services can use this provider."
                                        : "This provider is currently disabled."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleToggleStatus}
                        disabled={actionLoading !== ""}
                        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${isActive
                            ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-primary text-light-blue hover:opacity-90"
                            }`}
                    >
                        {actionLoading === "status" ? (
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        ) : isActive ? (
                            <XCircle size={16} />
                        ) : (
                            <CheckCircle2 size={16} />
                        )}

                        {isActive
                            ? "Deactivate Provider"
                            : "Activate Provider"}
                    </button>
                </div>
            </div>

            {/* API Credentials */}
            <div className="rounded-lg border border-light-azure bg-light-blue p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <KeyRound
                            size={19}
                            className="text-dark-blue"
                        />
                        <h3 className="font-semibold text-dark-blue">
                            API Credentials
                        </h3>
                    </div>

                    <span className="text-xs text-dark-gray">
                        Sensitive information
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                            API URL
                        </label>

                        <div className="flex items-center gap-2">
                            <div className="min-w-0 flex-1 rounded-md border border-light-azure bg-bg px-3 py-2.5">
                                <p className="truncate text-sm text-dark-blue">
                                    {provider.apiUrl || "—"}
                                </p>
                            </div>

                            {provider.apiUrl && (
                                <button
                                    type="button"
                                    title="Copy API URL"
                                    onClick={() =>
                                        copyToClipboard(
                                            provider.apiUrl,
                                            "API URL copied."
                                        )
                                    }
                                    className="shrink-0 rounded-md border border-light-azure bg-light-blue p-2.5 text-dark-gray transition hover:text-dark-blue"
                                >
                                    <Copy size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                            API Key
                        </label>

                        <div className="flex items-center gap-2">
                            <div className="min-w-0 flex-1 rounded-md border border-light-azure bg-bg px-3 py-2.5">
                                <p className="truncate font-mono text-sm text-dark-blue">
                                    {getApiKeyDisplay()}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowApiKey((current) => !current)
                                }
                                className="shrink-0 rounded-md border border-light-azure bg-light-blue px-3 py-2.5 text-xs font-medium text-dark-gray transition hover:text-dark-blue"
                            >
                                {showApiKey ? "Hide" : "Show"}
                            </button>

                            {showApiKey && provider.apiKey && (
                                <button
                                    type="button"
                                    title="Copy API key"
                                    onClick={() =>
                                        copyToClipboard(
                                            provider.apiKey,
                                            "API key copied."
                                        )
                                    }
                                    className="shrink-0 rounded-md border border-light-azure bg-light-blue p-2.5 text-dark-gray transition hover:text-dark-blue"
                                >
                                    <Copy size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timestamps */}
            <div className="rounded-lg border border-light-azure bg-light-blue p-5">
                <div className="mb-5 flex items-center gap-2">
                    <Clock3
                        size={19}
                        className="text-dark-blue"
                    />
                    <h3 className="font-semibold text-dark-blue">
                        Record Information
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InfoItem
                        label="Created At"
                        value={formatDate(provider.createdAt)}
                    />

                    <InfoItem
                        label="Last Updated"
                        value={formatDate(provider.updatedAt)}
                    />
                </div>
            </div>

            {/* Danger zone */}
            <div className="rounded-lg border border-red-200 bg-light-blue p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="font-semibold text-red-600">
                            Danger Zone
                        </h3>
                        <p className="mt-1 text-xs text-dark-gray">
                            Deleting this provider is permanent and cannot be
                            undone.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={actionLoading !== ""}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {actionLoading === "delete" ? (
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        ) : (
                            <Trash2 size={16} />
                        )}
                        Delete Provider
                    </button>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({
    label,
    value,
    copyable = false,
    onCopy,
    link = false,
}) => {
    return (
        <div className="min-w-0">
            <p className="mb-1.5 text-xs font-medium text-dark-gray">
                {label}
            </p>

            <div className="flex min-w-0 items-center gap-2">
                <div className="min-w-0 flex-1">
                    {link && value ? (
                        <a
                            href={value}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex max-w-full items-center gap-1.5 truncate text-sm text-dark-blue hover:underline"
                        >
                            <span className="truncate">
                                {value}
                            </span>
                            <ExternalLink
                                size={14}
                                className="shrink-0"
                            />
                        </a>
                    ) : (
                        <p className="truncate text-sm font-medium text-dark-blue">
                            {value || "—"}
                        </p>
                    )}
                </div>

                {copyable && value && (
                    <button
                        type="button"
                        title={`Copy ${label}`}
                        onClick={onCopy}
                        className="shrink-0 rounded-md border border-light-azure bg-light-blue p-1.5 text-dark-gray transition hover:text-dark-blue"
                    >
                        <Copy size={15} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProviderDetails;