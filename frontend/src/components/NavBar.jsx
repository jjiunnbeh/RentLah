import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from 'react-router-dom';


function NavBar({userType}) {
  const navigate = useNavigate();
  const handleSubmit = (event)=>
  {
    event.preventDefault();
    navigate(`/search/${data.searchTerm}`)
  }

  const [data, setData] = useState({
    searchTerm:"",
  })

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <Navbar expand="lg"  data-bs-theme="dark" style={{background:"rgb(30,61,99)"}}>
      <Container>
        <Navbar.Brand href="/" style={{fontSize:"2.5em"} } >Rentlah</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{fontSize:"1.5em"}}>Home</Nav.Link>
            <Nav.Link href="/profile" style={{fontSize:"1.5em"}}>Profile</Nav.Link>

            
            <Nav.Link href={userType == "Agent" ? "/my-listings" : "/watchlist"} style={{fontSize:"1.5em"}}>{userType =="Agent" ? "My Listing" : "My Watchlist"}</Nav.Link>
            {/* <Nav.Link href="/AgentList" style={{fontSize:"1.5em"}}>Your Properties</Nav.Link> */}
            <Nav.Link href="/search/all" style={{fontSize:"1.5em"}}>View All Properties</Nav.Link>

            <form className="d-flex" onSubmit={handleSubmit}> 
            <input
              type="text"
              placeholder="Search ⌕"
              className="form-control me-2"
              aria-label="Search"
              onChange={handleChange}
              value={data.searchTerm}
              name="searchTerm"
            />
            <button className='btn outline-secondary' type='submit' style={{fontSize:"1.5em"}}>Search</button>
          </form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;