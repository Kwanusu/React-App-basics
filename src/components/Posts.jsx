import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, addPost, editPost, removePost } from "../slices/postSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editingPost, setEditingPost] = useState(null);

  // Fetch posts from API
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreate = () => {
    if (!newPost.title || !newPost.body) return;
    dispatch(addPost(newPost));
    setNewPost({ title: "", body: "" });
  };

  const handleUpdate = () => {
    if (!editingPost.title || !editingPost.body) return;
    dispatch(editPost(editingPost));
    setEditingPost(null);
  };

  const handleDelete = (id) => {
    dispatch(removePost(id));
  };

  return (
<div className="p-6 max-w-6xl mx-auto space-y-6">

  {/* Create Post Form */}
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-3 text-green-700">Create Post</h2>
    <input
      type="text"
      placeholder="Title"
      value={newPost.title}
      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      className="border rounded-lg px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-green-300"
    />
    <textarea
      placeholder="Body"
      value={newPost.body}
      onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      className="border rounded-lg px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-green-300"
    />
    <button
      onClick={handleCreate}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
    >
      Create Post
    </button>
  </div>

  {/* Edit Post Form */}
  {editingPost && (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-3 text-blue-700">Edit Post</h2>
      <input
        type="text"
        value={editingPost.title}
        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
        className="border rounded-lg px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <textarea
        value={editingPost.body}
        onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
        className="border rounded-lg px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Update Post
      </button>
    </div>
  )}

  {/* Post List */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
    {posts.map((post) => (
      <div
        key={post.id}
        className="border rounded-lg p-4 bg-white shadow-sm flex flex-col justify-between"
      >
        <div>
          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          <p className="text-gray-600">{post.body}</p>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setEditingPost(post)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(post.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default PostList;
