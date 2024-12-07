import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductManagement from "@/components/admin/ProductManagement";
import OrderManagement from "@/components/admin/OrderManagement";

const Admin = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="products" className="flex-1">Product Management</TabsTrigger>
          <TabsTrigger value="orders" className="flex-1">Order Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>
        
        <TabsContent value="orders">
          <OrderManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;