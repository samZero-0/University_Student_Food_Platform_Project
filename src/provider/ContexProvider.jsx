import { useContext, useState } from "react";
import { Context } from "./Context";
import PropTypes from "prop-types";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'
import { AuthContext } from "./AuthProvider";

const ContexProvider = ({children}) => {
    useEffect(() => {
        AOS.init({
          duration: 1000,  
        });
        
        return () => {
          AOS.refresh();
        };
    }, []);
    
    const [carts, setCarts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipmentTotal, setShipmentTotal] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [cookRegistered, setCookRegistered] = useState(false);
    const [cooks, setCooks] = useState([]);
    const {user} = useContext(AuthContext);
    
    // Add to cart function with quantity
    const addToCart = (item) => {
        const existingItemIndex = carts.findIndex(cartItem => 
            cartItem.foodName === item.foodName || cartItem.mealName === item.mealName
        );

        if (existingItemIndex !== -1) {
            // If item exists, increment quantity
            const updatedCarts = [...carts];
            updatedCarts[existingItemIndex].quantity += 1;
            setCarts(updatedCarts);
        } else {
            // If item doesn't exist, add with quantity 1
            setCarts([...carts, { ...item, quantity: 1 }]);
        }
    };

    // Update quantity for specific item
    const updateItemQuantity = (itemIndex, newQuantity) => {
        if (newQuantity < 1) return; // Prevent negative quantities
        
        const updatedCarts = carts.map((item, index) => 
            index === itemIndex ? { ...item, quantity: newQuantity } : item
        );
        setCarts(updatedCarts);
    };

    // Remove item from cart
    const removeFromCart = (itemIndex) => {
        const updatedCarts = carts.filter((_, index) => index !== itemIndex);
        setCarts(updatedCarts);
    };
    
    useEffect(() => {
        fetch('https://platematebackend.vercel.app/cookList')
            .then(res => res.json())
            .then(data => {
                setCooks(data);               
                const isRegistered = data.some(cook => cook.email === user?.email);
                setCookRegistered(isRegistered); 
            })
            .catch(err => {
                console.error("Error fetching cook list:", err);
            });
    }, [user]); 
    
    const checkoutComplete = (user) => {
        console.log('Preparing to submit order...');
        setTimeout(() => {
            const datas = {
                userEmail: user?.email,
                shipmentTotal: shipmentTotal.toFixed(2),
                items: carts.map((item) => ({
                    foodName: item.foodName || item.mealName,
                    quantity: item.quantity,
                    price: (item.price - (item.price * (item.discount / 100))).toFixed(2),
                    image: item.image,
                })),
                deliveryFee: 100,
                subtotal: subtotal.toFixed(2),
                orderDate: new Date().toISOString(),
            };

            console.log('Processed Data:', datas);
            setModalVisible(false);
            setModalContent(null);
            setCarts([]);
         
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
        }, 1000);
    };

    const states = {
        carts,
        setCarts,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        subtotal,
        setSubtotal,
        shipmentTotal,
        setShipmentTotal,
        checkoutComplete,
        isModalVisible,
        setModalVisible,
        modalContent,
        setModalContent,
        cookRegistered,
        cooks
    };

    return (
        <Context.Provider value={states}>
            {children}
        </Context.Provider>
    );
};

ContexProvider.propTypes = {
    children: PropTypes.node,
};

export default ContexProvider;