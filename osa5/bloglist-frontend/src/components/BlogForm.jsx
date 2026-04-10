import {useState} from "react";
import blogService from "../services/blogs";

const BlogForm = ({refresh, notify}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const onsubmit = async (e) => {
    e.preventDefault();

    if(!(title && url)) {
      notify("Faulty data bro sry", true);
    }
    else {
      await blogService.create({title, url});
      notify(`Added a new blog: "${title}"`, false);
    }
    await refresh();
  };

  return <div>
    <form onSubmit={onsubmit}>
      <label>Title: <input onChange={e => setTitle(e.target.value)}/></label>
      <label>URL: <input onChange={e => setUrl(e.target.value)}/></label>
      <button type="submit">Submit</button>
    </form>
  </div>;
};

export default BlogForm;