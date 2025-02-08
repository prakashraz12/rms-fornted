import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Check, MoreHorizontal, Search, X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProductType } from "@/types/product.type";
import { useLazyGetProductByRestaurantIdQuery } from "@/services/api/product.api";

import { Checkbox } from "../ui/checkbox";
import useGetCategory from "../category/hooks/useGetCategory";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "../ui/date-range-picker";

export default function ProductTable() {
  const naviagte = useNavigate();
  const { category } = useGetCategory();

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [productType, setProductType] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);

  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState("10");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [
    getProducts,
    {
      data: productData,
      isLoading: isProductLoading,
      isSuccess: isProductFetched,
    },
  ] = useLazyGetProductByRestaurantIdQuery();

  const fetchProducts = React.useCallback(
    async (pageNumber: number, pageLimit: number, searchKeyWords?: string) => {
      await getProducts({
        page: pageNumber,
        limit: pageLimit,
        search: searchKeyWords,
        category: selectedCategory === "all" ? "" : selectedCategory,
        type: productType === "all" ? "" : productType,
        from: date?.from?.toISOString(),
        to: date?.to?.toISOString(),
      });
    },
    [
      page,
      setPage,
      limit,
      setLimit,
      date,
      setDate,
      selectedCategory,
      productType,
    ]
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(
        productData?.data?.data?.map((product: ProductType) => product.id)
      );
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const handleSearch = () => {
    fetchProducts(1, parseInt(limit), searchQuery);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setProductType("all");
    setDate({
      from: undefined,
      to: undefined,
    });
  };

  React.useEffect(() => {
    fetchProducts(page, parseInt(limit));
  }, [page, limit]);

  return (
    <div className="w-full mt-2">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          <div className="flex flex-col">
            <p className="text-sm mb-1 ml-2">Product Name</p>
            <Input
              placeholder="Product Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm mb-1 ml-2">Product Type</p>
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Product Type</SelectItem>
                <SelectItem value="SINGLE">Single</SelectItem>
                <SelectItem value="COMBO">Combo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <p className="text-sm mb-1 ml-2">Date</p>
            <DatePickerWithRange
              date={date}
              setDate={setDate}
              className="w-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm mb-1 ml-2">Category</p>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {category
                  ?.filter((category) => category.name !== "All")
                  .map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2 items-end justify-end">
            <Button
              variant="destructive"
              onClick={handleClearFilters}
              className="w-full md:w-auto"
            >
              Clear Filters
            </Button>
            <Button onClick={handleSearch} className="w-full md:w-auto">
              <Search className="mr-2" /> Search
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-xl p-4 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    selectedItems?.length === productData?.data?.data?.length
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Multiple Variants</TableHead>
              <TableHead>Inventory Management</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isProductLoading &&
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-5 w-[180px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-[80px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-[70px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-[90px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-[120px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            {isProductFetched &&
              productData?.data?.data?.map((product: ProductType) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(product.id)}
                      onCheckedChange={(checked) =>
                        handleSelectItem(checked as boolean, product.id)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar className="h-10 w-10 rounded-lg">
                      <AvatarImage
                        src={product?.image?.url}
                        alt="product-image"
                      />
                      <AvatarFallback className="rounded-lg font-medium">
                        {product?.name[0] || ""}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>
                    {product?.isOffer && product.offerPrice ? (
                      <div className="space-y-1">
                        <span className="line-through text-muted-foreground">
                          RS.{product.price}
                        </span>
                        <span className="block font-medium text-green-600">
                          RS.{product.offerPrice}
                        </span>
                      </div>
                    ) : (
                      `Rs.${product.price || "N/A"}`
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.productType === "COMBO"
                          ? "secondary"
                          : "warning"
                      }
                    >
                      {product.productType}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={product.isAvailable ? "success" : "destructive"}
                    >
                      {product.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>

                  <TableCell className="flex justify-center items-center">
                    {product?.isMultipleVariant ? (
                      <Check className="h-4 w-4 text-green-600 text-center" />
                    ) : (
                      <X className="h-4 w-4 text-red-600 text-center" />
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    {product?.isInventoryManagementEnabled ? (
                      <Check className="h-4 w-4 text-green-600 text-center" />
                    ) : (
                      <X className="h-4 w-4 text-center text-red-600" />
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(product?.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(product?.updatedAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            naviagte(`/product/edit/${product.id}`);
                          }}
                        >
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="space-x-2">
          {productData?.data?.meta?.currentPage !== 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
          )}
          {productData?.data?.meta?.currentPage <
            productData?.data?.meta?.totalPages && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Select value={limit} onValueChange={setLimit}>
            <SelectTrigger className="w-22">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm">{`Showing result of ${productData?.data?.meta?.currentPage} page of ${productData?.data?.meta?.totalPages}`}</p>
        </div>
      </div>
    </div>
  );
}
