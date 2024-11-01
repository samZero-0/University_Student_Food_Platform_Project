
const Category = ({food}) => {

    const {category,foodName,price,image,sellerName,rating} =food;

    return (
        <div className="flex flex-col gap-3 w-10/12 border border-gray-300 rounded-xl transform transition-transform duration-300 hover:scale-105 ">
            
            <div className="w-full flex justify-center mt-5">
                <img src={image} alt="" className="w-2/3 object-cover h-[200px] rounded-lg"/>
            </div>

            <div className="w-full  flex justify-center">
                <span className="text-xl font-semibold">Name:{foodName}</span>
            </div>
            <div className="w-full  flex justify-center">
                <span className="text-lg text-gray-500">Price: {price} Tk.</span>
            </div>

            <div className="flex justify-center ">
                <span className="font-semibold">{sellerName}</span>
            </div>

            <div className="flex justify-center ">
                <span className="">Rating: {rating}</span>
            </div>

            <div className="flex justify-center mb-5">
            <button className="bg-primary p-2 text-center text-xl font-bold w-1/2 rounded-xl">Buy</button></div>

            
        </div>
    );
};

export default Category;