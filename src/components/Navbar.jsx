import React from 'react';
import { UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src="/logo.png" alt="Leverage AI" />
          </div>
          <div className="ml-6 flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserCircle className="h-8 w-8 text-[#000080] hover:text-[#40E0D0]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;