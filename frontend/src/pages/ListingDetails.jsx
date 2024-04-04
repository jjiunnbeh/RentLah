import NavBar from "../components/NavBar";
import {useSelector} from "react-redux";
import Triangles from "../components/Triangles";
import "../styles/ListingDetails.css"
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import { Map, Marker } from "react-map-gl/maplibre";
import whatsapp from "../assets/whatsapp.png"
import "maplibre-gl/dist/maplibre-gl.css";


function ListingDetails()
{   
    const userType = useSelector((state) => state.user.currentUser.userType);
    console.log(userType);
    const currentUser = useSelector((state) => state.user.currentUser);
    const listing1 = {
        name:"PDR The Gardens at Your Mom's House",
        postalCode:649823,
        price:69.69,
        description:"ARC",
        address:'This is\nsupposed to be\nan address',
        bedroom:3,
        bathroom:2,
        images:["https://firebasestorage.googleapis.com/v0/b/rentlah-667e3.appspot.com/o/1711687189301download%20(1).jpeg?alt=media&token=359100cb-2c18-4666-8ba8-ccc80c88e025","https://firebasestorage.googleapis.com/v0/b/rentlah-667e3.appspot.com/o/1711687215981download.jpeg?alt=media&token=d05befb6-d255-4bc9-b217-fe8e05ce5a45"],
        agentRef:"agent1",
        latitude: 1.4332513,
        longitude: 103.7874458
    }
    const [index, setindex] = useState(0);
    const phonenumber = 6580288819;
    const handleSelect = (selectedIndex) => {
        setindex(selectedIndex);
    };

    const flyTo = (coordinates) => {
        const map = mapRef.current?.getMap();
        if (!map) return;
    
        map.flyTo({
          center: coordinates,
          essential: true,
          zoom: 14,
        });
      };




 return (

            <>
            <header><NavBar /></header>

            <Triangles />


            <div className="row" >
                <div className="col mt-3 " style={{marginLeft:"12%"}}>
                    
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                    {
                        [...Array(listing1.images.length)].map((e,i) => <Carousel.Item key={i}>
                                                                        <img className="d-block w-100" src={listing1.images[i]} alt="First image" style={{height:"700px", width:"800px"}}/>
                                                                        </Carousel.Item>)
                    }
                    </Carousel>
                </div>
            

                <div className="card bg-primary text-white" id="detailcard" style={{width: "30%", marginRight:"12%"}}>
                    <div className="card-body">
                        <h1 className="Card Title" > {listing1.name} </h1>
                
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item ">
                                <hr className="cardhr"></hr>
                                <h2 className="card-text" style={{whiteSpace: "pre-line"}}> {listing1.address} </h2>
                                <h2> {listing1.postalCode} </h2>
                            </li>
                        </ul>

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <hr className="cardhr"></hr>
                                <h2> Monthly Rent: </h2>
                                <h2> {listing1.price} </h2>
                            </li>
                        </ul>

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <hr className="cardhr"></hr>
                                <div className="row">
                                    <div className="col text-center">
                                        <h1 style={{fontSize: "5rem"}}> {listing1.bedroom}</h1>
                                        <h1> Bedrooms </h1>
                                    </div>
                                    <div className="col text-center">
                                        <h1 style={{fontSize: "5rem"}}> {listing1.bathroom}</h1>
                                        <h1> Bathrooms </h1>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row mt-3" style={{marginLeft:"12%", maxHeight:"400"}}>
                <div className="col-md-3">
                    <div className="card bg-primary text-white" id="agentcard">
                        <div className="card-body">
                            <h2 className="card-title">
                                {listing1.agentRef}
                            </h2>
                            <h4 className="card-text" style={{whiteSpace:"pre-line"}}>
                                {"Agent Registration Number\nAgent Contact Number"}
                            </h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-text text-decoration-underline">Contact:</h5>
                            <a href={`https://api.whatsapp.com/send/?phone=${phonenumber}&text&type=phone_number&app_absent=0`}>
                                <img
                                src={whatsapp}
                                alt="Whatsapp"
                                style={{height:"2em"}}/>
                            </a>
                        </div>
                    </div>

                </div>
                
                <div className="col-md-5" id="map" style={{marginLeft:"12%"}}>
                    <Map
                        initialViewState={{
                            latitude: listing1.latitude,
                            longitude: listing1.longitude,
                            zoom: 15
                        }}
                        container="map"
                        maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
                        mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
                        attributionControl={false}
                        style={{height:"400px"}}
                    >
                    
                        <Marker
                        latitude={listing1.latitude}
                        longitude={listing1.longitude}
                        />
                    </Map>
                </div>
            </div>


            <footer className="text-end"><img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style={{height:"20px", width:"20px"}}/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a></footer>
            </>

)

 }

 export default ListingDetails;