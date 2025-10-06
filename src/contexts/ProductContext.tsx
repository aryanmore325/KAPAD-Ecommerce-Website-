import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from "react";
import { toast } from "@/components/ui/use-toast";

// Define the core Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  stock: number;
  lowStockAlert?: number;
  status: "active" | "draft" | "inactive";
  sku: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// Define the shape of the data coming directly from the AddProduct form (all fields as string)
interface ProductFormInput {
    name: string;
    description: string;
    price: string; // From input type="number", comes as string
    comparePrice?: string; // From input type="number", comes as string
    category: string;
    stock: string; // From input type="number", comes as string
    lowStockAlert?: string; // From input type="number", comes as string
    status: string; // From select
    sku: string;
    images: File[]; // Files are handled separately, we'll convert them to placeholder strings for now
}

interface ProductContextType {
  products: Product[];
  // Update addProduct signature to accept the raw form data
  addProduct: (productData: ProductFormInput) => Promise<void>; 
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
}

const initialMockProducts: Product[] = [
    {
        id: "PRD001",
        name: "Cotton T-Shirt",
        description: "A comfortable and classic cotton t-shirt.",
        price: 99.00,
        comparePrice: 120.00,
        category: "Clothing",
        stock: 50,
        status: "active",
        sku: "CTTS-001",
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "PRD002",
        name: "Denim Jeans",
        description: "Classic blue denim jeans.",
        price: 24.00,
        category: "Clothing",
        stock: 30,
        status: "active",
        sku: "DNJNS-002",
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // ... add more mock data if you want the table to start with data
];


const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("demo_products");
    // Use the initial mock data if nothing is saved in localStorage
    return saved ? JSON.parse(saved) : initialMockProducts; 
  });

  const addProduct = useCallback(
    async (productData: ProductFormInput) => {
      const now = new Date().toISOString();
        
        // Convert string inputs from form to correct types (number)
        const priceNum = parseFloat(productData.price);
        const stockNum = parseInt(productData.stock, 10);
        const comparePriceNum = productData.comparePrice ? parseFloat(productData.comparePrice) : undefined;
        const lowStockAlertNum = productData.lowStockAlert ? parseInt(productData.lowStockAlert, 10) : undefined;
        
        // Generate placeholder image URLs (in a real app, you'd handle file uploads)
        const imagePlaceholders = productData.images.map(file => `temp_url_${Date.now()}_${file.name}`);

      const newProduct: Product = {
        id: `PRD${Date.now()}`,
        name: productData.name,
        description: productData.description,
        price: priceNum,
        comparePrice: comparePriceNum,
        category: productData.category,
        stock: stockNum,
        lowStockAlert: lowStockAlertNum,
        // Ensure status matches the literal type 'active' | 'draft' | 'inactive'
        status: productData.status as "active" | "draft" | "inactive", 
        sku: productData.sku,
        images: imagePlaceholders,
        createdAt: now,
        updatedAt: now,
      };

      const updatedProducts = [newProduct, ...products]; // New product at the top
      setProducts(updatedProducts);
      localStorage.setItem("demo_products", JSON.stringify(updatedProducts));

      toast({
        title: "Success",
        description: "Product added successfully",
      });
    },
    [products]
  );

  const updateProduct = useCallback(
    async (id: string, productUpdate: Partial<Product>) => {
      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error("Product not found");
      }

      const updatedProducts = [...products];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        ...productUpdate,
        updatedAt: new Date().toISOString(),
      };

      setProducts(updatedProducts);
      localStorage.setItem("demo_products", JSON.stringify(updatedProducts));

      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    },
    [products]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem("demo_products", JSON.stringify(updatedProducts));

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    [products]
  );

  const getProduct = useCallback(
    (id: string) => {
      return products.find((p) => p.id === id);
    },
    [products]
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}