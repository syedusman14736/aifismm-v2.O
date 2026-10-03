import {
    Search,
    Plus,
    RefreshCw,
    Pencil,
    Power,
    Trash2,
    Boxes,
    X,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    GripVertical,
    Save,
} from "lucide-react";

import { useEffect, useState } from "react";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4040";

const EMPTY_FORM = {
    provider: "",
    providerServiceId: "",

    name: "",
    description: "",

    providerType: "",
    providerCategory: "",

    category: "",
    platform: "",

    customComments: false,

    rate: "",
    providerRate: "",

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

    status: "active",
};

const isValidObjectId = (value) => {
    return /^[a-fA-F0-9]{24}$/.test(
        String(value || "")
    );
};

const AdminServices = () => {
    // =========================================================
    // STATE
    // =========================================================

    const [services, setServices] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [providers, setProviders] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Filters
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [platformFilter, setPlatformFilter] = useState("");
    const [providerFilter, setProviderFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    // Pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [totalServices, setTotalServices] = useState(0);

    // Service Modal
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [selectedService, setSelectedService] = useState(null);

    // Category Order Modal
    const [showCategoryOrderModal, setShowCategoryOrderModal] =
        useState(false);

    const [orderedCategories, setOrderedCategories] =
        useState([]);

    const [draggedCategoryId, setDraggedCategoryId] =
        useState(null);

    const [savingCategoryOrder, setSavingCategoryOrder] =
        useState(false);

    // Form
    const [form, setForm] = useState(EMPTY_FORM);

    // =========================================================
    // TOKEN / HEADERS
    // =========================================================

    const getToken = () => {
        return localStorage.getItem("aifi_token");
    };

    const getHeaders = () => {
        const token = getToken();

        return {
            "Content-Type": "application/json",
            ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                }
                : {}),
        };
    };

    // =========================================================
    // FETCH SERVICES
    // =========================================================

    const fetchServices = async () => {
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams();

            params.set("page", String(page));
            params.set("limit", String(limit));

            if (search.trim()) {
                params.set(
                    "search",
                    search.trim()
                );
            }

            if (statusFilter) {
                params.set(
                    "status",
                    statusFilter
                );
            }

            if (
                platformFilter &&
                isValidObjectId(platformFilter)
            ) {
                params.set(
                    "platform",
                    platformFilter
                );
            }

            if (providerFilter) {
                if (providerFilter === "none") {
                    params.set(
                        "provider",
                        "none"
                    );
                } else if (
                    isValidObjectId(providerFilter)
                ) {
                    params.set(
                        "provider",
                        providerFilter
                    );
                }
            }

            if (
                categoryFilter &&
                isValidObjectId(categoryFilter)
            ) {
                params.set(
                    "category",
                    categoryFilter
                );
            }

            const response = await fetch(
                `${API_URL}/admin/services?${params.toString()}`,
                {
                    method: "GET",
                    headers: getHeaders(),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to fetch services."
                );
            }

            const serviceList =
                Array.isArray(data)
                    ? data
                    : data?.services ||
                    data?.data ||
                    [];

            setServices(serviceList);

            const pagination =
                data?.pagination || {};

            const calculatedTotal =
                pagination.total ??
                data?.total ??
                serviceList.length;

            const calculatedTotalPages =
                pagination.totalPages ??
                data?.totalPages ??
                Math.max(
                    1,
                    Math.ceil(
                        calculatedTotal /
                        limit
                    )
                );

            setTotalServices(
                calculatedTotal
            );

            setTotalPages(
                calculatedTotalPages
            );
        } catch (err) {
            console.error(
                "Get admin services error:",
                err
            );

            setError(
                err?.message ||
                "Something went wrong while loading services."
            );

            setServices([]);
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // FETCH PLATFORMS
    // =========================================================

    const fetchPlatforms = async () => {
        try {
            const response =
                await fetch(
                    `${API_URL}/admin/platforms`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to fetch platforms."
                );
            }

            const platformList =
                Array.isArray(data)
                    ? data
                    : data?.platforms ||
                    data?.data ||
                    [];

            setPlatforms(
                platformList
            );
        } catch (err) {
            console.error(
                "Fetch platforms error:",
                err
            );
        }
    };

    // =========================================================
    // FETCH PROVIDERS
    // =========================================================

    const fetchProviders = async () => {
        try {
            const response =
                await fetch(
                    `${API_URL}/providers`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to fetch providers."
                );
            }

            const providerList =
                Array.isArray(data)
                    ? data
                    : data?.providers ||
                    data?.data ||
                    [];

            setProviders(
                providerList
            );
        } catch (err) {
            console.error(
                "Fetch providers error:",
                err
            );
        }
    };

    // =========================================================
    // FETCH CATEGORIES
    // =========================================================

    const fetchCategories = async () => {
        try {
            const response =
                await fetch(
                    `${API_URL}/admin/categories`,
                    {
                        method: "GET",
                        headers: getHeaders(),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to fetch categories."
                );
            }

            const categoryList =
                Array.isArray(data)
                    ? data
                    : data?.categories ||
                    data?.data ||
                    [];

            const sortedCategories =
                [...categoryList]
                    .filter(
                        (category) =>
                            category?._id &&
                            category?.name
                    )
                    .sort(
                        (a, b) => {
                            const orderA =
                                Number.isFinite(
                                    Number(
                                        a?.order
                                    )
                                )
                                    ? Number(
                                        a.order
                                    )
                                    : 999999;

                            const orderB =
                                Number.isFinite(
                                    Number(
                                        b?.order
                                    )
                                )
                                    ? Number(
                                        b.order
                                    )
                                    : 999999;

                            if (
                                orderA !==
                                orderB
                            ) {
                                return (
                                    orderA -
                                    orderB
                                );
                            }

                            return String(
                                a?.name ||
                                ""
                            ).localeCompare(
                                String(
                                    b?.name ||
                                    ""
                                )
                            );
                        }
                    );

            setCategories(
                sortedCategories
            );
        } catch (err) {
            console.error(
                "Fetch categories error:",
                err
            );

            setCategories([]);
        }
    };

    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {
        fetchPlatforms();
        fetchProviders();
        fetchCategories();
    }, []);

    // =========================================================
    // FETCH SERVICES
    // =========================================================

    useEffect(() => {
        fetchServices();
    }, [
        page,
        statusFilter,
        platformFilter,
        providerFilter,
        categoryFilter,
    ]);

    // =========================================================
    // SEARCH DEBOUNCE
    // =========================================================

    useEffect(() => {
        const timer =
            setTimeout(() => {
                if (page !== 1) {
                    setPage(1);
                    return;
                }

                fetchServices();
            }, 450);

        return () =>
            clearTimeout(timer);
    }, [search]);

    // =========================================================
    // RESET FILTERS
    // =========================================================

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("");
        setPlatformFilter("");
        setProviderFilter("");
        setCategoryFilter("");
        setPage(1);
    };

    // =========================================================
    // CATEGORY ORDER
    // =========================================================

    const openCategoryOrderModal = () => {
        const sorted =
            [...categories].sort(
                (a, b) => {
                    const orderA =
                        Number.isFinite(
                            Number(a?.order)
                        )
                            ? Number(a.order)
                            : 999999;

                    const orderB =
                        Number.isFinite(
                            Number(b?.order)
                        )
                            ? Number(b.order)
                            : 999999;

                    if (orderA !== orderB) {
                        return orderA - orderB;
                    }

                    return String(
                        a?.name || ""
                    ).localeCompare(
                        String(
                            b?.name || ""
                        )
                    );
                }
            );

        setOrderedCategories(
            sorted
        );

        setDraggedCategoryId(null);
        setError("");
        setSuccess("");
        setShowCategoryOrderModal(true);
    };

    const handleCategoryDragStart = (
        event,
        categoryId
    ) => {
        setDraggedCategoryId(
            categoryId
        );

        event.dataTransfer.effectAllowed =
            "move";

        event.dataTransfer.setData(
            "text/plain",
            categoryId
        );
    };

    const handleCategoryDragOver = (
        event
    ) => {
        event.preventDefault();

        event.dataTransfer.dropEffect =
            "move";
    };

    const handleCategoryDrop = (
        event,
        targetCategoryId
    ) => {
        event.preventDefault();

        const sourceCategoryId =
            draggedCategoryId ||
            event.dataTransfer.getData(
                "text/plain"
            );

        if (
            !sourceCategoryId ||
            sourceCategoryId ===
            targetCategoryId
        ) {
            setDraggedCategoryId(null);
            return;
        }

        setOrderedCategories(
            (previous) => {
                const next = [
                    ...previous,
                ];

                const sourceIndex =
                    next.findIndex(
                        (category) =>
                            category._id ===
                            sourceCategoryId
                    );

                const targetIndex =
                    next.findIndex(
                        (category) =>
                            category._id ===
                            targetCategoryId
                    );

                if (
                    sourceIndex === -1 ||
                    targetIndex === -1
                ) {
                    return previous;
                }

                const [
                    movedCategory,
                ] = next.splice(
                    sourceIndex,
                    1
                );

                next.splice(
                    targetIndex,
                    0,
                    movedCategory
                );

                return next;
            }
        );

        setDraggedCategoryId(null);
    };

    const saveCategoryOrder =
        async () => {
            try {
                setSavingCategoryOrder(
                    true
                );

                setError("");
                setSuccess("");

                const response =
                    await fetch(
                        `${API_URL}/admin/categories/reorder`,
                        {
                            method: "PUT",
                            headers:
                                getHeaders(),
                            body:
                                JSON.stringify(
                                    {
                                        categories:
                                            orderedCategories.map(
                                                (
                                                    category
                                                ) =>
                                                    category._id
                                            ),
                                    }
                                ),
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.message ||
                        "Failed to save category order."
                    );
                }

                const updatedCategories =
                    orderedCategories.map(
                        (
                            category,
                            index
                        ) => ({
                            ...category,
                            order:
                                index + 1,
                        })
                    );

                setCategories(
                    updatedCategories
                );

                setOrderedCategories(
                    updatedCategories
                );

                setShowCategoryOrderModal(
                    false
                );

                setSuccess(
                    "Category order saved successfully."
                );
            } catch (err) {
                console.error(
                    "Save category order error:",
                    err
                );

                setError(
                    err?.message ||
                    "Failed to save category order."
                );
            } finally {
                setSavingCategoryOrder(
                    false
                );
            }
        };

    // =========================================================
    // OPEN ADD MODAL
    // =========================================================

    const openAddModal = () => {
        setModalMode("add");
        setSelectedService(null);

        setForm({
            ...EMPTY_FORM,
        });

        setError("");
        setSuccess("");
        setShowModal(true);
    };

    // =========================================================
    // OPEN EDIT MODAL
    // =========================================================

    const openEditModal = (
        service
    ) => {
        setModalMode("edit");

        setSelectedService(
            service
        );

        const categoryId =
            service?.category &&
                typeof service.category ===
                "object"
                ? service.category._id
                : isValidObjectId(
                    service?.category
                )
                    ? service.category
                    : "";

        const platformId =
            service?.platform &&
                typeof service.platform ===
                "object"
                ? service.platform._id
                : isValidObjectId(
                    service?.platform
                )
                    ? service.platform
                    : "";

        const providerId =
            service?.provider &&
                typeof service.provider ===
                "object"
                ? service.provider._id
                : isValidObjectId(
                    service?.provider
                )
                    ? service.provider
                    : "";

        setForm({
            provider:
                providerId,

            providerServiceId:
                service?.providerServiceId ||
                "",

            name:
                service?.name ||
                "",

            description:
                service?.description ||
                "",

            providerType:
                service?.providerType ||
                "",

            providerCategory:
                service?.providerCategory ||
                "",

            category:
                categoryId,

            platform:
                platformId,

            customComments:
                Boolean(
                    service?.customComments
                ),

            rate:
                service?.rate ??
                "",

            providerRate:
                service?.providerRate ??
                "",

            min:
                service?.min ??
                "",

            max:
                service?.max ??
                "",

            speed:
                service?.speed ||
                "",

            drop:
                service?.drop ||
                "",

            quality:
                service?.quality ||
                "",

            refillEnabled:
                Boolean(
                    service?.refill?.enabled
                ),

            refillDuration:
                service?.refill?.duration ||
                "",

            refundEnabled:
                Boolean(
                    service?.refund?.enabled
                ),

            refundDuration:
                service?.refund?.duration ||
                "",

            dripfeed:
                Boolean(
                    service?.dripfeed
                ),

            cancel:
                Boolean(
                    service?.cancel
                ),

            averageTime:
                service?.averageTime ??
                "",

            status:
                service?.status ||
                "active",
        });

        setError("");
        setSuccess("");
        setShowModal(true);
    };

    // =========================================================
    // CLOSE MODAL
    // =========================================================

    const closeModal = () => {
        if (saving) {
            return;
        }

        setShowModal(false);
        setSelectedService(null);

        setForm({
            ...EMPTY_FORM,
        });

        setError("");
        setSuccess("");
    };

    // =========================================================
    // FORM CHANGE
    // =========================================================

    const handleChange = (
        event
    ) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setForm(
            (previous) => ({
                ...previous,
                [name]:
                    type === "checkbox"
                        ? checked
                        : value,
            })
        );
    };

    // =========================================================
    // PROVIDER CHANGE
    // =========================================================

    const handleProviderChange = (
        event
    ) => {
        const providerId =
            event.target.value;

        setForm(
            (previous) => ({
                ...previous,

                provider:
                    providerId,

                providerServiceId:
                    providerId
                        ? previous.providerServiceId
                        : "",

                providerRate:
                    providerId
                        ? previous.providerRate
                        : "",
            })
        );
    };

    // =========================================================
    // CREATE SERVICE
    // =========================================================

    const createService =
        async () => {
            try {
                setSaving(true);
                setError("");
                setSuccess("");

                const isManualService =
                    !form.provider;

                if (!form.name.trim()) {
                    throw new Error(
                        "Service name is required."
                    );
                }

                if (
                    !isValidObjectId(
                        form.category
                    )
                ) {
                    throw new Error(
                        "Please select a valid category."
                    );
                }

                const rate =
                    Number(form.rate);

                const min =
                    Number(form.min);

                const max =
                    Number(form.max);

                if (
                    !Number.isFinite(
                        rate
                    ) ||
                    rate < 0
                ) {
                    throw new Error(
                        "Please enter a valid customer rate."
                    );
                }

                if (
                    !Number.isInteger(
                        min
                    ) ||
                    min < 1
                ) {
                    throw new Error(
                        "Minimum must be a valid integer."
                    );
                }

                if (
                    !Number.isInteger(
                        max
                    ) ||
                    max < 1
                ) {
                    throw new Error(
                        "Maximum must be a valid integer."
                    );
                }

                if (min > max) {
                    throw new Error(
                        "Minimum cannot be greater than maximum."
                    );
                }

                let providerRate =
                    null;

                if (!isManualService) {
                    if (
                        !form.providerServiceId.trim()
                    ) {
                        throw new Error(
                            "Provider service ID is required when a provider is selected."
                        );
                    }

                    providerRate =
                        Number(
                            form.providerRate
                        );

                    if (
                        !Number.isFinite(
                            providerRate
                        ) ||
                        providerRate < 0
                    ) {
                        throw new Error(
                            "Please enter a valid provider rate."
                        );
                    }
                }

                let averageTime =
                    null;

                if (
                    form.averageTime !==
                    ""
                ) {
                    averageTime =
                        Number(
                            form.averageTime
                        );

                    if (
                        !Number.isFinite(
                            averageTime
                        ) ||
                        averageTime < 0
                    ) {
                        throw new Error(
                            "Please enter a valid average time."
                        );
                    }
                }

                const payload = {
                    provider:
                        isManualService
                            ? null
                            : form.provider,

                    providerServiceId:
                        isManualService
                            ? null
                            : form.providerServiceId.trim(),

                    name:
                        form.name.trim(),

                    description:
                        form.description.trim() ||
                        null,

                    providerType:
                        form.providerType.trim() ||
                        null,

                    providerCategory:
                        form.providerCategory.trim() ||
                        null,

                    category:
                        form.category,

                    platform:
                        form.platform &&
                            isValidObjectId(
                                form.platform
                            )
                            ? form.platform
                            : null,

                    customComments:
                        Boolean(
                            form.customComments
                        ),

                    rate,

                    providerRate,

                    min,

                    max,

                    speed:
                        form.speed.trim() ||
                        null,

                    drop:
                        form.drop.trim() ||
                        null,

                    quality:
                        form.quality.trim() ||
                        null,

                    refill: {
                        enabled:
                            Boolean(
                                form.refillEnabled
                            ),

                        duration:
                            form.refillEnabled &&
                                form.refillDuration.trim()
                                ? form.refillDuration.trim()
                                : null,
                    },

                    refund: {
                        enabled:
                            Boolean(
                                form.refundEnabled
                            ),

                        duration:
                            form.refundEnabled &&
                                form.refundDuration.trim()
                                ? form.refundDuration.trim()
                                : null,
                    },

                    dripfeed:
                        Boolean(
                            form.dripfeed
                        ),

                    cancel:
                        Boolean(
                            form.cancel
                        ),

                    averageTime,

                    status:
                        form.status ||
                        "active",
                };

                const response =
                    await fetch(
                        `${API_URL}/admin/services`,
                        {
                            method: "POST",
                            headers:
                                getHeaders(),
                            body:
                                JSON.stringify(
                                    payload
                                ),
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.message ||
                        "Failed to create service."
                    );
                }

                setSuccess(
                    isManualService
                        ? "Manual service created successfully."
                        : "Service created successfully."
                );

                await fetchServices();

                setTimeout(() => {
                    closeModal();
                }, 700);
            } catch (err) {
                console.error(
                    "Create service error:",
                    err
                );

                setError(
                    err?.message ||
                    "Failed to create service."
                );
            } finally {
                setSaving(false);
            }
        };

    // =========================================================
    // UPDATE SERVICE
    // =========================================================

    const updateService =
        async () => {
            if (!selectedService?._id) {
                return;
            }

            try {
                setSaving(true);
                setError("");
                setSuccess("");

                const min =
                    Number(form.min);

                const max =
                    Number(form.max);

                const rate =
                    Number(form.rate);

                if (!form.name.trim()) {
                    throw new Error(
                        "Service name is required."
                    );
                }

                if (
                    !isValidObjectId(
                        form.category
                    )
                ) {
                    throw new Error(
                        "Please select a valid category."
                    );
                }

                if (
                    !Number.isFinite(
                        rate
                    ) ||
                    rate < 0
                ) {
                    throw new Error(
                        "Please enter a valid rate."
                    );
                }

                if (
                    !Number.isInteger(
                        min
                    ) ||
                    !Number.isInteger(
                        max
                    ) ||
                    min < 1 ||
                    max < 1
                ) {
                    throw new Error(
                        "Please enter valid minimum and maximum values."
                    );
                }

                if (min > max) {
                    throw new Error(
                        "Minimum cannot be greater than maximum."
                    );
                }

                let averageTime =
                    null;

                if (
                    form.averageTime !==
                    ""
                ) {
                    averageTime =
                        Number(
                            form.averageTime
                        );

                    if (
                        !Number.isFinite(
                            averageTime
                        ) ||
                        averageTime < 0
                    ) {
                        throw new Error(
                            "Please enter a valid average time."
                        );
                    }
                }

                let providerRate =
                    null;

                if (
                    form.providerRate !==
                    ""
                ) {
                    providerRate =
                        Number(
                            form.providerRate
                        );

                    if (
                        !Number.isFinite(
                            providerRate
                        ) ||
                        providerRate < 0
                    ) {
                        throw new Error(
                            "Please enter a valid provider rate."
                        );
                    }
                }

                const payload = {
                    name:
                        form.name.trim(),

                    description:
                        form.description.trim() ||
                        null,

                    providerType:
                        form.providerType.trim() ||
                        null,

                    providerCategory:
                        form.providerCategory.trim() ||
                        null,

                    category:
                        form.category,

                    platform:
                        form.platform &&
                            isValidObjectId(
                                form.platform
                            )
                            ? form.platform
                            : null,

                    customComments:
                        Boolean(
                            form.customComments
                        ),

                    rate,

                    providerRate,

                    min,

                    max,

                    speed:
                        form.speed.trim() ||
                        null,

                    drop:
                        form.drop.trim() ||
                        null,

                    quality:
                        form.quality.trim() ||
                        null,

                    refill: {
                        enabled:
                            Boolean(
                                form.refillEnabled
                            ),

                        duration:
                            form.refillEnabled &&
                                form.refillDuration.trim()
                                ? form.refillDuration.trim()
                                : null,
                    },

                    refund: {
                        enabled:
                            Boolean(
                                form.refundEnabled
                            ),

                        duration:
                            form.refundEnabled &&
                                form.refundDuration.trim()
                                ? form.refundDuration.trim()
                                : null,
                    },

                    dripfeed:
                        Boolean(
                            form.dripfeed
                        ),

                    cancel:
                        Boolean(
                            form.cancel
                        ),

                    averageTime,

                    status:
                        form.status ||
                        "active",
                };

                const response =
                    await fetch(
                        `${API_URL}/admin/services/${selectedService._id}`,
                        {
                            method: "PUT",
                            headers:
                                getHeaders(),
                            body:
                                JSON.stringify(
                                    payload
                                ),
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.message ||
                        "Failed to update service."
                    );
                }

                setSuccess(
                    "Service updated successfully."
                );

                await fetchServices();

                setTimeout(() => {
                    closeModal();
                }, 700);
            } catch (err) {
                console.error(
                    "Update service error:",
                    err
                );

                setError(
                    err?.message ||
                    "Failed to update service."
                );
            } finally {
                setSaving(false);
            }
        };

    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit =
        async (event) => {
            event.preventDefault();

            if (
                modalMode ===
                "edit"
            ) {
                await updateService();
            } else {
                await createService();
            }
        };

    // =========================================================
    // STATUS
    // =========================================================

    const toggleStatus =
        async (service) => {
            if (!service?._id) {
                return;
            }

            try {
                setError("");
                setSuccess("");

                const newStatus =
                    service.status ===
                        "active"
                        ? "inactive"
                        : "active";

                const response =
                    await fetch(
                        `${API_URL}/admin/services/${service._id}/status`,
                        {
                            method: "PATCH",
                            headers:
                                getHeaders(),
                            body:
                                JSON.stringify(
                                    {
                                        status:
                                            newStatus,
                                    }
                                ),
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.message ||
                        "Failed to update service status."
                    );
                }

                setSuccess(
                    `Service ${newStatus ===
                        "active"
                        ? "activated"
                        : "deactivated"
                    } successfully.`
                );

                await fetchServices();
            } catch (err) {
                console.error(
                    "Toggle service status error:",
                    err
                );

                setError(
                    err?.message ||
                    "Failed to update service status."
                );
            }
        };

    // =========================================================
    // DELETE
    // =========================================================

    const deleteService =
        async (service) => {
            if (!service?._id) {
                return;
            }

            const confirmed =
                window.confirm(
                    `Are you sure you want to delete "${service.name}"?`
                );

            if (!confirmed) {
                return;
            }

            try {
                setError("");
                setSuccess("");

                const response =
                    await fetch(
                        `${API_URL}/admin/services/${service._id}`,
                        {
                            method: "DELETE",
                            headers:
                                getHeaders(),
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.message ||
                        "Failed to delete service."
                    );
                }

                setSuccess(
                    "Service deleted successfully."
                );

                if (
                    services.length ===
                    1 &&
                    page > 1
                ) {
                    setPage(
                        (previous) =>
                            Math.max(
                                1,
                                previous - 1
                            )
                    );
                } else {
                    await fetchServices();
                }
            } catch (err) {
                console.error(
                    "Delete service error:",
                    err
                );

                setError(
                    err?.message ||
                    "Failed to delete service."
                );
            }
        };

    // =========================================================
    // HELPERS
    // =========================================================

    const getPlatformName =
        (service) => {
            if (
                service?.platform &&
                typeof service.platform ===
                "object"
            ) {
                return (
                    service.platform.name ||
                    "—"
                );
            }

            const platform =
                platforms.find(
                    (item) =>
                        item?._id ===
                        service?.platform
                );

            return (
                platform?.name ||
                "—"
            );
        };

    const getProviderName =
        (service) => {
            if (!service?.provider) {
                return "Manual";
            }

            if (
                typeof service.provider ===
                "object"
            ) {
                return (
                    service.provider.name ||
                    "—"
                );
            }

            const provider =
                providers.find(
                    (item) =>
                        item?._id ===
                        service?.provider
                );

            return (
                provider?.name ||
                "—"
            );
        };

    const getCategoryName =
        (service) => {
            if (
                service?.category &&
                typeof service.category ===
                "object"
            ) {
                return (
                    service.category.name ||
                    "—"
                );
            }

            const category =
                categories.find(
                    (item) =>
                        item?._id ===
                        service?.category
                );

            return (
                category?.name ||
                "—"
            );
        };

    const formatRate =
        (rate) => {
            if (
                rate === undefined ||
                rate === null ||
                rate === ""
            ) {
                return "—";
            }

            return Number(
                rate
            ).toFixed(4);
        };

    const isManualFormService =
        !form.provider;

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <section className="w-full space-y-4">

            {/* =================================================
                                HEADER
            ================================================= */}

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-dark-blue text-light-blue">
                            <Boxes
                                size={19}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-dark-blue sm:text-lg">
                                Services
                            </h2>

                            <p className="text-xs text-gray sm:text-sm">
                                Manage your SMM services
                            </p>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">

                    <button
                        type="button"
                        onClick={
                            openCategoryOrderModal
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-light-azure bg-white px-4 py-2.5 text-sm font-medium text-dark-gray transition hover:border-dark-blue hover:text-dark-blue"
                    >
                        <GripVertical
                            size={17}
                        />

                        Manage Category Order
                    </button>

                    <button
                        type="button"
                        onClick={
                            openAddModal
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                    >
                        <Plus size={17} />

                        Add Service
                    </button>

                </div>

            </div>

            {/* =================================================
                                ALERTS
            ================================================= */}

            {error && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">

                    <AlertCircle
                        size={18}
                        className="mt-0.5 shrink-0"
                    />

                    <span className="min-w-0 break-words">
                        {error}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                        className="ml-auto shrink-0"
                    >
                        <X size={16} />
                    </button>

                </div>
            )}

            {success && (
                <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-700">
                    {success}
                </div>
            )}

            {/* =================================================
                                FILTERS
            ================================================= */}

            <div className="rounded-lg border border-light-azure bg-light-blue p-3 sm:p-4">

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

                    <div className="relative sm:col-span-2 lg:col-span-3 xl:col-span-2">

                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray"
                        />

                        <input
                            type="text"
                            value={
                                search
                            }
                            onChange={(
                                event
                            ) =>
                                setSearch(
                                    event
                                        .target
                                        .value
                                )
                            }
                            placeholder="Search services..."
                            className="h-10 w-full rounded-md border border-light-azure bg-white pl-9 pr-3 text-sm text-dark-gray outline-none placeholder:text-gray focus:border-dark-blue"
                        />

                    </div>

                    <select
                        value={
                            statusFilter
                        }
                        onChange={(
                            event
                        ) => {
                            setStatusFilter(
                                event
                                    .target
                                    .value
                            );

                            setPage(1);
                        }}
                        className="h-10 rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
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

                    <select
                        value={
                            platformFilter
                        }
                        onChange={(
                            event
                        ) => {
                            setPlatformFilter(
                                event
                                    .target
                                    .value
                            );

                            setPage(1);
                        }}
                        className="h-10 rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                    >
                        <option value="">
                            All Platforms
                        </option>

                        {platforms.map(
                            (
                                platform
                            ) => (
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

                    <select
                        value={
                            providerFilter
                        }
                        onChange={(
                            event
                        ) => {
                            setProviderFilter(
                                event
                                    .target
                                    .value
                            );

                            setPage(1);
                        }}
                        className="h-10 rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                    >
                        <option value="">
                            All Providers
                        </option>

                        <option value="none">
                            Manual Services
                        </option>

                        {providers.map(
                            (
                                provider
                            ) => (
                                <option
                                    key={
                                        provider._id
                                    }
                                    value={
                                        provider._id
                                    }
                                >
                                    {
                                        provider.name
                                    }
                                </option>
                            )
                        )}
                    </select>

                    <select
                        value={
                            categoryFilter
                        }
                        onChange={(
                            event
                        ) => {
                            const value =
                                event
                                    .target
                                    .value;

                            setCategoryFilter(
                                isValidObjectId(
                                    value
                                )
                                    ? value
                                    : ""
                            );

                            setPage(1);
                        }}
                        className="h-10 rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                    >
                        <option value="">
                            All Categories
                        </option>

                        {categories.map(
                            (
                                category
                            ) => (
                                <option
                                    key={
                                        category._id
                                    }
                                    value={
                                        category._id
                                    }
                                >
                                    {
                                        category.name
                                    }
                                </option>
                            )
                        )}
                    </select>

                </div>

                <div className="mt-3 flex flex-col gap-2 border-t border-light-azure pt-3 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-xs text-gray">
                        {
                            totalServices
                        }{" "}
                        services found
                    </p>

                    <button
                        type="button"
                        onClick={
                            resetFilters
                        }
                        className="inline-flex w-fit items-center gap-2 rounded-md border border-light-azure bg-white px-3 py-2 text-xs font-medium text-dark-gray hover:border-dark-blue hover:text-dark-blue"
                    >
                        <RefreshCw
                            size={14}
                        />

                        Reset Filters
                    </button>

                </div>

            </div>

            {/* =================================================
                            DESKTOP TABLE
            ================================================= */}

            <div className="hidden overflow-hidden rounded-lg border border-light-azure bg-light-blue md:block">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1100px] border-collapse">

                        <thead>
                            <tr className="border-b border-light-azure bg-white text-left">

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray">
                                    Service
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray">
                                    Platform
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray">
                                    Provider
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray">
                                    Category
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray">
                                    Rate
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray">
                                    Min / Max
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray">
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-4 py-12 text-center text-sm text-gray"
                                    >
                                        Loading services...
                                    </td>
                                </tr>
                            ) : services.length ===
                                0 ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-4 py-12 text-center"
                                    >
                                        <Boxes
                                            size={28}
                                            className="mx-auto text-gray"
                                        />

                                        <p className="mt-2 text-sm font-medium text-dark-gray">
                                            No services found
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                services.map(
                                    (
                                        service
                                    ) => (
                                        <tr
                                            key={
                                                service._id
                                            }
                                            className="border-b border-light-azure last:border-b-0 hover:bg-white"
                                        >

                                            <td className="max-w-[300px] px-4 py-3">

                                                <p className="truncate text-sm font-medium text-dark-blue">
                                                    {
                                                        service.name
                                                    }
                                                </p>

                                                <p className="mt-1 text-xs text-gray">
                                                    ID:{" "}
                                                    {
                                                        service.serviceId ||
                                                        "—"
                                                    }
                                                </p>

                                            </td>

                                            <td className="px-4 py-3 text-sm text-dark-gray">
                                                {
                                                    getPlatformName(
                                                        service
                                                    )
                                                }
                                            </td>

                                            <td className="px-4 py-3 text-sm text-dark-gray">
                                                {
                                                    getProviderName(
                                                        service
                                                    )
                                                }
                                            </td>

                                            <td className="px-4 py-3">

                                                <span className="inline-flex rounded-md bg-light-gray px-2 py-1 text-xs text-dark-gray">
                                                    {
                                                        getCategoryName(
                                                            service
                                                        )
                                                    }
                                                </span>

                                            </td>

                                            <td className="px-4 py-3 text-sm font-medium text-dark-blue">
                                                {
                                                    formatRate(
                                                        service.rate
                                                    )
                                                }
                                            </td>

                                            <td className="px-4 py-3 text-sm text-dark-gray">
                                                {
                                                    service.min ??
                                                    "—"
                                                }{" "}
                                                /{" "}
                                                {
                                                    service.max ??
                                                    "—"
                                                }
                                            </td>

                                            <td className="px-4 py-3">

                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${service.status ===
                                                        "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {
                                                        service.status ===
                                                            "active"
                                                            ? "Active"
                                                            : "Inactive"
                                                    }
                                                </span>

                                            </td>

                                            <td className="px-4 py-3">

                                                <div className="flex items-center justify-end gap-1">

                                                    <button
                                                        type="button"
                                                        title="Edit"
                                                        onClick={() =>
                                                            openEditModal(
                                                                service
                                                            )
                                                        }
                                                        className="rounded-md p-2 text-dark-gray hover:bg-light-gray hover:text-dark-blue"
                                                    >
                                                        <Pencil
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        title={
                                                            service.status ===
                                                                "active"
                                                                ? "Deactivate"
                                                                : "Activate"
                                                        }
                                                        onClick={() =>
                                                            toggleStatus(
                                                                service
                                                            )
                                                        }
                                                        className="rounded-md p-2 text-dark-gray hover:bg-light-gray hover:text-dark-blue"
                                                    >
                                                        <Power
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        title="Delete"
                                                        onClick={() =>
                                                            deleteService(
                                                                service
                                                            )
                                                        }
                                                        className="rounded-md p-2 text-red-500 hover:bg-red-50"
                                                    >
                                                        <Trash2
                                                            size={
                                                                16
                                                            }
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

            </div>

            {/* =================================================
                            MOBILE CARDS
            ================================================= */}

            <div className="space-y-3 md:hidden">

                {loading ? (
                    <div className="rounded-lg border border-light-azure bg-light-blue px-4 py-12 text-center text-sm text-gray">
                        Loading services...
                    </div>
                ) : services.length ===
                    0 ? (
                    <div className="rounded-lg border border-light-azure bg-light-blue px-4 py-12 text-center">

                        <Boxes
                            size={28}
                            className="mx-auto text-gray"
                        />

                        <p className="mt-2 text-sm font-medium text-dark-gray">
                            No services found
                        </p>

                    </div>
                ) : (
                    services.map(
                        (
                            service
                        ) => (
                            <div
                                key={
                                    service._id
                                }
                                className="rounded-lg border border-light-azure bg-light-blue p-4"
                            >

                                <div className="flex items-start justify-between gap-3">

                                    <div className="min-w-0">

                                        <p className="break-words text-sm font-semibold text-dark-blue">
                                            {
                                                service.name
                                            }
                                        </p>

                                        <p className="mt-1 text-xs text-gray">
                                            ID:{" "}
                                            {
                                                service.serviceId ||
                                                "—"
                                            }
                                        </p>

                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${service.status ===
                                            "active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {
                                            service.status ===
                                                "active"
                                                ? "Active"
                                                : "Inactive"
                                        }
                                    </span>

                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">

                                    <div>
                                        <p className="text-[11px] text-gray">
                                            Platform
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-dark-gray">
                                            {
                                                getPlatformName(
                                                    service
                                                )
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] text-gray">
                                            Provider
                                        </p>

                                        <p className="mt-1 truncate text-xs font-medium text-dark-gray">
                                            {
                                                getProviderName(
                                                    service
                                                )
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] text-gray">
                                            Category
                                        </p>

                                        <p className="mt-1 truncate text-xs font-medium text-dark-gray">
                                            {
                                                getCategoryName(
                                                    service
                                                )
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] text-gray">
                                            Rate
                                        </p>

                                        <p className="mt-1 text-xs font-semibold text-dark-blue">
                                            {
                                                formatRate(
                                                    service.rate
                                                )
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] text-gray">
                                            Minimum
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-dark-gray">
                                            {
                                                service.min ??
                                                "—"
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] text-gray">
                                            Maximum
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-dark-gray">
                                            {
                                                service.max ??
                                                "—"
                                            }
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-4 flex items-center justify-end gap-2 border-t border-light-azure pt-3">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openEditModal(
                                                service
                                            )
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-md border border-light-azure bg-white px-3 py-2 text-xs font-medium text-dark-gray"
                                    >
                                        <Pencil
                                            size={
                                                14
                                            }
                                        />

                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleStatus(
                                                service
                                            )
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-md border border-light-azure bg-white px-3 py-2 text-xs font-medium text-dark-gray"
                                    >
                                        <Power
                                            size={
                                                14
                                            }
                                        />

                                        {
                                            service.status ===
                                                "active"
                                                ? "Disable"
                                                : "Enable"
                                        }
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteService(
                                                service
                                            )
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-500"
                                    >
                                        <Trash2
                                            size={
                                                14
                                            }
                                        />

                                        Delete
                                    </button>

                                </div>

                            </div>
                        )
                    )
                )}

            </div>

            {/* =================================================
                            PAGINATION
            ================================================= */}

            <div className="flex flex-col gap-3 rounded-lg border border-light-azure bg-light-blue px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-xs text-gray">
                    Page{" "}
                    {page}{" "}
                    of{" "}
                    {totalPages}
                </p>

                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        disabled={
                            page <= 1
                        }
                        onClick={() =>
                            setPage(
                                (
                                    previous
                                ) =>
                                    Math.max(
                                        1,
                                        previous - 1
                                    )
                            )
                        }
                        className="inline-flex items-center gap-1 rounded-md border border-light-azure bg-white px-3 py-2 text-xs font-medium text-dark-gray disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft
                            size={15}
                        />

                        Previous
                    </button>

                    <button
                        type="button"
                        disabled={
                            page >=
                            totalPages
                        }
                        onClick={() =>
                            setPage(
                                (
                                    previous
                                ) =>
                                    Math.min(
                                        totalPages,
                                        previous + 1
                                    )
                            )
                        }
                        className="inline-flex items-center gap-1 rounded-md border border-light-azure bg-white px-3 py-2 text-xs font-medium text-dark-gray disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next

                        <ChevronRight
                            size={15}
                        />
                    </button>

                </div>

            </div>

            {/* =================================================
                        CATEGORY ORDER MODAL
            ================================================= */}

            {showCategoryOrderModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5">

                    <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-light-azure bg-light-blue shadow-2xl">

                        {/* Header */}

                        <div className="flex shrink-0 items-center justify-between border-b border-light-azure bg-white px-4 py-3 sm:px-5">

                            <div>
                                <h3 className="text-sm font-semibold text-dark-blue sm:text-base">
                                    Manage Category Order
                                </h3>

                                <p className="mt-1 text-xs text-gray">
                                    Drag categories to set your preferred sequence.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    if (
                                        !savingCategoryOrder
                                    ) {
                                        setShowCategoryOrderModal(
                                            false
                                        );
                                    }
                                }}
                                disabled={
                                    savingCategoryOrder
                                }
                                className="rounded-md p-2 text-gray hover:bg-light-gray hover:text-dark-blue disabled:opacity-50"
                            >
                                <X
                                    size={19}
                                />
                            </button>

                        </div>

                        {/* Category List */}

                        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4 sm:p-5">

                            {orderedCategories.length ===
                                0 ? (
                                <div className="rounded-md border border-light-azure bg-white px-4 py-10 text-center text-sm text-gray">
                                    No categories found.
                                </div>
                            ) : (
                                orderedCategories.map(
                                    (
                                        category,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                category._id
                                            }
                                            draggable={
                                                !savingCategoryOrder
                                            }
                                            onDragStart={(
                                                event
                                            ) =>
                                                handleCategoryDragStart(
                                                    event,
                                                    category._id
                                                )
                                            }
                                            onDragOver={
                                                handleCategoryDragOver
                                            }
                                            onDrop={(
                                                event
                                            ) =>
                                                handleCategoryDrop(
                                                    event,
                                                    category._id
                                                )
                                            }
                                            onDragEnd={() =>
                                                setDraggedCategoryId(
                                                    null
                                                )
                                            }
                                            className={`flex cursor-grab items-center gap-3 rounded-md border bg-white px-3 py-3 transition active:cursor-grabbing ${draggedCategoryId ===
                                                    category._id
                                                    ? "border-dark-blue opacity-40"
                                                    : "border-light-azure hover:border-dark-blue"
                                                }`}
                                        >

                                            <GripVertical
                                                size={
                                                    18
                                                }
                                                className="shrink-0 text-gray"
                                            />

                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-light-gray text-xs font-semibold text-dark-gray">
                                                {
                                                    index +
                                                    1
                                                }
                                            </span>

                                            <span className="min-w-0 flex-1 break-words text-sm font-medium text-dark-blue">
                                                {
                                                    category.name
                                                }
                                            </span>

                                            <span
                                                className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${category.status ===
                                                        "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {
                                                    category.status ===
                                                        "active"
                                                        ? "Active"
                                                        : "Inactive"
                                                }
                                            </span>

                                        </div>
                                    )
                                )
                            )}

                        </div>

                        {/* Footer */}

                        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-light-azure bg-white px-4 py-3 sm:px-5">

                            <p className="text-xs text-gray">
                                {
                                    orderedCategories.length
                                }{" "}
                                categories
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCategoryOrderModal(
                                            false
                                        )
                                    }
                                    disabled={
                                        savingCategoryOrder
                                    }
                                    className="rounded-md border border-light-azure bg-white px-3 py-2 text-xs font-medium text-dark-gray hover:border-dark-blue disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        saveCategoryOrder
                                    }
                                    disabled={
                                        savingCategoryOrder ||
                                        orderedCategories.length ===
                                        0
                                    }
                                    className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save
                                        size={14}
                                    />

                                    {savingCategoryOrder
                                        ? "Saving..."
                                        : "Save Order"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

            {/* =================================================
                            ADD / EDIT MODAL
            ================================================= */}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5">

                    <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-light-azure bg-light-blue shadow-2xl">

                        {/* Header */}

                        <div className="flex shrink-0 items-center justify-between border-b border-light-azure bg-white px-4 py-3 sm:px-5">

                            <div>
                                <h3 className="text-sm font-semibold text-dark-blue sm:text-base">
                                    {
                                        modalMode ===
                                            "edit"
                                            ? "Edit Service"
                                            : "Add Service"
                                    }
                                </h3>

                                <p className="mt-0.5 text-xs text-gray">
                                    {
                                        modalMode ===
                                            "edit"
                                            ? "Update service information."
                                            : "Create a new service."
                                    }
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeModal
                                }
                                disabled={
                                    saving
                                }
                                className="rounded-md p-2 text-gray hover:bg-light-gray hover:text-dark-blue disabled:opacity-50"
                            >
                                <X
                                    size={
                                        19
                                    }
                                />
                            </button>

                        </div>

                        {/* Body */}

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="min-h-0 overflow-y-auto"
                        >

                            <div className="grid grid-cols-1 gap-4 p-4 sm:p-5 md:grid-cols-2">

                                {/* =================================================
                                            PROVIDER SECTION
                                ================================================= */}

                                <div className="rounded-md border border-light-azure bg-white p-3 md:col-span-2">

                                    <div className="mb-3 flex items-center justify-between gap-3">

                                        <p className="text-xs font-semibold text-dark-blue">
                                            Provider Information
                                        </p>

                                        {modalMode ===
                                            "add" &&
                                            isManualFormService && (
                                                <span className="rounded-full bg-light-gray px-2.5 py-1 text-[11px] font-medium text-dark-gray">
                                                    Manual Service
                                                </span>
                                            )}

                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                                        {/* Provider */}

                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                                Provider
                                            </label>

                                            <select
                                                name="provider"
                                                value={
                                                    form.provider
                                                }
                                                onChange={
                                                    handleProviderChange
                                                }
                                                disabled={
                                                    modalMode ===
                                                    "edit"
                                                }
                                                className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue disabled:bg-light-gray disabled:opacity-70"
                                            >
                                                <option value="">
                                                    No Provider / Manual
                                                </option>

                                                {providers.map(
                                                    (
                                                        provider
                                                    ) => (
                                                        <option
                                                            key={
                                                                provider._id
                                                            }
                                                            value={
                                                                provider._id
                                                            }
                                                        >
                                                            {
                                                                provider.name
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>

                                            {modalMode ===
                                                "add" &&
                                                isManualFormService && (
                                                    <p className="mt-1.5 text-[11px] text-gray">
                                                        Create this service without connecting it to an SMM provider.
                                                    </p>
                                                )}
                                        </div>

                                        {/* Provider Service ID */}

                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                                Provider Service ID
                                            </label>

                                            <input
                                                type="text"
                                                name="providerServiceId"
                                                value={
                                                    form.providerServiceId
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                disabled={
                                                    modalMode ===
                                                    "edit" ||
                                                    isManualFormService
                                                }
                                                placeholder={
                                                    isManualFormService
                                                        ? "Not required"
                                                        : "e.g. 1234"
                                                }
                                                className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue disabled:bg-light-gray disabled:opacity-70"
                                            />
                                        </div>

                                        {/* Provider Rate */}

                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                                Provider Rate
                                            </label>

                                            <input
                                                type="number"
                                                step="any"
                                                min="0"
                                                name="providerRate"
                                                value={
                                                    form.providerRate
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                disabled={
                                                    modalMode ===
                                                    "edit" ||
                                                    isManualFormService
                                                }
                                                placeholder={
                                                    isManualFormService
                                                        ? "Not required"
                                                        : "0"
                                                }
                                                className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue disabled:bg-light-gray disabled:opacity-70"
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* =================================================
                                            SERVICE BASIC
                                ================================================= */}

                                <div className="md:col-span-2">

                                    <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                        Service Name
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
                                        placeholder="e.g. Instagram Followers"
                                        className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                    />

                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={
                                            form.category
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                    >
                                        <option value="">
                                            Select Category
                                        </option>

                                        {categories.map(
                                            (
                                                category
                                            ) => (
                                                <option
                                                    key={
                                                        category._id
                                                    }
                                                    value={
                                                        category._id
                                                    }
                                                >
                                                    {
                                                        category.name
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                        Platform
                                    </label>

                                    <select
                                        name="platform"
                                        value={
                                            form.platform
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                    >
                                        <option value="">
                                            No Platform
                                        </option>

                                        {platforms.map(
                                            (
                                                platform
                                            ) => (
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
                                    <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                        Provider Type
                                    </label>

                                    <input
                                        type="text"
                                        name="providerType"
                                        value={
                                            form.providerType
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. followers"
                                        className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                        Provider Category
                                    </label>

                                    <input
                                        type="text"
                                        name="providerCategory"
                                        value={
                                            form.providerCategory
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Provider category"
                                        className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                    />
                                </div>

                                {/* Description */}

                                <div className="md:col-span-2">

                                    <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={
                                            form.description
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        rows="3"
                                        placeholder="Service description..."
                                        className="w-full resize-none rounded-md border border-light-azure bg-white px-3 py-2 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                    />

                                </div>

                                {/* =================================================
                                            PRICING
                                ================================================= */}

                                <div className="rounded-md border border-light-azure bg-white p-3 md:col-span-2">

                                    <p className="mb-3 text-xs font-semibold text-dark-blue">
                                        Pricing & Limits
                                    </p>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                                Customer Rate
                                            </label>

                                            <input
                                                type="number"
                                                step="any"
                                                min="0"
                                                name="rate"
                                                value={
                                                    form.rate
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                placeholder="0"
                                                className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                                Minimum
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                name="min"
                                                value={
                                                    form.min
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                placeholder="100"
                                                className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                                Maximum
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                name="max"
                                                value={
                                                    form.max
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                placeholder="100000"
                                                className="h-10 w-full rounded-md border border-light-azure bg-white px-3 py-2 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* Speed */}

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                        Speed
                                    </label>

                                    <input
                                        type="text"
                                        name="speed"
                                        value={
                                            form.speed
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="0-30 min"
                                        className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                    />
                                </div>

                                {/* Drop */}

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                        Drop
                                    </label>

                                    <input
                                        type="text"
                                        name="drop"
                                        value={
                                            form.drop
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="0-5%"
                                        className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                    />
                                </div>

                                {/* Quality */}

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                        Quality
                                    </label>

                                    <input
                                        type="text"
                                        name="quality"
                                        value={
                                            form.quality
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="High Quality"
                                        className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                    />
                                </div>

                                {/* Average Time */}

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-dark-gray">
                                        Average Time
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        name="averageTime"
                                        value={
                                            form.averageTime
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Minutes"
                                        className="h-10 w-full rounded-md border border-light-azure bg-white px-3 text-sm text-dark-gray outline-none focus:border-dark-blue"
                                    />
                                </div>

                                {/* =================================================
                                            FEATURES
                                ================================================= */}

                                <div className="rounded-md border border-light-azure bg-white p-3 md:col-span-2">

                                    <p className="mb-3 text-xs font-semibold text-dark-blue">
                                        Service Features
                                    </p>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                                        <label className="flex cursor-pointer items-center gap-2 text-xs text-dark-gray">
                                            <input
                                                type="checkbox"
                                                name="customComments"
                                                checked={
                                                    form.customComments
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="h-4 w-4 accent-black"
                                            />

                                            Custom Comments
                                        </label>

                                        <label className="flex cursor-pointer items-center gap-2 text-xs text-dark-gray">
                                            <input
                                                type="checkbox"
                                                name="dripfeed"
                                                checked={
                                                    form.dripfeed
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="h-4 w-4 accent-black"
                                            />

                                            Dripfeed
                                        </label>

                                        <label className="flex cursor-pointer items-center gap-2 text-xs text-dark-gray">
                                            <input
                                                type="checkbox"
                                                name="cancel"
                                                checked={
                                                    form.cancel
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="h-4 w-4 accent-black"
                                            />

                                            Cancel
                                        </label>

                                        <label className="flex items-center gap-2 text-xs text-dark-gray">

                                            <span>
                                                Status
                                            </span>

                                            <select
                                                name="status"
                                                value={
                                                    form.status
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                className="h-8 rounded-md border border-light-azure bg-white px-2 text-xs outline-none focus:border-dark-blue"
                                            >
                                                <option value="active">
                                                    Active
                                                </option>

                                                <option value="inactive">
                                                    Inactive
                                                </option>
                                            </select>

                                        </label>

                                    </div>

                                </div>

                                {/* Refill */}

                                <div className="rounded-md border border-light-azure bg-white p-3">

                                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-dark-gray">

                                        <input
                                            type="checkbox"
                                            name="refillEnabled"
                                            checked={
                                                form.refillEnabled
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="h-4 w-4 accent-black"
                                        />

                                        Refill Available

                                    </label>

                                    {form.refillEnabled && (
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
                                            className="mt-3 h-9 w-full rounded-md border border-light-azure bg-white px-3 text-xs text-dark-gray outline-none focus:border-dark-blue"
                                        />
                                    )}

                                </div>

                                {/* Refund */}

                                <div className="rounded-md border border-light-azure bg-white p-3">

                                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-dark-gray">

                                        <input
                                            type="checkbox"
                                            name="refundEnabled"
                                            checked={
                                                form.refundEnabled
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="h-4 w-4 accent-black"
                                        />

                                        Refund Available

                                    </label>

                                    {form.refundEnabled && (
                                        <input
                                            type="text"
                                            name="refundDuration"
                                            value={
                                                form.refundDuration
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="e.g. 30 days"
                                            className="mt-3 h-9 w-full rounded-md border border-light-azure bg-white px-3 text-xs text-dark-gray outline-none focus:border-dark-blue"
                                        />
                                    )}

                                </div>

                            </div>

                            {/* Footer */}

                            <div className="sticky bottom-0 flex shrink-0 items-center justify-end gap-2 border-t border-light-azure bg-white px-4 py-3 sm:px-5">

                                <button
                                    type="button"
                                    onClick={
                                        closeModal
                                    }
                                    disabled={
                                        saving
                                    }
                                    className="rounded-md border border-light-azure bg-white px-4 py-2 text-xs font-medium text-dark-gray hover:border-dark-blue hover:text-dark-blue disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        saving
                                    }
                                    className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving
                                        ? "Saving..."
                                        : modalMode ===
                                            "edit"
                                            ? "Save Changes"
                                            : "Create Service"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </section>
    );
};

export default AdminServices;