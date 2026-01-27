import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { ModalProvider } from "./components/modal/ModalProvider";
import { PopoverProvider } from "./context/PopoverProvider";

import "../src/App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/headers/headerLibrary";
import NavSideBar from "../src/components/headers/NavSideBar";

export default function App() {
  return (
    <AppProvider>
      <ProjectsProvider>
        <PopoverProvider>
          <ModalProvider>
            <BrowserRouter>
              <div className="flex flex-col h-screen overflow-hidden">
                <Header />

                <div className="flex-1 flex flex-row py-1">
                  <NavSideBar />

                  <main className="flex-1 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </BrowserRouter>
          </ModalProvider>
        </PopoverProvider>
      </ProjectsProvider>
    </AppProvider>
  );
}