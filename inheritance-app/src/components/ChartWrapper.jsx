<<<<<<< HEAD
export default function ChartWrapper({title,children}) {
    return (
<div style={{padding: "16px",background: "white",borderRadius: "12px" }}>
{title && <h3 style={{marginBottom: "12px"}}>{title}</h3>}
{children}
</div>
    );
}
=======
export default function ChartWrapper({ title, children }) {
  return (
    <div style={{ padding: "16px", background: "white", borderRadius: "12px" }}>
      {title && <h3 style={{ marginBottom: "12px" }}>{title}</h3>}
      {children}
    </div>
  );
}
>>>>>>> d514ce4b69bfc6063c68ca10e48f9d60ba8c38f4
