import React,{ useState } from 'react'
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group } from '@syncfusion/ej2-react-grids';

import { BrowserRouter,Routes,Route } from 'react-router-dom'



import './App.css'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import Createproj from './Components/Createproj'
import ProjectListing from './Components/ProjectListing';



function App() {

  const [formData, setFormData] = useState(null);

  const getData = (data) => {
    console.log(data);
    setFormData(data);
  };

 

  return (
    <>
  
  
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/navbar' element={<Navbar />}></Route>
        <Route path='/tab1' element={<Dashboard />}></Route>
        <Route path='/tab2' element={<ProjectListing  formData={formData} />}></Route>
        <Route path='/tab3' element={<Createproj  onSubmit={getData}/>}></Route>
        {/* <Route path='/projects' element={<ProjectListing />} /> */}
       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App