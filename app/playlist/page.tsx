"use client";
import { useState } from "react";
import Link from "next/link";

// =============================================
// 型定義
// =============================================

// 各プレイリストの型
type Playlist = {
  title: string;    // プレイリスト名
  spotify: string;  // SpotifyのURL（未設定の場合は "#"）
  apple: string;    // Apple MusicのURL（未設定の場合は "#"）
  image?: string;   // ジャケ写のパス（例: "/ameNohi.PNG"）省略可
  artists?: string; // 電光掲示板で流すアーティスト名（省略可）
};

// お店などのグループ単位の型
type ShopEntry = {
  name: string;               // グループ名（例: "SAJI"）
  tag: string;                // サブラベル（例: "古着屋"）
  instagram: string | null;   // InstagramのURL（ない場合は null）
  playlists: Playlist[];      // そのグループのプレイリスト一覧
};

// Works / Personal などの大セクションの型
type Section = {
  name: string;        // セクション名（例: "Works"）
  shops: ShopEntry[];  // ショップ・グループの一覧
  singles: Playlist[]; // グループに属さない単体プレイリスト
};

// =============================================
// データ
// ここを編集してプレイリストを追加・変更する
// =============================================

const sections: Section[] = [
  {
    // -----------------------------------------------
    // Works セクション（仕事として作ったプレイリスト）
    // -----------------------------------------------
    name: "Works",
    shops: [
      {
        // SAJIのプレイリストグループ
        name: "SAJI",
        tag: "古着屋",
        instagram: "https://instagram.com/saji_used",
        playlists: [
          // Apple MusicのURLが揃ったら apple: "#" を書き換える
          { title: "SAJIのじかん", spotify: "https://open.spotify.com/playlist/2txXyF5Eae8uKG6kodFubU", apple: "#" },
          { title: "SAJIの日曜日", spotify: "https://open.spotify.com/playlist/2MB3h9vUm6c1pc3T0V1HNG", apple: "#" },
          { title: "雨の日のSAJI", spotify: "https://open.spotify.com/playlist/2x2z15ymh6xf2U57j1JiFA", apple: "#" },
        ],
      },
      // 新しいお店を追加するときはここに { name, tag, instagram, playlists } を追加する
    ],
    singles: [
      // 単体プレイリストを追加するときはここに追加する
    ],
  },
  {
    // -----------------------------------------------
    // Personal セクション（個人的なプレイリスト）
    // -----------------------------------------------
    name: "Personal",
    shops: [],
    singles: [
      {
        title: "海の中にいるような",
        spotify: "https://open.spotify.com/playlist/19Q6EXWX3E3Ei5nLCHSJXH",
        apple: "https://music.apple.com/jp/playlist/pl.u-mJy81m0CNaMGjZL",
      },
      {
        title: "雨の日",
        spotify: "https://open.spotify.com/playlist/13hcRMHyTo7vtQrdjLM8eT",
        apple: "https://music.apple.com/jp/playlist/pl.u-76oNlvmTvP74K3d",
        image: "/ameNohi.PNG",
        // 電光掲示板で流すアーティスト名（・で区切る）
        artists: "claire rousay · 香田悠真 · YOSSY LITTLE NOISE WEAVER · 青葉市子 · Rhucle · FORCE OF NATURE · David Toop & LAWRENCE ENGLISH · Grimm Grimm · Kenji Kairu",
      },
      // 新しい個人プレイリストはここに追加する
    ],
  },
];

// =============================================
// 電光掲示板コンポーネント
// =============================================

function Marquee({ text, isHovered }: { text: string; isHovered: boolean }) {
  const repeated = `${text} · ${text} · `;
  const bg = isHovered ? "#2c2820" : "#f5f0e8";
  return (
    <div className="marquee-outer relative">
      <div className="absolute left-0 top-0 h-full w-6 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${bg}, transparent)` }}
      />
      <div className="absolute right-0 top-0 h-full w-6 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${bg}, transparent)` }}
      />
      <div className="animate-marquee text-xs text-[#7a7060]">
        <span className="inline-block pr-4">{repeated}</span>
        <span className="inline-block pr-4">{repeated}</span>
      </div>
    </div>
  );
}

// =============================================
// プレイリスト1行のコンポーネント
// =============================================

function PlaylistRow({
  pl,
  hovered,
  setHovered,
}: {
  pl: Playlist;
  hovered: string | null;
  setHovered: (v: string | null) => void;
}) {
  return (
    <div>
      <div
        onMouseEnter={() => (pl.image ? setHovered(pl.title) : null)}
        onMouseLeave={() => setHovered(null)}
        className="flex justify-between items-center px-4 py-3 hover:bg-[#2c2820] hover:text-[#f5f0e8] transition-colors duration-150 group"
      >
        <span className="text-sm shrink-0 mr-4">{pl.title}</span>
        {pl.artists && <Marquee text={pl.artists} isHovered={hovered === pl.title} />}
        <div className="flex gap-4 text-xs opacity-60 group-hover:opacity-100 shrink-0 ml-4">
          <span onClick={() => window.open(pl.spotify, "_blank")} className="cursor-pointer hover:underline">
            Spotify
          </span>
          <span onClick={() => window.open(pl.apple, "_blank")} className="cursor-pointer hover:underline">
            Apple Music
          </span>
        </div>
      </div>
      {pl.image && (
        <div style={{ maxHeight: hovered === pl.title ? "300px" : "0px", overflow: "hidden", transition: "max-height 0.4s ease" }}>
          <img src={pl.image} alt={pl.title} className="w-48 h-48 object-cover ml-4 mb-4" />
        </div>
      )}
    </div>
  );
}

// =============================================
// ページ本体
// =============================================

export default function PlaylistPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openShop, setOpenShop] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main
      className="min-h-screen text-[#2c2820]"
      style={{ backgroundImage: "url('/texture.JPG')", backgroundRepeat: "repeat", backgroundSize: "300px" }}
    >
      <header className="px-8 py-6 border-b border-[#e0d9cc]">
        <Link href="/" className="text-sm tracking-widest text-[#7a7060] px-2 py-1 hover:bg-[#2c2820] hover:text-[#f5f0e8] transition-colors duration-150">
          Ryota Senō
        </Link>
      </header>

      <section className="px-8 py-16 max-w-2xl mx-auto">
        <h1 className="text-xs tracking-widest text-[#7a7060] mb-12">PLAYLIST</h1>
        <div className="border-t border-[#e0d9cc]">
          {sections.map((sec) => (
            <div key={sec.name} className="border-b border-[#e0d9cc]">
              <button
                onClick={() => setOpenSection(openSection === sec.name ? null : sec.name)}
                className="w-full py-6 flex justify-between items-center px-2 hover:bg-[#2c2820] hover:text-[#f5f0e8] transition-colors duration-150"
              >
                <span className="text-sm tracking-widest">{sec.name}</span>
                <span className="text-xs">{openSection === sec.name ? "−" : "+"}</span>
              </button>

              {openSection === sec.name && (
                <div className="border-l border-[#e0d9cc] ml-2 mb-4">
                  {sec.shops.map((shop) => (
                    <div key={shop.name}>
                      <button
                        onClick={() => setOpenShop(openShop === shop.name ? null : shop.name)}
                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-[#2c2820] hover:text-[#f5f0e8] transition-colors duration-150"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm tracking-widest">{shop.name}</span>
                          <span className="text-xs opacity-60">{shop.tag}</span>
                          {shop.instagram && (
                            <span
                              onClick={(e) => { e.stopPropagation(); window.open(shop.instagram!, "_blank"); }}
                              className="opacity-60 hover:opacity-100 cursor-pointer"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                              </svg>
                            </span>
                          )}
                        </div>
                        <span className="text-xs">{openShop === shop.name ? "−" : "+"}</span>
                      </button>

                      {openShop === shop.name && (
                        <div className="border-l border-[#e0d9cc] ml-4">
                          {shop.playlists.map((pl) => (
                            <PlaylistRow key={pl.title} pl={pl} hovered={hovered} setHovered={setHovered} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {sec.singles.map((pl) => (
                    <PlaylistRow key={pl.title} pl={pl} hovered={hovered} setHovered={setHovered} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="px-8 py-12 border-t border-[#e0d9cc] text-xs text-[#7a7060]">
        <span
          onClick={() => window.open("https://instagram.com/bubillie_ryota", "_blank")}
          className="cursor-pointer px-2 py-1 hover:bg-[#2c2820] hover:text-[#f5f0e8] transition-colors duration-150"
        >
          Instagram
        </span>
      </footer>
    </main>
  );
}