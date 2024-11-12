  const PromotionalBanner = () => {
    return (
      <div className="flex items-center justify-between bg-[#e9f9e9] p-3 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-10 motion-scale-in-[0.5] motion-translate-x-in-[-5%] motion-translate-y-in-[-89%] motion-opacity-in-[0%] motion-blur-in-[5px] motion-duration-[0.75s]/scale motion-duration-[0.64s]/translate motion-delay-[0.11s]/translate motion-duration-[0.76s]/opacity motion-duration-[0.79s]/blur">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 ">
            Get Discount Voucher <br /> <p className="motion-preset-typewriter-[20]">Up To 20%</p> 
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Get 20% discount on your first order. Only on Monday. 
          </p>
        </div>
        <div className="hidden md:block">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbMjAw46bXOWkCUPzrEGwmwC-1z-wsgfi1jw&s" 
            alt="Promotion"
            className="h-32 object-cover rounded-lg"
          />
        </div>
      </div>
    );
  };
  
  export default PromotionalBanner;
  