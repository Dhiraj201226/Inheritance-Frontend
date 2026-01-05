export default function Footer({
  text = "Transparency enforced by rules, not trust.",
  email = "contact@openaudit.org",
  address = "OpenAudit Foundation, Mumbai, India",
  year = new Date().getFullYear(),
  phone = "+91 9576215344",
}) {
  return (
    <footer className="w-full bg-gradient-to-b from-sky-500 to-blue-700">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex flex-col items-center gap-2 text-center">
        
     <p className="text-white font-semibold text-lg md:text-2xl tracking-wide">

          {text}
        </p>

        <div className="text-white/90 text-sm leading-relaxed">
          <p>
            📧{" "}
            <a
              href={`mailto:${email}`}
              className="underline hover:text-white transition"
            >
              {email}
            </a>
          </p>
          <p>📍 {address}</p>
          <p>☎️ Contact us at: {phone}</p>
        </div>

        <p className="text-white/70 text-xs mt-1">
          © {year} OpenAudit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
