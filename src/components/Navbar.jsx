import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from "firebase/auth";
import { auth } from '../firebase'; 
import { useNavigate } from 'react-router-dom';

const NavbarContainer = styled.nav`
 display: flex;
 justify-content: space-between;
 align-items: center;
 background-color: #333;
 padding: 1rem;
`;

const Logo = styled.h1`
 color: #fff;
 font-size: 2rem;
`;

const NavbarLinks = styled.div`
 display: flex;
 align-items: center;
`;

const NavbarLink = styled(Link)`
 color: #fff;
 text-decoration: none;
 margin-right: 1rem;
 font-size: 1.2rem;
 padding: 0.5rem 1rem; // Add padding
 border: 2px solid #fff; // Add border
 border-radius: 4px; // Add border radius
 background-color: transparent; // Transparent background
 transition: background-color 0.3s ease; // Smooth transition for hover effect

 &:hover {
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.1); // Light background on hover
 }
`;

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {               
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/", { replace: true }); // Use replace: true to replace the current history entry
            console.log("Signed out successfully");
        }).catch((error) => {
            // An error happened.
            console.error("Error signing out:", error);
        });
    }

    return (
        <NavbarContainer>
            <Logo to="/">EduAll</Logo>
            <NavbarLinks>
                {isLoggedIn && (
                    <>
                        <NavbarLink to="/home">Home</NavbarLink>
                        <NavbarLink to="/learning">Learning Tab</NavbarLink>
                        {/* <NavbarLink to="/profile">Profile Page</NavbarLink> */}
                        <NavbarLink to="/new">Learn</NavbarLink>
                    </>
                )}
                {isLoggedIn ? (
                    <NavbarLink onClick={handleLogout}>Logout</NavbarLink>
                ) : (
                    <NavbarLink to="/">Login/Signup</NavbarLink>
                )}
            </NavbarLinks>
        </NavbarContainer>
    );
};

export default Navbar;
