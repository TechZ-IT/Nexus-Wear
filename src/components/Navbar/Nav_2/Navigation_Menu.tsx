"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

export default function Navigation_Menu() {
  const pathName = usePathname()

  return (
    <div className='flex flex-wrap ml-3 gap-2'>
      {categories.map((item, ind) => (
        <Link href={`/categories/${item}`} key={ind}>
          <Button
            variant={pathName === `/categories/${item}` ? 'outline' : 'ghost'}

          >
            {item}
          </Button>
        </Link>
      ))}
    </div>
  )
}