import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { MdLocalGroceryStore } from 'react-icons/md'
import Nav_Search from './Nav_Search'

export default function Nav_1() {
    return (
        <div className="flex justify-between items-center">
            <Link href={'/'}>
                <img src="https://nexus-wear-dashboard.vercel.app/mainLogo.png" alt="Logo" className="w-20" />
            </Link>
            <div className="max-w-4xl w-full">
                <Nav_Search></Nav_Search>
            </div>
            <div className="flex gap-2">
                <Button><MdLocalGroceryStore /></Button>
                <Button variant={"outline"} className="md:block hidden">Login</Button>
                <Button className="md:block hidden">Register</Button>
            </div>
        </div>
    )
}
