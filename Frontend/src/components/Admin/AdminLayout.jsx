
import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Wrench,
  CreditCard,
  BarChart3,
  Search,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";
import logo from "../../assets/Athenura.png";

const AdminLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const modules = [
    {
      name: "User Management",
      icon: Users,
      path: "/admin/users",
    },
    {
      name: "Order Management",
      icon: ClipboardList,
      path: "/admin/orders",
    },
    {
      name: "Service Management",
      icon: Wrench,
      path: "/admin/services",
    },
    {
      name: "Inquiries",
      icon: MessageSquare,
      path: "/admin/inquiries",
    },
    {
      name: "Payments",
      icon: CreditCard,
      path: "/admin/payments",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
  ];

  const handleBackToWebsite = () => {
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-white rounded-lg shadow-md cursor-pointer"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`w-64 bg-white shadow-lg fixed h-full overflow-y-auto transition-transform duration-300 z-50 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          <img
            src={logo}
            alt="logo"
            className="h-12 w-auto object-contain cursor-pointer"
            onClick={() => handleNavigation("/admin")}
          />

          <p className="text-sm text-gray-500 mt-2">
            Admin Panel
          </p>
        </div>

        <div className="px-4 mb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search menu..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <nav className="px-4 space-y-1">
          <button
            onClick={() => handleNavigation("/admin")}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
              location.pathname === "/admin"
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="text-sm">Dashboard</span>
          </button>

          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
              Management
            </p>

            {modules
              .filter((module) =>
                module.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((module) => {
                const IconComponent = module.icon;

                return (
                  <button
                    key={module.name}
                    onClick={() => handleNavigation(module.path)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
                      isActive(module.path)
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent size={20} />
                    <span className="text-sm">
                      {module.name}
                    </span>
                  </button>
                );
              })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleBackToWebsite}
              className="w-full text-left px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-3"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">
                Back to Website
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all flex items-center gap-3 mt-1"
            >
              <LogOut size={20} />
              <span className="text-sm">
                Logout
              </span>
            </button>
          </div>
        </nav>
      </aside>

      <main className="ml-0 lg:ml-64 flex-1 p-4 md:p-8">
        <Outlet />

        <div className="mt-8 text-center text-xs text-gray-400">
          © 2026 LaundryHub Admin Panel. All rights reserved.
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

