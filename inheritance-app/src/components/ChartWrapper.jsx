export default function ChartWrapper({ title, children }) {
  return (
    <div style={{ padding: "16px", background: "white", borderRadius: "12px" }}>
      {title && <h3 style={{ marginBottom: "12px" }}>{title}</h3>}
      {children}
    </div>
  );
}
