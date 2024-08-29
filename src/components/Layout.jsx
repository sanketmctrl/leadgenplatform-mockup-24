import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutIcon, UsersIcon, BuildingIcon, InboxIcon } from 'lucide-react';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <Link to="/campaigns" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <LayoutIcon className="mr-3 h-5 w-5" />
            Campaigns
          </Link>
          <Link to="/prospects" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <UsersIcon className="mr-3 h-5 w-5" />
            Prospects
          </Link>
          <Link to="/accounts" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <BuildingIcon className="mr-3 h-5 w-5" />
            Accounts
          </Link>
          <Link to="/inbox" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <InboxIcon className="mr-3 h-5 w-5" />
            Inbox
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;