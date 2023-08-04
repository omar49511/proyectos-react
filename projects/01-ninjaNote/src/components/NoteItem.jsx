function noteItem({ note: { titulo, fecha } }) {
  return (
    <div className="card">
      <h2 className="card__h2">{titulo}</h2>
      <span className="card__span">{fecha}</span>
    </div>
  );
}

export default noteItem;
