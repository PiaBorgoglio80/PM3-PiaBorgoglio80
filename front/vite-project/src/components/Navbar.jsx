import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../Context/UserContext"; // Importamos el contexto

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #a8dadc;
  padding: 15px 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Logo = styled.img`
  height: 80px;
  max-width: 100%;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  font-size: 18px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  color: #1d3557;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #457b9d;
  }

  &.disabled {
    color: gray;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const LogoutButton = styled.button`
  background-color: #e63946;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #c92030;
  }
`;

const Navbar = () => {
  const { user, logout } = useUser(); // Obtener usuario y función logout del contexto

  return (
    <NavbarContainer>
      <Logo src="/Photoroom-20250201_101301.png" alt="Logo del SPA" />

      <NavLinks>
        <StyledLink to="/">Inicio</StyledLink>
        <StyledLink to="/turnos" className={!user ? "disabled" : ""}>
          Mis Turnos
        </StyledLink>
        <StyledLink to="/about">Acerca de</StyledLink>
        <StyledLink to="/contact">Contacto</StyledLink>
        {user && <StyledLink to="/crear-turno">Agendar Turno</StyledLink>}
      </NavLinks>

      <UserActions>
        {!user ? (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Registro</StyledLink>
          </>
        ) : (
          <LogoutButton onClick={logout}>Cerrar Sesión</LogoutButton>
        )}
      </UserActions>
    </NavbarContainer>
  );
};

export default Navbar;
