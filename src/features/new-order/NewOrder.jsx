
import { ShoppingCart } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Topbar from '../../components/layout/Topbar'
import Summary from '../../components/layout/Summary'
import Steps from '../../components/ui/Steps'
import Categories from './components/steps/Categories'
import Platforms from './components/steps/Platforms'
import Services from './components/steps/Services'
import Details from './components/steps/Details'
import useNewOrder from './hooks/useNewOrder'
import { useState } from "react";
function NewOrder() {

    const {
        category,
        platform,

        serviceType,
        service,

        link,
        quantity,

        availableServiceTypes,
        filteredServices,

        selectedService,
        totalPrice,

        selectCategory,
        selectPlatform,
        selectServiceType,
        selectService,

        setLink,
        setQuantity,

        isPlacingOrder,
        placeOrder,
        resetOrder,
    } = useNewOrder();

    const [showSuccess, setShowSuccess] = useState(false);
    const [orderResult, setOrderResult] = useState(null);
    const [error, setError] = useState("");

    return (
        <>
            <div className="flex h-screen w-full overflow-hidden">
                <Sidebar />
                <div className="h-full flex min-w-0 flex-1 flex-col justify-between">
                    <Topbar />
                    <main className="relative flex flex-col hide-scrollbar h-full overflow-y-auto  px-4">
                        <div className='grid grid-cols-[2fr_1fr] gap-2 flex-1'>
                            <div className='border-l border-r border-[#e5e7eb]'>
                                <div className="border-b border-[#e5e7eb] px-4 py-5">

                                    <div className="">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#ffb27a] bg-[#fff7f1] text-[#fa6c0a]">
                                                <ShoppingCart size={19} />
                                            </div>

                                            <div>
                                                <h2 className="text-[16px] font-medium text-[#252525]">
                                                    Create New Order
                                                </h2>

                                                <p className="text-xs text-[#777b80]">
                                                    Choose your service and place your order
                                                </p>
                                            </div>

                                        </div>

                                        {/* <Button title="Reset" /> */}

                                    </div>

                                </div>

                                {/* <div className='border-b border-[#e5e7eb] '>
                                    <Steps />
                                </div> */}

                                <div>
                                    <Categories
                                        selectedCategory={category}
                                        onSelectCategory={selectCategory}
                                    />
                                </div>

                                <div>
                                    <Platforms
                                        selectedPlatform={platform}
                                        onSelectPlatform={selectPlatform}
                                    />
                                </div>

                                <div>
                                    <Services
                                        availableServiceTypes={availableServiceTypes}
                                        filteredServices={filteredServices}
                                        selectedType={serviceType}
                                        selectedServiceId={service}
                                        selectedService={selectedService}
                                        onSelectType={selectServiceType}
                                        onSelectService={selectService}
                                    />
                                </div>

                                <div>
                                    <Details
                                        link={link}
                                        quantity={quantity}

                                        onLinkChange={setLink}
                                        onQuantityChange={setQuantity}

                                        selectedService={selectedService}
                                    />

                                </div>

                            </div>
                            <div className='sticky top-0 self-start'>
                                <Summary
                                    category={category}
                                    platform={platform}
                                    selectedService={selectedService}
                                    link={link}
                                    quantity={quantity}
                                    totalPrice={totalPrice}
                                    isPlacingOrder={isPlacingOrder}
                                    onPlaceOrder={async () => {
                                        setError("");

                                        const result = await placeOrder();

                                        if (!result.success) {
                                            setError(result.message);
                                            return;
                                        }

                                        setOrderResult(result.order);
                                        resetOrder();
                                        setShowSuccess(true);
                                    }}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fff5] text-[#21a366]">
                            ✓
                        </div>

                        <h2 className="mt-4 text-center text-lg font-semibold text-[#252525]">
                            Order Placed Successfully
                        </h2>

                        <p className="mt-1 text-center text-sm text-[#777b80]">
                            Your order has been submitted successfully.
                        </p>

                        {orderResult && (
                            <div className="mt-5 rounded-md border border-[#e5e7eb] bg-[#fafafa] p-4">

                                <div className="flex justify-between text-sm">
                                    <span className="text-[#777b80]">
                                        Service
                                    </span>
                                    <span className="font-medium text-[#252525]">
                                        {orderResult.serviceName}
                                    </span>
                                </div>

                                <div className="mt-2 flex justify-between text-sm">
                                    <span className="text-[#777b80]">
                                        Quantity
                                    </span>
                                    <span className="font-medium text-[#252525]">
                                        {orderResult.quantity.toLocaleString()}
                                    </span>
                                </div>

                                <div className="mt-2 flex justify-between text-sm">
                                    <span className="text-[#777b80]">
                                        Charge
                                    </span>
                                    <span className="font-semibold text-[#fa6c0a]">
                                        PKR {orderResult.total.toFixed(2)}
                                    </span>
                                </div>

                            </div>
                        )}

                        <button
                            onClick={() => {
                                setShowSuccess(false);
                                setOrderResult(null);
                            }}
                            className="mt-5 h-11 w-full rounded-md bg-[#fa6c0a] text-sm font-semibold text-white hover:bg-[#e96100]"
                        >
                            Done
                        </button>

                    </div>

                </div>
            )}
        </>
    )
}

export default NewOrder