import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Components/Main"
import Card from "./Components/Card";
import Header from "./Components/Header";
import AddToCart from "./Components/AddToCart";
import LoginPage from "./Components/LoginPage";

function App (){
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
           <Route path="/Login" element={<LoginPage/>}/>
           <Route path="/" element={<Main/>} />
           <Route path="/card/:iden" element={<Card/>}/>
           <Route path="/addtocart" element={<AddToCart/>}/>
        </Routes>
      </BrowserRouter>
  )
}
export default App;