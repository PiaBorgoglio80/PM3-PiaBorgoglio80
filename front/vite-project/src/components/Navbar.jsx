import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #a8dadc;
  padding: 15px 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 100px;
  max-width: 100%;
  object-fit: contain;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 50px; 
  font-size: 18px;
`;

const NavItem = styled.span`
  font-weight: bold;
  color: #1d3557;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #457b9d;
  }
`;

const UserIcon = styled.img`
  height: 80px;
  max-width: 100%;
  object-fit: contain;
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      {/* Logo a la izquierda */}
      <Logo src="Photoroom-20250201_101301.png" alt="Logo del SPA" />

      {/* Links de navegación */}
      <NavLinks>
        <NavItem>HOME</NavItem>
        <NavItem>MIS TURNOS</NavItem>
        <NavItem>ABOUT</NavItem>
        <NavItem>CONTACTO</NavItem>
      </NavLinks>

      {/* Icono de usuario a la derecha */}
      <UserIcon src="/Photoroom-20250201_095243.png" alt="Usuario" />
    </NavbarContainer>
  );
};

export default Navbar;



  














// const Navbar = () =>{
//    return (
//    <div>
//     <div>
// <span>HOME</span>
// <span>MIS TURNOS</span>
// <span>ABOUT</span>
// <span>CONTACTO</span>

//     </div>
//     </div>
//    );
// };


// export default Navbar; 