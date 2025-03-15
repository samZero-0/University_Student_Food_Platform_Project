import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const FeaturedItems = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://platematebackend.vercel.app/featuredItems"
        );
        setFeaturedItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching featured items:", err);
        setError("Failed to load featured items. Please try again later.");
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50 flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50 text-center text-red-500">{error}</div>
    );
  }

  if (featuredItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Dishes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and special dishes selected just for you.
            These crowd favorites are sure to delight your taste buds.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          className="featured-swiper"
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {featuredItems.map((item) => (
            <SwiperSlide key={item._id}>
              <Link to={`/details/${item._id}`} className="block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.foodName}
                      className="w-full h-64 object-cover"
                    />

                    {item.discount > 0 && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        {item.discount}% OFF
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center">
                        <span className="bg-orange-500 text-white text-sm px-2 py-1 rounded-md flex items-center">
                          <FaStar className="mr-1" /> {item.rating}
                        </span>
                        <span className="ml-2 text-xs text-white bg-black/50 px-2 py-1 rounded-md">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.foodName}
                    </h3>

                    <div className="text-gray-600 mb-4 text-sm flex-grow">
                      By <span className="font-medium">{item.sellerName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {item.discount > 0 ? (
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-orange-600">
                              {calculateDiscountedPrice(item.price, item.discount)} Tk
                            </span>
                            <span className="ml-2 text-sm text-gray-400 line-through">
                              {item.price} Tk
                            </span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-orange-600">
                            {item.price} Tk
                          </span>
                        )}
                      </div>

                      <button className="bg-orange-100 hover:bg-orange-200 text-orange-600 p-2 rounded-full transition-colors">
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .featured-swiper {
          padding: 30px 50px;
        }

        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: #f97316;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        :global(.swiper-button-next:after),
        :global(.swiper-button-prev:after) {
          font-size: 18px;
        }

        :global(.swiper-pagination-bullet) {
          background: #f97316;
          opacity: 0.5;
        }

        :global(.swiper-pagination-bullet-active) {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default FeaturedItems;
