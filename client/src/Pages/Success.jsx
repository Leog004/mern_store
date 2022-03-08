import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { UserRequest } from "../requestMethod";
import { clearProducts } from '../redux/cartRedux';

export default function Success() {
  const location = useLocation();
  const dispatch = useDispatch();


  const data = location.state.stripeData;

  const cart = location.state.products;

  const currentUser = useSelector((state) => state.user.currentUser);

  const isGuestCheckout = currentUser ? false : true;

  console.log(data, cart);
  
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await UserRequest.post("/orders", {
          userId: !isGuestCheckout ? currentUser._id : "GuestCheckout",
          orderId: data.id,
          orderEmail: data.billing_details.email,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
        dispatch(clearProducts())
      } catch (err) {
        console.log(err);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser, dispatch, isGuestCheckout]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
}
