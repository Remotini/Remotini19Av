import React from 'react'
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import PieChart from '../components/PieChart/PieChart';
import Footer from "../components/Footer/Footer";
import UserTable from "../components/UserTable/UserTable";
import Admin from "../components/Admin/Admin"
function AdminPage() {
  return (
    <div className="All">
    <div className="App" />
    <Header />
    <div className="center">
      <div className="the-nav">
        <NavBar />
      </div>
      <div className="AdminPage">
         <Admin/>
      </div>
    </div>
    <div className="ft">
      <Footer />
    </div>
    
  </div>
  )
}

export default AdminPage
