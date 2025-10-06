import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data'; // Assuming this provides your product list
import { Link } from 'react-router-dom';
import { RefreshCw, Repeat, Headset } from 'lucide-react'; // ICONS IMPORTED

export default function Home() {
  const latestProducts = products.slice(0, 10);
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);

  return (
    <div>
      <Hero />

      {/* Latest Collections Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-0.5 bg-border"></span>
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Latest Collections</h2>
            <span className="w-12 h-0.5 bg-border"></span>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            KAAपड – more than clothes, it’s comfort, confidence, and culture.Dress the way you feel, every single day.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {latestProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/collection"
            className="inline-block px-8 py-3 border border-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            VIEW ALL COLLECTION
          </Link>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-0.5 bg-border"></span>
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Best Sellers</h2>
            <span className="w-12 h-0.5 bg-border"></span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Policy Section - ICONS ADDED */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            {/* 1. Easy Exchange Policy */}
            <div>
              <RefreshCw className="w-6 h-6 mx-auto mb-3 text-primary" />
              <h3 className="font-medium mb-2">Easy Exchange Policy</h3>
              <p className="text-sm text-muted-foreground">We offer hassle free exchange policy</p>
            </div>
            
            {/* 2. 7 Days Return Policy */}
            <div>
              <Repeat className="w-6 h-6 mx-auto mb-3 text-primary" />
              <h3 className="font-medium mb-2">7 Days Return Policy</h3>
              <p className="text-sm text-muted-foreground">We provide 7 days free return policy</p>
            </div>
            
            {/* 3. Best Customer Support */}
            <div>
              <Headset className="w-6 h-6 mx-auto mb-3 text-primary" />
              <h3 className="font-medium mb-2">Best Customer Support</h3>
              <p className="text-sm text-muted-foreground">We provide 24/7 customer support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}