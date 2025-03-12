import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import { useState } from 'react';

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <header>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
        <MDBNavbarBrand href="#" className="text-success"/>
        <MDBIcon icon="school" className="me-2" />
          <MDBNavbarBrand href="#" className='text-suscess'>InstituiçõesPWEB</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenNav(!openNav)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={openNav}>
            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink href="/">Home</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/propriedades">Instituições</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/sobre">Sobre</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
};

export default Header;
