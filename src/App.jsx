import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Login";
import HomePage from "./components/Home";
import Navbar from "./components/Navbar";
import New from "./components/new";
import LearningTab from "./components/LearningTab";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' Component={Login}></Route>
          <Route path='/home' Component={HomePage}></Route>
          <Route path='/new' Component={New}></Route>
          <Route path='/learning' Component={LearningTab}></Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
