import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen ">
      <Header />

      <main className="grid grid-cols-4">
        <section>alan1</section>

        <section className="col-span-3 md:col-span-2 p-4">
          {/* alt route'un yerleşiceği yer */}
          <Outlet />
        </section>

        <section className="hidden md:block">alan3</section>
      </main>
    </div>
  );
};

export default Layout;
