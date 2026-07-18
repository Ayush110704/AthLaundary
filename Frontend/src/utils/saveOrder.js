

import { getCheckoutData, clearCheckoutData} from "./checkoutStorage";

 const saveOrder = () => {

    const checkout = getCheckoutData();

    const users =JSON.parse(localStorage.getItem("Users")) || [];

    const currentUser =JSON.parse(localStorage.getItem("currentUser"));

    const order = {

        id:`ORD-${Date.now()}`,

        status:"Pending",

        orderDate:new Date().toLocaleString(),

        ...checkout

    };

    const updatedUsers = users.map(user=>{

        if(user.Email===currentUser.Email){

            return{ ...user, orders:[...(user.orders || []), order ]}}

        return user;

    });

    localStorage.setItem("Users",JSON.stringify(updatedUsers));

    const updatedCurrentUser={...currentUser,orders:[ ...(currentUser.orders || []), order ]};

    localStorage.setItem("currentUser",JSON.stringify(updatedCurrentUser));

    clearCheckoutData();

};

export default saveOrder