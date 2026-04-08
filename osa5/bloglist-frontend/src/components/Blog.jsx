import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [shown, setShown] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const like = async () => {
    await blogService.like(blog.id);
    setLikes(likes + 1);
  }

  return <div className={"blogContainer"}>
    {blog.title} <button onClick={() => setShown(!shown)}>{shown ? "Hide" : "Show details"}</button>
    <div className={shown ? "" : "hidden"}>
      <p>Written by: {blog.author.username}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {likes} <button onClick={like}>Like</button></p>
    </div>
  </div>  
}

export default Blog