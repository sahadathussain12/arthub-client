"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiPause,
  FiPlay,
} from "react-icons/fi";

const slides = [
  {
    subtitle: "ART THAT INSPIRES",
    title: "Discover & Buy\nOriginal Art",
    description:
      "Explore extraordinary artworks from talented artists around the world. Find something that speaks to your soul.",
    button: "Browse Artworks",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=2000&q=90",
    number: "01",
  },
  {
    subtitle: "EXPLORE CREATIVITY",
    title: "Every Artwork\nTells a Story",
    description:
      "Discover unique paintings, digital creations and timeless masterpieces made by passionate artists.",
    button: "Explore Collection",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=2000&q=90",
    number: "02",
  },
  {
    subtitle: "SUPPORT ARTISTS",
    title: "Bring Art Into\nYour World",
    description:
      "Connect with independent creators and make original art a part of your everyday life.",
    button: "Discover Art",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=2000&q=90",
    number: "03",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Next Slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // Previous Slide
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Automatic Slider - প্রতি ৫ সেকেন্ড পর পর স্লাইড পরিবর্তন হবে
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  if (!mounted) return null; // Hydration mismatch রোধ করতে

  const slide = slides[current];

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#100E16] text-white"
      onMouseEnter={() => setPaused(true)}  // মাউস নিলে স্লাইডার থেমে যাবে
      onMouseLeave={() => setPaused(false)} // মাউস সরালে আবার চালু হবে
    >
      {/* Background Image using standard img tag */}
      <div key={current} className="absolute inset-0 transition-opacity duration-1000">
        <img
          src={slide.image}
          alt="ArtHub featured artwork"
          className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[580px] max-w-[1440px] items-center px-5 py-20 sm:px-10 lg:min-h-[680px] lg:px-16">
        <div key={current + "-content"} className="max-w-3xl transition-all duration-700 transform translate-y-0 opacity-100">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-purple-400" />
            <span className="text-xs font-semibold tracking-[3px] text-purple-200">
              {slide.subtitle}
            </span>
          </div>

          {/* Heading */}
          <h1 className="whitespace-pre-line text-4xl font-bold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
            {slide.title.split("\n")[0]}
            <br />
            <span className="text-purple-400">
              {slide.title.split("\n")[1]}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
            {slide.description}
          </p>

          {/* CTA Button (Secondary button removed) */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/artworks"
              className="group inline-flex items-center gap-3 rounded-full bg-purple-600 px-7 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/30"
            >
              {slide.button}
              <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          {/* Artist Information */}
          <div className="mt-16 flex items-center gap-5">
            <div className="flex -space-x-3">
              <img
                src="https://i.pravatar.cc/100?img=47"
                alt="Artist profile"
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Artist profile"
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://i.pravatar.cc/100?img=32"
                alt="Artist profile"
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold">
                Creative minds, original art
              </p>
              <p className="mt-1 text-xs text-gray-400">
                A community for art lovers
              </p>
            </div>
          </div>
        </div>

        {/* Slide Number */}
        <div className="absolute bottom-10 right-6 hidden items-center gap-3 sm:flex lg:right-16">
          <span className="text-3xl font-bold text-purple-400">
            {slide.number}
          </span>
          <span className="text-gray-400">/ 03</span>
        </div>
      </div>

      {/* Left Side Arrow */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-25 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-purple-400 hover:bg-purple-600 sm:left-8 sm:h-12 sm:w-12 cursor-pointer"
      >
        <FiArrowLeft size={22} />
      </button>

      {/* Right Side Arrow */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-25 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-purple-400 hover:bg-purple-600 sm:right-8 sm:h-12 sm:w-12 cursor-pointer"
      >
        <FiArrowRight size={22} />
      </button>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-5 z-25 flex items-center gap-3 sm:left-10 lg:left-16">
        {/* Pause / Play */}
        <button
          onClick={() => setPaused((prev) => !prev)}
          aria-label={paused ? "Play slider" : "Pause slider"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer"
        >
          {paused ? <FiPlay size={17} /> : <FiPause size={17} />}
        </button>

        {/* Slider Dots */}
        <div className="ml-2 flex items-center gap-2">
          {slides.Item && slides.map((item, index) => (
            <button
              key={item.number}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                current === index
                  ? "w-9 bg-purple-400"
                  : "w-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}