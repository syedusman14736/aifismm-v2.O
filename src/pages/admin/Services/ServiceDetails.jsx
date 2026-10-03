import {
    ArrowLeft,
    Pencil,
    Power,
    Trash2,
    RefreshCw,
    Server,
    Globe2,
    MessageSquare,
    CircleDollarSign,
    Settings2,
    Clock3,
    ShieldCheck,
    XCircle,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ServiceDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);


    const fetchService = async () => {

        setLoading(true);

        try {

            const token =
                localStorage.getItem("aifi_token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/services/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch service."
                );
            }

            setService(data.service || data);

        } catch (error) {

            console.error(
                "Fetch service error:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchService();

    }, [id]);


    const handleStatusChange = async () => {

        if (!service) {
            return;
        }

        const nextStatus =
            service.status === "active"
                ? "inactive"
                : "active";

        setActionLoading(true);

        try {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/services/${id}/status`,
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
                    "Failed to update service status."
                );
            }

            setService(
                data.service || {
                    ...service,
                    status: nextStatus,
                }
            );

        } catch (error) {

            console.error(
                "Status update error:",
                error
            );

            window.alert(
                error.message ||
                "Failed to update service status."
            );

        } finally {

            setActionLoading(false);

        }
    };


    const handleDelete = async () => {

        if (!service) {
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete "${service.name}"?`
        );

        if (!confirmed) {
            return;
        }

        setActionLoading(true);

        try {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/services/${id}`,
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
                    "Failed to delete service."
                );
            }

            navigate("/admin/services");

        } catch (error) {

            console.error(
                "Delete service error:",
                error
            );

            window.alert(
                error.message ||
                "Failed to delete service."
            );

        } finally {

            setActionLoading(false);

        }
    };


    const formatValue = (value) => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        return value;
    };


    const formatNumber = (value) => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        return Number(value).toLocaleString();

    };


    const StatusBadge = ({ status }) => (

        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
                }`}
        >

            <span
                className={`h-1.5 w-1.5 rounded-full ${status === "active"
                    ? "bg-green-500"
                    : "bg-gray-400"
                    }`}
            />

            {status === "active"
                ? "Active"
                : "Inactive"}

        </span>
    );


    if (loading) {

        return (
            <div className="bg-light-blue border border-light-azure rounded-xl px-4 py-16 flex flex-col items-center justify-center text-center">

                <RefreshCw
                    size={22}
                    className="animate-spin text-dark-gray"
                />

                <p className="text-dark-gray text-sm mt-3">
                    Loading service...
                </p>

            </div>
        );

    }


    if (!service) {

        return (
            <div className="space-y-4">

                <Link
                    to="/admin/services"
                    className="inline-flex items-center gap-2 text-dark-gray text-sm"
                >
                    <ArrowLeft size={16} />
                    Back to services
                </Link>


                <div className="bg-light-blue border border-light-azure rounded-xl px-4 py-16 flex flex-col items-center justify-center text-center">

                    <XCircle
                        size={24}
                        className="text-dark-gray"
                    />

                    <p className="text-primary text-sm font-medium mt-3">
                        Service not found
                    </p>

                    <p className="text-dark-gray text-xs mt-1">
                        The requested service could not be loaded.
                    </p>

                </div>

            </div>
        );

    }


    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                <div className="flex items-start gap-3 min-w-0">

                    <Link
                        to="/admin/services"
                        className="shrink-0 p-2 rounded-lg border border-light-azure bg-light-blue text-dark-gray hover:bg-bg"
                    >
                        <ArrowLeft
                            size={17}
                            strokeWidth={1.8}
                        />
                    </Link>


                    <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                            <span className="text-xs font-medium text-dark-gray">
                                Service #{service.serviceId}
                            </span>

                            <StatusBadge
                                status={service.status}
                            />

                        </div>


                        <h1 className="text-primary text-xl sm:text-2xl font-semibold mt-2 break-words">
                            {service.name}
                        </h1>


                        <p className="text-dark-gray text-sm mt-1">
                            {service.category}
                        </p>

                    </div>

                </div>


                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">

                    <Link
                        to={`/admin/services/${id}/edit`}
                        className="inline-flex items-center justify-center gap-2 border border-light-azure bg-light-blue text-dark-gray rounded-lg px-3 py-2 text-sm font-medium"
                    >
                        <Pencil
                            size={16}
                            strokeWidth={1.8}
                        />
                        Edit
                    </Link>


                    <button
                        type="button"
                        disabled={actionLoading}
                        onClick={handleStatusChange}
                        className="inline-flex items-center justify-center gap-2 border border-light-azure bg-light-blue text-dark-gray rounded-lg px-3 py-2 text-sm font-medium disabled:opacity-50"
                    >
                        <Power
                            size={16}
                            strokeWidth={1.8}
                        />

                        {service.status === "active"
                            ? "Deactivate"
                            : "Activate"}
                    </button>


                    <button
                        type="button"
                        disabled={actionLoading}
                        onClick={handleDelete}
                        className="inline-flex items-center justify-center gap-2 border border-red-200 bg-light-blue text-red-500 rounded-lg px-3 py-2 text-sm font-medium disabled:opacity-50"
                    >
                        <Trash2
                            size={16}
                            strokeWidth={1.8}
                        />

                        Delete
                    </button>

                </div>

            </div>


            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">


                {/* Main Information */}
                <div className="xl:col-span-2 space-y-4">


                    {/* Provider Connection */}
                    <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="p-2 rounded-lg bg-bg text-primary">
                                <Server
                                    size={18}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>

                                <h2 className="text-primary font-semibold">
                                    Provider Connection
                                </h2>

                                <p className="text-dark-gray text-xs mt-0.5">
                                    Provider information for this service.
                                </p>

                            </div>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <InfoItem
                                label="Provider"
                                value={
                                    service.provider?.name ||
                                    "—"
                                }
                            />

                            <InfoItem
                                label="Provider Status"
                                value={
                                    service.provider?.status ||
                                    "—"
                                }
                            />

                            <InfoItem
                                label="Provider Service ID"
                                value={
                                    service.providerServiceId
                                }
                            />

                            <InfoItem
                                label="Provider Type"
                                value={
                                    service.providerType
                                }
                            />

                            <InfoItem
                                label="Provider Category"
                                value={
                                    service.providerCategory
                                }
                            />

                            <InfoItem
                                label="Provider Rate"
                                value={
                                    service.providerRate
                                }

                            />

                        </div>

                    </section>


                    {/* Service Information */}
                    <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="p-2 rounded-lg bg-bg text-primary">
                                <Settings2
                                    size={18}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>

                                <h2 className="text-primary font-semibold">
                                    Service Information
                                </h2>

                                <p className="text-dark-gray text-xs mt-0.5">
                                    Customer-facing service configuration.
                                </p>

                            </div>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <InfoItem
                                label="Category"
                                value={service.category}
                            />

                            <InfoItem
                                label="Platform"
                                value={
                                    service.platform?.name ||
                                    "Not assigned"
                                }
                            />

                            <InfoItem
                                label="Speed"
                                value={service.speed}
                            />

                            <InfoItem
                                label="Drop"
                                value={service.drop}
                            />

                            <InfoItem
                                label="Quality"
                                value={service.quality}
                            />

                            <InfoItem
                                label="Average Time"
                                value={
                                    service.averageTime
                                        ? `${service.averageTime} minutes`
                                        : null
                                }
                            />

                        </div>


                        <div className="mt-5 pt-5 border-t border-light-azure">

                            <p className="text-xs font-medium text-dark-gray mb-2">
                                Description
                            </p>

                            <div className="bg-bg border border-light-azure rounded-lg p-3">

                                <p className="text-sm text-primary whitespace-pre-wrap leading-6">
                                    {service.description ||
                                        "No description available."}
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* Pricing */}
                    <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="p-2 rounded-lg bg-bg text-primary">
                                <CircleDollarSign
                                    size={18}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>

                                <h2 className="text-primary font-semibold">
                                    Pricing & Limits
                                </h2>

                                <p className="text-dark-gray text-xs mt-0.5">
                                    Customer pricing and order limits.
                                </p>

                            </div>

                        </div>


                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                            <StatBox
                                label="Customer Rate"
                                value={formatValue(service.rate)}
                            />

                            <StatBox
                                label="Provider Rate"
                                value={formatValue(service.providerRate)}
                            />

                            <StatBox
                                label="Minimum"
                                value={formatNumber(service.min)}
                            />

                            <StatBox
                                label="Maximum"
                                value={formatNumber(service.max)}
                            />

                        </div>

                    </section>

                </div>


                {/* Sidebar */}
                <div className="space-y-4">


                    {/* Platform */}
                    <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                        <div className="flex items-center gap-3 mb-4">

                            <div className="p-2 rounded-lg bg-bg text-primary">
                                <Globe2
                                    size={18}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>

                                <h2 className="text-primary font-semibold">
                                    Platform
                                </h2>

                                <p className="text-dark-gray text-xs mt-0.5">
                                    Assigned platform
                                </p>

                            </div>

                        </div>


                        <div className="border border-light-azure rounded-lg bg-bg p-3">

                            <p className="text-primary text-sm font-medium">
                                {service.platform?.name ||
                                    "Not assigned"}
                            </p>

                            {service.platform?.status && (
                                <p className="text-dark-gray text-xs mt-1">
                                    Status:{" "}
                                    {service.platform.status}
                                </p>
                            )}

                        </div>

                    </section>


                    {/* Features */}
                    <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                        <div className="flex items-center gap-3 mb-4">

                            <div className="p-2 rounded-lg bg-bg text-primary">
                                <ShieldCheck
                                    size={18}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>

                                <h2 className="text-primary font-semibold">
                                    Features
                                </h2>

                                <p className="text-dark-gray text-xs mt-0.5">
                                    Service capabilities
                                </p>

                            </div>

                        </div>


                        <FeatureRow
                            label="Custom Comments"
                            enabled={
                                service.customComments
                            }
                        />

                        <FeatureRow
                            label="Dripfeed"
                            enabled={
                                service.dripfeed
                            }
                        />

                        <FeatureRow
                            label="Cancellation"
                            enabled={
                                service.cancel
                            }
                        />

                        <FeatureRow
                            label="Refill"
                            enabled={
                                service.refill?.enabled
                            }
                        />

                        <FeatureRow
                            label="Refund"
                            enabled={
                                service.refund?.enabled
                            }
                        />

                    </section>


                    {/* Refill / Refund */}
                    <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                        <div className="flex items-center gap-3 mb-4">

                            <div className="p-2 rounded-lg bg-bg text-primary">
                                <Clock3
                                    size={18}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>

                                <h2 className="text-primary font-semibold">
                                    Duration
                                </h2>

                                <p className="text-dark-gray text-xs mt-0.5">
                                    Refill and refund periods
                                </p>

                            </div>

                        </div>


                        <div className="space-y-3">

                            <DurationRow
                                label="Refill"
                                enabled={
                                    service.refill?.enabled
                                }
                                duration={
                                    service.refill?.duration
                                }
                            />

                            <DurationRow
                                label="Refund"
                                enabled={
                                    service.refund?.enabled
                                }
                                duration={
                                    service.refund?.duration
                                }
                            />

                        </div>

                    </section>


                    {/* Comments */}
                    <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                        <div className="flex items-center gap-3 mb-4">

                            <div className="p-2 rounded-lg bg-bg text-primary">
                                <MessageSquare
                                    size={18}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>

                                <h2 className="text-primary font-semibold">
                                    Comments
                                </h2>

                                <p className="text-dark-gray text-xs mt-0.5">
                                    Comment configuration
                                </p>

                            </div>

                        </div>


                        <div className="bg-bg border border-light-azure rounded-lg p-3">

                            <p className="text-primary text-sm">
                                {service.customComments
                                    ? "Custom comments enabled"
                                    : "Custom comments disabled"}
                            </p>

                        </div>

                    </section>

                </div>

            </div>


            {/* Metadata */}
            <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                <h2 className="text-primary text-sm font-semibold mb-4">
                    Service Metadata
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    <InfoItem
                        label="Service ID"
                        value={service.serviceId}
                    />

                    <InfoItem
                        label="Database ID"
                        value={service._id}
                    />

                    <InfoItem
                        label="Created"
                        value={
                            service.createdAt
                                ? new Date(
                                    service.createdAt
                                ).toLocaleString()
                                : null
                        }
                    />

                    <InfoItem
                        label="Updated"
                        value={
                            service.updatedAt
                                ? new Date(
                                    service.updatedAt
                                ).toLocaleString()
                                : null
                        }
                    />

                </div>

            </section>

        </div>
    );
}


/* -------------------------------- */
/* Reusable Components */
/* -------------------------------- */

function InfoItem({
    label,
    value,
}) {

    return (
        <div>

            <p className="text-[11px] uppercase tracking-wide text-dark-gray">
                {label}
            </p>

            <p className="text-sm text-primary font-medium mt-1 break-words">
                {value === null ||
                    value === undefined ||
                    value === ""
                    ? "—"
                    : value}
            </p>

        </div>
    );
}


function StatBox({
    label,
    value,
}) {

    return (
        <div className="bg-bg border border-light-azure rounded-lg p-3">

            <p className="text-[10px] uppercase tracking-wide text-dark-gray">
                {label}
            </p>

            <p className="text-sm sm:text-base font-semibold text-primary mt-1 break-all">
                {value}
            </p>

        </div>
    );
}


function FeatureRow({
    label,
    enabled,
}) {

    return (
        <div className="flex items-center justify-between py-2.5 border-b border-light-azure last:border-b-0">

            <span className="text-sm text-dark-gray">
                {label}
            </span>

            <span
                className={`text-xs font-medium ${enabled
                    ? "text-green-600"
                    : "text-dark-gray"
                    }`}
            >
                {enabled
                    ? "Enabled"
                    : "Disabled"}
            </span>

        </div>
    );
}


function DurationRow({
    label,
    enabled,
    duration,
}) {

    return (
        <div className="flex items-center justify-between gap-3">

            <span className="text-sm text-dark-gray">
                {label}
            </span>

            <span className="text-xs text-primary font-medium text-right">
                {!enabled
                    ? "Disabled"
                    : duration || "Enabled"}
            </span>

        </div>
    );
}


export default ServiceDetails;