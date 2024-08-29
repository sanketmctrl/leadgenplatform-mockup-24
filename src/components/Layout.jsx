import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutIcon, UsersIcon, BuildingIcon, InboxIcon, HomeIcon, BanIcon, UserIcon, FileTextIcon, RocketIcon } from 'lucide-react';

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
      <aside className="w-64 bg-main-blue shadow-md overflow-y-auto flex flex-col">
        <nav className="flex-grow mt-5">
          <div className="mb-2 px-4 text-sm font-semibold text-gray-400 uppercase">
            Outbound Campaign Management
          </div>
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
          <NavLink to="/exclusions">
            <BanIcon className="mr-3 h-5 w-5" />
            Exclusions
          </NavLink>
          <NavLink to="/inbox">
            <InboxIcon className="mr-3 h-5 w-5" />
            Inbox
          </NavLink>
          
          <div className="mt-8 mb-2 px-4 text-sm font-semibold text-gray-400 uppercase">
            Ideation & Strategy
          </div>
          <NavLink to="/onboarding">
            <RocketIcon className="mr-3 h-5 w-5" />
            Onboarding
          </NavLink>
          <NavLink to="/personas">
            <UserIcon className="mr-3 h-5 w-5" />
            Personas
          </NavLink>
          <NavLink to="/message-templates">
            <FileTextIcon className="mr-3 h-5 w-5" />
            Message Templates
          </NavLink>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div>
              <p className="text-sm text-white">User: John Doe</p>
              <p className="text-xs text-gray-400">Company: Acme Inc.</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
