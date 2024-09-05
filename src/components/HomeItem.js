import { useDispatch, useSelector } from "react-redux";
import { OrderActions } from "../store/orderSlice";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import AddItemModel from "./Model";
import { useNavigate } from "react-router-dom";
const HomeItem = ({ item }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleAddToOrder = async () => {
    try {
      if(!currentUser){
        toast.success("Please Login to add Order");
        navigate('users/sign_in');
      }
      else{
        dispatch(OrderActions.addToOrder(item.id));
      }
     
    } catch (error) {
      toast.error(`Error adding product: ${error.message}`);
      console.error(`Error adding product: ${error.message}`);
    }
  };

  const handleEdit = () => {
    setCurrentItem(item);
    setIsOpen(true);
  };
  return (
    <div className="card w-[18rem]">
      <div className="h-[70%]">
        <img
          className="card-img-top"
          src={item.productImg}
          alt={item.productName}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{item.productName}</h5>
        <p className="m-0">₹{item.productPrice}</p>
      </div>
      <div className="flex justify-between items-center m-2 gap-2">
        <button
          className={`btn w-full btn-primary`}
          onClick={handleAddToOrder}>
          Order Now
        </button>
        {currentUser && 
        <div>
          <AddItemModel
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            item={currentItem}
          />
          <button
            type="button"
            className="btn btn-success py-2 cursor-pointer"
            onClick={handleEdit}
          >
            <MdEdit />
          </button>
        </div>}
        
      </div>
    </div>
  );
};

export default HomeItem;
