import Link from "next/link";

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-white text-[#2c2820]">

      {/* ヘッダー */}
      <header className="px-8 py-6 border-b border-[#e0d9cc]">
        <Link
          href="/"
          className="text-sm tracking-widest text-[#7a7060] px-2 py-1 hover:bg-[#2c2820] hover:text-white transition-colors duration-150"
        >
          Ryota Senō
        </Link>
      </header>

      <section className="px-8 py-24 max-w-2xl mx-auto">

        {/* タイトル */}
        <h1 className="text-xs tracking-widest text-[#7a7060] mb-4">SERVICE</h1>
        <p className="text-2xl font-light tracking-widest text-[#2c2820] mb-16">Music Curation Service</p>

        {/* 導入文 */}
        <div className="mb-20">
          <p className="text-sm leading-9 text-[#2c2820]">
            音楽で、空間をキュレーションします。<br />
            お店に流れる音楽は、空間そのものです。お客さんが入ってきた瞬間に感じる空気、商品を手に取るときの気持ち、レジを離れるときの余韻。音楽はその全てに静かに関わっています。
          </p>
          <p className="text-sm leading-9 text-[#2c2820] mt-6">
            プレイリストを通じて、音楽による空間設計をお手伝いします。
          </p>
        </div>

        {/* 場所・用途 */}
        <div className="mb-16 border-t border-[#e0d9cc] pt-12">
          <p className="text-xs tracking-widest text-[#7a7060] mb-6">場所・用途</p>
          <p className="text-sm leading-9">
            古着屋、カフェ、飲食店、ギャラリー、展覧会、イベント、プレゼントなど。「こんな場所に合う音楽を」という相談から、パッケージとしてまとめてお届けすることも可能です。
          </p>
        </div>

        {/* 提供サービス */}
        <div className="mb-16 border-t border-[#e0d9cc] pt-12">
          <p className="text-xs tracking-widest text-[#7a7060] mb-10">提供サービス</p>
          <div className="flex flex-col gap-12">
            <div>
              <p className="text-sm font-medium mb-3">プレイリスト制作</p>
              <p className="text-sm leading-8 text-[#7a7060]">
                場所の雰囲気、時間帯、お客さんの層、どんな体験をしてほしいか。ヒアリングをもとに選曲します。Apple MusicとSpotifyで納品します。
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">ビジュアルデザイン</p>
              <p className="text-sm leading-8 text-[#7a7060]">
                プレイリストのジャケット・アイコン（正方形）と、ショップカード（QRコードリンク付き）を制作します。音楽とビジュアルをセットでお届けします。
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">追加制作（要相談）</p>
              <p className="text-sm leading-8 text-[#7a7060]">
                ポスター、カード、掲示物など。まずはご相談ください。
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">音楽の相談</p>
              <p className="text-sm leading-8 text-[#7a7060]">
                音量感や時間帯の設計、どんな音楽が空間に合うかわからないという段階からでも、一緒に考えます。
              </p>
            </div>
          </div>
        </div>

        {/* 依頼の流れ */}
        <div className="mb-16 border-t border-[#e0d9cc] pt-12">
          <p className="text-xs tracking-widest text-[#7a7060] mb-10">依頼の流れ</p>
          <div className="flex flex-col gap-6">
            <div className="flex gap-8 items-start">
              <span className="text-xs text-[#7a7060] tracking-widest shrink-0 mt-1">01</span>
              <div>
                <p className="text-sm">Instagram DMでご連絡ください</p>
                <p className="text-xs text-[#7a7060] mt-1">まずは気軽にメッセージをお送りください。</p>
              </div>
            </div>
            <div className="flex gap-8 items-start">
              <span className="text-xs text-[#7a7060] tracking-widest shrink-0 mt-1">02</span>
              <div>
                <p className="text-sm">ヒアリング</p>
                <p className="text-xs text-[#7a7060] mt-1">場所・雰囲気・用途・ご予算についてお聞きします。</p>
              </div>
            </div>
            <div className="flex gap-8 items-start">
              <span className="text-xs text-[#7a7060] tracking-widest shrink-0 mt-1">03</span>
              <div>
                <p className="text-sm">制作・納品</p>
                <p className="text-xs text-[#7a7060] mt-1">Apple Music / Spotifyで納品します。</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram導線 */}
        <div className="border-t border-[#e0d9cc] pt-12">
          <p className="text-xs tracking-widest text-[#7a7060] mb-6">お問い合わせ</p>
          <Link
            href="https://instagram.com/bubillie_ryota"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 group border-b border-[#2c2820] pb-2 hover:bg-[#2c2820] hover:text-white px-2 pt-3 transition-colors duration-150"
          >
            <span className="text-sm tracking-widest">Instagram DMへ</span>
            <span className="text-sm transition-transform duration-200 group-hover:translate-x-2">→</span>
          </Link>
        </div>

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
  );
}