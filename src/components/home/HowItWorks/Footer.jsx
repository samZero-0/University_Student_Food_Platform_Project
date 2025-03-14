import  { useState } from 'react';
import { Send, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-base-200 to-base-300 pt-16 mt-32">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About PlateMate</h3>
            <p className="text-base-content/80">
              Connecting students with local home-cooks for delicious, 
              homemade meals. Experience the taste of home, away from home.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/become-cook" className="hover:text-primary transition-colors">Become a Cook</a></li>
              <li><a href="/meal-plans" className="hover:text-primary transition-colors">Meal Plans</a></li>
              <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="/support" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>123 Student Ave, Campus City</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>sammekat@platemate.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-base-content/80">
              Subscribe to get special offers and weekly featured meals!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="join">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered join-item w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary join-item">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Bottom Footer */}
        <div className="py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-base-content/80">
            © {new Date().getFullYear()} PlateMate by SamZero & PhantomMekat. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-sm hover:text-primary transition-colors">Terms of Service</a>
            <a href="/cookies" className="text-sm hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-focus transition-colors duration-300 ease-in-out transform hover:scale-110"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 animate-bounce" />
      </button>
    </footer>
  );
};

export default Footer;