import React, { useState } from "react";
import "./UserSidebar.css";
import logo from "../Images/logo.png";
import { MdDashboardCustomize } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { PiUser } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { GrOrganization } from "react-icons/gr";
import { MdOutlineGroups2 } from "react-icons/md";
import { Link } from "react-router-dom";
import { SiGooglemessages } from "react-icons/si";
import { MdBusinessCenter } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";

const Sidebar = ({ open, setOpen }) => {
  const [submenuOpenIndex, setSubmenuOpenIndex] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const Menus = [
    {
      title: "Member Profile",
      path: "/userProfile",
      icon: <PiUser className="text-[1.8rem]" />,
    },
    {
      title: "Business Detail",
      icon: <MdBusinessCenter className="text-[1.5rem]" />,
      submenu: true,
      submenuItems: [
        { title: "Business Overview", path: "/businessOverview" },
        { title: "Add Business", path: "/businessDetails" },
      ],
    },
    {
      title: "News/Message",
      path: "/newsMessage",
      icon: <SiGooglemessages className="text-[1.5rem]" />,
    },
    {
      title: "Logout",
      path: "/",
      icon: <TbLogout className="text-[1.5rem]" onClick={handleLogout}/>,
    }
  ];

  const toggleSubmenu = (index) => {
    setSubmenuOpenIndex(submenuOpenIndex === index ? null : index);
  };

  return (
    <div>
      <div className={`sidebar-bg h-screen py-5 pt-3 ${open ? "w-[22rem]" : "w-[6rem]"} relative duration-500 z-30`}>
        <div className="inline-flex items-center logo_wrapper mt-1">
          <img
            src={logo}
            className={`${open ? "w-[5rem]" : "w-[4rem]"} text-sm rounded cursor-pointer float-left mr-2 ml-5 duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1 className={`text-black origin-left font-medium text-[2.3rem]l duration-300 ${!open && "scale-0"}`}>
            BABARIYA FAMILY
          </h1>
        </div>
        <ul className="pt-[0.1rem] px-6 sidebar_main">
          {Menus.map((menu, index) => (
            <React.Fragment key={index}>
              <Link to={menu.path}>
                <li
                  className={`list flex justify-center items-center gap-x-4 cursor-pointer py-4 px-3`}
                  onClick={() => {
                    if (menu.onClick) {
                      menu.onClick();
                    }
                    if (menu.submenu) {
                      toggleSubmenu(index);
                    }
                  }}
                >
                  <span className="block float-left">
                    {menu.icon ? (
                      menu.icon
                    ) : (
                      <MdDashboardCustomize className={`${!open && "text-[2rem]"}`} />
                    )}
                  </span>
                  <span className={`flex-1 duration-900 ${!open && "scale-0"} ${!open && "hidden"}`}>
                    {menu.title}
                  </span>
                  {menu.submenu && open && (
                    <BsChevronDown className={`ml-3 ${submenuOpenIndex === index && "rotate-180"}`} />
                  )}
                </li>
              </Link>
              {menu.submenu && submenuOpenIndex === index && open && (
                <ul className="submenu_wrapper">
                  {menu.submenuItems.map((submenuItem, subIndex) => (
                    <Link to={submenuItem.path} key={subIndex}>
                      <li className={`text-white p-2 mr-3 flex nest-list items-center gap-x-4 cursor-pointer py-2 px-[2rem] hover:text-black rounded-sm ${!open && "scale-0"}`}>
                        {submenuItem.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
