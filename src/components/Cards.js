import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ComponentsReducer";
export default function Cards(props){
  let dispatch=useDispatchCart();
  let data=useCart();
  const priceref= useRef();
  let options=props.options;
  let priceOptions=Object.keys(options);
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");
  const AddToCart=async()=>{
    await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty:qty, size:size})
  }
  
  let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceref.current.value);
  },[])
  return (
    <div>
      <div>
        <div class="card mt-5" style={{ width: "18rem", maxHeight: "500px" }}>
          <img src={props.foodItem.img} class="card-img-top" alt="..." style={{height:"150px", objectFit:"fill"}} />
          <div class="card-body">
            <h5 class="card-title">{props.foodItem.name}</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="container w-100">
              <select className="m-2 h-100  rounded" onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="my-0 h-100 rounded" ref={priceref} onChange={(e)=>setSize(e.target.value)}>
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5 mx-3">{finalPrice}/-</div>
            </div>
          </div>
          <hr></hr>
          <button className="btn btn-success justify-center w-50 mx-5 my-2" onClick={AddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
