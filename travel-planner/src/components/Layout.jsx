import { useState } from "react";
import "./Layout.css";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";


export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="layout">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={`main ${isOpen ? "shifted-open" : "shifted-closed"}`}>
        <Outlet /> 
      </main>
    </div>
  );
}
