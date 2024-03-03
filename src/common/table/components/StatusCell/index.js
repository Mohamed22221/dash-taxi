const StatusCell = ({ value }) => {
  const obj = {
    active: {
      name: "نشط",
      className: "success",
    },
    inactive: {
      name: "غير نشط",
      className: "danger",
    },
    banned:{
      name: "محظور",
      className: "danger",
    }
  };
  return (
    <span className={`badge badge-soft-${obj[value]?.className}`}>
      {obj[value]?.name}
    </span>
  );
};

export default StatusCell;
