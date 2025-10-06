export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-heading font-bold text-2xl mb-4">KAAपड.</h3>
            <p className="text-muted-foreground text-sm">
              KAAपड – more than clothes, it’s comfort, confidence, and culture.Dress the way you feel, every single day.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium mb-4">COMPANY</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Home</a></li>
              <li><a href="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">About Us</a></li>
              <li><a href="/delivery" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Delivery</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="font-medium mb-4">GET IN TOUCH</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>+91-987-456-3210</li>
              <li>contact@KAAपड.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium mb-4">SUBSCRIBE</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get latest updates on new arrivals and exclusive offers
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border border-border focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            Copyright 2025 © KAAपड..com - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}