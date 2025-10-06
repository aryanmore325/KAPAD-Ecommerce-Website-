import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Assuming your context now returns `isLoading` and `isError` for robust handling
import { useProducts } from "@/contexts/ProductContext"; 

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, MoreVertical, Search } from "lucide-react";

// Assuming Product type definition is available globally or inferred from context
interface Product {
    id: string | number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: 'active' | 'draft' | 'inactive';
}

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Destructure only available properties from context
  const { 
      products, 
      deleteProduct
  } = useProducts(); 

  // If you want to handle loading/error, you need to implement them in your context and return them from useProducts.
  // For now, set them to false to avoid errors.
  const isLoading = false;
  const isError = false;

  // CRITICAL FIX: Ensure 'products' is an array to prevent the .filter() crash
  const productsArray: Product[] = Array.isArray(products) ? products as Product[] : [];

  const filteredProducts = productsArray.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to format the status for display
  const getStatusDisplay = (status: 'active' | 'draft' | 'inactive') => {
    switch (status) {
      case "active":
        return { text: "Active", variant: "default" };
      case "draft":
        return { text: "Draft", variant: "outline" };
      case "inactive":
        return { text: "Inactive", variant: "secondary" };
      default:
        // Handle unexpected status gracefully
        return { text: "Unknown", variant: "secondary" };
    }
  };

  // --- RENDERING SAFEGUARD: Display Loading/Error States First ---
  
  if (isLoading) {
    return (
        <div className="p-12 text-center text-lg text-muted-foreground">
            Loading products...
        </div>
    );
  }

  if (isError) {
    return (
        <div className="p-12 text-center text-lg text-red-600">
            Failed to load products. Check your console and network requests.
        </div>
    );
  }

  // --- Main Component Render ---
  const showNoResults = filteredProducts.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product inventory and details
          </p>
        </div>
        <Button onClick={() => navigate("add")}> 
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product List</CardTitle>
              <CardDescription>
                View and manage all your products
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showNoResults && productsArray.length === 0 && searchTerm === "" ? (
            <div className="py-12 text-center text-lg text-muted-foreground">
                No products found. Click "Add Product" to get started.
            </div>
          ) : showNoResults ? (
             <div className="py-12 text-center text-lg text-muted-foreground">
                No products match your search criteria.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const statusInfo = getStatusDisplay(product.status);
                  return (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      {/* Price must be a number for toFixed(2) */}
                      <TableCell>₹{(typeof product.price === 'number' ? product.price : parseFloat(String(product.price)) || 0).toFixed(2)}</TableCell> 
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge
                          // @ts-ignore is fine for utility components if types are custom
                          variant={statusInfo.variant} 
                        >
                          {statusInfo.text}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-destructive" 
                                onClick={() => deleteProduct(String(product.id))}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}