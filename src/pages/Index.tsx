import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

// Temporary product data (replace with actual data later)
const featuredProducts = [
  {
    id: "1",
    name: "Dragon Scale Pendant",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80",
    category: "Pendants",
  },
  {
    id: "2",
    name: "Elven Crown",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80",
    category: "Head Accessories",
  },
  {
    id: "3",
    name: "Tribal Necklace",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80",
    category: "Necklaces",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Creations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;