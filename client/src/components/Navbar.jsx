import React, { useState } from "react";
import Avatar from "./Avatar";
import { Link, NavLink } from "react-router-dom";
import { FiLogIn, FiMenu } from "react-icons/fi";
import SearchIcon from '@mui/icons-material/Search';
import Menu from "./Menu";

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const token = localStorage.getItem("token");

    return (
        <header className="shadow-sm sticky top-0 backdrop-blur-sm bg-[#fffefc80] z-20">
            <div className="box flex justify-between items-center p-3 px-16">
                {/* <Logo /> */}
                <NavLink to='/'>
                    <img src="./logo.png" alt="logo" className="h-8" />
                </NavLink>
                {/* Desktop navbar */}
                <nav className="hidden md:block">
                    {/* Navbar links */}
                    <ul className="flex gap-10">
                        <li>
                            <NavLink
                                to={"/"}
                                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/predict"}
                                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                            >
                                <SearchIcon />
                                {" "}
                                Predictor
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {/* Sign in button */}
                {token && token !== "" ? (
                    <div className="relative">
                        <Avatar />
                    </div>
                ) : (
                    <Link
                        to={"/login"}
                        className="hidden md:block"
                    >
                        <div className="flex flex-row items-center justify-center gap-1 hover:scale-105">

                            <button>Login</button>
                            <FiLogIn />
                        </div>
                    </Link>
                )}
                {/* Menu button */}

                <FiMenu
                    className="block md:hidden text-xl cursor-pointer"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                />

                {/* Mobile navbar */}
                <Menu
                    setIsCollapsed={setIsCollapsed}
                    isCollapsed={isCollapsed}
                />
            </div>
        </header>
    );
};

export default Navbar;
