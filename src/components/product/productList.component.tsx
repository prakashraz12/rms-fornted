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
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProductType } from "@/types/product.type";
import { useLazyGetProductByRestaurantIdQuery } from "@/services/api/product.api";

import { Checkbox } from "../ui/checkbox";
import useGetCategory from "../category/hooks/useGetCategory";

export default function ProductTable() {
  const { category } = useGetCategory();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState("10");

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
      });
    },
    [page, setPage, limit, setLimit]
  );

  const handleSearch = () => {
    fetchProducts(1, parseInt(limit), searchQuery);
  };

  React.useEffect(() => {
    fetchProducts(page, parseInt(limit));
  }, [page, limit]);

  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex flex-1 items-center space-x-2">
          <div className="flex gap-2">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px]"
            />
            <Button disabled={!searchQuery.length} onClick={handleSearch}>
              <Search /> Search
            </Button>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {category.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => (window.location.href = "/product/create")}>
          <Plus /> Add Product
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
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
                    <Checkbox />
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
                    {product.isOffer && product.offerPrice ? (
                      <div className="space-y-1">
                        <span className="line-through text-muted-foreground">
                          RS.{product.price}
                        </span>
                        <span className="block font-medium text-green-600">
                          RS.{product.offerPrice}
                        </span>
                      </div>
                    ) : (
                      `$${product.price}`
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
                  <TableCell>
                    {format(new Date(product.createdAt), "MMM dd, yyyy")}
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
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
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
