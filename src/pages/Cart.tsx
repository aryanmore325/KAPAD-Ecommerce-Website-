import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Add some products to your cart to see them here.</p>
        <Link
          to="/collection"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-heading font-semibold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="border border-border">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border font-medium text-sm">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Remove</div>
            </div>

            {/* Items */}
            {cartItems.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="grid grid-cols-12 gap-4 p-4 border-b border-border items-center">
                <div className="col-span-6 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-secondary"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    {item.selectedSize && (
                      <p className="text-sm text-muted-foreground mt-1">Size: {item.selectedSize}</p>
                    )}
                  </div>
                </div>
                
                <div className="col-span-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-secondary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="col-span-2 text-center font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <div className="col-span-2 text-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-secondary transition-colors inline-flex"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear Cart
          </button>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="border border-border p-6">
            <h2 className="font-medium mb-4">Cart Total</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping Fee</span>
                <span>$10.00</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>${(totalAmount + 10).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              PROCEED TO CHECKOUT
            </button>
          </div>

          {/* Promo Code */}
          <div className="border border-border p-6 mt-4">
            <h3 className="font-medium mb-4">Promo Code</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 text-sm border border-border focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                APPLY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}