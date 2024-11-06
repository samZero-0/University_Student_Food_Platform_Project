import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const FeaturedItems = () => {
  return (
    <div className="md:w-10/12 lg:w-8/12 mx-auto mt-20 mb-5">
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold mt-10 mb-5">Featured Items</span>
        <span className="text-gray-500 mb-8 text-center w-10/12">
          Discover delicious and budget-friendly meals made by students, for students!
        </span>
      </div>

      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        interval={3000}
        className="max-w-full"
      >
        <div className="relative h-[400px] md:h-[450px] overflow-hidden rounded-lg">
          <img src="/slide-1.jpg" className="w-full h-full object-cover" alt="Breakfast" />
          <div className="absolute bottom-5 left-5 text-white">
            <span className="text-2xl font-semibold">Breakfast</span>
          </div>
        </div>
        <div className="relative h-[400px] md:h-[450px] overflow-hidden rounded-lg">
          <img src="/slide2.jpg" className="h-full object-cover" alt="Salad" />
          <div className="absolute bottom-5 left-5 text-white">
            <span className="text-2xl font-semibold">Salad</span>
          </div>
        </div>
        <div className="relative h-[400px] md:h-[450px] overflow-hidden rounded-lg">
          <img src="/slide3.jpg" className="w-full h-full object-cover" alt="Noodles" />
          <div className="absolute bottom-5 left-5 text-white">
            <span className="text-2xl font-semibold">Noodles</span>
          </div>
        </div>
        <div className="relative h-[400px] md:h-[450px] overflow-hidden rounded-lg">
          <img src="/slide4.jpg" className="w-full h-full object-cover" alt="Biryani" />
          <div className="absolute bottom-5 left-5 text-white">
            <span className="text-2xl font-semibold">Biryani</span>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturedItems;
