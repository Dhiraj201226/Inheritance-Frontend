export default function Footer({
  text = "Transparency enforced by rules, not trust.",
  email = "contact@openaudit.org",
  address = "OpenAudit Foundation, Mumbai, India",
  year = new Date().getFullYear(),
  phone="+91 9576215344"
}) {
  return (
    <>
      <style>{`
        .oa-footer {
  background: linear-gradient(180deg, #1e9df2 0%, #0b6fb6 100%);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}


        .oa-footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 8px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }

        .oa-footer-text {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
<<<<<<< HEAD
          font-size: 32px;
=======
          font-size: 14px;
>>>>>>> d514ce4b69bfc6063c68ca10e48f9d60ba8c38f4
          letter-spacing: 0.3px;
        }

        .oa-footer-info {
          color: rgba(255, 255, 255, 0.85);
          font-size: 14px;
          line-height: 1.5;
        }

        .oa-footer-info a {
          color: rgba(255, 255, 255, 0.95);
          text-decoration: underline;
        }

        .oa-footer-copy {
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
        }

        @media (max-width: 520px) {
          .oa-footer-inner {
            padding: 18px 20px;
          }
          .oa-footer-text {
            font-size: 14px;
          }
        }
      `}</style>

      <footer className="oa-footer">
        <div className="oa-footer-inner">
          <div className="oa-footer-text">{text}</div>

          <div className="oa-footer-info">
            📧 <a href={`mailto:${email}`}>{email}</a>
            <br />
            📍 {address}
<br></br>
            <p>☎️Contact us at : {phone}</p>

          </div>

          <div className="oa-footer-copy">
            © {year} OpenAudit. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
