import { UserRound, Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-light-blue flex items-center justify-center p-4">
            <div className="w-full max-w-md text-center">

                {/* Icon */}
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-dark-blue text-light-blue shadow-sm">
                    <UserRound size={30} strokeWidth={1.8} />
                </div>

                {/* Badge */}
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-light-azure bg-white px-4 py-1 text-xs md:text-[13px] font-medium text-dark-gray">
                    <Sparkles size={13} />
                    Profile Feature in development
                </div>

                {/* Heading */}
                {/* <h1 className="text-xl font-semibold text-dark-blue sm:text-2xl">
                    Profile
                </h1> */}

                {/* Description */}
                <p className="mx-auto mt-2 max-w-sm text-xs md:text-sm leading-5 text-dark-gray">
                    We’re working on something better for your profile.
                    This feature will be available soon.
                </p>

                {/* Coming Soon */}
                {/* <div className="mt-6 rounded-lg border border-light-azure bg-white px-5 py-4">
                    <p className="text-sm font-semibold text-dark-blue">
                        Coming Soon
                    </p>

                    <p className="mt-1 text-xs leading-4 text-dark-gray">
                        Profile settings and account management will be
                        available here.
                    </p>
                </div> */}

                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-md
                        bg-dark-blue
                        px-4
                        py-2
                        text-xs
                        font-medium
                        text-light-blue
                        transition
                        hover:opacity-90
                    "
                >
                    <ArrowLeft size={15} />
                    Back to Dashboard
                </button>

            </div>
        </div>
    );
}

export default Profile;