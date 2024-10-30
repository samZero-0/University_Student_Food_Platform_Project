

const FeaturedItems = () => {
    

    return (

        <div className="md:w-11/12 md:mx-auto  mt-28 mb-5"> 

        <div className="flex flex-col items-center"> 
            <span className="text-4xl font-bold mt-10 mb-10">Featured Items</span>
            <span className="text-xl text-gray-600  mb-10 text-center w-2/3">Discover delicious and budget-friendly meals made by students, for students! Whether you are looking for a quick snack, a wholesome meal, or something sweet, our featured items showcase the best food deals on campus.</span>
        </div>



            {/* carousel */}

       <div className="flex justify-center">
<div className="carousel w-1/2 ">
  <div id="slide1" className="carousel-item relative w-full flex flex-col gap-2">
    <img
      src="/public/slide-1.jpg"
      className="w-full h-[550px] object-cover" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
    <div className="text-center mt-5 mb-10 ">
        <span className="text-2xl font-semibold ">Breakfast</span>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full flex flex-col gap-2">
    <img
      src="/public/slide2.jpg"
      className="w-full h-[550px] object-cover" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
    <div className="text-center mt-5 mb-10 ">
        <span className="text-2xl font-semibold ">Salad</span>
    </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full flex flex-col gap-2">
    <img
      src="/public/slide3.jpg"
      className="w-full h-[550px] object-cover" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
    <div className="text-center mt-5 mb-10 ">
        <span className="text-2xl font-semibold ">Noodles</span>
    </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full flex flex-col gap-2">
    <img
      src="/public/slide4.jpg"
      className="w-full h-[550px] object-cover" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
    <div className="text-center mt-5 mb-10 ">
        <span className="text-2xl font-semibold ">Biryani</span>
    </div>
  </div>
</div>


</div>
<div className="flex w-full justify-center gap-2 py-2">
  <a href="#slide1" className="btn btn-xs">1</a>
  <a href="#slide2" className="btn btn-xs">2</a>
  <a href="#slide3" className="btn btn-xs">3</a>
  <a href="#slide4" className="btn btn-xs">4</a>
</div>
        </div>
    );
};

export default FeaturedItems;