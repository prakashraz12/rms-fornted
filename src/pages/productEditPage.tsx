import EditproductComponent from "@/components/product/editProductPage.component";
import { useParams } from "react-router-dom";

const ProductEditPage = () => {
  const { id } = useParams();
  return <>{id && <EditproductComponent id={parseInt(id)} />}</>;
};

export default ProductEditPage;
