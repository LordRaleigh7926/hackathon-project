// ProfilePage.js

import React from 'react';
import styled from 'styled-components';


const profileImage = `https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png`

const ProfilePage = () => {
  return (
    <Main>
        <Heading>Profile Page</Heading>
      <Container>
        <Content>
            <h1>Name</h1>
            <h2>5</h2>
            <ChangePageButton>Let's Learn</ChangePageButton>
        </Content>
    </Container>
    </Main>
  );
};

const Container = styled.div`

    display: flex;
    justify-content:center;
    align-items:center;
    height: 100%;
    width: 100%;

    margin: auto;
    flex-direction: column;
    
    
`;
    
const Content = styled.div`
    
    
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;


`;

const Heading = styled.text`

    display: block;
    text-align: center;
    margin-top: 5rem;
    font-weight: 500;
	font-size: 50px;

`;

const ChangePageButton = styled.div`



`;

const Main = styled.div`

display: flex;
height: 87vh;
width: 60%;
margin:auto;
background-color: #1f2029;
flex-direction:column;
justify-content:center;

color: white;

`;

export default ProfilePage;