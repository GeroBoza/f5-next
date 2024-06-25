"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const images = [
    {
      id: 1,
      src: "/img/materas.jpeg",
      alt: "Materas",
      url: "/portfolio/photography?page=1&category=all",
    },
    {
      id: 2,
      src: "/img/mates.jpeg",
      alt: "Mates",
      url: "/portfolio/videos",
    },
    {
      id: 3,
      src: "/img/yerbas.jpeg",
      alt: "Yerbas",
      url: "/portfolio/videos",
    },
    {
      id: 4,
      src: "/img/termos.png",
      alt: "Termos",
      url: "/portfolio/videos",
    },
  ];

  return (
    <header
      className="relative flex flex-col items-center justify-center"
      style={{ height: "100vh" }}
    >
      <Image
        src="/img/messi.webp"
        alt="messi"
        width={1920}
        height={400}
        className="h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
        <h1 className="text-white" style={{ fontSize: "50px" }}>
          Make your dream team!
        </h1>
      </div>
    </header>
  );
}
