import { useState } from "react";
import { Context } from "./Context";
import PropTypes from "prop-types";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'


const ContexProvider = ({children}) => {
    useEffect(() => {
        AOS.init({
          duration: 1000,  
        });
        
        return () => {
          AOS.refresh();
        };
      }, []);

    
    // here will go states or data variables
    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [subtotal,setSubtotal] =useState(0);
    const [shipmentTotal,setShipmentTotal] =useState(0);

    const checkoutComplete = (user) => {
      console.log('Preparing to submit order...');
      setTimeout(() => {
          console.log('Carts after delay:', carts);
          console.log('Quantity:', quantity);
          console.log('Subtotal:', subtotal);

          const datas = {
              userEmail: user?.email,
              shipmentTotal: shipmentTotal.toFixed(2),
              items: carts.map((item) => ({
                  foodName: item.foodName || item.mealName,
                  quantity,
                  price: (item.price - (item.price * (item.discount / 100))).toFixed(2),
                  image: item.image,
              })),
              deliveryFee: 100,
              subtotal: subtotal.toFixed(2),
              orderDate: new Date().toISOString(),
          };

          console.log('Processed Data:', datas);

          fetch('https://platematebackend.vercel.app/orders', {
              method: "POST",
              headers: {
                  'content-type': 'application/json',
              },
              body: JSON.stringify(datas),
          })
              .then((res) => res.json())
              .then((data) => {
                  console.log('Order submission response:', data);
              })
              .catch((err) => {
                  console.error('Error submitting order:', err);
              });
      }, 1000); // Add a 1-second delay
  };
    


    const states = {
        carts,
        setCarts,
        quantity,
        setQuantity,
        subtotal,
        setSubtotal,
        shipmentTotal,
        setShipmentTotal,
        checkoutComplete,
    };

    return (
        // in value we will pass the states example value={{state1, state2, state3}}
        <Context.Provider
                        value={states}>

            {children}
        </Context.Provider>
    );
};

ContexProvider.propTypes = {
    children: PropTypes.node,
};

export default ContexProvider;