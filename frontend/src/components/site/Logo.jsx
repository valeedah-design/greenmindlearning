export default function Logo({ dark = false }) {
  return (
    <span
      className={`inline-flex items-center ${
        dark ? "rounded-lg bg-white px-3 py-2" : ""
      }`}
    >
      <img
        src="/Frame1.png"
        alt="Green Mind Learning"
        className={dark ? "h-14 w-auto object-contain" : "h-12 w-auto object-contain"}
      />
    </span>
  );
}
