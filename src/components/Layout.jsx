import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutIcon, UsersIcon, BuildingIcon, InboxIcon, HomeIcon, BanIcon, UserIcon, FileTextIcon, RocketIcon, MenuIcon, XIcon } from 'lucide-react';

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
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside 
        className={`bg-main-blue shadow-md overflow-y-auto flex flex-col
          fixed md:relative z-20 h-full w-64
          md:h-[calc(100vh-2rem)] md:my-4 md:ml-4 md:rounded-lg
          transition-all duration-300 ${isNavVisible ? 'left-0' : '-left-64'} md:left-0`}
      >
        <nav className="flex-grow mt-5 px-4 py-6">
          <div className="mb-6 text-sm font-semibold text-gray-400 uppercase">
            Outbound Campaign Management
          </div>
          <NavLink to="/">
            <HomeIcon className="h-5 w-5 mr-3" />
            Dashboard
          </NavLink>
          <NavLink to="/campaigns">
            <LayoutIcon className="h-5 w-5 mr-3" />
            Campaigns
          </NavLink>
          <NavLink to="/prospects">
            <UsersIcon className="h-5 w-5 mr-3" />
            Prospects
          </NavLink>
          <NavLink to="/accounts">
            <BuildingIcon className="h-5 w-5 mr-3" />
            Accounts
          </NavLink>
          <NavLink to="/exclusions">
            <BanIcon className="h-5 w-5 mr-3" />
            Exclusions
          </NavLink>
          <NavLink to="/inbox">
            <InboxIcon className="h-5 w-5 mr-3" />
            Inbox
          </NavLink>
          
          <div className="mt-8 mb-6 text-sm font-semibold text-gray-400 uppercase">
            Ideation & Strategy
          </div>
          <NavLink to="/onboarding">
            <RocketIcon className="h-5 w-5 mr-3" />
            Onboarding
          </NavLink>
          <NavLink to="/personas">
            <UserIcon className="h-5 w-5 mr-3" />
            Personas
          </NavLink>
          <NavLink to="/message-templates">
            <FileTextIcon className="h-5 w-5 mr-3" />
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
      <div className="flex flex-col flex-1">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button 
            onClick={toggleNav}
            className="text-main-blue hover:text-light-blue transition-colors duration-200 md:hidden"
          >
            {isNavVisible ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
          <div className="text-main-blue font-semibold">Leverage AI</div>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
      {isNavVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleNav}
        ></div>
      )}
    </div>
  );
};

export default Layout;
