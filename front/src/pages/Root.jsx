import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Root({ children }) {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-gray-100">
        <Navbar />
        <main className="w-full flex flex-1 flex-col items-center pt-4 pb-6 px-5">{children ?? <Outlet />}</main>
        <Footer />
      </div>
    </>
  );
}
