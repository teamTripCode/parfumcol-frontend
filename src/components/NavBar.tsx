"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import logoParfum from "@/assets/logo-parfum.png";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    ShoppingCart,
    Menu,
    User,
    Settings,
    X,
    LogOut,
    LogIn
} from "lucide-react";


import CartInNav from "./cartNav";
import DevelopmentBanner from "@/components/TopAlert";
import { FiGrid } from "react-icons/fi";
import { RiBuildingLine, RiMessage2Line } from "react-icons/ri";
import { SiBlockchaindotcom } from "react-icons/si"

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(true);
    const router = useRouter();
    const { user } = useAuth();

    const NavLinks = [
        { label: "Colecciones", path: "/catalogo", icon: <FiGrid className="mr-1 h-2 w-4" /> },
        { label: "Casas de Perfume", path: "/casas", icon: <RiBuildingLine className="mr-1 h-2 w-4" /> },
        { label: "Contacto", path: "/contacts", icon: <RiMessage2Line className="mr-1 h-2 w-4" /> },
        { label: "Criptomoneda", path: "/contacts", icon: <SiBlockchaindotcom className="mr-1 h-2 w-4" /> }
    ];

    const renderNavLinks = (isMobile = false) => (
        <>
            {NavLinks.map((link) => (
                <Button
                    key={link.path}
                    variant="ghost"
                    onClick={() => {
                        if (isMobile) setIsMenuOpen(false);
                        router.push(link.path);
                    }}
                    className="w-full justify-start text-gray-600 hover:text-black transition-colors duration-300 gap-1"
                >
                    {link.icon}
                    {link.label}
                </Button>
            ))}
        </>
    );

    return (
        <>
            <DevelopmentBanner onClose={() => setBannerVisible(false)} />
            <nav className={`fixed left-0 w-full bg-white/80 backdrop-blur-md shadow-light border-b border-gray-100 z-40 transition-all duration-300 ${bannerVisible ? "top-12 sm:top-10" : "top-0"}`}>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center justify-between px-[5%] py-4">
                    <div className="flex items-center gap-8">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => router.push("/")}
                        >
                            <div className="flex flex-col">
                                <h3 className="text-1xl font-serif font-light tracking-wider text-gray-800 pt-1 drop-shadow-lg">PARFUMCOL</h3>
                                <p className="text-[9px] font-thin">Más que un aroma, una inversion</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {renderNavLinks()}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <CartInNav />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="rounded-full">
                                    <User className="mr-2 h-4 w-4" />
                                    {user ? user.name : "Cuenta"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                {user ? (
                                    <>
                                        <DropdownMenuItem onSelect={() => router.push("/profile")}>
                                            <User className="mr-2 h-4 w-4" />
                                            Perfil
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onSelect={() => {/* logout logic */ }}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Cerrar Sesión
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <DropdownMenuItem onSelect={() => router.push("/auth")}>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Iniciar Sesión
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center justify-between px-[5%] py-4">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        <div className="flex flex-col">
                        <h3 className="text-1xl font-serif font-light tracking-wider text-gray-800 pt-1">PARFUMCOL</h3>
                        <p className="text-[9px] font-thin text-gray-800 drop-shadow-lg">Más que un aroma, una inversion</p>
                        </div>
                    </div>

                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                {isMenuOpen ? <X className="text-gray-800" /> : <Menu className="text-gray-800" />}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="bg-white/95 p-5">
                            <div className="flex flex-col p-4 justify-start">
                                <Image width={40} height={40} src={logoParfum} alt="Parfum Colombia Logo" className="rounded-full mb-2" />
                            </div>
                            <div className="mt-4 space-y-4">
                                {renderNavLinks(true)}
                                <Button
                                    variant="ghost"
                                    onClick={() => router.push("/cart")}
                                    className="w-full justify-start"
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Carrito
                                </Button>

                                <div className="border-t border-gray-200 pt-3">
                                    {user ? (
                                        <>
                                            <Button
                                                variant="ghost"
                                                onClick={() => router.push("/profile")}
                                                className="w-full justify-start"
                                            >
                                                <User className="mr-2 h-4 w-4" />
                                                Perfil
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => {/* logout logic */ }}
                                                className="w-full justify-start text-red-600"
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Cerrar Sesión
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            onClick={() => router.push("/auth")}
                                            className="w-full justify-start text-green-600"
                                        >
                                            <LogIn className="mr-2 h-4 w-4" />
                                            Iniciar Sesión
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </>
    );
}

export default NavBar;