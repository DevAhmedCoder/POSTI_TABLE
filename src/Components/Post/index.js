import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, editePost } from "../../redux/slice/posts";
import { editPost, removePost } from "../../crud";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [toggel, setToggel] = useState(true);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    removePost(id);
  };

  const handleEdite = async (e) => {
    e.preventDefault();
    console.log(e.target.doIt.checked);
    const postEdite = await editPost({
      desc: e.target.descUpdate.value,
      title: post.title,
      color: post.color,
      id: post.id,
      doIt: e.target.doIt.checked,
    });
    dispatch(editePost(postEdite));
    setToggel(!toggel);
  };

  return (
    <div
      className="postCard"
      style={{ backgroundColor: post.doIt ? "#808080" : post.color }}
    >
      <h3>Tittle:</h3>
      <p style={{ textDecorationLine: post.doIt ? "line-through" : "none" }}>
        {post.title}
      </p>
      <h4>Description:</h4>
      {toggel ? (
        <>
          <p
            style={{ textDecorationLine: post.doIt ? "line-through" : "none" }}
          >
            {post.desc}
          </p>
          <button
            type="button"
            onClick={() => setToggel(!toggel)}
            style={{
              color: "blue",
              fontSize: "large",
              marginRight: "5px",
            }}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(post.id)}
            style={{
              backgroundColor: "red",
              color: "white",
              fontSize: "large",
            }}
          >
            Delete
          </button>
        </>
      ) : (
        <form onSubmit={handleEdite}>
          <textarea
            name="descUpdate"
            autoFocus={true}
            defaultValue={post.desc}
          />
          <div style={{ padding: "5px" }}>
            <input type="checkbox" name="doIt" defaultChecked={post.doIt} />
            Tache effectué
          </div>
          <br />
          <button
            type="submit"
            style={{
              backgroundColor: "green",
              color: "white",
              fontSize: "large",
              marginRight: "5px",
            }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setToggel(!toggel)}
            style={{ color: "red", fontSize: "large" }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
