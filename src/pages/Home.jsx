import SideBar from "../components/sections/sideBar";
import MainSection from "../components/sections/mainSection";

export default function Home() {
  return (
    <div className="mx-2 h-full flex flex-row border-1 border-white/10 rounded-lg">
      {/* Sidebar получает функцию открытия модалки с группой */}
      <SideBar/>

      {/* MainSection остаётся стандартным */}
      <MainSection />
    </div>
  );
}