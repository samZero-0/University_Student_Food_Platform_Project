import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { CiCreditCard2 } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { BiDish } from "react-icons/bi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { Context } from "../../provider/Context";
import BkashPayment from "../bkashPayment";
import CardPayment from "./CardPayment";
import { AuthContext } from "../../provider/AuthProvider";


const ViewCartDetails = () => {
  const {
    carts,
    setSubtotal,
    setShipmentTotal,
    setModalContent,
    setModalVisible,
    isModalVisible,
    modalContent,
    updateItemQuantity
  } = useContext(Context);

  const { user } = useContext(AuthContext);
  const currentStage = "Pending Cook Confirmation";
  const deliveryFee = 100;

  // Calculate subtotal using individual item quantities
  const subtotal = carts?.length
    ? carts.reduce((total, item) => {
      const itemDiscountedPrice = item?.price - (item?.price * (item?.discount / 100));
      return total + itemDiscountedPrice * (item.quantity || 1);
    }, 0)
    : 0;

  useEffect(() => {
    setSubtotal(subtotal);
    const shipmentTotal = subtotal + deliveryFee;
    setShipmentTotal(shipmentTotal);
  }, [subtotal, setSubtotal, setShipmentTotal]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const openModal = (method) => {
    setModalContent(method);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6" data-aos="fade-up" >
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>
        {/* Order Progress Tracker */}
        <div className="flex justify-center flex-wrap items-center mb-8 gap-4 md:gap-8    " data-aos="zoom-in-up" data-aos-easing="linear"
          data-aos-duration="1500">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-2xl text-green-500" />
            <span className="text-sm font-semibold">Order Placed</span>
          </div>
          {/* BarLoader for stage tracking */}
          <BarLoader
            color={
              currentStage === "Pending Cook Confirmation" ||
                currentStage === "Cook Preparing" ||
                currentStage === "Pending Delivery"
                ? "#36D7B7"
                : "#D1D5DB"
            }
            width={60}
            height={4}
            loading
          />
          <div className="flex items-center gap-2">
            <BiDish
              className={`text-2xl ${currentStage === "Pending Cook Confirmation" ||
                currentStage === "Cook Preparing" ||
                currentStage === "Pending Delivery"
                ? "text-green-500"
                : "text-gray-400"
                }`}
            />
            <span
              className={`text-sm font-semibold ${currentStage === "Pending Cook Confirmation" ||
                currentStage === "Cook Preparing" ||
                currentStage === "Pending Delivery"
                ? "text-green-500"
                : "text-gray-400"
                }`}
            >
              Pending Cook Confirmation
            </span>
          </div>
          <BarLoader
            color={
              currentStage === "Cook Preparing" ||
                currentStage === "Pending Delivery"
                ? "#36D7B7"
                : "#D1D5DB"
            }
            width={60}
            height={4}
            loading
          />
          <div className="flex items-center gap-2">
            <FiCheck
              className={`text-2xl ${currentStage === "Cook Preparing" ||
                currentStage === "Pending Delivery"
                ? "text-green-500"
                : "text-gray-400"
                }`}
            />
            <span
              className={`text-sm font-semibold ${currentStage === "Cook Preparing" ||
                currentStage === "Pending Delivery"
                ? "text-green-500"
                : "text-gray-400"
                }`}
            >
              Cook Preparing
            </span>
          </div>

          <BarLoader
            color={currentStage === "Pending Delivery" ? "#36D7B7" : "#D1D5DB"}
            width={60}
            height={4}
            loading
          />

          <div className="flex items-center gap-2">
            <MdOutlineDeliveryDining
              className={`text-2xl ${currentStage === "Pending Delivery"
                ? "text-green-500"
                : "text-gray-400"
                }`}
            />
            <span
              className={`text-sm font-semibold ${currentStage === "Pending Delivery"
                ? "text-green-500"
                : "text-gray-400"
                }`}
            >
              Pending Delivery
            </span>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Summary Card */}
          <div className="bg-white shadow-xl rounded-lg">
            <div className="mb-4 bg-accent p-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <p className="text-sm text-gray-500">Order Number: #123456</p>
              <p className="text-sm text-gray-500">Placed on: {new Date().toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Delivery Address: House 123, Road 12, Dhaka</p>
            </div>

            <div className="mt-4 p-2">
              {carts?.map((item, index) => (
                <div key={index} className="flex justify-between border-b py-2">
                  <span><img src={item.image} className="w-16 h-12 rounded-md" alt="" /></span>
                  <div className="flex flex-col items-center">
                    <span>{item.foodName || item.mealName}</span>
                    {/* Add quantity controls from new design */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        className="btn btn-xs btn-circle btn-outline"
                        onClick={() => updateItemQuantity(index, (item.quantity || 1) - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        className="btn btn-xs btn-circle btn-outline"
                        onClick={() => updateItemQuantity(index, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span>৳{((item.price - (item.price * (item.discount / 100))) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between border-b py-2">
                <span>Delivery Fee</span>
                <span>৳{deliveryFee}</span>
              </div>
            </div>
            <div className="flex justify-between mt-4 p-2 font-semibold">
              <span>Total</span>
              <span>৳{(subtotal + deliveryFee).toFixed(2)}</span>
            </div>
          </div>

          {/* Order Details Card - Previous Design */}
          <div className="bg-white shadow-xl rounded-lg">
            <div className="mb-4 bg-accent p-6">
              <h2 className="text-xl font-semibold mb-4">Bill Payment</h2>
              <p className="text-sm text-gray-500">Order Number: #123456</p>
              
              <p className="text-sm text-gray-500">Placed on: {new Date().toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Delivery Address: House 123, Road 12, Dhaka</p>
              
            </div>

            {carts?.map((item, index) => (
              <div key={index} className="py-2 p-6">
                <p className="font-medium">
                  {item?.foodName || item?.mealName} ({item.quantity || 1} Piece{(item.quantity || 1) > 1 ? "s" : ""})
                </p>
              </div>
            ))}

            {/* Rest of the previous design structure */}
            <p className="text-sm border-b-2 py-1 px-6 text-gray-500">
              Delivery: {new Date(Date.now() + 86400000).toLocaleDateString()}
            </p>

            <div className="flex justify-between mt-4 px-6">
              <span>Subtotal</span>
              <span>৳{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-6">
              <span>Delivery Fee</span>
              <span>৳{deliveryFee}</span>
            </div>
            <div className="flex justify-between mt-4 font-semibold px-6">
              <span>Total</span>
              <span>৳{(subtotal + deliveryFee).toFixed(2)}</span>
            </div>

            {/* Payment Options */}
            <h3 className="text-lg font-medium mt-6 px-6">Do You Want to Pay Now?</h3>

            {user && user.email ? (
              <div className="mt-2 px-6 flex gap-4">
                <button
                  className="btn btn-outline btn-error w-1/2 flex items-center gap-2"
                  onClick={() => openModal("bKash")}
                >
                  <img src="/BKash.png" className="md:h-[30px] h-[12px] md:w-[30px] w-[12px] inline-block" alt="bKash" />
                  <p>Pay with bKash</p>
                </button>

                <button
                  className="btn btn-outline w-1/2 flex gap-2 items-center"
                  onClick={() => openModal("Card")}
                >
                  <CiCreditCard2 className="md:text-xl text-sm" />
                  Pay with Card
                </button>
              </div>
            ) : (
              <div className="py-5 ml-5 w-11/12">
                <Link to='/checkout'>
                  <button className="btn btn-outline w-full">Checkout</button>
                </Link>
              </div>
            )}

            <div className="text-center mt-4 p-6">
              <Link to='/'><button className="btn btn-outline btn-accent w-full">Cancel Shipment</button></Link>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalVisible && (
          <>
            {modalContent === "bKash" && <BkashPayment closeModal={closeModal} />}
            {modalContent === "Card" && <CardPayment closeModal={closeModal} />}
          </>
        )}

        <div className="text-center mt-8">
          <Link to="/categories" className="btn text-white rounded-3xl btn-neutral text-lg px-8">
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCartDetails;
