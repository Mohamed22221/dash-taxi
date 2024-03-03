export const formDataHandler = (obj, arr = []) => {
  const formData = new FormData();
  for (let key in obj) {
    if (Array.isArray(obj[key]) || arr.includes(key)) {
      obj[key]?.map((item) => formData.append(`${key}`, item));
    } else {
      if (obj[key]) formData.append(key, obj[key]);
    }
  }
  return formData;
};

export const formURLSearchParams = (obj) => {
  const urlencoded = new URLSearchParams();

  for (let key in obj) {
    if (obj[key]) urlencoded.append(key, obj[key]);
  }
  return urlencoded;
};
