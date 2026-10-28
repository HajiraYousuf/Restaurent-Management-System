import {Outlet,ScrollRestoration} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App(){
  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#29231f]">
      <Header/>
      <main><Outlet/></main>
      <Footer/>
      <ScrollRestoration/>
    </div>
  );
}
