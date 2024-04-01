import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import configService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import parse from "html-react-parser";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId == userData.$id : false;

  useEffect(() => {
    if (slug) {
      configService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  const deletePost = () => {
    configService.deletePost(post.$id).then((res) => {
      if (res) {
        // Storage Delete
        configService.deleteFile(post?.image).then(() => {
          navigate("/");
        });
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={configService.getFilePreview(post.image)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="w-full">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
