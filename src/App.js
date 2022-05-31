import { Navbar } from "./components/Navbar";
import { VehicleList } from "./components/VehicleList";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {InspectionForm} from './components/form/InspectionForm'

function App() {



  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<VehicleList/>}/>
      <Route path="/inspection" element={<InspectionForm/>}/>
    </Routes>


     
    </div>
  );
}

export default App;
