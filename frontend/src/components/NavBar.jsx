import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";


function NavBar() {
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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Rentlah</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home Page</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">

              <NavDropdown.Item href="/createlisting">
                Create Listing Test
              </NavDropdown.Item> 
              
              <NavDropdown.Item href="/listing/:id">Listing Test</NavDropdown.Item>
              
              <NavDropdown.Item href="/search">search test</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Watchlist">Watchlist Test
              </NavDropdown.Item>
            </NavDropdown>
            <form onSubmit={handleSubmit}>
              <input placeholder='Search Here' onChange={handleChange} name="searchTerm" value={data.searchTerm}></input>
            </form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;