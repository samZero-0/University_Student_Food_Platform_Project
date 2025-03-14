import  { useState } from 'react';
import { Send, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
<<<<<<< HEAD
    return (
        <div className="mt-32 ">
            <footer className="footer footer-center bg-accent text-base-content rounded p-10">
  <nav className="grid grid-flow-col gap-4">
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - SamZero & PhantomMekat</p>
  </aside>
</footer>
=======
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
>>>>>>> 6273bec4e22911599145bb25b1c43cfd0ac8c72f
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