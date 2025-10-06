// src/pages/admin/dashboard/Dashboard.tsx (or AdminDashboard.jsx)

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package2, ShoppingCart, Users, IndianRupee } from "lucide-react";

// --- Data Definitions (Same as before) ---
const stats = [
  {
    title: "Total Products",
    value: "520",
    description: "+5 this week",
    icon: Package2,
  },
  {
    title: "Total Orders",
    value: "2,345",
    description: "+12% from last month",
    icon: ShoppingCart,
  },
  {
    title: "Total Customers",
    value: "1,234",
    description: "+3 today",
    icon: Users,
  },
  {
    title: "Total Revenue",
    value: "₹123,456",
    description: "+23% this month",
    icon: IndianRupee,
  },
];

const recentOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2025-09-24",
    amount: "₹4,999",
    status: "Processing",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2025-09-24",
    amount: "₹2,499",
    status: "Delivered",
  },
  {
    id: "ORD003",
    customer: "Mike Johnson",
    date: "2025-09-23",
    amount: "₹3,999",
    status: "Pending",
  },
  {
    id: "ORD004",
    customer: "Sarah Wilson",
    date: "2025-09-23",
    amount: "₹1,999",
    status: "Delivered",
  },
];

const lowStock = [
  {
    id: "PRD001",
    name: "Cotton T-Shirt",
    stock: 5,
    threshold: 10,
  },
  {
    id: "PRD002",
    name: "Denim Jeans",
    stock: 3,
    threshold: 8,
  },
  {
    id: "PRD003",
    name: "Running Shoes",
    stock: 2,
    threshold: 5,
  },
];

// --- AdminDashboard Component (Now clean and layout-free) ---
export default function AdminDashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Panel</h1>

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 2. Recent Orders Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders across your store</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "Processing"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 3. Low Stock Alert Card */}
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Alert</CardTitle>
          <CardDescription>Products that need reordering</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStock.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.threshold}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">Low Stock</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}