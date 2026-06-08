import { Navbar, Container, FormControl, Nav } from 'react-bootstrap'
import './style/NavbarLogin.css'
import login from './../../assets/account.svg'
import cart from './../../assets/shopping_cart.svg'
import logo from './../../assets/feather.svg'
import NavbarSearchHook from './../../hook/search/navbar-search-hook'


const NavBarLogin = () => {

  const [OnChangeSearch, searchWord] = NavbarSearchHook();
  let word = '';
  if(localStorage.getItem("searchWord") != null){
    word = localStorage.getItem("searchWord");
  }

  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href='/'>
            <img src={logo} className='logo' />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            value={word}
            onChange={OnChangeSearch}
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />
          <Nav className="me-auto">
            <Nav.Link   href='/login' className="nav-text d-flex mt-3 justify-content-center">
              <img src={login} className="login-img" alt="sfvs" />
              <p className='pp'>دخول</p>
            </Nav.Link>
            <Nav.Link href='/cart' className="nav-text d-flex mt-3 justify-content-center pp" >
              <img src={cart} className="login-img" alt="sfvs" />
              <p className='pp'>العربه</p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBarLogin;




/*
const NavBarLogin = () => {
  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href='/'>
            <img src={logo} className='logo' />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            type="search"
            placeholder="ابحث..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />
          <Nav className="me-auto">
            <Nav.Link href='/login'
              className="nav-text d-flex mt-3 justify-content-center">
              <img src={login} className="login-img" alt="sfvs" />
              <p className='pp'>دخول</p>
            </Nav.Link>
            <Nav.Link href='/cart' className="nav-text d-flex mt-3 justify-content-center pp" >
              <img src={cart} className="login-img" alt="sfvs" />
              <p className='pp'>العربه</p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

*/