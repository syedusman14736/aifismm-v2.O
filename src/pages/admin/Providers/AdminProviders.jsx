import React, { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    RefreshCw,
    Pencil,
    MoreVertical,
    Play,
    RotateCw,
    CheckCircle2,
    XCircle,
    Trash2,
    Loader2,
    X,
    Save,
    AlertCircle,
    Server,
    Eye,
    EyeOff,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const emptyForm = {
    name: "",
    apiUrl: "",
    apiKey: "",
    apiType: "standard_smm",
    status: "active",
};

const AdminProviders = () => {
    const token = localStorage.getItem("aifi_token");

    const headers = useMemo(
        () => ({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }),
        [token]
    );

    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [openMenu, setOpenMenu] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingProvider, setEditingProvider] =
        useState(null);

    const [form, setForm] = useState(emptyForm);
    const [formLoading, setFormLoading] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const parseProviders = (data) => {
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.providers)) {
            return data.providers;
        }
        if (Array.isArray(data?.data)) {
            return data.data;
        }
        return [];
    };

    const loadProviders = async () => {
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams();

            if (search.trim()) {
                params.set("search", search.trim());
            }

            if (status) {
                params.set("status", status);
            }

            const query = params.toString();

            const response = await fetch(
                `${API_URL}/providers${query ? `?${query}` : ""
                }`,
                {
                    method: "GET",
                    headers,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to load providers."
                );
            }

            setProviders(parseProviders(data));
        } catch (err) {
            setError(
                err.message ||
                "Failed to load providers."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            loadProviders();
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, status]);

    const openAddModal = () => {
        setEditingProvider(null);
        setForm(emptyForm);
        setShowApiKey(false);
        setError("");
        setSuccess("");
        setModalOpen(true);
    };

    const openEditModal = (provider) => {
        setEditingProvider(provider);

        setForm({
            name: provider.name || "",
            apiUrl: provider.apiUrl || "",
            apiKey: "",
            apiType:
                provider.apiType ||
                "standard_smm",
            status:
                provider.status || "active",
        });

        setShowApiKey(false);
        setError("");
        setSuccess("");
        setOpenMenu(null);
        setModalOpen(true);
    };

    const closeModal = () => {
        if (formLoading) return;

        setModalOpen(false);
        setEditingProvider(null);
        setForm(emptyForm);
        setShowApiKey(false);
        setError("");
        setSuccess("");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSaveProvider = async (event) => {
        event.preventDefault();

        try {
            setFormLoading(true);
            setError("");
            setSuccess("");

            if (!form.name.trim()) {
                throw new Error(
                    "Provider name is required."
                );
            }

            if (!form.apiUrl.trim()) {
                throw new Error(
                    "API URL is required."
                );
            }

            if (
                !editingProvider &&
                !form.apiKey.trim()
            ) {
                throw new Error(
                    "API key is required."
                );
            }

            const providerId =
                editingProvider?._id ||
                editingProvider?.id;

            const body = {
                name: form.name.trim(),
                apiUrl: form.apiUrl.trim(),
                apiType: "standard_smm",
                status: form.status,
            };

            /*
             * API key is required on create.
             * On edit, only send it when the admin
             * entered a new key.
             */
            if (form.apiKey.trim()) {
                body.apiKey = form.apiKey.trim();
            }

            const response = await fetch(
                editingProvider
                    ? `${API_URL}/providers/${providerId}`
                    : `${API_URL}/providers`,
                {
                    method: editingProvider
                        ? "PUT"
                        : "POST",
                    headers,
                    body: JSON.stringify(body),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    `Failed to ${editingProvider
                        ? "update"
                        : "create"
                    } provider.`
                );
            }

            setSuccess(
                `Provider ${editingProvider
                    ? "updated"
                    : "created"
                } successfully.`
            );

            await loadProviders();

            setTimeout(() => {
                closeModal();
            }, 500);
        } catch (err) {
            setError(
                err.message ||
                "Failed to save provider."
            );
        } finally {
            setFormLoading(false);
        }
    };

    const handleTest = async (provider) => {
        const providerId =
            provider._id || provider.id;

        try {
            setActionLoading(
                `test-${providerId}`
            );
            setError("");
            setSuccess("");
            setOpenMenu(null);

            const response = await fetch(
                `${API_URL}/providers/${providerId}/test`,
                {
                    method: "POST",
                    headers,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Provider connection test failed."
                );
            }

            setSuccess(
                data?.message ||
                `${provider.name} connection is working.`
            );
        } catch (err) {
            setError(
                err.message ||
                "Provider connection test failed."
            );
        } finally {
            setActionLoading("");
        }
    };

    const handleSync = async (provider) => {
        const providerId =
            provider._id || provider.id;

        try {
            setActionLoading(
                `sync-${providerId}`
            );
            setError("");
            setSuccess("");
            setOpenMenu(null);

            const response = await fetch(
                `${API_URL}/providers/${providerId}/sync-services`,
                {
                    method: "POST",
                    headers,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to sync services."
                );
            }

            const count =
                data?.syncedCount ??
                data?.createdCount ??
                data?.count;

            setSuccess(
                typeof count === "number"
                    ? `${provider.name}: ${count} service(s) processed successfully.`
                    : data?.message ||
                    `${provider.name} services synced successfully.`
            );
        } catch (err) {
            setError(
                err.message ||
                "Failed to sync provider services."
            );
        } finally {
            setActionLoading("");
        }
    };

    const handleStatus = async (provider) => {
        const providerId =
            provider._id || provider.id;

        const nextStatus =
            provider.status === "active"
                ? "inactive"
                : "active";

        try {
            setActionLoading(
                `status-${providerId}`
            );
            setError("");
            setSuccess("");
            setOpenMenu(null);

            const response = await fetch(
                `${API_URL}/providers/${providerId}/status`,
                {
                    method: "PATCH",
                    headers,
                    body: JSON.stringify({
                        status: nextStatus,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to update provider status."
                );
            }

            await loadProviders();

            setSuccess(
                `Provider ${nextStatus === "active"
                    ? "activated"
                    : "deactivated"
                } successfully.`
            );
        } catch (err) {
            setError(
                err.message ||
                "Failed to update provider status."
            );
        } finally {
            setActionLoading("");
        }
    };

    const handleDelete = async (provider) => {
        const confirmed = window.confirm(
            `Delete "${provider.name}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        const providerId =
            provider._id || provider.id;

        try {
            setActionLoading(
                `delete-${providerId}`
            );
            setError("");
            setSuccess("");
            setOpenMenu(null);

            const response = await fetch(
                `${API_URL}/providers/${providerId}`,
                {
                    method: "DELETE",
                    headers,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to delete provider."
                );
            }

            await loadProviders();

            setSuccess(
                "Provider deleted successfully."
            );
        } catch (err) {
            setError(
                err.message ||
                "Failed to delete provider."
            );
        } finally {
            setActionLoading("");
        }
    };

    const clearFilters = () => {
        setSearch("");
        setStatus("");
    };

    return (
        <div
            className="space-y-4"
            onClick={() => setOpenMenu(null)}
        >
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-dark-blue">
                        Providers
                    </h2>

                    <p className="mt-1 text-sm text-dark-gray">
                        Manage SMM API providers and
                        synchronize their services.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-primary px-3 py-2 text-sm font-medium text-light-blue transition hover:opacity-90 sm:self-auto"
                >
                    <Plus size={17} />
                    Add Provider
                </button>
            </div>

            {/* Feedback */}
            {error && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <AlertCircle
                        size={18}
                        className="mt-0.5 shrink-0"
                    />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="flex items-start gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0"
                    />
                    <span>{success}</span>
                </div>
            )}

            {/* Filters */}
            <div
                className="rounded-lg border border-light-azure bg-light-blue p-3"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search providers..."
                            className="w-full rounded-md border border-light-azure bg-bg py-2 pl-9 pr-3 text-sm text-dark-blue outline-none placeholder:text-gray focus:border-dark-blue"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(
                                event.target.value
                            )
                        }
                        className="rounded-md border border-light-azure bg-bg px-3 py-2 text-sm text-dark-blue outline-none focus:border-dark-blue sm:w-40"
                    >
                        <option value="">
                            All Status
                        </option>
                        <option value="active">
                            Active
                        </option>
                        <option value="inactive">
                            Inactive
                        </option>
                    </select>

                    {(search || status) && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm text-dark-gray hover:text-dark-blue"
                        >
                            <X size={15} />
                            Clear
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={loadProviders}
                        className="inline-flex items-center justify-center rounded-md border border-light-azure bg-bg p-2 text-dark-gray hover:text-dark-blue"
                        title="Refresh"
                    >
                        <RefreshCw size={17} />
                    </button>
                </div>
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-visible rounded-lg border border-light-azure bg-light-blue md:block">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        <thead>
                            <tr className="border-b border-light-azure text-xs uppercase tracking-wide text-dark-gray">
                                <th className="px-4 py-3 font-medium">
                                    Provider
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    API Type
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    API URL
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-4 py-12"
                                    >
                                        <LoadingState />
                                    </td>
                                </tr>
                            ) : providers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-4 py-12"
                                    >
                                        <EmptyState />
                                    </td>
                                </tr>
                            ) : (
                                providers.map(
                                    (provider) => {
                                        const id =
                                            provider._id ||
                                            provider.id;

                                        const active =
                                            provider.status ===
                                            "active";

                                        return (
                                            <tr
                                                key={id}
                                                className="border-b border-light-azure last:border-b-0"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-bg text-dark-blue">
                                                            <Server
                                                                size={
                                                                    17
                                                                }
                                                            />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-medium text-dark-blue">
                                                                {
                                                                    provider.name
                                                                }
                                                            </p>

                                                            <p className="mt-0.5 text-xs text-gray">
                                                                {id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 text-sm text-dark-gray">
                                                    {provider.apiType ||
                                                        "standard_smm"}
                                                </td>

                                                <td className="max-w-[300px] px-4 py-3">
                                                    <p className="truncate text-sm text-dark-gray">
                                                        {
                                                            provider.apiUrl
                                                        }
                                                    </p>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <StatusBadge
                                                        active={
                                                            active
                                                        }
                                                    />
                                                </td>

                                                <td className="relative px-4 py-3">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleTest(
                                                                    provider
                                                                )
                                                            }
                                                            disabled={
                                                                actionLoading !==
                                                                ""
                                                            }
                                                            title="Test API"
                                                            className="rounded-md p-2 text-dark-gray hover:bg-bg hover:text-dark-blue disabled:opacity-40"
                                                        >
                                                            {actionLoading ===
                                                                `test-${id}` ? (
                                                                <Loader2
                                                                    size={
                                                                        16
                                                                    }
                                                                    className="animate-spin"
                                                                />
                                                            ) : (
                                                                <Play
                                                                    size={
                                                                        16
                                                                    }
                                                                />
                                                            )}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleSync(
                                                                    provider
                                                                )
                                                            }
                                                            disabled={
                                                                actionLoading !==
                                                                ""
                                                            }
                                                            title="Sync Services"
                                                            className="rounded-md p-2 text-dark-gray hover:bg-bg hover:text-dark-blue disabled:opacity-40"
                                                        >
                                                            {actionLoading ===
                                                                `sync-${id}` ? (
                                                                <Loader2
                                                                    size={
                                                                        16
                                                                    }
                                                                    className="animate-spin"
                                                                />
                                                            ) : (
                                                                <RotateCw
                                                                    size={
                                                                        16
                                                                    }
                                                                />
                                                            )}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openEditModal(
                                                                    provider
                                                                )
                                                            }
                                                            title="Edit"
                                                            className="rounded-md p-2 text-dark-gray hover:bg-bg hover:text-dark-blue"
                                                        >
                                                            <Pencil
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        </button>

                                                        <div className="relative">
                                                            <button
                                                                type="button"
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    event.stopPropagation();

                                                                    setOpenMenu(
                                                                        openMenu ===
                                                                            id
                                                                            ? null
                                                                            : id
                                                                    );
                                                                }}
                                                                className="rounded-md p-2 text-dark-gray hover:bg-bg hover:text-dark-blue"
                                                                title="More actions"
                                                            >
                                                                <MoreVertical
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </button>

                                                            {openMenu ===
                                                                id && (
                                                                    <ProviderActionMenu
                                                                        provider={
                                                                            provider
                                                                        }
                                                                        loading={
                                                                            actionLoading
                                                                        }
                                                                        onStatus={() =>
                                                                            handleStatus(
                                                                                provider
                                                                            )
                                                                        }
                                                                        onDelete={() =>
                                                                            handleDelete(
                                                                                provider
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile */}
            <div className="space-y-2 md:hidden">
                {loading ? (
                    <div className="rounded-lg border border-light-azure bg-light-blue p-8">
                        <LoadingState />
                    </div>
                ) : providers.length === 0 ? (
                    <div className="rounded-lg border border-light-azure bg-light-blue p-8">
                        <EmptyState />
                    </div>
                ) : (
                    providers.map((provider) => {
                        const id =
                            provider._id ||
                            provider.id;

                        const active =
                            provider.status ===
                            "active";

                        return (
                            <div
                                key={id}
                                className="rounded-lg border border-light-azure bg-light-blue p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-bg text-dark-blue">
                                            <Server
                                                size={17}
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-dark-blue">
                                                {
                                                    provider.name
                                                }
                                            </p>

                                            <p className="mt-0.5 truncate text-xs text-gray">
                                                {
                                                    provider.apiUrl
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <StatusBadge
                                        active={active}
                                    />
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <MobileInfo
                                        label="API Type"
                                        value={
                                            provider.apiType ||
                                            "standard_smm"
                                        }
                                    />

                                    <MobileInfo
                                        label="Status"
                                        value={
                                            active
                                                ? "Active"
                                                : "Inactive"
                                        }
                                    />
                                </div>

                                <div className="mt-4 grid grid-cols-4 gap-2 border-t border-light-azure pt-3">
                                    <ActionButton
                                        icon={
                                            actionLoading ===
                                                `test-${id}` ? (
                                                <Loader2
                                                    size={
                                                        15
                                                    }
                                                    className="animate-spin"
                                                />
                                            ) : (
                                                <Play
                                                    size={
                                                        15
                                                    }
                                                />
                                            )
                                        }
                                        label="Test"
                                        onClick={() =>
                                            handleTest(
                                                provider
                                            )
                                        }
                                        disabled={
                                            actionLoading !==
                                            ""
                                        }
                                    />

                                    <ActionButton
                                        icon={
                                            actionLoading ===
                                                `sync-${id}` ? (
                                                <Loader2
                                                    size={
                                                        15
                                                    }
                                                    className="animate-spin"
                                                />
                                            ) : (
                                                <RotateCw
                                                    size={
                                                        15
                                                    }
                                                />
                                            )
                                        }
                                        label="Sync"
                                        onClick={() =>
                                            handleSync(
                                                provider
                                            )
                                        }
                                        disabled={
                                            actionLoading !==
                                            ""
                                        }
                                    />

                                    <ActionButton
                                        icon={
                                            <Pencil
                                                size={
                                                    15
                                                }
                                            />
                                        }
                                        label="Edit"
                                        onClick={() =>
                                            openEditModal(
                                                provider
                                            )
                                        }
                                    />

                                    <ActionButton
                                        icon={
                                            <Trash2
                                                size={
                                                    15
                                                }
                                            />
                                        }
                                        label="Delete"
                                        danger
                                        onClick={() =>
                                            handleDelete(
                                                provider
                                            )
                                        }
                                        disabled={
                                            actionLoading !==
                                            ""
                                        }
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <ProviderModal
                    editingProvider={
                        editingProvider
                    }
                    form={form}
                    showApiKey={showApiKey}
                    setShowApiKey={setShowApiKey}
                    onChange={handleChange}
                    onSubmit={handleSaveProvider}
                    onClose={closeModal}
                    loading={formLoading}
                    error={error}
                    success={success}
                />
            )}
        </div>
    );
};

const StatusBadge = ({ active }) => {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${active
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
                }`}
        >
            {active ? (
                <CheckCircle2 size={13} />
            ) : (
                <XCircle size={13} />
            )}

            {active ? "Active" : "Inactive"}
        </span>
    );
};

const MobileInfo = ({ label, value }) => {
    return (
        <div>
            <p className="text-[11px] text-gray">
                {label}
            </p>

            <p className="mt-0.5 truncate text-xs font-medium text-dark-blue">
                {value || "—"}
            </p>
        </div>
    );
};

const ActionButton = ({
    icon,
    label,
    onClick,
    disabled,
    danger = false,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`flex min-w-0 items-center justify-center gap-1 rounded-md border px-2 py-2 text-xs font-medium transition disabled:opacity-40 ${danger
                ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                : "border-light-azure bg-bg text-dark-gray hover:text-dark-blue"
                }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

const ProviderActionMenu = ({
    provider,
    loading,
    onStatus,
    onDelete,
}) => {
    const id =
        provider._id || provider.id;

    const active =
        provider.status === "active";

    return (
        <div
            className="absolute right-0 top-full z-30 mt-1 w-48 overflow-hidden rounded-md border border-light-azure bg-light-blue py-1 shadow-lg"
            onClick={(event) =>
                event.stopPropagation()
            }
        >
            <button
                type="button"
                onClick={onStatus}
                disabled={loading !== ""}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-dark-gray hover:bg-bg hover:text-dark-blue disabled:opacity-40"
            >
                {loading ===
                    `status-${id}` ? (
                    <Loader2
                        size={15}
                        className="animate-spin"
                    />
                ) : active ? (
                    <XCircle size={15} />
                ) : (
                    <CheckCircle2 size={15} />
                )}

                {active
                    ? "Deactivate"
                    : "Activate"}
            </button>

            <button
                type="button"
                onClick={onDelete}
                disabled={loading !== ""}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50 disabled:opacity-40"
            >
                {loading ===
                    `delete-${id}` ? (
                    <Loader2
                        size={15}
                        className="animate-spin"
                    />
                ) : (
                    <Trash2 size={15} />
                )}

                Delete
            </button>
        </div>
    );
};

const LoadingState = () => {
    return (
        <div className="flex items-center justify-center gap-2 text-sm text-dark-gray">
            <Loader2
                size={18}
                className="animate-spin"
            />
            Loading providers...
        </div>
    );
};

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-3 rounded-full bg-bg p-3 text-gray">
                <Server size={22} />
            </div>

            <p className="text-sm font-medium text-dark-blue">
                No providers found
            </p>

            <p className="mt-1 text-xs text-dark-gray">
                Add a provider or change your filters.
            </p>
        </div>
    );
};

const ProviderModal = ({
    editingProvider,
    form,
    showApiKey,
    setShowApiKey,
    onChange,
    onSubmit,
    onClose,
    loading,
    error,
    success,
}) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >
            <div className="w-full max-w-xl overflow-hidden rounded-lg border border-light-azure bg-light-blue shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-light-azure px-4 py-3 sm:px-5">
                    <div>
                        <h3 className="text-base font-semibold text-dark-blue">
                            {editingProvider
                                ? "Edit Provider"
                                : "Add Provider"}
                        </h3>

                        <p className="mt-0.5 text-xs text-dark-gray">
                            Configure the SMM provider
                            API connection.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-md p-2 text-dark-gray hover:bg-bg hover:text-dark-blue disabled:opacity-50"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="space-y-4 p-4 sm:p-5"
                >
                    {error && (
                        <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600">
                            <AlertCircle
                                size={16}
                                className="mt-0.5 shrink-0"
                            />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-start gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2.5 text-xs text-green-700">
                            <CheckCircle2
                                size={16}
                                className="mt-0.5 shrink-0"
                            />
                            <span>{success}</span>
                        </div>
                    )}

                    <InputField
                        label="Provider Name"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="Example SMM Provider"
                        required
                    />

                    <InputField
                        label="API URL"
                        name="apiUrl"
                        value={form.apiUrl}
                        onChange={onChange}
                        placeholder="https://example.com/v2"
                        required
                    />

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                            API Key
                            {!editingProvider && (
                                <span className="ml-0.5 text-red-500">
                                    *
                                </span>
                            )}
                        </label>

                        <div className="relative">
                            <input
                                type={
                                    showApiKey
                                        ? "text"
                                        : "password"
                                }
                                name="apiKey"
                                value={form.apiKey}
                                onChange={onChange}
                                placeholder={
                                    editingProvider
                                        ? "Leave blank to keep current key"
                                        : "Enter provider API key"
                                }
                                className="w-full rounded-md border border-light-azure bg-bg px-3 py-2.5 pr-10 text-sm text-dark-blue outline-none placeholder:text-gray focus:border-dark-blue"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowApiKey(
                                        (current) =>
                                            !current
                                    )
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray hover:text-dark-blue"
                            >
                                {showApiKey ? (
                                    <EyeOff
                                        size={16}
                                    />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                API Type
                            </label>

                            <input
                                value="standard_smm"
                                disabled
                                className="w-full rounded-md border border-light-azure bg-bg px-3 py-2.5 text-sm text-gray"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                Status
                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={onChange}
                                className="w-full rounded-md border border-light-azure bg-bg px-3 py-2.5 text-sm text-dark-blue outline-none focus:border-dark-blue"
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

                    <div className="flex flex-col-reverse gap-2 border-t border-light-azure pt-4 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-md border border-light-azure bg-bg px-4 py-2 text-sm font-medium text-dark-gray hover:text-dark-blue disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-light-blue hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                            ) : (
                                <Save size={16} />
                            )}

                            {editingProvider
                                ? "Save Changes"
                                : "Add Provider"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
}) => {
    return (
        <div>
            <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                {label}
                {required && (
                    <span className="ml-0.5 text-red-500">
                        *
                    </span>
                )}
            </label>

            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-md border border-light-azure bg-bg px-3 py-2.5 text-sm text-dark-blue outline-none placeholder:text-gray focus:border-dark-blue"
            />
        </div>
    );
};

export default AdminProviders;