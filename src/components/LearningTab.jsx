import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Ensure this path is correct and auth is imported
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 height: 100vh;
 padding: 2rem;
 background-color: #1f2029 ;
`;

const TopicHeading = styled.h1`
 font-size: 2.5rem;
 color: #c4c3ca;
 margin-bottom: 2rem;
`;

const ContentContainer = styled.div`
 display: grid;
 grid-template-columns: repeat(3, 1fr); // Three equal-width columns by default
 grid-template-rows: repeat(2, auto); // Two rows with automatic height
 grid-gap: 2rem;
 width: 80%;

 @media (max-width: 768px) {
   grid-template-columns: 1fr; // One column on mobile devices
   grid-template-rows: auto; // Automatic row height
 }
`;

// Updated Card styled component to include scrollable content for the roadmap
const Card = styled.div`
 padding: 1rem;
 border-radius: 10px;
 background: rgba(255, 255, 255, 0.1);
 backdrop-filter: blur(10px);
 grid-column: 1 / span 2; // Default grid column span
 grid-row: 1 / span 2; // Default grid row span

 // Responsive design for mobile devices
 @media (max-width: 768px) {
   grid-column: 1; // One column on mobile devices
   grid-row: auto; // Automatic row height
 }

 // Make the roadmap scrollable
 &.roadmap {
   height: 400px; // Adjust the height as needed
   overflow-y: auto;
 }
`;

const RD_Card = styled.div`
 padding: 1rem;
 border-radius: 10px;
 background: rgba(255, 255, 255, 0.1);
 backdrop-filter: blur(10px);
 grid-column: 1 / span 2; // Default grid column span
 grid-row: 1 / span 2; // Default grid row span

 // Responsive design for mobile devices
 @media (max-width: 768px) {
    grid-column: 1 !important; 
    grid-row: auto !important;
 }

 // Make the roadmap scrollable
 &.roadmap {
   height: 80vh;
   overflow-y: scroll;
 }
`;

const CardTitle = styled.h2`
 font-size: 1.5rem;
 color: #c4c3ca;
 margin-bottom: 0.5rem;
`;
const LearningTab = () => {
    const [data, setData] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // New state for loading
   
    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
         if (user) {
           setUserEmail(user.email);
         } else {
           console.error("User is not signed in");
           setUserEmail(null); // Reset userEmail if user is not signed in
         }
         setIsLoading(false); // Set loading to false after fetching user email
       });

       // Clean up the listener on component unmount
       return () => unsubscribe();
    }, []);
   
    useEffect(() => {
       const fetchData = async () => {
         if (!userEmail) {
           console.error("User email is not available");
           return;
         }
   
         const q = query(collection(db, "learningPaths"), where("userEmail", "==", userEmail));
         const querySnapshot = await getDocs(q);
         const documents = querySnapshot.docs.map(doc => doc.data());
         setData(documents[0]); // Assuming there's only one document per user
         setIsLoading(false); // Set loading to false after fetching data
       };
   
       if (userEmail) {
         fetchData();
       }
    }, [userEmail]);
   
    if (isLoading) {
       return <div>Loading...</div>; // Show loading message while fetching data
    }

    if (!userEmail) {
       return <div>Please sign in to view your learning paths.</div>;
    }
   
    if (!data) {
       return <div>No learning paths found for this user. Click on Learn to create one</div>;
    }
 return (
    <Container>
      <TopicHeading>{data.topic}</TopicHeading>
      <ContentContainer>
        <RD_Card className="roadmap">
          <CardTitle>Roadmap</CardTitle>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.roadmap}</ReactMarkdown>
        </RD_Card>
        <Card style={{ gridColumn: '3', gridRow: '1' }}>
          <CardTitle>Links</CardTitle>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.links}</ReactMarkdown>
        </Card>
        <Card style={{ gridColumn: '3', gridRow: '2' }}>
          <CardTitle>Books</CardTitle>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.books}</ReactMarkdown>
        </Card>
      </ContentContainer>
    </Container>
 );
};

export default LearningTab;
