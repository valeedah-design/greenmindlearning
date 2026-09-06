export default function Logo({ dark = false }) {
  return (
    <span
      className={`inline-flex items-center ${
        dark ? "rounded-lg bg-white px-2.5 py-1.5 sm:px-3 sm:py-2" : ""
      }`}
    >
      <img
        src="/Frame1.png"
        alt="Green Mind Learning"
        className={
          dark
            ? "h-10 w-auto object-contain sm:h-12 lg:h-14"
            : "h-8 w-auto object-contain sm:h-10 lg:h-12"
        }
      />
    </span>
  );
}
