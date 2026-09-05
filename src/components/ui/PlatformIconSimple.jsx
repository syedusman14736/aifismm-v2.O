import { Check } from 'lucide-react';
import instagram from '/src/assets/images/instagram.png'
import tiktok from '/src/assets/images/tiktok.png'
import facebook from '/src/assets/images/facebook.png'

function PlatformIconSimple({ type }) {

    if (type === "instagram") {
        return (
            <div className="h-8 w-8">
                <img src={instagram} className='h-full' />
            </div>
        );
    }

    if (type === "tiktok") {
        return (
            <div className="h-8 w-8">
                <img src={tiktok} className='h-full' />
            </div>
        );
    }

    if (type === "facebook") {
        return (
            <div className="h-8 w-8">
                <img src={facebook} className='h-full' />
            </div>
        );
    }

    return (
        <div className="flex h-[18px] w-[18px] items-center justify-center rounded bg-black text-[11px] font-medium text-white">
            ♪
        </div>
    );
}

export default PlatformIconSimple