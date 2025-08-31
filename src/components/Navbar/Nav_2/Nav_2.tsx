import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import Navigation_Menu from './Navigation_Menu'
import Nav_Search from '../Nav_Search'

export default function Nav_2() {
  return (
    <div className='flex items-center w-full'>
      <NavigationMenu className='list-none w-full'> {/* Single NavigationMenu wrapper */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className='bg-black text-white hover:bg-black hover:text-white'>All categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/">Components</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/">Documentation</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/">Blocks</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <div className='w-full'>
          <div className='hidden md:block'>
            <Navigation_Menu></Navigation_Menu>
          </div>
          <div className="w-full md:hidden flex">
            <Nav_Search></Nav_Search>
          </div>
        </div>
      </NavigationMenu>
    </div>
  )
}