import NavBar from "../components/NavBar";
import {useSelector} from "react-redux";
import Triangles from "../components/Triangles";
import "../styles/Home.css"

function Home()
{   
    const userType = useSelector((state) => state.user.currentUser.userType);
    console.log(userType);
    const currentUser = useSelector((state) => state.user.currentUser);






 return (

    <>
    <header><NavBar/></header>

    <Triangles />

    <div className="row text-center"style={{marginTop: "3%"}} >
        <h1> Hello {currentUser.username} </h1>
    </div>

    <div className="row text-center" style={{marginTop: "5%", marginBottom: "1%"}} >
            <h1> Listings</h1>
    </div>

    <div className="col overflow-auto" id="Listingsbar" style={{width:"100%"}} >

        <div className="row d-flex gap-4 flex-nowrap" style={{marginLeft: "6%"}}>
           {
            [...Array(10)].map((e, i) => <div className="Listingcontainer" key={i}>
                                            <div className="col-mx-auto d-grid gap-4" style={{width: "525px"}}>
                                                <div className="row justify-content-center">
                                                    <div className="Listingimg">
                                                        
                                                    </div>
                                                </div>

                                                <div className="row" style={{marginTop: "20px", width:"525px"}}>
                                                    <h2 className="text-truncate"> Address: dskfjhsdjkfhajdshfkljsdhfjhsdafkjsadfkjdsakfhsdkjfhasdkjfsjkadhfkjsdfjksdfhkdlsajkjkadsfkhdslk</h2>
                                                </div>
                                                <div className="row">
                                                    <h2> Pricing: </h2>
                                                </div>
                                                <div className="row">
                                                    <a className="Listing" href=""> Learn more... </a>
                                                </div>
                                                    
                                                <div className="row">
                                                <a className="Listing" href=""> Add to watchlist... </a>
                                                </div>
                                            </div>
                                        </div>)
           }
           <div className="col" style={{minWidth:"5%"}}/>
        </div>
    </div>
    </>
 );
    

}
export default Home;

/*    <div>
        <NavBar />
            <div className="main-content">
                <h1>Welcome to RentLah!</h1>
                <p>A one-stop platform for renting properties in Singapore!</p>
            </div>
        </div>
*/
