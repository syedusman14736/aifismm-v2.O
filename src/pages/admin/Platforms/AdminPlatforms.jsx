import {
    Search,
    Plus,
    RefreshCw,
    Pencil,
    Power,
    Trash2,
    Globe2,
    X,
    Check,
} from "lucide-react";

import { useEffect, useState } from "react";

function AdminPlatforms() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [platforms, setPlatforms] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingPlatform, setEditingPlatform] = useState(null);

    const [form, setForm] = useState({
        name: "",
        image: "",
        status: "active",
    });

    const getToken = () => {
        return localStorage.getItem("aifi_token");
    };

    /* ================================
       FETCH PLATFORMS
    ================================= */

    const fetchPlatforms = async () => {
        setLoading(true);

        try {
            const token = getToken();

            const response = await fetch(
                `${API_URL}/admin/platforms`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch platforms."
                );
            }

            const list =
                Array.isArray(data.platforms)
                    ? data.platforms
                    : Array.isArray(data.data)
                        ? data.data
                        : Array.isArray(data)
                            ? data
                            : [];

            setPlatforms(list);
        } catch (error) {
            console.error("Fetch platforms error:", error);

            setPlatforms([]);

            window.alert(
                error.message || "Failed to fetch platforms."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlatforms();
    }, []);

    /* ================================
       MODAL
    ================================= */

    const resetForm = () => {
        setForm({
            name: "",
            image: "",
            status: "active",
        });
    };

    const openCreateModal = () => {
        setEditingPlatform(null);
        resetForm();
        setShowModal(true);
    };

    const openEditModal = (platform) => {
        setEditingPlatform(platform);

        setForm({
            name: platform.name || "",
            image:
                platform.image &&
                    platform.image !== "null"
                    ? platform.image
                    : "",
            status: platform.status || "active",
        });

        setShowModal(true);
    };

    const closeModal = () => {
        if (saving) {
            return;
        }

        setShowModal(false);
        setEditingPlatform(null);
        resetForm();
    };

    /* ================================
       FORM
    ================================= */

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.name.trim()) {
            window.alert("Platform name is required.");
            return;
        }

        setSaving(true);

        try {
            const token = getToken();

            const isEditing = Boolean(editingPlatform);

            const url = isEditing
                ? `${API_URL}/admin/platforms/${editingPlatform._id}`
                : `${API_URL}/admin/platforms`;

            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({
                    name: form.name.trim(),

                    image: form.image.trim()
                        ? form.image.trim()
                        : null,

                    status: form.status,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    `Failed to ${isEditing ? "update" : "create"
                    } platform.`
                );
            }

            const savedPlatform =
                data.platform ||
                data.data ||
                data;

            if (isEditing) {
                setPlatforms((current) =>
                    current.map((item) =>
                        item._id === editingPlatform._id
                            ? {
                                ...item,
                                ...savedPlatform,
                            }
                            : item
                    )
                );
            } else {
                setPlatforms((current) => [
                    savedPlatform,
                    ...current,
                ]);
            }

            setShowModal(false);
            setEditingPlatform(null);
            resetForm();
        } catch (error) {
            console.error("Save platform error:", error);

            window.alert(
                error.message ||
                "Failed to save platform."
            );
        } finally {
            setSaving(false);
        }
    };

    /* ================================
       STATUS
    ================================= */

    const handleStatusChange = async (platform) => {
        const nextStatus =
            platform.status === "active"
                ? "inactive"
                : "active";

        setActionLoading(platform._id);

        try {
            const token = getToken();

            const response = await fetch(
                `${API_URL}/admin/platforms/${platform._id}/status`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        status: nextStatus,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update platform status."
                );
            }

            const updatedPlatform =
                data.platform ||
                data.data ||
                data;

            setPlatforms((current) =>
                current.map((item) =>
                    item._id === platform._id
                        ? {
                            ...item,
                            ...updatedPlatform,
                            status: nextStatus,
                        }
                        : item
                )
            );
        } catch (error) {
            console.error(
                "Platform status error:",
                error
            );

            window.alert(
                error.message ||
                "Failed to update platform status."
            );
        } finally {
            setActionLoading(null);
        }
    };

    /* ================================
       DELETE
    ================================= */

    const handleDelete = async (platform) => {
        const confirmed = window.confirm(
            `Delete platform "${platform.name}"?`
        );

        if (!confirmed) {
            return;
        }

        setActionLoading(platform._id);

        try {
            const token = getToken();

            const response = await fetch(
                `${API_URL}/admin/platforms/${platform._id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete platform."
                );
            }

            setPlatforms((current) =>
                current.filter(
                    (item) =>
                        item._id !== platform._id
                )
            );
        } catch (error) {
            console.error(
                "Delete platform error:",
                error
            );

            window.alert(
                error.message ||
                "Failed to delete platform."
            );
        } finally {
            setActionLoading(null);
        }
    };

    /* ================================
       SEARCH
    ================================= */

    const filteredPlatforms = platforms.filter(
        (platform) =>
            platform.name
                ?.toLowerCase()
                .includes(
                    search.trim().toLowerCase()
                )
    );

    const activeCount = platforms.filter(
        (platform) =>
            platform.status === "active"
    ).length;

    const inactiveCount = platforms.filter(
        (platform) =>
            platform.status === "inactive"
    ).length;

    /* ================================
       RENDER
    ================================= */

    return (
        <div className="space-y-5">

            {/* HEADER */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-primary text-xl sm:text-2xl font-semibold">
                        Platforms
                    </h1>

                    <p className="text-dark-gray text-sm mt-1">
                        Manage social media platforms used by your services.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-light-blue rounded-lg px-3.5 py-2 text-sm font-medium hover:opacity-90"
                >
                    <Plus
                        size={17}
                        strokeWidth={2}
                    />

                    Add Platform
                </button>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                <StatCard
                    label="Total Platforms"
                    value={platforms.length}
                />

                <StatCard
                    label="Active"
                    value={activeCount}
                />

                <StatCard
                    label="Inactive"
                    value={inactiveCount}
                />

            </div>

            {/* MAIN CARD */}

            <div className="bg-light-blue border border-light-azure rounded-xl overflow-hidden">

                {/* TOOLBAR */}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-b border-light-azure">

                    <div>
                        <h2 className="text-primary text-sm sm:text-base font-semibold">
                            All Platforms
                        </h2>

                        <p className="text-dark-gray text-xs mt-0.5">
                            {filteredPlatforms.length} platforms shown
                        </p>
                    </div>

                    <div className="flex items-center gap-2">

                        <div className="relative">

                            <Search
                                size={16}
                                strokeWidth={1.8}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-gray"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                                placeholder="Search..."
                                className="w-full sm:w-52 bg-bg border border-light-azure rounded-lg pl-9 pr-3 py-2 text-sm text-primary outline-none placeholder:text-gray focus:border-gray-blue"
                            />

                        </div>

                        <button
                            type="button"
                            onClick={fetchPlatforms}
                            disabled={loading}
                            className="p-2 rounded-lg text-dark-gray hover:bg-bg disabled:opacity-40"
                            title="Refresh"
                        >
                            <RefreshCw
                                size={17}
                                strokeWidth={1.8}
                                className={
                                    loading
                                        ? "animate-spin"
                                        : ""
                                }
                            />
                        </button>

                    </div>

                </div>

                {/* DESKTOP TABLE */}

                <div className="hidden sm:block overflow-x-auto">

                    <table className="w-full">

                        <thead>
                            <tr className="border-b border-light-azure">

                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-dark-gray">
                                    Platform
                                </th>

                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-dark-gray">
                                    ID
                                </th>

                                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-dark-gray">
                                    Status
                                </th>

                                <th className="text-right px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-dark-gray">
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-4 py-12 text-center"
                                    >
                                        <div className="flex items-center justify-center gap-2 text-sm text-dark-gray">

                                            <RefreshCw
                                                size={17}
                                                className="animate-spin"
                                            />

                                            Loading platforms...

                                        </div>
                                    </td>
                                </tr>
                            ) : filteredPlatforms.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-4 py-12 text-center"
                                    >

                                        <Globe2
                                            size={30}
                                            className="mx-auto text-dark-gray opacity-40"
                                        />

                                        <p className="text-primary text-sm font-medium mt-3">
                                            No platforms found
                                        </p>

                                        <p className="text-dark-gray text-xs mt-1">
                                            Add a platform to start assigning services.
                                        </p>

                                    </td>
                                </tr>
                            ) : (
                                filteredPlatforms.map(
                                    (platform) => (
                                        <tr
                                            key={platform._id}
                                            className="border-b border-light-azure last:border-b-0 hover:bg-bg transition-colors"
                                        >

                                            <td className="px-4 py-3">

                                                <div className="flex items-center gap-3">

                                                    <PlatformIcon
                                                        platform={
                                                            platform
                                                        }
                                                    />

                                                    <div className="min-w-0">

                                                        <p className="text-primary text-sm font-medium">
                                                            {
                                                                platform.name
                                                            }
                                                        </p>

                                                        {platform.image &&
                                                            platform.image !==
                                                            "null" && (
                                                                <p className="text-dark-gray text-xs mt-0.5 max-w-[260px] truncate">
                                                                    {
                                                                        platform.image
                                                                    }
                                                                </p>
                                                            )}

                                                    </div>

                                                </div>

                                            </td>

                                            <td className="px-4 py-3">

                                                <span className="text-dark-gray text-xs font-mono">
                                                    {
                                                        platform._id
                                                    }
                                                </span>

                                            </td>

                                            <td className="px-4 py-3">

                                                <StatusBadge
                                                    status={
                                                        platform.status
                                                    }
                                                />

                                            </td>

                                            <td className="px-4 py-3">

                                                <div className="flex items-center justify-end gap-1">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditModal(
                                                                platform
                                                            )
                                                        }
                                                        className="p-2 rounded-md text-dark-gray hover:bg-bg"
                                                        title="Edit"
                                                    >
                                                        <Pencil
                                                            size={16}
                                                            strokeWidth={1.8}
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            actionLoading ===
                                                            platform._id
                                                        }
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                platform
                                                            )
                                                        }
                                                        className="p-2 rounded-md text-dark-gray hover:bg-bg disabled:opacity-40"
                                                        title={
                                                            platform.status ===
                                                                "active"
                                                                ? "Deactivate"
                                                                : "Activate"
                                                        }
                                                    >
                                                        <Power
                                                            size={16}
                                                            strokeWidth={1.8}
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            actionLoading ===
                                                            platform._id
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                platform
                                                            )
                                                        }
                                                        className="p-2 rounded-md text-red-500 hover:bg-red-50 disabled:opacity-40"
                                                        title="Delete"
                                                    >
                                                        <Trash2
                                                            size={16}
                                                            strokeWidth={1.8}
                                                        />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    )
                                )
                            )}

                        </tbody>

                    </table>

                </div>

                {/* MOBILE */}

                <div className="sm:hidden">

                    {loading ? (
                        <div className="px-4 py-12 text-center text-sm text-dark-gray">

                            <div className="flex items-center justify-center gap-2">

                                <RefreshCw
                                    size={17}
                                    className="animate-spin"
                                />

                                Loading platforms...

                            </div>

                        </div>
                    ) : filteredPlatforms.length === 0 ? (
                        <div className="px-4 py-12 text-center">

                            <Globe2
                                size={30}
                                className="mx-auto text-dark-gray opacity-40"
                            />

                            <p className="text-primary text-sm font-medium mt-3">
                                No platforms found
                            </p>

                        </div>
                    ) : (
                        <div className="divide-y divide-light-azure">

                            {filteredPlatforms.map(
                                (platform) => (
                                    <div
                                        key={platform._id}
                                        className="p-4"
                                    >

                                        <div className="flex items-center justify-between gap-3">

                                            <div className="flex items-center gap-3 min-w-0">

                                                <PlatformIcon
                                                    platform={
                                                        platform
                                                    }
                                                />

                                                <div className="min-w-0">

                                                    <p className="text-primary text-sm font-medium">
                                                        {
                                                            platform.name
                                                        }
                                                    </p>

                                                    <p className="text-dark-gray text-[11px] font-mono mt-1 truncate">
                                                        {
                                                            platform._id
                                                        }
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="flex items-center justify-between mt-4">

                                            <StatusBadge
                                                status={
                                                    platform.status
                                                }
                                            />

                                            <div className="flex items-center gap-1">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openEditModal(
                                                            platform
                                                        )
                                                    }
                                                    className="p-2 rounded-md text-dark-gray hover:bg-bg"
                                                    title="Edit"
                                                >
                                                    <Pencil
                                                        size={15}
                                                        strokeWidth={1.8}
                                                    />
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={
                                                        actionLoading ===
                                                        platform._id
                                                    }
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            platform
                                                        )
                                                    }
                                                    className="p-2 rounded-md text-dark-gray hover:bg-bg disabled:opacity-40"
                                                    title={
                                                        platform.status ===
                                                            "active"
                                                            ? "Deactivate"
                                                            : "Activate"
                                                    }
                                                >
                                                    <Power
                                                        size={15}
                                                        strokeWidth={1.8}
                                                    />
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={
                                                        actionLoading ===
                                                        platform._id
                                                    }
                                                    onClick={() =>
                                                        handleDelete(
                                                            platform
                                                        )
                                                    }
                                                    className="p-2 rounded-md text-red-500 hover:bg-red-50 disabled:opacity-40"
                                                    title="Delete"
                                                >
                                                    <Trash2
                                                        size={15}
                                                        strokeWidth={1.8}
                                                    />
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </div>

            </div>

            {/* MODAL */}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={closeModal}
                    />

                    <div className="relative w-full max-w-md bg-light-blue border border-light-azure rounded-xl shadow-xl">

                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between px-4 py-3 border-b border-light-azure">

                            <div>

                                <h2 className="text-primary text-base font-semibold">
                                    {editingPlatform
                                        ? "Edit Platform"
                                        : "Add Platform"}
                                </h2>

                                <p className="text-dark-gray text-xs mt-0.5">
                                    {editingPlatform
                                        ? "Update platform information."
                                        : "Create a new social media platform."}
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                className="p-2 rounded-md text-dark-gray hover:bg-bg disabled:opacity-40"
                            >
                                <X
                                    size={18}
                                    strokeWidth={1.8}
                                />
                            </button>

                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-4 space-y-4"
                        >

                            {/* NAME */}

                            <div>

                                <label className="block text-xs font-medium text-primary mb-1.5">
                                    Platform Name
                                    <span className="text-red-500 ml-1">
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Instagram"
                                    required
                                    className="w-full bg-bg border border-light-azure rounded-lg px-3 py-2.5 text-sm text-primary outline-none placeholder:text-gray focus:border-gray-blue"
                                />

                            </div>

                            {/* IMAGE */}

                            <div>

                                <label className="block text-xs font-medium text-primary mb-1.5">
                                    Image URL
                                </label>

                                <input
                                    type="url"
                                    name="image"
                                    value={form.image}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full bg-bg border border-light-azure rounded-lg px-3 py-2.5 text-sm text-primary outline-none placeholder:text-gray focus:border-gray-blue"
                                />

                                <p className="text-dark-gray text-[11px] mt-1.5">
                                    Optional platform icon/logo URL.
                                </p>

                            </div>

                            {/* STATUS */}

                            <div>

                                <label className="block text-xs font-medium text-primary mb-1.5">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
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

                            {/* BUTTONS */}

                            <div className="flex items-center justify-end gap-2 pt-2">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="px-4 py-2.5 rounded-lg border border-light-azure text-sm text-dark-gray hover:bg-bg disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-light-blue text-sm font-medium hover:opacity-90 disabled:opacity-50"
                                >

                                    {saving ? (
                                        <RefreshCw
                                            size={15}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Check size={15} />
                                    )}

                                    {saving
                                        ? "Saving..."
                                        : editingPlatform
                                            ? "Update Platform"
                                            : "Create Platform"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

/* ================================
   STAT CARD
================================= */

function StatCard({ label, value }) {
    return (
        <div className="bg-light-blue border border-light-azure rounded-xl p-4">
            <p className="text-dark-gray text-xs">
                {label}
            </p>

            <p className="text-primary text-xl font-semibold mt-1">
                {value}
            </p>
        </div>
    );
}

/* ================================
   PLATFORM ICON
================================= */

function PlatformIcon({ platform }) {
    const hasImage =
        platform.image &&
        platform.image !== "null";

    return (
        <div className="w-9 h-9 shrink-0 rounded-lg bg-bg border border-light-azure flex items-center justify-center overflow-hidden">

            {hasImage ? (
                <img
                    src={platform.image}
                    alt=""
                    className="w-6 h-6 object-contain"
                />
            ) : (
                <Globe2
                    size={17}
                    className="text-dark-gray"
                    strokeWidth={1.8}
                />
            )}

        </div>
    );
}

/* ================================
   STATUS BADGE
================================= */

function StatusBadge({ status }) {
    const active = status === "active";

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium ${active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
        >

            <span
                className={`h-1.5 w-1.5 rounded-full ${active
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
            />

            {status || "unknown"}

        </span>
    );
}

export default AdminPlatforms;