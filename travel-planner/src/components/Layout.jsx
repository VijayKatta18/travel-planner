import { useState } from "react";
import "./Layout.css";
import Sidebar from "./SideBar";


export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="layout">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={`main ${isOpen ? "shifted-open" : "shifted-closed"}`}>
        {children}
      </main>
    </div>
  );
}
