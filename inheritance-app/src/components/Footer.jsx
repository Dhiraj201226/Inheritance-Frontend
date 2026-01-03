export default function Footer({
  text = "Transparency enforced by rules, not trust.",
}) {
  return (
    <>
      <style>{`
        .oa-footer {
          background: linear-gradient(180deg, #1e9df2 0%, #0b6fb6 100%);
          margin-top: auto;
        }

        .oa-footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 22px 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .oa-footer-text {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.3px;
          text-align: center;
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
        </div>
      </footer>
    </>
  );
}
