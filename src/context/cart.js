import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // get Cart from local store

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('bookstore_cart'));
        if (data) {
            setCart(data);
        }
    }, [])

    return (
        <cartContext.Provider value={[cart, setCart]}>
            {children}
        </cartContext.Provider>
    )
}

const useCart = () => useContext(cartContext);

export { CartProvider, useCart };