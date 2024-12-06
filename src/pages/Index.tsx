import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: {
    name: string;
  };
}

const Index = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          image_url,
          category:categories(name)
        `);
      
      if (error) throw error;
      return data as Product[];
    }
  });

  console.log('Products:', products);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Creations</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-primary/20 aspect-square rounded-lg mb-4"></div>
                <div className="bg-primary/20 h-4 w-2/3 rounded mb-2"></div>
                <div className="bg-primary/20 h-4 w-1/3 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">Error loading products</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image_url}
                category={product.category.name}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;