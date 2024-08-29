import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutIcon, UsersIcon, BuildingIcon, InboxIcon, HomeIcon, BanIcon, UserIcon, FileTextIcon, RocketIcon, MenuIcon, XIcon } from 'lucide-react';

const NavLink = ({ to, children, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-white hover:bg-light-blue hover:text-main-blue transition-colors duration-200 ${
        isActive ? 'bg-opacity-20 bg-light-blue' : ''
      } ${isCollapsed ? 'justify-center' : ''}`}
    >
      {children}
    </Link>
  );
};

const Layout = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsNavVisible(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside 
        className={`bg-main-blue shadow-md overflow-y-auto flex flex-col transition-all duration-300 
          ${isNavVisible ? (isHovered ? 'w-64' : 'w-20') : 'w-0'} 
          md:relative fixed z-20 h-full md:h-[calc(100vh-2rem)] md:my-4 md:ml-4 p-2 rounded-r-lg md:rounded-lg`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <nav className="flex-grow mt-5">
          <div className={`mb-2 px-4 text-sm font-semibold text-gray-400 uppercase ${!isHovered ? 'hidden' : ''}`}>
            OUTBOUND CAMPAIGNS
          </div>
          <NavLink to="/" isCollapsed={!isHovered}>
            <HomeIcon className={`h-5 w-5 ${!isHovered ? '' : 'mr-3'}`} />
            {isHovered && 'Dashboard'}
          </NavLink>
          <NavLink to="/campaigns" isCollapsed={!isHovered}>
            <LayoutIcon className={`h-5 w-5 ${!isHovered ? '' : 'mr-3'}`} />
            {isHovered && 'Campaigns'}
          </NavLink>
          <NavLink to="/prospects" isCollapsed={!isHovered}>
            <UsersIcon className={`h-5 w-5 ${!isHovered ? '' : 'mr-3'}`} />
            {isHovered && 'Prospects'}
          </NavLink>
          <NavLink to="/accounts" isCollapsed={!isHovered}>
            <BuildingIcon className={`h-5 w-5 ${!isHovered ? '' : 'mr-3'}`} />
            {isHovered && 'Accounts'}
          </NavLink>
          <NavLink to="/exclusions" isCollapsed={!isHovered}>
            <BanIcon className={`h-5 w-5 ${!isHovered ? '' : 'mr-3'}`} />
            {isHovered && 'Exclusions'}
          </NavLink>
          <NavLink to="/inbox" isCollapsed={!isHovered}>
            <InboxIcon className={`h-5 w-5 ${!isHovered ? '' : 'mr-3'}`} />
            {isHovered && 'Inbox'}
          </NavLink>
          
          <div className={`mt-8 mb-2 px-4 text-sm font-semibold text-gray-400 uppercase ${!isHovered ? 'hidden' : ''}`}>
            Ideation & Strategy
          </div>
          <NavLink to="/onboarding" isCollapsed={!isHovered}>
            <RocketIcon className={`h-5 w-5 ${!isHovered ? '' : 'mr-3'}`} />
            {isHovered && 'Onboarding'}
          </NavLink>
          <NavLink to="/personas" isCollapsed={!isHovered}>
            <UserIcon className={`h-5 w-5 ${!isHovered ? '' : 'mr-3'}`} />
            {isHovered && 'Personas'}
          </NavLink>
          <NavLink to="/message-templates" isCollapsed={!isHovered}>
            <FileTextIcon className={`h-5 w-5 ${!isHovered ? '' : 'mr-3'}`} />
            {isHovered && 'Message Templates'}
          </NavLink>
        </nav>
        <div className={`p-4 border-t border-gray-700 ${!isHovered ? 'hidden' : ''}`}>
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
