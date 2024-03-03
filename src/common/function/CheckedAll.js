export const CheckedAll = (funDelete) => {
    
  const checkall = document.getElementById("checkBoxAll");
  const ele = document.querySelectorAll(".customerCheckBox");

  if (checkall.checked) {
    ele.forEach((ele) => {
      ele.checked = true;
    });
  } else {
    ele.forEach((ele) => {
      ele.checked = false;
    });
  }
  funDelete();
};
