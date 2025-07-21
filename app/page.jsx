"use client";
import React, { useEffect } from "react";
import "./globals.css";

export default function Home() {
  useEffect(() => {
    // Scroll to top button
    const scrollTopBtn = document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ... (le reste des scripts ici)
  }, []);

  return (
    <div className="relative">
      {/* CONTENU JSX adapté du body */}
    </div>
  );
}
