import { MdArrowOutward } from "react-icons/md";

const GreenButton = () => {
    return (
        <button className="bg-green-500 w-8 h-8 flex items-center justify-center rounded-full">
            <MdArrowOutward className="text-black text-xl" />
        </button>
    );
};

export default GreenButton;
