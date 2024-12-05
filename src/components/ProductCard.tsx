import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`}>
      <Card className="overflow-hidden bg-primary border-accent/20 hover:border-accent/40 transition-colors">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 gap-1">
          <p className="text-sm text-accent">{category}</p>
          <h3 className="font-cinzel text-lg">{name}</h3>
          <p className="text-primary-foreground/80">${price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;