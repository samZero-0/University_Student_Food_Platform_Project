import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PromotionalCarousel = () => {
  const promotions = [
    {
      title: "Get Discount Voucher Up To 20%",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      background: "#ffb703",
      image: "https://example.com/image1.jpg" // replace with actual image URLs
    },
    {
      title: "Free Delivery for Orders Over $50",
      description: "Order now and enjoy free delivery on all orders over $50.",
      background: "#fcbf49",
      image: "https://example.com/image2.jpg"
    },
    {
      title: "Buy 1 Get 1 Free",
      description: "Limited time offer on selected items. Don’t miss out!",
      background: "#fb8500",
      image: "https://example.com/image3.jpg"
    }
  ];

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showIndicators={true}
      interval={5000}
      transitionTime={1000}
      className="w-full h-64 md:h-80 rounded-lg shadow-lg"
    >
      {promotions.map((promo, index) => (
        <div key={index} className="w-full h-full relative">
          <div
            className="w-full h-full flex items-center justify-center text-white p-10 rounded-lg"
            style={{
              backgroundColor: promo.background,
              backgroundImage: `url(${promo.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="text-center max-w-lg bg-opacity-75 bg-black p-5 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">{promo.title}</h2>
              <p className="text-sm md:text-base">{promo.description}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default PromotionalCarousel;
