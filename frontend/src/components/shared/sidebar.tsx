import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { Home, User, UserPlus } from "lucide-react";
import { cn } from "../../lib/utils";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { path: "/docs", label: "Home",  line:true, icon: <Home size={20} /> },
    { path: "/docs/login", label: "Login", line:false,  icon: <User size={20} /> },
    { path: "/docs/register", label: "Register",line:true,   icon: <UserPlus size={20} /> },
    { path: "/orders", label: "Buyurtmalar", line:false,  icon: <Home size={20} /> },
  ];

  return (
    <div className="col-span-3">
      <div className="md:hidden p-4 bg-secondary flex items-center justify-between shadow-lg">
        <h1 className="text-lg font-semibold text-sidebarText">Menyular</h1>
        <button onClick={toggleMenu} className="text-3xl text-sidebarText">
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      <aside
        className={`bg-secondary h-[90vh] shadow-lg transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out fixed md:static top-0 left-0 w-64 z-50 md:w-full`}
      >
        <div className="p-4">
          <h1 className="font-semibold mb-4">Documentations</h1>
          <ul className="flex flex-col space-y-1">
            {links.map(({ path, label, icon,line }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={cn(
                    `flex items-center gap-2 px-3 py-2 rounded-md transition-all`,
                     line && "border-b border-accent-foreground" 
                  )
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {icon}
                  <span className="font-medium">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};
