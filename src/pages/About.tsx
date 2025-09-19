export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold mb-8 text-center">About Us</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <p className="text-muted-foreground">
          Forever was born out of a passion for innovation and a desire to revolutionize the way people shop for fashion online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of fashion products from the comfort of their homes.
        </p>
        
        <p className="text-muted-foreground">
          Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="text-muted-foreground">
          Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="text-center">
            <h3 className="font-medium mb-2">Quality Assurance</h3>
            <p className="text-sm text-muted-foreground">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className="text-center">
            <h3 className="font-medium mb-2">Convenience</h3>
            <p className="text-sm text-muted-foreground">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className="text-center">
            <h3 className="font-medium mb-2">Exceptional Customer Service</h3>
            <p className="text-sm text-muted-foreground">Our team of dedicated professionals is here to assist you every step of the way.</p>
          </div>
        </div>
      </div>
    </div>
  );
}