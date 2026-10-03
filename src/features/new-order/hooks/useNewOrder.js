import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useCurrency } from "../../../context/CurrencyContext";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:4040";

const API_BASE_URL = API_URL.endsWith("/api")
    ? API_URL
    : `${API_URL}/api`;

const useNewOrder = () => {
    const { updateUserBalance } =
        useAuthContext();

    const {
        convertFromUSD,
        formatCurrency,
        currency: selectedCurrency,
    } = useCurrency();

    // ==========================================
    // ORDER STATE
    // ==========================================

    const [order, setOrder] = useState({
        category: "",
        serviceId: "",
        link: "",
        quantity: "",
        comments: "",
    });

    // ==========================================
    // SERVICES STATE
    // ==========================================

    const [categories, setCategories] =
        useState([]);

    const [services, setServices] =
        useState([]);

    const [isLoadingServices, setIsLoadingServices] =
        useState(true);

    const [isPlacingOrder, setIsPlacingOrder] =
        useState(false);

    // ==========================================
    // FETCH SERVICES
    // ==========================================

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setIsLoadingServices(true);

                const token =
                    localStorage.getItem(
                        "aifi_token"
                    );

                if (!token) {
                    throw new Error(
                        "Authentication token not found."
                    );
                }

                const response =
                    await fetch(
                        `${API_BASE_URL}/user/services`,
                        {
                            method: "GET",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "application/json",
                            },
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.message ||
                        "Failed to fetch services."
                    );
                }

                setCategories(
                    Array.isArray(
                        data.categories
                    )
                        ? data.categories
                        : []
                );

                setServices(
                    Array.isArray(
                        data.services
                    )
                        ? data.services
                        : []
                );
            } catch (error) {
                console.error(
                    "Fetch services error:",
                    error
                );

                setCategories([]);
                setServices([]);
            } finally {
                setIsLoadingServices(false);
            }
        };

        fetchServices();
    }, []);

    // ==========================================
    // AVAILABLE CATEGORIES
    // ==========================================

    const availableCategories =
        useMemo(() => {
            return categories;
        }, [categories]);

    // ==========================================
    // AVAILABLE SERVICES
    // ==========================================
    //
    // Category is now populated:
    //
    // service.category = {
    //     _id,
    //     name,
    //     slug,
    //     status
    // }
    //
    // Therefore category matching is done
    // using Category ObjectId.
    // ==========================================

    const availableServices =
        useMemo(() => {
            if (!order.category) {
                return [];
            }

            const selectedCategory =
                order.category;

            const selectedCategoryId =
                selectedCategory?.category?._id
                    ? String(
                        selectedCategory.category._id
                    )
                    : null;

            const selectedPlatformId =
                selectedCategory?.platform?._id
                    ? String(
                        selectedCategory.platform._id
                    )
                    : null;

            if (!selectedCategoryId) {
                return [];
            }

            return services.filter(
                (service) => {
                    const serviceCategoryId =
                        service.category?._id
                            ? String(
                                service.category._id
                            )
                            : null;

                    const servicePlatformId =
                        service.platform?._id
                            ? String(
                                service.platform._id
                            )
                            : null;

                    const categoryMatches =
                        serviceCategoryId ===
                        selectedCategoryId;

                    const platformMatches =
                        selectedPlatformId
                            ? servicePlatformId ===
                            selectedPlatformId
                            : servicePlatformId === null;

                    return (
                        categoryMatches &&
                        platformMatches
                    );
                }
            );
        }, [
            services,
            order.category,
        ]);

    // ==========================================
    // SELECTED SERVICE
    // ==========================================

    const selectedService =
        useMemo(() => {
            if (!order.serviceId) {
                return null;
            }

            return (
                services.find(
                    (service) =>
                        String(
                            service.serviceId
                        ) ===
                        String(
                            order.serviceId
                        )
                ) || null
            );
        }, [
            services,
            order.serviceId,
        ]);

    // ==========================================
    // CUSTOM COMMENTS SERVICE
    // ==========================================
    //
    // Controlled directly from Service model.
    //
    // service.customComments === true
    // ==========================================

    const isCustomComments =
        selectedService?.customComments === true;

    // ==========================================
    // CUSTOM COMMENTS COUNT
    // ==========================================

    const commentCount = useMemo(() => {
        if (!isCustomComments) {
            return 0;
        }

        return order.comments
            .split(/\r?\n/)
            .map((comment) =>
                comment.trim()
            )
            .filter(Boolean)
            .length;
    }, [
        order.comments,
        isCustomComments,
    ]);

    // ==========================================
    // TOTAL PRICE
    // ==========================================

    const totalPrice = useMemo(() => {
        if (!selectedService) {
            return 0;
        }

        const quantity =
            isCustomComments
                ? commentCount
                : Number(order.quantity);

        const rate =
            Number(selectedService.rate);

        if (
            !Number.isFinite(quantity) ||
            !Number.isFinite(rate)
        ) {
            return 0;
        }

        return Number(
            (
                (quantity / 1000) *
                rate
            ).toFixed(8)
        );
    }, [
        selectedService,
        order.quantity,
        isCustomComments,
        commentCount,
    ]);

    // ==========================================
    // SELECT CATEGORY
    // ==========================================

    const selectCategory = (
        category
    ) => {
        setOrder((prev) => ({
            ...prev,
            category,
            serviceId: "",
            link: "",
            quantity: "",
            comments: "",
        }));
    };

    // ==========================================
    // SELECT SERVICE
    // ==========================================

    const selectService = (
        serviceId
    ) => {
        setOrder((prev) => ({
            ...prev,
            serviceId,
            link: "",
            quantity: "",
            comments: "",
        }));
    };

    // ==========================================
    // SET LINK
    // ==========================================

    const setLink = (link) => {
        setOrder((prev) => ({
            ...prev,
            link,
        }));
    };

    // ==========================================
    // SET QUANTITY
    // ==========================================

    const setQuantity = (
        quantity
    ) => {
        setOrder((prev) => ({
            ...prev,
            quantity,
        }));
    };

    // ==========================================
    // SET COMMENTS
    // ==========================================

    const setComments = (
        comments
    ) => {
        setOrder((prev) => ({
            ...prev,
            comments,
        }));
    };

    // ==========================================
    // VALIDATE ORDER
    // ==========================================

    const validateOrder = () => {
        if (!order.category) {
            return {
                valid: false,
                message:
                    "Please select a category.",
            };
        }

        if (!selectedService) {
            return {
                valid: false,
                message:
                    "Please select a service.",
            };
        }

        if (!order.link.trim()) {
            return {
                valid: false,
                message:
                    "Please enter a link.",
            };
        }

        // ======================================
        // CUSTOM COMMENTS
        // ======================================

        if (isCustomComments) {
            if (commentCount < 1) {
                return {
                    valid: false,
                    message:
                        "Please enter at least one comment.",
                };
            }

            const min =
                Number(
                    selectedService.min
                );

            const max =
                Number(
                    selectedService.max
                );

            if (commentCount < min) {
                return {
                    valid: false,
                    message:
                        `Minimum quantity is ${min}.`,
                };
            }

            if (commentCount > max) {
                return {
                    valid: false,
                    message:
                        `Maximum quantity is ${max}.`,
                };
            }

            return {
                valid: true,
            };
        }

        // ======================================
        // NORMAL QUANTITY
        // ======================================

        const quantity =
            Number(order.quantity);

        if (
            !Number.isInteger(quantity) ||
            quantity < 1
        ) {
            return {
                valid: false,
                message:
                    "Please enter a valid quantity.",
            };
        }

        const min =
            Number(
                selectedService.min
            );

        const max =
            Number(
                selectedService.max
            );

        if (quantity < min) {
            return {
                valid: false,
                message:
                    `Minimum quantity is ${min}.`,
            };
        }

        if (quantity > max) {
            return {
                valid: false,
                message:
                    `Maximum quantity is ${max}.`,
            };
        }

        return {
            valid: true,
        };
    };

    // ==========================================
    // PLACE ORDER
    // ==========================================

    const placeOrder = async () => {
        const validation =
            validateOrder();

        if (!validation.valid) {
            return {
                success: false,
                message:
                    validation.message,
            };
        }

        const token =
            localStorage.getItem(
                "aifi_token"
            );

        if (!token) {
            return {
                success: false,
                message:
                    "Please login again.",
            };
        }

        setIsPlacingOrder(true);

        try {
            // ======================================
            // NORMALIZE COMMENTS
            // ======================================

            const commentLines =
                isCustomComments
                    ? order.comments
                        .split(/\r?\n/)
                        .map((comment) =>
                            comment.trim()
                        )
                        .filter(Boolean)
                    : [];

            // ======================================
            // FINAL QUANTITY
            // ======================================

            const finalQuantity =
                isCustomComments
                    ? commentLines.length
                    : Number(order.quantity);

            // ======================================
            // API REQUEST
            // ======================================

            const response =
                await fetch(
                    `${API_BASE_URL}/orders`,
                    {
                        method: "POST",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify({
                                serviceId:
                                    selectedService.serviceId,

                                link:
                                    order.link.trim(),

                                quantity:
                                    finalQuantity,

                                comments:
                                    isCustomComments
                                        ? commentLines.join(
                                            "\n"
                                        )
                                        : null,
                            }),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message:
                        data?.message ||
                        "Unable to place order.",
                };
            }

            // ======================================
            // UPDATE BALANCE
            // ======================================

            if (
                data.balance !==
                undefined &&
                data.balance !== null
            ) {
                updateUserBalance(
                    data.balance
                );
            }

            return {
                success: true,

                message:
                    data.message ||
                    "Order placed successfully.",

                order:
                    data.order || null,

                balance:
                    data.balance,
            };
        } catch (error) {
            console.error(
                "Place order error:",
                error
            );

            return {
                success: false,
                message:
                    error.message ||
                    "Unable to place order.",
            };
        } finally {
            setIsPlacingOrder(false);
        }
    };

    // ==========================================
    // RESET ORDER
    // ==========================================

    const resetOrder = () => {
        setOrder({
            category: "",
            serviceId: "",
            link: "",
            quantity: "",
            comments: "",
        });
    };

    // ==========================================
    // CURRENCY DISPLAY
    // ==========================================

    const displayTotalPrice =
        useMemo(() => {
            return convertFromUSD(
                totalPrice
            );
        }, [
            totalPrice,
            convertFromUSD,
            selectedCurrency,
        ]);

    const formattedTotalPrice =
        useMemo(() => {
            return formatCurrency(
                totalPrice
            );
        }, [
            totalPrice,
            formatCurrency,
            selectedCurrency,
        ]);

    // ==========================================
    // RETURN
    // ==========================================

    return {
        order,

        category:
            order.category,

        serviceId:
            order.serviceId,

        link:
            order.link,

        quantity:
            isCustomComments
                ? commentCount
                : order.quantity,

        comments:
            order.comments,

        commentCount,

        isCustomComments,

        availableCategories,
        availableServices,
        selectedService,

        totalPrice,
        displayTotalPrice,
        formattedTotalPrice,

        isLoadingServices,
        isPlacingOrder,

        selectCategory,
        selectService,

        setLink,
        setQuantity,
        setComments,

        resetOrder,
        placeOrder,
    };
};

export default useNewOrder;