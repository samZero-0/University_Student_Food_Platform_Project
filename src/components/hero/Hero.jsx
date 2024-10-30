import GreenButton from "./GreenButton";
const Hero = () => {
    return (
        <section className="mt-2">
            <div
                className="hero h-[89vh]"
                style={{
                    backgroundImage: "url('../Project Cover1.jpeg')",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="">
                        <h1 className="mb-5 md:text-5xl text-xl font-bold text-gray-50">Taste the Joy of Sharing</h1>
                        <p className="mb-5 text-sm md:text-lg md:w-2/3 mx-auto text-gray-300">
                         Connect with Food Lovers & Share Culinary Experiences.  Explore Local Flavors, Build Community, and Savor Every Bite Together
                        </p>
                        <button className="btn border-none text-base font-bold bg-primary ">Explore Now <GreenButton /> </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;