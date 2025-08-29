import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import Navigation_Menu from './Navigation_Menu'

export default function Nav_2() {
  return (
    <div className='flex '>
      <NavigationMenu> {/* Single NavigationMenu wrapper */}
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
        
        <Navigation_Menu></Navigation_Menu>
      </NavigationMenu>
    </div>
  )
}