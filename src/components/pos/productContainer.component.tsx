import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PowerIcon, RefreshCcwIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductGrid } from "./productGrid.component";
import CategorySwiper from "./categorySwiper.component";

interface ProductContainerProps {
  setIsOpenProductContainerForSmallScreen: (type: boolean) => void;
}

const ProductContainer = ({
  setIsOpenProductContainerForSmallScreen,
}: ProductContainerProps) => {


  const handleCloseProductContainerMenuInMobileScreen = () => {
    setIsOpenProductContainerForSmallScreen(false);
  };
  
  return (
    <div className="w-full lg:mt-3 md:mt-2  lg:px-4 md:px-2">
      <div className="flex items-center space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 gap-2">
        <div className="flex items-center space-x-2 mt-3 md:hidden">
          <Button
            size="icon"
            className="h-10 w-10 bg-primary rounded-xl"
            onClick={handleCloseProductContainerMenuInMobileScreen}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Collapse</span>
          </Button>
        </div>
        <div className={cn("flex items-center space-x-2 flex-grow")}>
          <div className="relative flex-grow items-center flex">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Product"
              className="pl-8 pr-4 h-10 w-full rounded-xl"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 bg-green-500 hover:bg-green-600 rounded-xl"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="icon"
            className="h-10 w-10 bg-green-500 hover:bg-green-600 rounded-xl"
          >
            <RefreshCcwIcon className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button
            size="icon"
            className="h-10 w-10 bg-red-500 hover:bg-red-600 rounded-xl"
          >
            <PowerIcon className="h-4 w-4" />
            <span className="sr-only">Power</span>
          </Button>
        </div>
      </div>
      {/* category swiper */}
      <CategorySwiper />
      {/* product list */}
      <div className="lg:mt-6 md:mt-4 mt-2  p-1 h-[90vh] overflow-scroll">
        <ProductGrid />
      </div>
    </div>
  );
};

export default ProductContainer;
