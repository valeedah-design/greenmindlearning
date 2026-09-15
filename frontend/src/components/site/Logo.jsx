export default function Logo({ dark = false }) {
  return (
    <span className="inline-flex items-center">
      <img
        src={dark ? "/Frame1-dark.png" : "/Frame1.png"}
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
