// layouts/MainLayout.tsx - Contains the header and sidebar
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  FolderIcon,
  UserGroupIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/creamcollar-logo.svg";

const MainLayout = () => {
  const location = useLocation();

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path
      ? "bg-blue-50 text-blue-600"
      : "text-gray-700 hover:bg-gray-100";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <img src={logo} alt="crea collar" className="h-8" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-14 w-64 h-[calc(100vh-4rem)] border-r border-gray-200 bg-white">
          <div className="p-4">
            <p className="text-sm font-medium text-gray-500">Explore</p>

            <nav className="mt-4 space-y-1">
              <Link
                to="/"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(
                  "/"
                )}`}
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                Dashboard
              </Link>

              <Link
                to="/trainer-repository"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(
                  "/trainer-repository"
                )}`}
              >
                <FolderIcon className="h-5 w-5 mr-3" />
                Trainer Repository
              </Link>

              <div className="border-t border-gray-200 my-4"></div>

              <Link
                to="/lead-generation"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(
                  "/lead-generation"
                )}`}
              >
                <UserGroupIcon className="h-5 w-5 mr-3" />
                Lead Generation
              </Link>

              <Link
                to="/screening-request"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(
                  "/screening-request"
                )}`}
              >
                <ClipboardIcon className="h-5 w-5 mr-3" />
                Screening Request
              </Link>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <div className="flex items-center mb-6">
            {/*  <button className="rounded-full p-2 bg-blue-500 text-white mr-3">
              <ChevronLeftIcon className="h-5 w-5" />
            </button> */}
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
