import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const testimonials = [
    {
        name: "Jessica Devis",
        role: "Food Critic",
        company: "Gourmet Digest",
        review: "The home-cooked meals are fantastic! It feels like a taste of tradition with every bite.",
        rating: 4,
        img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
        name: "Linde Michel",
        role: "Culinary Blogger",
        company: "Foodie World",
        review: "Incredible flavors and authentic recipes that remind me of my childhood!",
        rating: 5,
        img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
        name: "Misha Stam",
        role: "Local Diner",
        company: "Apple Inc.",
        review: "The food is fresh and delicious. Truly a comforting experience to enjoy homemade meals.",
        rating: 4,
        img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
];

const TestimonialCard = ({ name, role, company, review, rating, img }) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
            <img src={img} alt={name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-lg font-semibold ">{name}</h3>
            <p className="text-sm text-gray-600">{role} @ {company}</p>
            <p className="mt-4 text-gray-700 italic">{review}</p>
            <div className="mt-4 flex justify-center">
                {[...Array(5)].map((_, index) => (
                    <FaStar 
                        key={index} 
                        className={index < rating ? 'text-yellow-400' : 'text-gray-300'} 
                    />
                ))}
            </div>
        </div>
    );
};


const Testimonials = () => {
    return (
        <section className="my-20 w-11/12 mx-auto text-center ">
            <h2 className="text-3xl font-bold  mb-5">What Our Customers Say</h2>
            <p className="text-gray-600 mb-10">Discover the experiences of those who’ve tasted our homemade meals.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                ))}
            </div>
        </section>
    );
};

TestimonialCard.propTypes = {
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
};

export default Testimonials;
