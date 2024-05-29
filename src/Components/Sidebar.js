import React, { useState } from "react";
import "./sidebar.css";
import logo from "../Images/logo.png";
// import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { FaAngleRight } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { GrOrganization } from "react-icons/gr";
import { MdOutlineGroups2 } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const [submenuOpenIndex, setSubmenuOpenIndex] = useState(null);

  const Menus = [
    {
      title: "Home",
      path: "/home",
      icon: <IoHome className="text-[1.8rem]" />,
    },
    {
      title: "Members",
      path: "/members",
      icon: <BsPersonCircle className="text-[1.5rem]" />,
    },
    {
      title: "Utility",
      submenu: true,
      icon: <GrOrganization className="text-[1.5rem]" />,
      submenuItems: [
        { title: "District", path: "/district" },
        { title: "Taluka", path: "/taluka" },
        { title: "Village", path: "/village" },
        { title: "Education", path: "/education" },
        { title: "Relation", path: "/relation" },
        { title: "Blood Group", path: "/bloodGroup" },
        { title: "Occupation", path: "/occupation" },
        { title: "Commitee", path: "/commitee" },
      ],
    },
    {
      title: "Commitee Members",
      path: "/commitee-members",
      icon: <MdOutlineGroups2 className="text-[1.5rem]" />,
    },

    { title: "News/Message", path: "/news" },
    { title: "Business Detail", path: "/business" },
    { title: "Reports", path: "/reports" },
  ];

  const toggleSubmenu = (index) => {
    setSubmenuOpenIndex(submenuOpenIndex === index ? null : index);
  };

  return (
    <div>
      <div
        className={`sidebar-bg h-screen py-5 pt-8 ${
          open ? "w-[22rem]" : "w-[6rem]"
        } relative duration-500 z-30`}
      >
        <FaAngleRight
          className={`bg-slate-100 arrow_in_out text-black text-[3rem] rounded-full absolute -right-4 top-[9rem] p-1 border-slate-100 cursor-pointer ${
            open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex items-center logo_wrapper">
          <img
            src={logo}
            className={`${
              open ? "w-[6rem]" : "w-[6rem]"
            } text-sm rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-black origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            BABARIYA FAMILY
          </h1>
        </div>

        <ul className="pt-[4rem] px-6 sidebar_main">
          {Menus.map((menu, index) => (
            <React.Fragment key={index}>
              <Link to={menu.path}>
                <li
                  className={`list flex justify-center items-center gap-x-4 cursor-pointer py-4 px-3`}
                  onClick={() => toggleSubmenu(index)}
                >
                  <span className="block float-left">
                    {menu.icon ? (
                      menu.icon
                    ) : (
                      <MdDashboardCustomize
                        className={`${!open && "text-[2rem]"}`}
                      />
                    )}
                  </span>
                  <span
                    className={`flex-1 duration-900 ${
                      !open && "scale-0"
                    } ${!open && "hidden"}`}
                  >
                    {menu.title}
                  </span>
                  {menu.submenu && open && (
                    <BsChevronDown
                      className={`ml-3 ${
                        submenuOpenIndex === index && "rotate-180"
                      }`}
                    />
                  )}
                </li>
              </Link>
              {menu.submenu && submenuOpenIndex === index && open && (
                <ul className="submenu_wrapper">
                  {menu.submenuItems.map((submenuItem, subIndex) => (
                    <Link to={submenuItem.path} key={subIndex}>
                      <li
                        className={`text-white p-2 mr-3 flex nest-list items-center gap-x-4 cursor-pointer py-2 px-[2rem] hover:text-black rounded-sm ${
                          !open && "scale-0"
                        }`}
                      >
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
