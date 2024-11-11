import { Context } from "./Context";
import PropTypes from "prop-types";

const ContexProvider = ({children}) => {
    // here will go states or data variables


    return (
        // in value we will pass the states example value={{state1, state2, state3}}
        <Context.Provider
                        value={{}}>

            {children}
        </Context.Provider>
    );
};

ContexProvider.propTypes = {
    children: PropTypes.node,
};

export default ContexProvider;