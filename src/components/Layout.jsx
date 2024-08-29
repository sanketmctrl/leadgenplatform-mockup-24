import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutIcon, UsersIcon, BuildingIcon, InboxIcon, HomeIcon, BanIcon, UserIcon, FileTextIcon, RocketIcon, MenuIcon, XIcon } from 'lucide-react';

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-white hover:bg-light-blue hover:text-main-blue transition-colors duration-200 ${
        isActive ? 'bg-opacity-20 bg-light-blue' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-main-blue shadow-md overflow-y-auto m-2 rounded-lg">
        <nav className="mt-4 px-3">
          <div className="mb-2 text-sm font-semibold text-gray-400 uppercase">
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
          
          <div className="mt-8 mb-2 text-sm font-semibold text-gray-400 uppercase">
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
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-20 text-main-blue"
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <aside ref={menuRef} className="fixed inset-y-0 left-0 z-10 w-64 bg-main-blue shadow-md overflow-y-auto md:hidden">
          <nav className="mt-16">
            <div className="mb-2 px-4 text-sm font-semibold text-gray-400 uppercase">
              Outbound Campaign Management
            </div>
            <NavLink to="/" onClick={closeMenu}>
              <HomeIcon className="mr-3 h-5 w-5" />
              Dashboard
            </NavLink>
            <NavLink to="/campaigns" onClick={closeMenu}>
              <LayoutIcon className="mr-3 h-5 w-5" />
              Campaigns
            </NavLink>
            <NavLink to="/prospects" onClick={closeMenu}>
              <UsersIcon className="mr-3 h-5 w-5" />
              Prospects
            </NavLink>
            <NavLink to="/accounts" onClick={closeMenu}>
              <BuildingIcon className="mr-3 h-5 w-5" />
              Accounts
            </NavLink>
            <NavLink to="/exclusions" onClick={closeMenu}>
              <BanIcon className="mr-3 h-5 w-5" />
              Exclusions
            </NavLink>
            <NavLink to="/inbox" onClick={closeMenu}>
              <InboxIcon className="mr-3 h-5 w-5" />
              Inbox
            </NavLink>
            
            <div className="mt-8 mb-2 px-4 text-sm font-semibold text-gray-400 uppercase">
              Ideation & Strategy
            </div>
            <NavLink to="/onboarding" onClick={closeMenu}>
              <RocketIcon className="mr-3 h-5 w-5" />
              Onboarding
            </NavLink>
            <NavLink to="/personas" onClick={closeMenu}>
              <UserIcon className="mr-3 h-5 w-5" />
              Personas
            </NavLink>
            <NavLink to="/message-templates" onClick={closeMenu}>
              <FileTextIcon className="mr-3 h-5 w-5" />
              Message Templates
            </NavLink>
          </nav>
        </aside>
      )}

      <main className="flex-1 p-8 overflow-auto md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
