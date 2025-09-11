import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-4 py-3 sm:py-4 sticky bottom-0 w-full shadow-lg">
      {/* Left Section */}
      <aside className="flex items-center gap-2 sm:gap-3">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current flex-shrink-0"
        >
          <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z" />
        </svg>
        <p className="text-xs sm:text-sm">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
      </aside>

      {/* Right Section - Socials */}
      <nav className="flex gap-3 sm:gap-4 md:place-self-center md:justify-self-end">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/sailakshmi-gajulapalli-4a05b2280"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition-all duration-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 
            2.76 2.24 5 5 5h14c2.76 0 5-2.24 
            5-5v-14c0-2.76-2.24-5-5-5zm-11 
            19h-3v-10h3v10zm-1.5-11.27c-.96 
            0-1.73-.79-1.73-1.73s.77-1.73 
            1.73-1.73c.95 0 1.73.79 
            1.73 1.73s-.78 1.73-1.73 
            1.73zm13.5 11.27h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 
            0-2.16 1.46-2.16 2.96v5.7h-3v-10h2.88v1.37h.04c.4-.76 
            1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 
            4.6v5.6z" />
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/sailakshmi-0987"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition-all duration-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 .5c-6.62 0-12 5.38-12 
            12 0 5.3 3.438 9.8 8.205 
            11.387.6.113.82-.262.82-.583 
            0-.288-.012-1.243-.018-2.25-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 
            1.205.084 1.84 1.236 
            1.84 1.236 1.07 1.835 2.807 
            1.305 3.492.998.108-.774.418-1.305.76-1.605-2.665-.3-5.466-1.333-5.466-5.93 
            0-1.31.467-2.382 
            1.235-3.222-.123-.303-.535-1.523.117-3.176 
            0 0 1.008-.322 3.3 1.23a11.52 
            11.52 0 0 1 6 0c2.29-1.552 
            3.297-1.23 3.297-1.23.653 1.653.24 
            2.873.118 3.176.77.84 
            1.233 1.912 1.233 3.222 0 
            4.61-2.803 5.628-5.475 
            5.922.43.372.814 1.102.814 
            2.222 0 1.606-.014 2.898-.014 
            3.293 0 .323.218.7.825.58a12.01 
            12.01 0 0 0 8.2-11.383c0-6.62-5.38-12-12-12z" />
          </svg>
        </a>

        {/* Portfolio */}
        <a
          href="https://portfolio-six-green-anvkn5d7hh.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition-all duration-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 2L1.5 9l10.5 7 
            10.5-7L12 2zm0 18.5L1.5 
            13l1.77-1.18L12 
            18l8.73-6.18L22.5 
            13 12 20.5z" />
          </svg>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
