import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, editePost } from "../../redux/slice/posts";
import { editPost, removePost } from "../../crud";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [toggel, setToggel] = useState(true);
  const [doIt, setDoIt] = useState(post.doIt);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    removePost(id);
  };

  const handleDoIt = async (e) => {
    console.log(e.target.checked);
    setDoIt(!doIt);
    const postEdite = await editPost({
      ...post,
      doIt: e.target.checked,
    });
    dispatch(editePost(postEdite));
  };

  const handleEdite = async (e) => {
    e.preventDefault();
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
      style={{
        backgroundColor: post.doIt ? "#808080" : post.color,
        position: "relative",
      }}
    >
      <button
        type="button"
        onClick={() => handleDelete(post.id)}
        style={{
          backgroundColor: "red",
          color: "white",
          fontSize: "large",
          cursor: "pointer",
          position: "absolute",
          top: "5px",
          right: "5px",
          border: "none",
        }}
      >
        X
      </button>
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {!doIt && (
              <button
                type="button"
                onClick={() => setToggel(!toggel)}
                style={{
                  color: "blue",
                  fontSize: "large",
                }}
              >
                Edit
              </button>
            )}
            <div>
              <input
                type="checkbox"
                name="doIt"
                defaultChecked={doIt}
                onChange={handleDoIt}
                style={{
                  padding: "5px",
                  cursor: "pointer",
                  transform: "scale(1.5)",
                }}
              />{" "}
              Done
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleEdite}>
          <textarea
            name="descUpdate"
            autoFocus={true}
            defaultValue={post.desc}
          />
          {/* <div style={{ padding: "5px" }}>
            <input type="checkbox" name="doIt" defaultChecked={post.doIt} />
            Done
          </div> */}
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
