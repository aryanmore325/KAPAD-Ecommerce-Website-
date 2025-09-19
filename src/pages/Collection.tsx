import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import { Product } from '@/types/product';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { value: 'relevant', label: 'Sort by: Relevant' },
  { value: 'low-to-high', label: 'Sort by: Low to High' },
  { value: 'high-to-low', label: 'Sort by: High to Low' },
];

export default function Collection() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevant');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Sort
    if (sortBy === 'low-to-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-to-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, sortBy, searchQuery]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading font-semibold">
          ALL COLLECTIONS
          {searchQuery && (
            <span className="text-muted-foreground text-lg ml-2">
              - Searching for "{searchQuery}"
            </span>
          )}
        </h1>
        
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-background border border-border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className="w-64 hidden md:block">
          <div className="sticky top-20">
            <h3 className="font-medium mb-4">FILTERS</h3>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">CATEGORIES</h4>
              <div className="space-y-2">
                {['men', 'women', 'kids'].map(category => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 border-border accent-primary"
                    />
                    <span className="text-sm capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">TYPE</h4>
              <div className="space-y-2">
                {['Topwear', 'Bottomwear', 'Winterwear'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-border accent-primary"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Filters Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden fixed bottom-4 right-4 z-40 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg"
        >
          Filters
        </button>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="md:hidden fixed inset-0 bg-background z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium">FILTERS</h3>
              <button onClick={() => setShowFilters(false)} className="text-2xl">&times;</button>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">CATEGORIES</h4>
              <div className="space-y-2">
                {['men', 'women', 'kids'].map(category => (
                  <label key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 border-border accent-primary"
                    />
                    <span className="text-sm capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}