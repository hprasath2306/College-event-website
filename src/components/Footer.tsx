export default function Footer() {
    return (
      <footer className="mt-auto py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-[#FF3366] text-xl transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#FF3366] text-xl transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#FF3366] text-xl transition-colors">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
          <p className="text-gray-400">
            © 2025 College Events Fiesta. Made with 💖 by Students
          </p>
        </div>
      </footer>
    );
  }