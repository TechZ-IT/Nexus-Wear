"use client"

import { useEffect, useState } from "react";
import For_Sale_Card from "./For_Sale_Card";
import { Button } from "@/components/ui/button";
export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 17,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const { hours, minutes, seconds } = prevTime;
        
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;
        
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes = minutes - 1;
          
          if (newMinutes < 0) {
            newMinutes = 59;
            newHours = hours - 1;
            
            if (newHours < 0) {
              // Timer completed
              clearInterval(timer);
              return { hours: 0, minutes: 0, seconds: 0 };
            }
          }
        }
        
        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="bg-[#F9F9F9] rounded-xl px-5 max-w-7xl mx-auto py-10">
      {/* Header with countdown */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 md:mb-0">Flash Sale</h2>
        <div className="flex items-center space-x-4 bg-white px-6 py-3 rounded-lg shadow-sm">
          <span className="text-sm text-black">Time left:</span>
          <div className="flex items-center space-x-2">
            <div className="bg-black text-white px-3 py-1 rounded-md">
              <span className="text-lg font-bold">{formatTime(timeLeft.hours)}</span>
            </div>
            <span className="text-black font-bold">:</span>
            <div className="bg-black text-white px-3 py-1 rounded-md">
              <span className="text-lg font-bold">{formatTime(timeLeft.minutes)}</span>
            </div>
            <span className="text-black font-bold">:</span>
            <div className="bg-black text-white px-3 py-1 rounded-md">
              <span className="text-lg font-bold">{formatTime(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <For_Sale_Card
          title="EliteShield Performance"
          category="Men's Jackets"
          originalPrice="Rp525.000"
          salePrice="Rp255.000"
          rating="9/10"
          badgeText="Sale"
          imageUrl="https://www.peakperformance.com/us/media/catalog/product/cache/55c5cdd1c3eb66319904b1430bd35b82/article_images/G79804030/G79804030_db2bfc5ae5835b0d1359d360764e1adf.jpg?optimize=low&format=pjpg&auto=webp&width=408&crop=3:4"
        />
        <For_Sale_Card
          title="Gentlemen's Summer Gray Hat"
          category="Premium Blend"
          originalPrice="Rp150.000"
          salePrice="Rp99.000"
          rating="9/10"
          badgeText="Sale"
          imageUrl="https://n.nordstrommedia.com/it/3c6d9b5a-07ee-4c52-b300-2b3d7fe5c47d.jpeg?h=368&w=240&dpr=2"
        />
        <For_Sale_Card
          title="OptiZoom Camera Shoulder Bag"
          category="Camera Accessories"
          originalPrice="Rp425.000"
          salePrice="Rp250.000"
          rating="5/10"
          badgeText="Sale"
          imageUrl="https://ae01.alicdn.com/kf/HTB14L5DxsyYBuNkSnfoq6AWgVXaE.jpg"
        />
        <For_Sale_Card
          title="Cloudy Chic"
          category="Grey Peep Toe Heeled Sandals"
          originalPrice="Rp580.000"
          salePrice="Rp270.000"
          rating="5/10"
          badgeText="Sale"
          imageUrl="https://m.media-amazon.com/images/I/71N1hjwzuWL._UY900_.jpg"
        />
      </div>

      {/* View More button */}
      <div className="flex justify-center mt-10">
        <Button className="">
          View More
        </Button>
      </div>
    </div>
  );
}