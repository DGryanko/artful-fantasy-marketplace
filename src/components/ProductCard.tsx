import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the add to cart button
    addItem({ id, name, price, image });
  };

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
          <div className="flex items-center justify-between w-full">
            <p className="text-primary-foreground/80">${price}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-accent"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;