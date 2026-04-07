import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import "./style.css";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const notify = (text, err) => {
    setNotification({text: text, isError: err});
    setTimeout(() => setNotification(null), 2000);
  }
  
  const refreshBlogs = async () => {
    const blogs = (await blogService.getAll()).data;
    setBlogs(blogs);
  }


  const [blogFormShown, setBlogFormShown] = useState(false);
  useEffect(() => {
    (async () => {
      if(!user) {
        const localUser = JSON.parse(window.localStorage.getItem("blogAppUser"));
        if(!localUser?.id) return;
        setUser(localUser);
      }

      const blogs = (await blogService.getAll()).data;
      setBlogs(blogs);
    })();
  }, [user]);
  
  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("blogAppUser");
  }

  return (
    <div className="appRoot">
      <header>
        <h2>blogs</h2>
        <div className="loginInfo">
          {user
          ? <>
            <p>Logged in as {user.username}</p>
            <button onClick={logout}>Logout</button>
          </>
          : <LoginForm setUser={setUser} notify={notify}/>
          }
          
        </div>
      </header>
      
      <div>
      {user && <div> 
          <button onClick={() => setBlogFormShown(!blogFormShown)}>{blogFormShown ? "Hide form" : "Add new"}</button>
          <div className={`newBlogForm ${!blogFormShown && "hidden"}`}>
            <BlogForm refresh={refreshBlogs} notify={notify}/>
          </div>
          <hr/>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
          )}
      </div>
        }
      </div>
      <footer>
        daabudiiba
      </footer>
      <div className="notification">
        <p className={notification ? (notification?.isError ? "notifError" : "notifInfo") : ""}>{notification?.text}</p>
      </div>
    </div>
  )
}

export default App