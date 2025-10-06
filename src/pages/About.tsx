export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold mb-8 text-center">About Us</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <p className="text-muted-foreground">
          KAAPAD was founded on the belief that fashion should be accessible to everyone, everywhere. Our journey began with a simple goal: to create a digital space where you could effortlessly find, explore, and buy the latest styles, all from the comfort of your home. We're here to redefine the way you shop for clothes.
        </p>
        
        <p className="text-muted-foreground">
          From day one, we've been dedicated to curating a diverse and high-quality collection of products to match your unique style. We offer everything from trendy apparel and beauty essentials to tech gadgets and home goods, all sourced from trusted brands and designers.
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="text-muted-foreground">
          Our mission at KAAPAD is to give you the power of choice, convenience, and confidence in your shopping experience. We are committed to providing a seamless journey that goes beyond your expectations, from the moment you start browsing to the thrill of your order arriving at your door.
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="text-center">
            <h3 className="font-medium mb-2">Uncompromising Quality</h3>
            <p className="text-sm text-muted-foreground">We meticulously check every item to ensure it meets our strict quality standards before it reaches you.</p>
          </div>
          <div className="text-center">
            <h3 className="font-medium mb-2">Effortless Shopping</h3>
            <p className="text-sm text-muted-foreground">Our easy-to-use website and smooth checkout process make shopping a breeze, not a chore.</p>
          </div>
          <div className="text-center">
            <h3 className="font-medium mb-2">Dedicated Support</h3>
            <p className="text-sm text-muted-foreground">Our team of friendly professionals is here to help you with anything you need, every step of the way.</p>
          </div>
        </div>
      </div>
    </div>
  );
}