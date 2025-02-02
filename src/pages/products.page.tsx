import ProductTable from "@/components/product/productList.component";
const Products = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold">Product Management</h1>
      <p className="text-sm">Manage your food items form here.</p>
      <ProductTable />
    </div>
  );
};

export default Products;
