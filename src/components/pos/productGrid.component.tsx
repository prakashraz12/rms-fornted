import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ProductCard from "./productCard.component";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Beef Crowich",
    category: "Sandwich",
    price: 5.5,
    image:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1709783522/lrdd5pcv0hchgkmdyued.jpg",
  },
  {
    id: 2,
    name: "Buttermelt Croissant",
    category: "Pastry",
    price: 4.0,
    image:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1703603652/dqzpecliy7lcd2n8q0dy.jpg",
  },
  {
    id: 3,
    name: "Cereal Cream Donut",
    category: "Donut",
    price: 2.45,
    image:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1702619026/xckfeccxjqtlqssghh3e.jpg",
  },
  {
    id: 4,
    name: "Cheesy Cheesecake",
    category: "Cake",
    price: 3.75,
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/11/21/FNK_Intsant-Pot-Texas-Style-Chili-Mac_H1.jpg.rend.hgtvcom.1280.960.suffix/1700604212111.jpeg",
  },
  {
    id: 5,
    name: "Cheezy Sourdough",
    category: "Bread",
    price: 4.5,
    image:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1701521016/zxdhwcvvqxw9vtjskc6g.jpg",
  },
  {
    id: 6,
    name: "Egg Tart",
    category: "Tart",
    price: 3.25,
    image:
      "https://images.ctfassets.net/awb1we50v0om/2Spf80TME2zIhLqsi3Zxv9/919421a45f3260ee426c99c35235f1c8/Plates03__3__copy3.jpg?w=1920&fm=webp&q=70",
  },
  {
    id: 7,
    name: "Grains Pan Bread",
    category: "Bread",
    price: 4.5,
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1465939620872.jpeg",
  },
  {
    id: 8,
    name: "Spinchoco Roll",
    category: "Pastry",
    price: 4.0,
    image:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5mYimhB-E4MQcgwmIdV3Ng1EOPNjd82JMlpjD92nOGm2DKJjXQgr42BlDVWDXFHJBGeG5amIULY3W6WS6NG4",
  },
 
  
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard productItem={product} key={product?.id} />
      ))}
    </div>
  );
}
