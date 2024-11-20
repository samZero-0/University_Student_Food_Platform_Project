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
    


    const states = {
        carts,
        setCarts,
        quantity,
        setQuantity,
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