import { useRef, useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, refresh, user }) => {
  const [shown, setShown] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const delButton = useRef();

  const like = async () => {
    blog.likes += 1;
    await blogService.update(blog);
    setLikes(likes + 1);
  }
  const deleteBlog = async () => {
    const deleteConfirmed = confirm(`Do you want to delete your blog titled "${blog.title}"?`);
    if(deleteConfirmed) {
      await blogService.deleteBlog(blog.id);
      await refresh();
    }
  }

  return <div className={"blogContainer"}>
    {blog.title} <button onClick={() => setShown(!shown)}>{shown ? "Hide" : "Show details"}</button>
    <div className={shown ? "" : "hidden"}>
      <p>Written by: {blog.author.username}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {likes} <button onClick={like}>Like</button></p>
      {user.id === blog.author.id ? <button onClick={deleteBlog}>Delete this blog</button> : null}
    </div>
  </div>  
}

export default Blog