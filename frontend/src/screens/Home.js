import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";

export default function Home() {
  const [search, setsearch]=useState('')
  const [foodCat, setfoodCat]=useState([]);
  const [foodItem,setfoodItem]=useState([]);

  const loadData= async()=>{
    let response= await fetch("https://food-delivery-server-one.vercel.app/api/foodData",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      }
    });
    response=await response.json();
    // console.log(response[0], response[1]);
    setfoodCat(response[1]);
    setfoodItem(response[0]);
  }

  useEffect(()=>{
    loadData()
  },[])
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      style={{ objectFit: "contain !important" }}
    >
      <div className="carousel-inner">
        <div className="carousel-caption" style={{ zIndex: "10" }}>
          <div className="d-flex justify-content-center">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}
            />
          </div>
        </div>
        <div className="carousel-item active">
          <img
            src="https://source.unsplash.com/random/?food"
            className="d-block w-100 "
            alt="..."
            style={{ height: "550px", filter: "brightness(30%)" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random/?restaurant"
            className="d-block w-100"
            alt="..."
            style={{ height: "550px", filter: "brightness(30%)" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random/?serving"
            className="d-block w-100"
            alt="..."
            style={{ height: "550px", filter: "brightness(30%)" }}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
      </div>
      <div className="container" >
        {
          foodCat!==[]?foodCat.map((data)=>{
            return(
              <div className="row mb-3">
              <div key={data._id} className="m-3 fs-3">{data.CategoryName}</div>
              <hr/>
              {foodItem!==[]?foodItem.filter((item)=>(item.CategoryName===data.CategoryName)&& (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems=>{
                return(
                  <div key={filterItems._id} className="col-12 col-md-6 col-lg-4">
                     <Cards foodItem={filterItems}
                     options={filterItems.options[0]}
                      />
                  </div>
                )
              })
               :<div>No Such Data</div>
              }
              </div>
            )
          }):<div>"""""""</div>
        }
      </div>
      <div>
      <Footer />
      </div>
    </div>
  );
}
