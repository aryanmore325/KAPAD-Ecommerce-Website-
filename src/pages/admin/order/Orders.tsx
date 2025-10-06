import React, { useState, useRef, useEffect } from "react";
const Button = ({ children, ...props }) => <button {...props} className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{children}</button>;
const Input = ({ ...props }) => <input {...props} className="pl-9 pr-4 py-2 w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />;
const Card = ({ children, ...props }) => <div {...props} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">{children}</div>;
const CardContent = ({ children, ...props }) => <div {...props}>{children}</div>;
const CardDescription = ({ children, ...props }) => <p {...props} className="text-sm text-gray-500 mt-1">{children}</p>;
const CardHeader = ({ children, ...props }) => <div {...props} className="mb-4">{children}</div>;
const CardTitle = ({ children, ...props }) => <h3 {...props} className="text-xl font-semibold">{children}</h3>;
const Table = ({ children, ...props }) => <table {...props} className="w-full text-left border-collapse">{children}</table>;
const TableBody = ({ children, ...props }) => <tbody {...props}>{children}</tbody>;
const TableCell = ({ children, ...props }) => <td {...props} className="py-3 px-4 border-b border-gray-100">{children}</td>;
const TableHead = ({ children, ...props }) => <th {...props} className="py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">{children}</th>;
const TableHeader = ({ children, ...props }) => <thead {...props}>{children}</thead>;
const TableRow = ({ children, ...props }) => <tr {...props} className="hover:bg-gray-50 transition-colors">{children}</tr>;
const Badge = ({ children, variant, ...props }) => {
    let colorClass = 'text-gray-600 bg-gray-100';
    switch (variant) {
        case 'success':
            colorClass = 'text-green-700 bg-green-100';
            break;
        case 'info':
            colorClass = 'text-blue-700 bg-blue-100';
            break;
        case 'destructive':
            colorClass = 'text-red-700 bg-red-100';
            break;
        case 'secondary':
            colorClass = 'text-purple-700 bg-purple-100';
            break;
        default:
            break;
    }
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>{children}</span>;
};
const Search = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
    </svg>
);
const DropdownMenu = ({ open, onClose, children }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!open) return null;

    return (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {children}
            </div>
        </div>
    );
};
const DropdownMenuItem = ({ children, href = "#" }) => (
    <a href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
        {children}
    </a>
);


// Define the interface for an Order
interface Order {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: 'Delivered' | 'Processing' | 'Pending' | 'Shipped';
}

// Mock data for the orders list
const MOCK_ORDERS: Order[] = [
  { id: "ORD001", customerName: "John Doe", date: "2025-09-24", amount: 4999, status: "Processing" },
  { id: "ORD002", customerName: "Jane Smith", date: "2025-09-24", amount: 2499, status: "Delivered" },
  { id: "ORD003", customerName: "Mike Johnson", date: "2025-09-23", amount: 3999, status: "Pending" },
  { id: "ORD004", customerName: "Sarah Wilson", date: "2025-09-23", amount: 1999, status: "Delivered" },
  { id: "ORD005", customerName: "Michael Brown", date: "2025-09-22", amount: 5500, status: "Shipped" },
  { id: "ORD006", customerName: "Jessica Lee", date: "2025-09-22", amount: 1500, status: "Pending" },
  { id: "ORD007", customerName: "David Chen", date: "2025-09-21", amount: 3250, status: "Delivered" },
];

const getStatusVariant = (status: Order['status']) => {
  switch (status) {
    case 'Delivered':
      return "success";
    case 'Processing':
      return "info";
    case 'Pending':
      return "destructive";
    case 'Shipped':
      return "secondary";
    default:
      return "default";
  }
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredOrders = MOCK_ORDERS.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  
  const handleMenuClose = () => {
    setOpenMenuId(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-gray-500">
            Manage your customer orders and their details.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>
            View and manage all your store's orders.
          </CardDescription>
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <a href={`/admin/orders/${order.id}`} className="hover:underline text-blue-600">
                        {order.id}
                      </a>
                    </TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right relative">
                      <Button onClick={() => handleMenuToggle(order.id)}>
                        <span className="sr-only">Open menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-gray-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                      <DropdownMenu open={openMenuId === order.id} onClose={handleMenuClose}>
                          <DropdownMenuItem href={`/admin/orders/${order.id}`}>View</DropdownMenuItem>
                          <DropdownMenuItem href={`/admin/orders/${order.id}/edit`}>Edit</DropdownMenuItem>
                          <DropdownMenuItem href={`/admin/orders/${order.id}/delete`}>Delete</DropdownMenuItem>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
