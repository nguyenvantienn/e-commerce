import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';


const fetchFromLocalStorage = () =>{
    let cart = localStorage.getItem('cart');
    if(cart){
        return JSON.parse(localStorage.getItem('cart'));
    }else{
        return [];
    }
}

const storeInLocalStorage = (data) =>{
    localStorage.setItem('cart',JSON.stringify(data));
}

const cartSlice =  createSlice({
    name :'cart',
    initialState :{
        carts : fetchFromLocalStorage(),
        itemsCount : 0 ,
        totalAmount : 0,
        isCartMessageOn : false,
    },
    reducers: {
        addToCart : (state , action) =>{
            console.log(action);
            const isItemInCart = state.carts.findIndex(item =>item.id === action.payload.id);
            console.log(isItemInCart);
            if(isItemInCart !== -1) {
                let tempCart = [...state.carts];
                tempCart[isItemInCart].quantity += action.payload.quantity ;
                tempCart[isItemInCart].totalPrice = tempCart[isItemInCart].quantity * tempCart[isItemInCart].price;
                console.log(tempCart);

                state.carts = tempCart ;
                storeInLocalStorage(state.carts);
            }
            else{
                state.carts.push(action.payload);
                storeInLocalStorage(state.carts);
            }
            console.log(state.carts);
        },

        removeFromCart :(state , action)=>{
            console.log(action.payload);
            const tempCart = state.carts.filter(item =>item.id !== action.payload);
            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },

        clearCart :(state)=>{
            state.carts = [];
            storeInLocalStorage(state.carts);
        },

        getCartTotal :(state)=>{
            state.totalAmount = state.carts.reduce((cartTotal,cartItem)=>{
                return cartTotal += cartItem.totalPrice;
            },0);
            state.itemsCount = state.carts.length;
        }, 

        toggleCartQty : (state, action)=>{
            const tempCart = state.carts.map(item =>{
                if(item.id === action.payload.id){
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;

                    if(action.payload.type === 'INC'){
                        tempQty++;
                        if(tempQty === item.stock) tempQty = item.stock;
                        tempTotalPrice = tempQty * item.discountedPrice;

                    }
                    if(action.payload.type === 'DEC'){
                        tempQty--;
                        if(tempQty<1) tempQty =1;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    return {...item , quantity: tempQty , totalPrice :tempTotalPrice};
                }else{
                    return item;
                }
            });
            // const tempCart = state.carts.map(item => {
            //     if(item.id === action.payload.id){
            //         let tempQty = item.quantity;
            //         let tempTotalPrice = item.totalPrice;

            //         if(action.payload.type === "INC"){
            //             tempQty++;
            //             if(tempQty === item.stock) tempQty = item.stock;
            //             tempTotalPrice = tempQty * item.discountedPrice;
            //         }

            //         if(action.payload.type === "DEC"){
            //             tempQty--;
            //             if(tempQty < 1) tempQty = 1;
            //             tempTotalPrice = tempQty * item.discountedPrice;
            //         }

            //         return {...item, quantity: tempQty, totalPrice: tempTotalPrice};
            //     } else {
            //         return item;
            //     }
            // });
            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },
        
        setCartMessageOn : (state)=>{
            state.isCartMessageOn = true;
        },

        setCartMessageOff : (state) =>{
            state.isCartMessageOn = false;
        }

    }
});

export const {addToCart , setCartMessageOn , setCartMessageOff  , clearCart , removeFromCart , getCartTotal , toggleCartQty} = cartSlice.actions;
export default cartSlice.reducer;