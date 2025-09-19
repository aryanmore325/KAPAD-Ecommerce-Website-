import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-fashion.jpg';

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />
      <img
        src={heroImage}
        alt="Fashion Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-lg">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-0.5 bg-primary"></span>
            <span className="text-sm font-medium uppercase tracking-wider">Our Bestsellers</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fade-in">
            Latest Arrivals
          </h1>
          
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-sm font-medium border-b-2 border-primary pb-1 hover:gap-4 transition-all"
          >
            SHOP NOW
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}