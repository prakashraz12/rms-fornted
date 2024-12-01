import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

interface Category {
  id: string;
  name: string;
  color: string;
}

const categories: Category[] = [
  { id: "1", name: "All", color: "bg-gray-500" },
  { id: "2", name: "Sandwich", color: "bg-orange-500" },
  { id: "3", name: "Pastry", color: "bg-green-500" },
  { id: "4", name: "Donut", color: "bg-purple-500" },
  { id: "5", name: "Cake", color: "bg-pink-500" },
  { id: "6", name: "Bread", color: "bg-blue-500" },
  { id: "7", name: "Tart", color: "bg-yellow-500" },
  { id: "8", name: "Coffee", color: "bg-yellow-500" },
  { id: "9", name: "Tea", color: "bg-yellow-500" },
  { id: "10", name: "Juice", color: "bg-yellow-500" },
  { id: "11", name: "Milk", color: "bg-yellow-500" },
  { id: "12", name: "Water", color: "bg-yellow-500" },
  { id: "13", name: "Soda", color: "bg-yellow-500" },
  { id: "14", name: "Beer", color: "bg-yellow-500" },
];

export function CategorySwiper() {
  const [activeCategory, setActiveCategory] = React.useState("1");

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={8}
      freeMode={true}
      modules={[FreeMode]}
      className="w-full mt-5"
    >
      {categories.map((category) => (
        <SwiperSlide key={category.id} className="!w-auto">
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer px-3 py-2 text-sm font-medium rounded-xl",
              activeCategory === category.id
                ? `${category.color} text-white`
                : "bg-transparent hover:bg-gray-100"
            )}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Badge>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CategorySwiper;
