export default function Logo({ dark = false }) {
  return (
    <span
      className={`inline-flex items-center ${
        dark ? "rounded-lg bg-white px-4 py-3 sm:px-5 sm:py-4" : ""
      }`}
    >
      <img
        src="/Frame1.png"
        alt="Green Mind Learning"
        className={
          dark
            ? "h-20 w-auto object-contain sm:h-24 lg:h-28"
            : "h-16 w-auto object-contain sm:h-20 lg:h-24"
        }
      />
    </span>
  );
}
