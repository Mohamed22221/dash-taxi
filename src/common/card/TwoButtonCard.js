const TwoButtonCard = ({ actionEdit, actionDelete }) => {
  return (
    <div className="d-flex justify-content-between">
      <button className="btn btn-light mx-1 w-50" onClick={actionEdit}>
        Edit
      </button>
      <button className="btn btn-danger mx-1 w-50" onClick={actionDelete}>
        Delete
      </button>
    </div>
  );
};
export default TwoButtonCard;
