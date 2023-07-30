function noteItem({ note: { titulo, fecha, prioridad, color } }) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          background: color,
          margin: "4px",
          width: "200px",
          padding: "2px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>{titulo}</p>
        <span>{fecha}</span>
      </div>
      <span>{prioridad}</span>
    </div>
  );
}

export default noteItem;
