import { useEffect, useState } from "react";
import { getBlogs, createComment } from "../apis/blog";

export const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBlogs();
        setPosts(response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const renderDynamicScripts = () => {
      posts.forEach((post) => {
        post.comments?.forEach((comment) => {
          const scriptElement = document.createElement("script");
          if (comment.content.includes("<script>")) {
            const content = comment.content.replace(/<script>/g, "").replace(/<\/script>/g, "")
            scriptElement.textContent = `${content}`;
            const postElement = document.getElementById(`post-${post.id}`);
            if (postElement) {
              postElement.appendChild(scriptElement);
            }
            
          }
        });
      });
    };

    renderDynamicScripts();
  }, [posts]);

  const handleAddComment = async (postId) => {
    if (!newComment[postId]) return;

    try {
      const userId = 1;
      const response = await createComment({
        blogId: postId,
        content: newComment[postId],
        userId,
      });

      if (response) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                ...post,
                comments: [...(post.comments || []), response],
              }
              : post
          )
        );
        setNewComment((prev) => ({ ...prev, [postId]: "" }));
      } else {
        console.error("Failed to add comment:", response.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      {posts.map((post) => (
        <div
          id={`post-${post.id}`}
          key={post.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div>
            <h3>Comments</h3>
            {post.comments && post.comments.length > 0 ? (
              <div>
                {post.comments.map((comment, index) => (
                  <p key={index}>{comment.user.name}: {comment.content}</p>
                ))}
              </div>
            ) : (
              <p>No comments yet.</p>
            )}
            <div>
              <input
                type="text"
                placeholder="Add a comment"
                value={newComment[post.id] || ""}
                onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
              />
              <button onClick={() => handleAddComment(post.id)}>Add Comment</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};