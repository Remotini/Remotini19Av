import React from "react";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import Maintable from "../components/Maintable/Maintable";
import "../App.css";
import Footer from "../components/Footer/Footer";
function Home() {
  return (
    <>
      <div className="App" />
      <Header />
      <div className="center">
        <div>
          <NavBar />
        </div>
        <div className="data-Table">
          <Maintable>/</Maintable>
        </div>
      </div>
      <div className="ft">
        <Footer />
      </div>
    </>
  );
}

export default Home;
