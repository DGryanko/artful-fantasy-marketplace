import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-accent">
          Handcrafted Fantasy Jewelry
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
          Discover unique LARP, fantasy, and ethnic-inspired pieces crafted with passion and precision
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/products">Explore Collection</Link>
          </Button>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10">
            <Link to="/about">About Our Craft</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;