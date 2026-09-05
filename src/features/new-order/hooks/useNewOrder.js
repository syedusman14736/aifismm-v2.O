import { useMemo, useState } from "react";
import { SERVICES } from "../data/services";

const INITIAL_ORDER = {
    category: null,
    platform: null,
    serviceType: null,
    service: null,
    link: "",
    quantity: "",
};

export default function useNewOrder() {

    const [order, setOrder] = useState(INITIAL_ORDER);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // CATEGORY
    const selectCategory = (category) => {
        setOrder((prev) => ({
            ...prev,
            category,
            platform: null,
            serviceType: null,
            service: null,
        }));
    };

    // PLATFORM
    const selectPlatform = (platform) => {
        setOrder((prev) => ({
            ...prev,
            platform,
            serviceType: null,
            service: null,
        }));
    };

    // SERVICE TYPE
    const selectServiceType = (serviceType) => {
        setOrder((prev) => ({
            ...prev,
            serviceType,
            service: null,
        }));
    };

    // SERVICE
    const selectService = (serviceId) => {
        setOrder((prev) => ({
            ...prev,
            service: serviceId,
        }));
    };

    // LINK
    const setLink = (link) => {
        setOrder((prev) => ({
            ...prev,
            link,
        }));
    };

    // QUANTITY
    const setQuantity = (quantity) => {
        setOrder((prev) => ({
            ...prev,
            quantity,
        }));
    };

    // AVAILABLE SERVICES
    const availableServices = useMemo(() => {
        if (!order.category || !order.platform) {
            return [];
        }

        return SERVICES.filter(
            (service) =>
                service.category === order.category &&
                service.platform === order.platform
        );
    }, [order.category, order.platform]);

    // AVAILABLE SERVICE TYPES
    const availableServiceTypes = useMemo(() => {
        return [
            ...new Set(
                availableServices.map(
                    (service) => service.type
                )
            ),
        ];
    }, [availableServices]);

    // FILTERED SERVICES
    const filteredServices = useMemo(() => {
        if (!order.serviceType) {
            return [];
        }

        return availableServices.filter(
            (service) =>
                service.type === order.serviceType
        );
    }, [availableServices, order.serviceType]);

    // SELECTED SERVICE
    const selectedService = useMemo(() => {
        if (!order.service) {
            return null;
        }

        return (
            SERVICES.find(
                (service) => service.id === order.service
            ) || null
        );
    }, [order.service]);

    // TOTAL PRICE
    const totalPrice = useMemo(() => {
        if (!selectedService || !order.quantity) {
            return 0;
        }

        const quantity = Number(order.quantity);

        if (Number.isNaN(quantity) || quantity <= 0) {
            return 0;
        }

        return (quantity / 1000) * selectedService.rate;
    }, [selectedService, order.quantity]);

    // PLACE ORDER
    const placeOrder = async () => {

        // VALIDATION
        if (!order.category) {
            return {
                success: false,
                message: "Please select a category.",
            };
        }

        if (!order.platform) {
            return {
                success: false,
                message: "Please select a platform.",
            };
        }

        if (!selectedService) {
            return {
                success: false,
                message: "Please select a service.",
            };
        }

        if (!order.link.trim()) {
            return {
                success: false,
                message: "Please enter a link.",
            };
        }

        const quantity = Number(order.quantity);

        if (!quantity) {
            return {
                success: false,
                message: "Please enter a quantity.",
            };
        }

        if (
            quantity < selectedService.min ||
            quantity > selectedService.max
        ) {
            return {
                success: false,
                message: `Quantity must be between ${selectedService.min} and ${selectedService.max}.`,
            };
        }

        // ORDER OBJECT
        const orderData = {
            category: order.category,
            platform: order.platform,
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            link: order.link.trim(),
            quantity,
            rate: selectedService.rate,
            total: totalPrice,
        };

        console.log("Order Data:", orderData);

        // LOADING
        setIsPlacingOrder(true);

        // TEMPORARY BACKEND RESPONSE
        await new Promise((resolve) =>
            setTimeout(resolve, 1500)
        );

        setIsPlacingOrder(false);

        // TEMPORARY SUCCESS
        return {
            success: true,
            message: "Your order has been placed successfully.",
            order: orderData,
        };
    };

    // RESET
    const resetOrder = () => {
        setOrder(INITIAL_ORDER);
    };

    return {
        order,

        category: order.category,
        platform: order.platform,
        serviceType: order.serviceType,
        service: order.service,
        link: order.link,
        quantity: order.quantity,

        availableServices,
        availableServiceTypes,
        filteredServices,

        selectedService,
        totalPrice,

        isPlacingOrder,

        selectCategory,
        selectPlatform,
        selectServiceType,
        selectService,
        setLink,
        setQuantity,

        placeOrder,
        resetOrder,
    };
}