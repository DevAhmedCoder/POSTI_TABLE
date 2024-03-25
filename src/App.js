import { useEffect } from "react";
import AddPost from "./Components/AddPost";
import Post from "./Components/Post";
import { useDispatch, useSelector } from "react-redux";
import { allPostsAction } from "./redux/slice/posts";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPostsAction());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts.posts);
  return (
    <div className="App">
      <h1 className="Tittle">POSTI TABLE</h1>
      <br />
      <AddPost />
      {posts !== null && posts.length > 0 && (
        <div className="contain">
          <div className="postContainer">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
