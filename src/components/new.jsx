import React, { useState } from 'react';
import styled from 'styled-components';
import { app, auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const { GoogleGenerativeAI } = require("@google/generative-ai");

const key = "AIzaSyDjVlYl8PzfMDBGOcnswN_zThmbrSb241k"; 

const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

async function getGeminiResponse(question) {
    const result = await model.generateContent(question);
    const text = result.response.text();
    
    return text;
}

function getLinks(topic) {
    const links = getGeminiResponse(`I want to learn this - ${topic}. Only provide me links which help me to learn this. Only give links and nothing else. Make sure the links work and there aren't any spaces in them. Also provide links to youtube videos. Do not use headings and markdown and only use plain text. Do not number them. ONLY GIVE ME LINKS.`);
    return links;
}

function getRoadmap(topic) {
    const roadmap = getGeminiResponse(`Provide me a roadmap to learn - ${topic}. Also mention how much time I should spend on each phase.`);
    return roadmap;
}

function getBooks(topic) {
    const books = getGeminiResponse(`I want to learn this - ${topic}. Only provide me book names which help me to learn this. Only give names of books and nothing else. Give me these in plain text. Do not use headings and markdown and only use plain text. Do not number them. ONLY GIVE ME NAMES OF BOOKS. Do not use markdown such as this hyphen '-'. Mention the author's name. Give me response in this format - Book1 by Author1 Book2 by Author2.`);
    return books;
}





const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  background-color: #1f2029;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 4px;
  border: none;
  padding: 0 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #c4c3ca;
  background-color: #2a2b38;
`;

const Button = styled.button`
  width: 300px;
  height: 44px;
  border-radius: 4px;
  border: none;
  background-color: #ffeba7;
  color: #222629;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 200ms linear;

  &:hover {
    background-color: #e0dca3;
  }
`;

const StyledH1 = styled.h1`
 margin-bottom: 30px;
`;

const StyledH6 = styled.h6`
 margin-top: 30px;
`;

async function storeInFirebase(topic, links, books, roadmap, userEmail) {
    try {
       const docRef = await addDoc(collection(db, "learningPaths"), {
         topic: topic, 
         links: links,
         books: books,
         roadmap: roadmap,
         userEmail: userEmail,
         createdAt: new Date().toISOString(),
       });
       console.log("Document written with ID: ", docRef.id);
    } catch (e) {
       console.error("Error adding document: ", e);
    }
}

const New = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate(); 
   
    const handleInputChange = (event) => {
       setInputValue(event.target.value);
    };
   
    const handleButtonClick = async () => {
       if (!auth.currentUser) {
           console.error("User is not signed in");
           return;
       }

       const topic = inputValue;
       const links = await getLinks(topic);
       const books = await getBooks(topic);
       const roadmap = await getRoadmap(topic);

       const userEmail = auth.currentUser.email;

       await storeInFirebase(topic, links, books, roadmap, userEmail); 
       navigate('/home');
    };
   
    return (
        <Container>
        <StyledH1>Name the topic you want to learn</StyledH1> 
        <Input type="text" value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleButtonClick}>Create Learning Path</Button>

        <StyledH6>After clicking you need to wait a bit for us to generate the learning path for you</StyledH6> 
      </Container>
    );
};

export default New;
