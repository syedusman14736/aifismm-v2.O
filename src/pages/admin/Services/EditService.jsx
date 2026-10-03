import {
    ArrowLeft,
    Save,
    RefreshCw,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditService() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [platforms, setPlatforms] = useState([]);

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        platform: "",

        customComments: false,

        rate: "",
        min: "",
        max: "",

        speed: "",
        drop: "",
        quality: "",

        refillEnabled: false,
        refillDuration: "",

        refundEnabled: false,
        refundDuration: "",

        dripfeed: false,
        cancel: false,

        averageTime: "",
    });


    const inputClass =
        "w-full bg-bg border border-light-azure rounded-lg px-3 py-2.5 text-sm text-primary outline-none placeholder:text-gray focus:border-gray-blue";

    const selectClass =
        "w-full bg-bg border border-light-azure rounded-lg px-3 py-2.5 text-sm text-dark-gray outline-none focus:border-gray-blue";


    const getToken = () =>
        localStorage.getItem("aifi_token");


    const fetchPlatforms = async () => {

        try {

            const token = getToken();

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/platforms`,
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
                    "Failed to fetch platforms."
                );
            }

            setPlatforms(
                data.platforms ||
                data.data ||
                []
            );

        } catch (error) {

            console.error(
                "Fetch platforms error:",
                error
            );

        }
    };


    const fetchService = async () => {

        setLoading(true);

        try {

            const token = getToken();

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

            const service =
                data.service || data;


            setForm({
                name: service.name || "",
                description:
                    service.description || "",

                category:
                    service.category || "",

                platform:
                    service.platform?._id ||
                    service.platform ||
                    "",

                customComments:
                    Boolean(service.customComments),

                rate:
                    service.rate ?? "",

                min:
                    service.min ?? "",

                max:
                    service.max ?? "",

                speed:
                    service.speed || "",

                drop:
                    service.drop || "",

                quality:
                    service.quality || "",

                refillEnabled:
                    Boolean(
                        service.refill?.enabled
                    ),

                refillDuration:
                    service.refill?.duration ||
                    "",

                refundEnabled:
                    Boolean(
                        service.refund?.enabled
                    ),

                refundDuration:
                    service.refund?.duration ||
                    "",

                dripfeed:
                    Boolean(service.dripfeed),

                cancel:
                    Boolean(service.cancel),

                averageTime:
                    service.averageTime ?? "",
            });

        } catch (error) {

            console.error(
                "Fetch service error:",
                error
            );

            window.alert(
                error.message ||
                "Failed to load service."
            );

            navigate("/admin/services");

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchService();
        fetchPlatforms();

    }, [id]);


    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);

        try {

            const token = getToken();

            const payload = {
                name: form.name.trim(),
                description:
                    form.description.trim() ||
                    null,

                category:
                    form.category.trim(),

                platform:
                    form.platform || null,

                customComments:
                    form.customComments,

                rate:
                    Number(form.rate),

                min:
                    Number(form.min),

                max:
                    Number(form.max),

                speed:
                    form.speed.trim() || null,

                drop:
                    form.drop.trim() || null,

                quality:
                    form.quality.trim() || null,

                refill: {
                    enabled:
                        form.refillEnabled,

                    duration:
                        form.refillEnabled
                            ? (
                                form.refillDuration
                                    .trim() || null
                            )
                            : null,
                },

                refund: {
                    enabled:
                        form.refundEnabled,

                    duration:
                        form.refundEnabled
                            ? (
                                form.refundDuration
                                    .trim() || null
                            )
                            : null,
                },

                dripfeed:
                    form.dripfeed,

                cancel:
                    form.cancel,

                averageTime:
                    form.averageTime === ""
                        ? null
                        : Number(form.averageTime),
            };


            if (
                !payload.name ||
                !payload.category
            ) {
                throw new Error(
                    "Service name and category are required."
                );
            }


            if (
                Number.isNaN(payload.rate) ||
                Number.isNaN(payload.min) ||
                Number.isNaN(payload.max)
            ) {
                throw new Error(
                    "Rate, minimum and maximum must be valid numbers."
                );
            }


            if (payload.min > payload.max) {
                throw new Error(
                    "Minimum cannot be greater than maximum."
                );
            }


            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/services/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body:
                        JSON.stringify(payload),
                }
            );


            const data =
                await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update service."
                );
            }


            navigate(
                `/admin/services/${id}`
            );

        } catch (error) {

            console.error(
                "Update service error:",
                error
            );

            window.alert(
                error.message ||
                "Failed to update service."
            );

        } finally {

            setSaving(false);

        }
    };


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


    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex items-center gap-3">

                <Link
                    to={`/admin/services/${id}`}
                    className="shrink-0 p-2 rounded-lg border border-light-azure bg-light-blue text-dark-gray hover:bg-bg"
                >
                    <ArrowLeft
                        size={17}
                        strokeWidth={1.8}
                    />
                </Link>


                <div>

                    <h1 className="text-primary text-xl sm:text-2xl font-semibold">
                        Edit Service
                    </h1>

                    <p className="text-dark-gray text-sm mt-1">
                        Update service configuration and customer settings.
                    </p>

                </div>

            </div>


            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                {/* Basic Information */}
                <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                    <div className="mb-5">

                        <h2 className="text-primary text-base sm:text-lg font-semibold">
                            Basic Information
                        </h2>

                        <p className="text-dark-gray text-xs sm:text-sm mt-1">
                            Manage the service information shown to customers.
                        </p>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="sm:col-span-2">

                            <label className="block text-xs font-medium text-dark-gray mb-1.5">
                                Service Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />

                        </div>


                        <div>

                            <label className="block text-xs font-medium text-dark-gray mb-1.5">
                                Platform
                            </label>

                            <select
                                name="platform"
                                value={form.platform}
                                onChange={handleChange}
                                className={selectClass}
                            >

                                <option value="">
                                    Not assigned
                                </option>

                                {platforms.map(
                                    (platform) => (
                                        <option
                                            key={
                                                platform._id
                                            }
                                            value={
                                                platform._id
                                            }
                                        >
                                            {
                                                platform.name
                                            }
                                        </option>
                                    )
                                )}

                            </select>

                        </div>


                        <div>

                            <label className="block text-xs font-medium text-dark-gray mb-1.5">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />

                        </div>


                        <div className="sm:col-span-2">

                            <label className="block text-xs font-medium text-dark-gray mb-1.5">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                className={`${inputClass} resize-none`}
                            />

                        </div>

                    </div>


                    {/* Custom Comments */}
                    <label className="flex items-center gap-3 mt-5 cursor-pointer">

                        <input
                            type="checkbox"
                            name="customComments"
                            checked={
                                form.customComments
                            }
                            onChange={handleChange}
                            className="h-4 w-4 accent-black"
                        />

                        <span>

                            <span className="block text-sm font-medium text-primary">
                                Custom comments
                            </span>

                            <span className="block text-xs text-dark-gray mt-0.5">
                                Allow customers to submit custom comments.
                            </span>

                        </span>

                    </label>

                </section>


                {/* Pricing */}
                <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                    <div className="mb-5">

                        <h2 className="text-primary text-base sm:text-lg font-semibold">
                            Pricing & Limits
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        <FormField
                            label="Customer Rate"
                            name="rate"
                            type="number"
                            value={form.rate}
                            onChange={handleChange}
                            required
                            min="0"
                            step="any"
                        />

                        <FormField
                            label="Minimum"
                            name="min"
                            type="number"
                            value={form.min}
                            onChange={handleChange}
                            required
                            min="1"
                        />

                        <FormField
                            label="Maximum"
                            name="max"
                            type="number"
                            value={form.max}
                            onChange={handleChange}
                            required
                            min="1"
                        />

                        <FormField
                            label="Average Time"
                            name="averageTime"
                            type="number"
                            value={form.averageTime}
                            onChange={handleChange}
                            min="0"
                        />

                    </div>

                </section>


                {/* Service Details */}
                <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                    <div className="mb-5">

                        <h2 className="text-primary text-base sm:text-lg font-semibold">
                            Service Details
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        <FormField
                            label="Speed"
                            name="speed"
                            value={form.speed}
                            onChange={handleChange}
                            placeholder="e.g. 10K/day"
                        />

                        <FormField
                            label="Drop"
                            name="drop"
                            value={form.drop}
                            onChange={handleChange}
                            placeholder="e.g. 0-5%"
                        />

                        <FormField
                            label="Quality"
                            name="quality"
                            value={form.quality}
                            onChange={handleChange}
                            placeholder="e.g. High Quality"
                        />

                    </div>

                </section>


                {/* Refill / Refund */}
                <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                    <div className="mb-5">

                        <h2 className="text-primary text-base sm:text-lg font-semibold">
                            Refill & Refund
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                        {/* Refill */}
                        <div className="border border-light-azure rounded-lg p-4 bg-bg">

                            <label className="flex items-center gap-3 cursor-pointer">

                                <input
                                    type="checkbox"
                                    name="refillEnabled"
                                    checked={
                                        form.refillEnabled
                                    }
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-black"
                                />

                                <span className="text-sm font-medium text-primary">
                                    Refill available
                                </span>

                            </label>


                            {form.refillEnabled && (
                                <div className="mt-4">

                                    <label className="block text-xs font-medium text-dark-gray mb-1.5">
                                        Refill Duration
                                    </label>

                                    <input
                                        type="text"
                                        name="refillDuration"
                                        value={
                                            form.refillDuration
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. 30 days"
                                        className={
                                            inputClass
                                        }
                                    />

                                </div>
                            )}

                        </div>


                        {/* Refund */}
                        <div className="border border-light-azure rounded-lg p-4 bg-bg">

                            <label className="flex items-center gap-3 cursor-pointer">

                                <input
                                    type="checkbox"
                                    name="refundEnabled"
                                    checked={
                                        form.refundEnabled
                                    }
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-black"
                                />

                                <span className="text-sm font-medium text-primary">
                                    Refund available
                                </span>

                            </label>


                            {form.refundEnabled && (
                                <div className="mt-4">

                                    <label className="block text-xs font-medium text-dark-gray mb-1.5">
                                        Refund Duration
                                    </label>

                                    <input
                                        type="text"
                                        name="refundDuration"
                                        value={
                                            form.refundDuration
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. 7 days"
                                        className={
                                            inputClass
                                        }
                                    />

                                </div>
                            )}

                        </div>

                    </div>

                </section>


                {/* Additional Options */}
                <section className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                    <div className="mb-5">

                        <h2 className="text-primary text-base sm:text-lg font-semibold">
                            Additional Options
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        <label className="flex items-center gap-3 border border-light-azure rounded-lg p-3 bg-bg cursor-pointer">

                            <input
                                type="checkbox"
                                name="dripfeed"
                                checked={
                                    form.dripfeed
                                }
                                onChange={handleChange}
                                className="h-4 w-4 accent-black"
                            />

                            <span className="text-sm text-primary">
                                Dripfeed
                            </span>

                        </label>


                        <label className="flex items-center gap-3 border border-light-azure rounded-lg p-3 bg-bg cursor-pointer">

                            <input
                                type="checkbox"
                                name="cancel"
                                checked={
                                    form.cancel
                                }
                                onChange={handleChange}
                                className="h-4 w-4 accent-black"
                            />

                            <span className="text-sm text-primary">
                                Cancellation
                            </span>

                        </label>

                    </div>

                </section>


                {/* Actions */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">

                    <Link
                        to={`/admin/services/${id}`}
                        className="inline-flex items-center justify-center border border-light-azure bg-light-blue text-dark-gray rounded-lg px-4 py-2.5 text-sm font-medium"
                    >
                        Cancel
                    </Link>


                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 bg-primary text-light-blue rounded-lg px-4 py-2.5 text-sm font-medium disabled:opacity-60"
                    >

                        {saving ? (
                            <RefreshCw
                                size={16}
                                className="animate-spin"
                            />
                        ) : (
                            <Save
                                size={16}
                                strokeWidth={1.8}
                            />
                        )}

                        {saving
                            ? "Saving..."
                            : "Save Changes"}

                    </button>

                </div>

            </form>

        </div>
    );
}


/* -------------------------------- */
/* Reusable Form Field */
/* -------------------------------- */

function FormField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    min,
    step,
}) {

    return (
        <div>

            <label className="block text-xs font-medium text-dark-gray mb-1.5">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                min={min}
                step={step}
                className="w-full bg-bg border border-light-azure rounded-lg px-3 py-2.5 text-sm text-primary outline-none placeholder:text-gray focus:border-gray-blue"
            />

        </div>
    );
}


export default EditService;