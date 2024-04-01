import axios from "axios";
import React, { useState } from "react";
import { couleursPost } from "../../const/couleursPost";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/slice/posts";

const AddPost = () => {
  const [color, setcolor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      title: e.target.title.value,
      desc: e.target.desc.value,
      color: e.target.color.value,
      doIt: false,
    };

    axios.post("http://localhost:3000/posts", post).then((e) => {
      dispatch(addPost(e.data));
      console.log(e.statusText);
    });
    setcolor("");
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="containAddPost">
      <input type="text" placeholder="Titre..." name="title" required />
      <textarea
        name="desc"
        autoFocus={true}
        placeholder="Description..."
        required
      />
      <select
        name="color"
        style={{ backgroundColor: color, fontSize: "large" }}
        onChange={(e) => setcolor(e.target.value)}
      >
        <option value="#fff">Selectionné la couleur</option>
        {couleursPost.map((color, i) => (
          <option
            key={i}
            value={color.code}
            style={{ backgroundColor: color.code }}
          >
            {color.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        style={{ backgroundColor: "#77b5fe", fontSize: "large" }}
      >
        Add Post
      </button>
    </form>
  );
};

export default AddPost;
