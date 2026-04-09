import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
  const blogs = await axios.get(baseUrl);
  return blogs;
}

const create = async (data) => {
  const user = JSON.parse(window.localStorage.getItem("blogAppUser"));
  if(!user.token) return false;

  const bearerToken = `Bearer ${user.token}`;
  try {
    const req = await axios.post(baseUrl, data, {headers: {Authorization: bearerToken}});
    console.log(req)
    return true;
  }
  catch(err) {
    return false;
  }
}

const update = async(blog) => {
  const blogId = blog.id;
  const user = JSON.parse(window.localStorage.getItem("blogAppUser"));
  if(!user.token) return false;

  const bearerToken = `Bearer ${user.token}`;

  try {
    await axios.put(`${baseUrl}/like/${blogId}`, blog, {headers: {Authorization: bearerToken}});
    return true;
  }
  catch(err) {
    return false;
  }
}

const deleteBlog = async (blogId) => {
  const user = JSON.parse(window.localStorage.getItem("blogAppUser"));
  if(!user.token) return false;
  const bearerToken = `Bearer ${user.token}`;

    try {
      await axios.delete(`${baseUrl}/${blogId}`, {headers: {Authorization: bearerToken}});
      return true;
    }
    catch(err) {
      return false;
    }
}

export default {getAll, create, update, deleteBlog};