import React, { useState } from 'react'; // 1. Added explicit import for useState
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext'; 
// NOTE: Assuming your CartContext is correctly set up with a clearCart function

// Define the structure for cart item data
interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    size: string;
}

// Define the structure for the order data passed via state
interface OrderDetails {
    items: CartItem[];
    subtotal: string;
    shipping: number;
    total: string;
}

// Define the structure for shipping data
interface ShippingInfo {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
}

export default function Checkout() {
    // 2. PLACED ALL HOOKS AND VARIABLES INSIDE THE COMPONENT FUNCTION
    const location = useLocation();
    const navigate = useNavigate(); // Fixes "Cannot find name 'navigate'"
    const { clearCart } = useCart(); // Fixes "Cannot find name 'clearCart'"
    
    // Safely cast the state to the expected type and get the order object
    // Fixes "Cannot find name 'order'"
    const order: OrderDetails | undefined = (location.state as { order: OrderDetails })?.order;

    // State for shipping information
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    
    // MODIFIED mockProcessPayment to include form validation
    const mockProcessPayment = () => {
        if (!order) {
            alert("Error: Order data is missing.");
            return;
        }

        // Basic validation: check if all shipping fields are filled
        const requiredFields = Object.values(shippingInfo).filter(val => val.trim() === '');
        if (requiredFields.length > 0) {
            alert("Please fill in all shipping details before proceeding.");
            return;
        }

        console.log("Shipping Info Collected:", shippingInfo);

        // 1. Simulate API call success
        alert(`Processing secure payment of $${order.total} for ${shippingInfo.fullName}... Payment Confirmed!`);
        
        // 2. Clear the cart 
        clearCart(); 

        // 3. Redirect to the success page
        navigate('/order-success'); 
    };

    // Existing if (!order) return block
    if (!order) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-medium mb-4">No Order Data Found</h1>
                <p className="text-muted-foreground mb-8">Please return to the cart to proceed.</p>
                <Link 
                to="/cart" 
                className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                VIEW CART
                </Link>
            </div>
        );
    }


    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <h1 className="text-2xl font-heading font-semibold mb-6">Secure Checkout</h1>
                
                {/* === 1. Shipping Information FORM === */}
                <div className="p-6 border border-border rounded-lg mb-6 shadow-sm">
                    <h2 className="text-xl font-medium mb-4">1. Shipping & Contact Information</h2>
                    
                    <form className="space-y-4">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={shippingInfo.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={shippingInfo.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Street Address"
                            value={shippingInfo.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={shippingInfo.city}
                                onChange={handleInputChange}
                                className="px-4 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                                required
                            />
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="ZIP / Postal Code"
                                value={shippingInfo.zipCode}
                                onChange={handleInputChange}
                                className="px-4 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                                required
                            />
                        </div>
                    </form>
                </div>
                
                {/* === 2. Payment Method Placeholder === */}
                <div className="p-6 border border-border rounded-lg mb-6 shadow-sm">
                    <h2 className="text-xl font-medium mb-4">2. Payment Method</h2>
                    <p className="text-sm text-muted-foreground">
                        [**TO DO:** Integrate Stripe/PayPal SDK UI for real payment fields.]
                    </p>
                    <div className="h-24 bg-gray-50 mt-4 border border-dashed flex items-center justify-center text-sm text-gray-500 rounded">
                        Credit Card Input / Payment Widget Placeholder
                    </div>
                </div>
            </div>

            {/* === Order Summary === */}
            <div className="lg:col-span-1">
                <div className="border border-border p-6 rounded-lg sticky top-8 shadow-md">
                    <h2 className="font-medium mb-4 border-b pb-2">Order Summary</h2>
                    
                    <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto border-b pb-4">
                        {order.items.map(item => (
                            <li key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                                <span>{item.name} ({item.size}) x {item.quantity}</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>${order.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Shipping Fee</span>
                            <span>$10.00</span>
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                            <span>Order Total</span>
                            <span>${order.total}</span>
                        </div>
                    </div>
                    
                    {/* Final Payment Button (calls the mock function) */}
                    <button 
                        // Note: Added type="button" to prevent form submission if this button were inside a <form>
                        type="button"
                        onClick={mockProcessPayment} 
                        className="w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                    >
                        CONFIRM & PAY ${order.total}
                    </button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                        Payment is secure and encrypted. (Mock Demo)
                    </p>
                </div>
            </div>
        </div>
    );
}