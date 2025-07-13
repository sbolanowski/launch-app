import React from "react";
import { Navbar, NavbarContent, NavbarBrand, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { ImRocket } from "react-icons/im";
import { SiSpacex } from "react-icons/si";


//https://react-icons.github.io/react-icons/icons?name=fa6

export default function Nav({ currentPage, setCurrentPage }) {

    return (
        <Navbar height={"8dvh"} isBordered isBlurred={false} >

        <NavbarContent>

            {/*Logo*/}
            <NavbarBrand>
                <ImRocket/>
                <p className="font-bold text-inherit text-large text-default-500 title">  &nbsp; LaunchAppX</p>
            </NavbarBrand>
        </NavbarContent>

            <NavbarContent className="sm:flex gap-4" justify="center">

                <NavbarItem>
                    <Link
                        color={currentPage === "Previous" ? "" : "foreground"}
                        href="#"
                        onClick={() => setCurrentPage("Previous")}
                        aria-current={currentPage === "Previous" ? "page" : ""}
                    >
                        Previous
                    </Link>
                </NavbarItem>

                <Dropdown showArrow radius="sm" className="p-0 border-small border-divider dark text-foreground bg-background">
                    <NavbarItem>
                        <DropdownTrigger>
                            <Link
                                color={(currentPage === "Upcoming" || currentPage === "SpaceX") ? "" : "foreground"}
                                href="#"
                                aria-current={(currentPage === "Upcoming" || currentPage === "SpaceX") ? "page" : ""}
                            >
                                Upcoming
                            </Link>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        itemClasses={{ base: "gap-4",}}
                    >
                        <DropdownItem
                            key="autoscaling"
                            onClick={() => setCurrentPage("Upcoming")}
                            startContent={<ImRocket />}
                            className={(currentPage === "Upcoming") ? "text-primary" : ""}
                        >
                            All launches
                        </DropdownItem>
                        <DropdownItem
                            key="autoscaling"
                            onClick={() => setCurrentPage("SpaceX")}
                            startContent={<SiSpacex className="text-xl"/>}
                            className={(currentPage === "SpaceX") ? "text-primary" : ""}
                        >
                            Space X
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
            </NavbarContent>


        {/*Botón link*
        <NavbarContent justify="end">
            <NavbarItem>
            <Button as={Link} color="primary" href="https://www.github.com" variant="flat">
                <FaGithub></FaGithub> GitHub
            </Button>
            </NavbarItem>
        </NavbarContent>*/}

        {/*Contenido menu, en función lista de items*
        <NavbarMenu className="dark" >
            {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                        color= "foreground"
                        className="w-full"
                        href={item === "About Me" ? "/" : `/${item.toLowerCase()}`}
                        size="lg"
                        onClick={closeMenu}
                    >
                        {item}
                    </Link>
            </NavbarMenuItem>
            ))}
        </NavbarMenu>*/}
        </Navbar>
    );
}
