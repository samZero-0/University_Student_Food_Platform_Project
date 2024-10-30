import PropTypes from 'prop-types';
import { RiHomeHeartLine } from "react-icons/ri";

const features = [
    {
        title: "Support Local Cooks",
        description: "Try something new by supporting your next-door home-cook's delicious meals.",
        img: "../../../public/whytryuspic/homemade.jpeg",
    },
    {
        title: "Grandma's Recipes",
        description: "Relive childhood flavors made by skilled homecooks using time-tested family recipes.",
        img: "../../../public/whytryuspic/Homemade-Food.webp",
    },
    {
        title: "Inspected and Healthy",
        description: "Enjoy unique tastes safely with our regular food and kitchen inspections.",
        img: "../../../public/whytryuspic/homemade3.avif",
    },
];


const FeatureCard = ({ title, description, img }) => {
    return (
        <div className="bg-gray-50 shadow-lg rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 transform hover:shadow-2xl p-5 space-y-2 ">
            <img src={img} alt={title} className="h-64 w-96 mx-auto bg-cover rounded-lg mb-5" />
            <div className='flex justify-center'>
            <RiHomeHeartLine className='text-2xl mr-1 text-primary/80 ' /><h3 className="text-xl font-bold mb-3">{title}</h3>
            </div>
            <p className="text-gray-500 leading-relaxed">{description}</p>
            <button className='text-primary border-b-2 border-gray-700 border-dashed '>Learn More...</button>
        </div>
    );
};

const WhyTryUs = () => {
    return (
        <section className="my-20 w-11/12 mx-auto">
            <h2 className="text-3xl font-bold text-center  mb-10">Why Try PlateMate</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </section>
    );
};
FeatureCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default WhyTryUs;
