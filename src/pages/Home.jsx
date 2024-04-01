import React, { useState, useEffect } from "react";
import configService from "../appwrite/config";
import { PostCard, Container } from "../components";
import { useSelector } from "react-redux";

export default function Home() {
  const userStatus = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  
  useEffect(() => {
    configService.getPosts([]).then((res) => {
      if (res) {
        const currentUserID = userData.$id;
        const filteredPosts = res.documents.filter((post) => {
          if (post.userId === currentUserID) {
            return true;
          }
          return post.status === "active";
        });
        setPosts(filteredPosts);
      }
    });
  }, []);

  if (posts.length === 0 && !userStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <>
      {posts.length >= 1 && userStatus ? (
        <div className="w-full p-8">
          <Container>
            <div className="flex flex-wrap">
              {posts?.map((post) => (
                <div className="p-2 w-1/4" key={post.$id}>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      ) : (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  No Posts Found
                </h1>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
