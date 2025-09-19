import { Link } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden bg-secondary aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 font-medium">
            NEW
          </span>
        )}
        {product.isBestseller && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 font-medium">
            BESTSELLER
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
        <p className="mt-1 text-sm font-semibold">${product.price}</p>
      </div>
    </Link>
  );
}