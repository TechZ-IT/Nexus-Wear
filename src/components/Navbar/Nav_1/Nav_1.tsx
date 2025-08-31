"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { MdLocalGroceryStore } from 'react-icons/md'
import Nav_Search from '../Nav_Search'
import useAuthState from '@/hooks/useAuthState'
import { IoMenuOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Nav_Dropdown } from './Nav_Dropdown'

const categories = [
    "Mens",
    "Womans",
    "Shoes",
    "Accessories",
    "Dresses",
    "Terms & conditions",
    "About Us",
    "Contact Us",
]

export default function Nav_1() {
    const pathName = usePathname();
    const user = useAuthState();
    return (
        <div className="flex justify-between items-center">
            <div className='flex gap-2'>
                <Link href={'/'}>
                    <img src="https://nexus-wear-dashboard.vercel.app/mainLogo.png" alt="Logo" className="w-20 h-9" />
                </Link>

                {pathName !== '/' && (
                    <Select>
                        <SelectTrigger className="">
                            <IoMenuOutline className="" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.map((item, ind) => <SelectItem key={ind} value={item}>{item}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            </div>

            <div className="max-w-3xl w-full lg:block hidden">
                <Nav_Search></Nav_Search>
            </div>

            <div className="flex gap-2">
                <Button><MdLocalGroceryStore /></Button>
                {
                    user && user.email ? <Nav_Dropdown /> : <>
                        <Link href={'/login'}><Button variant={"outline"} className="">Login</Button></Link>
                        <Link href={'/register'}><Button className="">Register</Button></Link></>
                }
            </div>
        </div>
    )
}