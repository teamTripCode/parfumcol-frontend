"use client";

import { useState } from 'react';
import { IconSearch, IconBriefcase2, IconMenu2, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

function NavBar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter()

    return (
        <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-80 backdrop-blur-lg shadow-md flex flex-row justify-between items-center px-[5%] py-5 z-50">
            {/* Left Section */}
            <div className="hidden md:flex flex-row gap-5">
                <p className="cursor-pointer text-lg" onClick={() => router.push('/catalogo')}>Catálogo</p>
                <p className="cursor-pointer text-lg">Contacto</p>
            </div>

            {/* Center Section */}
            <div className='grid place-content-center'>
                <h3 className="text-xl font-bold text-gray-700">PARFUM COLOMBIA</h3>
            </div>

            {/* Right Section */}
            <div className="flex flex-row items-center gap-4">
                {/* Search Icon and Input */}
                <div className="relative">
                    <div
                        className="grid place-content-center cursor-pointer"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <IconSearch className="text-gray-700" />
                    </div>
                    {isSearchOpen && (
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="absolute top-full mt-7 right-0 left-[-200] md:left-[-170px] w-80 p-2 border border-gray-300 rounded-md shadow-md transition-all duration-300"
                        />
                    )}
                </div>

                {/* Briefcase Icon */}
                <div className="grid place-content-center">
                    <IconBriefcase2 className="text-gray-700 cursor-pointer" />
                </div>

                {/* Menu Icon (Mobile Only) */}
                <div className="md:hidden grid place-content-center cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <IconX className="text-gray-700" /> : <IconMenu2 className="text-gray-700" />}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
                    <ul className="flex flex-col items-center gap-4 py-4">
                        <a className="cursor-pointer" >Catálogo</a>
                        <li className="cursor-pointer">Contacto</li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default NavBar;