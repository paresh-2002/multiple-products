import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const orderSlice = createSlice({
    name: 'order',
    initialState:[],
    reducers:{
        addToOrder: (state, action) => {
          const check = state.find(itemId => itemId === action.payload);
          if(check){
              toast.info('This Product is Already in your Cart')
          }else{
            state.push(action.payload);
            toast.success("Product added successfully!");   
          }
          },
          removeFromOrder: (state, action) => {
            toast.success('Product removed successfully!');
            return state.filter((itemId) => itemId !== action.payload);
          },
          increment: (state, action) => {
           return state++
          },
          decrement: (state, action) => {
            return  state--
          },
        },
      })
      
      export const OrderActions = orderSlice.actions;
      
export default orderSlice