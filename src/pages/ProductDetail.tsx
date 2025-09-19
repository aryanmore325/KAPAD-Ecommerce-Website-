import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { Star, ChevronLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-medium mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/collection')}
          className="text-primary underline"
        >
          Back to Collection
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-secondary cursor-pointer hover:opacity-80 transition-opacity">
                <img
                  src={product.image}
                  alt={`${product.name} ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-medium mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(122)</span>
          </div>

          <p className="text-2xl font-semibold mb-6">${product.price}</p>

          <p className="text-muted-foreground mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Select Size</h3>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    } transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors mb-6"
          >
            ADD TO CART
          </button>

          {/* Product Details Accordion */}
          <div className="border-t border-border pt-6 space-y-4">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-medium">Description</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-3 text-sm text-muted-foreground">
                An authentic clothing brand. Made from 100% premium cotton with attention to detail and comfort.
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-medium">Care Instructions</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-3 text-sm text-muted-foreground">
                Machine wash cold with like colors. Do not bleach. Tumble dry low. Cool iron if needed.
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-xl font-medium mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}