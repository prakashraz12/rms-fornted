import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import "swiper/swiper-bundle.css";

import useGetCategory from "../category/hooks/useGetCategory";

export function CategorySwiper({
  handleCategoryChange,
  selectedCategory,
}: {
  handleCategoryChange: (category: string) => void;
  selectedCategory: string;
}) {
  const { category } = useGetCategory();

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={8}
      freeMode={true}
      modules={[FreeMode]}
      className="w-full mt-5"
    >
      {category?.map((category) => (
        <SwiperSlide key={category.id} className="!w-auto">
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer px-6 py-2 text-sm font-medium rounded-xl",
              selectedCategory === category.id?.toString() &&
                "bg-green-600 text-primary-foreground shadow hover:bg-green-600/90",
              selectedCategory === category.name &&
                "bg-green-600 text-primary-foreground shadow hover:bg-green-600/90"
            )}
            onClick={() => {
              if (category.name === "All") {
                handleCategoryChange("All");
              } else {
                handleCategoryChange(category.id?.toString());
              }
            }}
          >
            {category.name}
          </Badge>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CategorySwiper;
