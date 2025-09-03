"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: 1, name: "Mens", icon: "👔" },
  { id: 2, name: "Womens", icon: "👗" },
  { id: 3, name: "Shoes", icon: "👟" },
  { id: 4, name: "Accessories", icon: "👜" },
  { id: 5, name: "Wedding Dresses", icon: "💍" },
  { id: 6, name: "Kids Wear", icon: "🧒" },
  { id: 7, name: "Winter Collection", icon: "🧥" },
  { id: 8, name: "Bags", icon: "🎒" },
  { id: 9, name: "Terms", icon: "📄" },
];

export default function Categories() {
  const [visibleCategories, setVisibleCategories] = useState<Category[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCategories(categories.slice(0, 3)); // Mobile
      } else if (width < 768) {
        setVisibleCategories(categories.slice(0, 5)); // Small Tablet
      } else if (width < 1024) {
        setVisibleCategories(categories.slice(0, 6)); // Tablet
      } else {
        setVisibleCategories(categories.slice(0, 8));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="
        pb-3
        lg:pb-10 
        relative 
        lg:-mt-16
        z-20
      "
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="
            grid 
            grid-cols-3
            sm:grid-cols-5
            md:grid-cols-6
            lg:grid-cols-8 
            gap-3
          "
        >
          {visibleCategories.map((category) => (<div key={category.id}>

            <div
             
              className="
                bg-white 
                rounded-full 
                shadow-sm 
                border border-gray-100 
                h-20 w-20
                flex flex-col 
                items-center 
                justify-center 
                cursor-pointer 
                hover:bg-black
                hover:text-white 
                transition duration-300 
                mx-auto
              "
            >
              <span className="text-4xl mb-2">{category.icon}</span>
            </div>
              <h3 className="text-sm font-semibold text-center">
                {category.name}
              </h3>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
