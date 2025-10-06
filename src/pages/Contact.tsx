import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-medium mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
            </div>
            
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-medium mb-6">Our Store</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Address</h3>
              <p className="text-muted-foreground">
                123 Fashion Street<br />
                CSMT,DY 400001<br />
                MUMBAI , INDIA
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-muted-foreground">contact@KAAपड.com</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Phone</h3>
              <p className="text-muted-foreground">+91 987-654-3210</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Business Hours</h3>
              <p className="text-muted-foreground">
                Monday - Friday: 9:00 AM - 10:00 PM<br />
                Saturday: 10:00 AM - 6:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}