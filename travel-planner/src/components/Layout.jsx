import "./Layout.css"
import Footer from "./Footer";
import Navbar from "./Navbar";
import Todo from "./Todo";

export default function Layout({children}){
 return(
    <div className="layout">
      <Navbar/>
      <main className="main">{children}</main>
      <Footer/>
    </div>
 );
}