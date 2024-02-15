import React, { useEffect, useState } from "react";

import { FiArrowUp } from "react-icons/fi";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show the button when the user has scrolled down a certain distance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-2 bg-[#FE517E] text-white rounded-full hover:scale-110 transition duration-300 ease-in-out z-50"
        >
          <FiArrowUp size={28} />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
