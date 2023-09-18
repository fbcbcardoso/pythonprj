import { useState } from 'react';
import logoGPS from "../assets/img/gps-logo.png";
import { BsArrowLeftShort, BsChevronDown, BsReverseLayoutTextSidebarReverse, BsPerson } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const Menus = [
        { title: "Dashboard" },
        {
            title: "Projects",
            icon: <BsReverseLayoutTextSidebarReverse />,
            submenu: true,
            subMenuItems: [
                { title: "Submenu 1" },
                { title: "Submenu 2" },
                { title: "Submenu 3" },
            ],
        },
        { title: "Perfil", spacing: true, icon: <BsPerson /> },
        // { title: "Configuração", icon: <AiOutlineSetting /> },
        { title: "Sair", icon: <AiOutlineLogout /> },
    ];

    return (
            <div className="flex">
                <div
                    className={`bg-dark-blue h-full p-5 pt-8 ${
                        open ? "w-72" : "w-20"
                    } duration-300 relative`}
                >
                    <BsArrowLeftShort
                      className={`bg-light-blue text-white text-3xl
                      rounded-full absolute -right-3 top-9 border
                      border-white cursor-pointer ${
                        !open && "rotate-180"
                      }`}
                      onClick={() => setOpen(!open)}
                     />
                <div className="inline-flex">
                <h1 className={`text-white origin-left font-medium
                text-2xl duration-300 ${!open && "scale-0"}`}
                >
				    <img src={logoGPS} className="p-5" alt=""/>
                </h1>
                </div>
                <div 
                    className={`flex items-center rounded-md mt-6 ${
                        !open ? "px-2.5" : "px-4"
                    } py-2`}
                >
                    </div>
                    <ul className="pt-2">
                        {Menus.map((menu, index) => (
                            <>
                                <li 
                                    key={index} 
                                    className={`text-gray-300 text-sm flex items-center 
                                     gap-x-4 cursor-pointer p-2 hover:bg-light-blue 
                                     rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}
                                    >
                                    <span className="text-2xl block float-left">
                                        {menu.icon ? menu.icon : <RiDashboardFill />}
                                    </span>
                                    <span 
                                        className={`text-base font-medium flex-1 
                                        duration-200 ${
                                            !open && "hidden"}
                                        `}>
                                        {menu.title} 
                                    </span>
                                    {menu.submenu && open && (
                                        <BsChevronDown className={`${submenuOpen && 
                                         "rotate-180"}`} onClick={() => setSubmenuOpen
                                         (!submenuOpen)} />
                                    )}
                                </li>

                                {menu.submenu && submenuOpen && open && (
                                    <ul>
                                        {menu.subMenuItems.map((submenuItem, index) => (
                                            <li key={index} className="text-gray-300 text-sm flex items-center 
                                            gap-x-4 cursor-pointer p-2 hover:bg-light-white 
                                            rounded-md">
                                                {submenuItem.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ))}
                    </ul>
                </div>
            </div>
  );
};

export default Sidebar;