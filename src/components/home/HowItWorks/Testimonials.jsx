/* eslint-disable react/prop-types */
import Marquee from 'react-fast-marquee'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "John D.",
    image: "https://i.pravatar.cc/100?img=1",
    feedback: "I ordered the vegan curry and it was absolutely delicious! The flavors were so rich and the portion was generous.",
    rating: 5,
    subject: "Vegan Curry",
    improvement: "Will definitely order again!",
  },
  {
    name: "Sophia L.",
    image: "https://i.pravatar.cc/100?img=2",
    feedback: "The chicken parmesan sandwich was crispy and juicy, and the pasta salad was a nice touch.",
    rating: 5,
    subject: "Chicken Parmesan Sandwich",
    improvement: "Will definitely order again!",
  },
  {
    name: "Emily R.",
    image: "https://i.pravatar.cc/100?img=3",
    feedback: "I ordered the veggie burger and it was so good! The patty was flavorful and the bun was soft.",
    rating: 4.5,
    subject: "Veggie Burger",
    improvement: "Will definitely order again!",
  },
  {
    name: "Michael K.",
    image: "https://i.pravatar.cc/100?img=4",
    feedback: "The pizza was hot and fresh, and the service was quick and friendly.",
    rating: 5,
    subject: "Pizza",
    improvement: "Will definitely order again!",
  },
  {
    name: "Olivia P.",
    image: "https://i.pravatar.cc/100?img=5",
    feedback: "The fries were crispy and salty, and the chicken tenders were juicy and flavorful.",
    rating: 4.5,
    subject: "Fries and Chicken Tenders",
    improvement: "Will definitely order again!",
  },
  {
    name: "Ethan S.",
    image: "https://i.pravatar.cc/100?img=6",
    feedback: "The salad was fresh and the dressing was delicious.",
    rating: 5,
    subject: "Salad",
    improvement: "Will definitely order again!",
  },
  {
    name: "Ava M.",
    image: "https://i.pravatar.cc/100?img=7",
    feedback: "The soup was hot and flavorful, and the service was quick and friendly.",
    rating: 4.5,
    subject: "Soup",
    improvement: "Will definitely order again!",
  },
  {
    name: "Noah B.",
    image: "https://i.pravatar.cc/100?img=8",
    feedback: "The sandwich was fresh and the service was quick and friendly.",
    rating: 5,
    subject: "Sandwich",
    improvement: "Will definitely order again!",
  },
  {
    name: "Mia L.",
    image: "https://i.pravatar.cc/100?img=9",
    feedback: "The pasta was cooked al dente and the sauce was flavorful.",
    rating: 4.5,
    subject: "Pasta",
    improvement: "Will definitely order again!",
  },
  {
    name: "James C.",
    image: "https://i.pravatar.cc/100?img=10",
    feedback: "The pizza was hot and fresh, and the service was quick and friendly.",
    rating: 4.5,
    subject: "Pizza",
    improvement: "Will definitely order again!",
  },
  {
    name: "Liam H.",
    image: "https://i.pravatar.cc/100?img=11",
    feedback: "The fries were crispy and salty, and the chicken tenders were juicy and flavorful.",
    rating: 4.5,
    subject: "Fries and Chicken Tenders",
    improvement: "Will definitely order again!",
  },
  {
    name: "Ella G.",
    image: "https://i.pravatar.cc/100?img=12",
    feedback: "The salad was fresh and the dressing was delicious.",
    rating: 4.5,
    subject: "Salad",
    improvement: "Will definitely order again!",
  },
  {
    name: "William S.",
    image: "https://i.pravatar.cc/100?img=13",
    feedback: "The soup was hot and flavorful, and the service was quick and friendly.",
    rating: 4.5,
    subject: "Soup",
    improvement: "Will definitely order again!",
  }
]

const TestimonialCard = ({ testimonial }) => (
  <div className="card w-80 bg-primary/20 shadow-md m-4">
    <div className="card-body p-4">
      <div className="flex items-center mb-2">
        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
        <div className="ml-3">
          <h2 className="font-semibold">{testimonial.name}</h2>
          <p className="text-sm text-primary">{testimonial.subject}</p>
        </div>
      </div>
      <p className="text-sm mb-2">{testimonial.feedback}</p>
      <div className="flex items-center justify-between">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(testimonial.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-primary">{testimonial.improvement}</span>
      </div>
    </div>
  </div>
)

const Testimonials = () => {
  return (
    <div className=" py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Customars Say</h2>
        <Marquee gradient={false} speed={120}   pauseOnClick >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </Marquee>
       
      </div>
    </div>
  )
}

export default Testimonials