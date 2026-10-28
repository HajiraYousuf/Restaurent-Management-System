export default function Footer() {
  return (
    <footer className="mt-12 bg-[#741F35] px-5 py-5 text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 sm:flex-row">
        
        {/* Magaca iyo Astaamaha shirkadda */}
        <b className="display text-xl">
          <span className="text-[#D9A441]">♧</span> RoyalBite
        </b>

        {/* Fariinta / Hal-ku-dhigga */}
        <p className="text-xs text-rose-100">
          Good Food · Fast Service · Happy Customers
        </p>

        {/* Qaybta Xiriiriyeyaasha Bulshada (Social Links - haddii loo baahdo mustaqbalka) */}
        <div className="flex gap-3 text-[#D9A441]"></div>

      </div>
    </footer>
  );
}