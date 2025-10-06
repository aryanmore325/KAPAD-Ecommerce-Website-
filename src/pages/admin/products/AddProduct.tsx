import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
// ADD this import
import { useProducts } from "@/contexts/ProductContext";

// Define the shape of your product data for TypeScript
// Aligning names to match ProductContext fields where possible
interface ProductState {
  name: string;
  sku: string;
  description: string;
  category: string;
  status: string; // Keep as string for form inputs
  price: string; // Keep as string for form inputs
  comparePrice: string; // Keep as string for form inputs
  stock: string; // Keep as string for form inputs
  lowStockAlert: string; // Renamed from lowStock to lowStockAlert
  images: File[];
}

// Initial state for the new product form with all fields
const initialProductState: ProductState = {
  name: "",
  sku: "",
  description: "",
  category: "clothing", // Default category
  status: "active", // Default status
  price: "",
  comparePrice: "",
  stock: "",
  lowStockAlert: "",
  images: [],
};

export default function AddProduct() {
  const navigate = useNavigate();
  // Get addProduct function from context
  const { addProduct } = useProducts();
  
  // Use ProductState interface for type safety
  const [product, setProduct] = useState<ProductState>(initialProductState);

  // Handler for text and number inputs (since they all use e.target.id)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  // Handler specifically for Select components (which provide value directly)
  const handleSelectChange = (value: string, fieldId: keyof ProductState) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [fieldId]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: files,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call the addProduct context function with the form data
    // The context will handle type conversion (string to number)
    try {
        // We use the object spread to ensure all fields, including empty ones, are passed
        await addProduct({
            ...product,
            // LowStockAlert needs to be renamed for submission if it was called lowStock
            lowStockAlert: product.lowStockAlert || "0" 
        }); 
        
        setProduct(initialProductState); // Clear the form on success
        navigate("/admin/products"); // Navigate back to the product list
    } catch (error) {
        console.error("Failed to add product:", error);
        // You could add a toast/error message here
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/products")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add Product</h2>
          <p className="text-muted-foreground">
            Add a new product to your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>
              Basic information about the product
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="Enter product SKU"
                  value={product.sku}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                className="min-h-[100px]"
                value={product.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={product.category}
                  onValueChange={(value) => handleSelectChange(value, "category")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={product.status}
                  onValueChange={(value) => handleSelectChange(value, "status")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing & Inventory</CardTitle>
            <CardDescription>
              Manage product pricing and stock levels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={product.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comparePrice">Compare at Price (₹)</Label>
                <Input
                  id="comparePrice"
                  type="number"
                  placeholder="0.00"
                  value={product.comparePrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={product.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                {/* Updated ID to lowStockAlert */}
                <Label htmlFor="lowStockAlert">Low Stock Alert</Label> 
                <Input
                  id="lowStockAlert" 
                  type="number"
                  placeholder="0"
                  value={product.lowStockAlert}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>
              Upload product images (up to 5 images)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or WebP (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="images"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {product.images.length > 0 && (
              <div className="mt-4 flex gap-4 overflow-x-auto py-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="h-20 w-20 object-cover rounded-lg" 
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => navigate("/admin/products")}>
            Cancel
          </Button>
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </div>
  );
}