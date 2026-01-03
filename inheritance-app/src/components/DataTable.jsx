export default function DataTable({ columns = [], data = [] }) {
  return (
    <>
      <style>{`
        .oa-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .oa-table th,
        .oa-table td {
          border: 1px solid #d0d7de;
          padding: 10px 12px;
          text-align: left;
        }

        .oa-table th {
          background: #e6f2fb;
          font-weight: 700;
          color: #0a2a3c;
        }

        .oa-table tbody tr:nth-child(even) {
          background: #f7f7f7;
        }

        .oa-table tbody tr:nth-child(odd) {
          background: white;
        }
      `}</style>

      <table className="oa-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
