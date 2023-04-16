import axios from "axios";

const createPage = (data) => {
  console.log(process.env.REACT_APP_PAGE_SERVICE_URL);
  axios
    .post(`${process.env.REACT_APP_PAGE_SERVICE_URL}/page`, data)
    .then((res) => res)
    .catch((e) => {
      console.error(e);
    });
};

export default { createPage };
