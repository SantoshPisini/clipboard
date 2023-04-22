import axios from "axios";

const createPage = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_PAGE_SERVICE_URL}/page`,
    data
  );
  return response?.data;
};

const getPageByKey = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_PAGE_SERVICE_URL}/page/key/${id}`
  );
  return response;
};

const updatePage = async (page) => {
  console.log(page);
  const response = await axios.put(
    `${process.env.REACT_APP_PAGE_SERVICE_URL}/page/${page._id}`,
    page
  );
  return response?.data;
};

export default { createPage, getPageByKey, updatePage };
