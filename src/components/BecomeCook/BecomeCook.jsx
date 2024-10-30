import { Link } from "react-router-dom";

const BecomeCook = () => {
    return (
        <div className="md:w-11/12 md:mx-auto mt-28 mb-5">

            <div
                style={{
                    backgroundImage: `url('/public/join.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '600px',
                    position: 'relative',
                }}
            >
                <div className="flex flex-col items-center justify-center gap-4"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >

                    <span className="text-white text-4xl font-bold">Join Today</span>
                    <span className=" text-xl text-gray-300">Share your love of Homecooked meals</span>
                   <Link to="/joinAsCook"><button className="bg-primary p-3 rounded-xl font-bold">Register Now</button></Link> 

                </div>

                
            </div>
        </div>
    );
};

export default BecomeCook;
