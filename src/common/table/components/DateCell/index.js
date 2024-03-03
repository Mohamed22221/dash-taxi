const DateCell = ({ value }) => {
  const date = new Date(value);
  return (
    <p className="d-flex p-2">
      <p>{date.toLocaleTimeString()}</p>
      <p>-</p>
      <p>{date.toLocaleDateString()}</p>
    </p>
  );
};
export default DateCell;
