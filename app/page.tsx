"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [scale, setScale] = useState(1);
  const [whiteOpacity, setWhiteOpacity] = useState(0);
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const start = window.scrollY;
    const end = el.getBoundingClientRect().top + window.scrollY;
    const duration = 1600; // ミリ秒（大きくするほど遅い）
    const startTime = performance.now();
  
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // イージング（なめらかな動き）
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, start + (end - start) * ease);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
  
      // スクロールでズームイン
      const scaleProgress = Math.min(scrollY / windowH, 1);
      setScale(0.5 + scaleProgress * 6);
  
      // aboutが見え始めたら白くフェード（画面の80%スクロールあたりから）
      const fadeStart = windowH * 0.7;
      const fadeEnd = windowH * 1.0;
      const fadeProgress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);
      setWhiteOpacity(fadeProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen text-[#2c2820]">

<nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6">
  <span className="text-sm tracking-widest">Ryota Senō</span>
  <ul className="flex gap-8 text-sm tracking-widest text-[#7a7060]">
    <li><Link href="/playlist" className="hover:bg-[#2c2820] hover:text-white px-2 py-1 transition-colors duration-150">playlist</Link></li>
    <li>
      <span
        onClick={() => scrollTo('profile')}
        className="cursor-pointer hover:bg-[#2c2820] hover:text-white px-2 py-1 transition-colors duration-150"
      >profile</span>
    </li>
    <li>
    <Link href="/service" className="hover:bg-[#2c2820] hover:text-white px-2 py-1 transition-colors duration-150">service</Link>
    </li>
  </ul>
</nav>

      {/* ヒーロー：スクロールでズームイン */}
<section className="fixed top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center -z-10">
  <img
    src="/ear.JPG"
    alt=""
    className="w-full h-full object-contain"
    style={{
      transform: `scale(${scale})`,
      transformOrigin: "center center",
      transition: "transform 0.1s ease-out",
    }}
  />
  {/* 白いオーバーレイ */}
  <div
    className="absolute inset-0"
    style={{ backgroundColor: `rgba(255,255,255,${whiteOpacity})` }}
  />
</section>

      {/* ヒーローの高さ分スペース */}
      <div className="h-screen" />

      {/* profile */}
      <section id="profile" className="px-8 py-24 max-w-2xl mx-auto mt-48">
        <h2 className="text-xs tracking-widest text-[#7a7060] mb-12">Profile</h2>
        <img
          src="/profile.JPG"
          alt="Ryota Senō"
          className="w-48 h-48 object-cover mb-10"
        />
        <p className="text-sm leading-8 text-[#2c2820]">
          幼い頃から、父のギターの音の中で育ちました。音楽は聴くものでも弾くものでもなく、ただそこにある空気のようなものでした。
        </p>
        <p className="text-sm leading-8 text-[#2c2820] mt-6">
          大学でギターを手に取り、録音をはじめ、気づけば音楽しかない、という場所に辿り着いていました。今もDJをしたり、曲を作ったり、音を録ったりしながら、音そのものについて考え続けています。
        </p>
        <p className="text-sm leading-8 text-[#2c2820] mt-6">
          音はホコリのような粒だと思っています。空間を漂い、人の体を通り抜けていく。プレイリストを作るとき、その粒が誰かの体験をそっと支えるように選びます。
        </p>
        <p className="text-sm leading-8 text-[#2c2820] mt-6">
          「夕暮の集い」というイベントを友人と定期的に開催しています。
        </p>
      </section>

      {/* service */}
      <section id="service" className="px-8 py-24 max-w-2xl mx-auto">
        <h2 className="text-xs tracking-widest text-[#7a7060] mb-12">SERVICE</h2>
        <p className="text-sm text-[#7a7060]">coming soon</p>
      </section>

      {/* フッター */}
      <footer className="px-8 py-12 border-t border-[#e0d9cc] text-xs text-[#7a7060] tracking-widest">
        <Link
          href="https://instagram.com/bubillie_ryota"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 hover:bg-[#2c2820] hover:text-white transition-colors duration-150"
        >
          Instagram
        </Link>
      </footer>

    </main>
  )
}