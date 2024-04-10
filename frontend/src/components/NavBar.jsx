import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/" style={{fontSize:"2.5em"}}>Rentlah</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{fontSize:"1.5em"}}>Home Page</Nav.Link>
            <Nav.Link href="/profile" style={{fontSize:"1.5em"}}>Profile</Nav.Link>

            
            <Nav.Link href={userType == "Agent" ? "/AgentList" : "/Watchlist"} style={{fontSize:"1.5em"}}>{userType =="Agent" ? "Your Properties" : "WatchList"}</Nav.Link>
            {/* <Nav.Link href="/AgentList" style={{fontSize:"1.5em"}}>Your Properties</Nav.Link> */}
            <Nav.Link href="/search" style={{fontSize:"1.5em"}}>Browse</Nav.Link>

            {/* <form className="d-flex">
            <input
              type="text"
              placeholder="Search"
              className="form-control me-2"
              aria-label="Search"
            />
            <button className='btn outline-secondary'>Search</button>
          </form> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;