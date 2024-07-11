import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import dashboardImage1 from '../assets/Dashboard.png';
import dashboardImage2 from '../assets/Dashboard-active.png';
import projectlist from '../assets/Project-list.png';
import otherprojectlist from '../assets/Project-list-active.png';
import createproj from '../assets/create-project.png';
import othercreateproj from '../assets/create-project-active.png';
import logout from '../assets/Logout.png';
import '../css/navbar.css';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='navbar'>
      <Nav className="flex-container">
        <div className="main-tabs">
          <Nav.Link as={Link} to="/tab1" onClick={() => handleTabClick('tab1')}>
            <img src={activeTab === 'tab1' ? dashboardImage2 : dashboardImage1} alt="Tab 1 Icon" />
          </Nav.Link>
          <Nav.Link as={Link} to="/tab2" onClick={() => handleTabClick('tab2')}>
            <img src={activeTab === 'tab2' ? otherprojectlist : projectlist} alt="Tab 2 Icon" />
          </Nav.Link>
          <Nav.Link as={Link} to="/tab3" onClick={() => handleTabClick('tab3')}>
            <img src={activeTab === 'tab3' ? othercreateproj : createproj} alt="Tab 3 Icon" />
          </Nav.Link>
        </div>
        <div className="logout-container">
          <Nav.Link as={Link} to="/" onClick={() => handleTabClick('tab3')}>
            <img className='logout' src={logout} alt="Logout Icon" />
          </Nav.Link>
        </div>
      </Nav>
    </div>
  );
};

export default Navbar;
