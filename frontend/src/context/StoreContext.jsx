import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    // const url = "http://localhost:4000";
    const url = "https://food-del-backend-t3ck.onrender.com";
    const [token,setToken] = useState("");
    // const [token,setToken] = useState(localStorage.getItem('token') || '');

    const [food_list,setFoodList] = useState([]);

    // const addToCart = (itemId) => {
    const addToCart = async (itemId) => {   // for await (included async)
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId] + 1}))
        }
        if(token){                       // this is used to provide the add to cart items from backend
            await axios.post(url + "/api/cart/add", {itemId}, {headers:{token}})
        }
    }

    // const removeFromCart = (itemId) => {
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId] - 1}))
        if(token){
            await axios.post(url + "/api/cart/remove", {itemId}, {headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, {headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));     // used because whenever the reload was done the cart items should be get from backend
            }
        }
        loadData();
    },[])

    // useEffect(() => {
    //     if(localStorage.getItem("token")){
    //         setToken(localStorage.getItem("token"));
    //     }
    // },[])              // after this usage the above effect came into usage, to rendering of foodlist directly from backend

    // useEffect(() => {
    //     console.log(cartItems);
    // },[cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;