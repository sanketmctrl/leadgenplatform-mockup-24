import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutIcon, UsersIcon, BuildingIcon, InboxIcon, HomeIcon } from 'lucide-react';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-white hover:bg-light-blue hover:text-main-blue transition-colors duration-200 ${
        isActive ? 'bg-opacity-20 bg-light-blue' : ''
      }`}
    >
      {children}
    </Link>
  );
};

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-main-blue shadow-md">
        <nav className="mt-5">
          <NavLink to="/">
            <HomeIcon className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>
          <NavLink to="/campaigns">
            <LayoutIcon className="mr-3 h-5 w-5" />
            Campaigns
          </NavLink>
          <NavLink to="/prospects">
            <UsersIcon className="mr-3 h-5 w-5" />
            Prospects
          </NavLink>
          <NavLink to="/accounts">
            <BuildingIcon className="mr-3 h-5 w-5" />
            Accounts
          </NavLink>
          <NavLink to="/inbox">
            <InboxIcon className="mr-3 h-5 w-5" />
            Inbox
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
