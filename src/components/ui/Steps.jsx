import { useState } from 'react';
import Step from './Step'
import StepLine from './StepLine'
import { Check, ClipboardList, Grid2X2, Layers3, LinkIcon } from 'lucide-react'

function Steps() {
    const services = [
        {
            id: 1,
            platform: "instagram",
            category: "cheap",
            name: "Instagram Followers",
            type: "Followers",
            rate: 20,
            min: 100,
            max: 100000,
            speed: "0-6 Hours",
            drop: "Low",
            refill: "No",
            quality: "Good",
        },
        {
            id: 2,
            platform: "instagram",
            category: "cheap",
            name: "Instagram Likes",
            type: "Likes",
            rate: 15,
            min: 100,
            max: 50000,
            speed: "0-4 Hours",
            drop: "Low",
            refill: "No",
            quality: "Good",
        },
        {
            id: 3,
            platform: "instagram",
            category: "cheap",
            name: "Instagram Views",
            type: "Views",
            rate: 5,
            min: 100,
            max: 1000000,
            speed: "0-2 Hours",
            drop: "Very Low",
            refill: "No",
            quality: "Good",
        },
        {
            id: 4,
            platform: "instagram",
            category: "guaranteed",
            name: "Instagram Followers",
            type: "Followers",
            rate: 45,
            min: 100,
            max: 100000,
            speed: "0-12 Hours",
            drop: "Very Low",
            refill: "30 Days",
            quality: "High",
        },
        {
            id: 5,
            platform: "instagram",
            category: "refill",
            name: "Instagram Followers",
            type: "Followers",
            rate: 60,
            min: 100,
            max: 100000,
            speed: "0-12 Hours",
            drop: "Low",
            refill: "30 Days",
            quality: "Premium",
        },

        {
            id: 6,
            platform: "tiktok",
            category: "cheap",
            name: "TikTok Followers",
            type: "Followers",
            rate: 25,
            min: 100,
            max: 100000,
            speed: "0-6 Hours",
            drop: "Low",
            refill: "No",
            quality: "Good",
        },
        {
            id: 7,
            platform: "tiktok",
            category: "cheap",
            name: "TikTok Likes",
            type: "Likes",
            rate: 10,
            min: 100,
            max: 50000,
            speed: "0-4 Hours",
            drop: "Low",
            refill: "No",
            quality: "Good",
        },
        {
            id: 8,
            platform: "tiktok",
            category: "cheap",
            name: "TikTok Views",
            type: "Views",
            rate: 3,
            min: 100,
            max: 1000000,
            speed: "0-2 Hours",
            drop: "Low",
            refill: "No",
            quality: "Good",
        },

        {
            id: 9,
            platform: "youtube",
            category: "cheap",
            name: "YouTube Views",
            type: "Views",
            rate: 30,
            min: 100,
            max: 1000000,
            speed: "0-12 Hours",
            drop: "Low",
            refill: "No",
            quality: "Good",
        },
        {
            id: 10,
            platform: "youtube",
            category: "cheap",
            name: "YouTube Likes",
            type: "Likes",
            rate: 40,
            min: 100,
            max: 50000,
            speed: "0-12 Hours",
            drop: "Low",
            refill: "No",
            quality: "Good",
        },

        {
            id: 11,
            platform: "facebook",
            category: "cheap",
            name: "Facebook Followers",
            type: "Followers",
            rate: 20,
            min: 100,
            max: 100000,
            speed: "0-6 Hours",
            drop: "Low",
            refill: "No",
            quality: "Good",
        },
        {
            id: 12,
            platform: "facebook",
            category: "cheap",
            name: "Facebook Likes",
            type: "Likes",
            rate: 15,
            min: 100,
            max: 50000,
            speed: "0-6 Hours",
            drop: "Low",
            refill: "No",
            quality: "Good",
        },
    ];


    const [serviceCategory, setServiceCategory] = useState("cheap");
    const [platform, setPlatform] = useState("");
    const [service, setService] = useState("");
    const [link, setLink] = useState("");
    const [quantity, setQuantity] = useState("");
    const selectedService = services.find(
        (item) => String(item.id) === String(service)
    );
    return (
        <div className="pt-6 pb-6 max-w-[85%] mx-auto grid grid-cols-1 gap-5 ">
            <div className="min-w-0">
                <div className=" flex items-start">

                    <Step
                        number="1"
                        icon={<Grid2X2 size={16} />}
                        title="Category"
                        active
                    />

                    <StepLine />

                    <Step
                        number="2"
                        icon={<LinkIcon size={16} />}
                        title="Platform"
                        active={!!platform}
                    />

                    <StepLine />

                    <Step
                        number="3"
                        icon={<Layers3 size={16} />}
                        title="Service"
                        active={!!service}
                    />

                    <StepLine />

                    <Step
                        number="4"
                        icon={<ClipboardList size={16} />}
                        title="Details"
                        active={!!link && !!quantity}
                    />

                    <StepLine />

                    <Step
                        number="5"
                        icon={<Check size={16} />}
                        title="Confirm"
                        active={!!selectedService && !!link && !!quantity}
                    />

                </div>
            </div>
        </div>
    )
}

export default Steps