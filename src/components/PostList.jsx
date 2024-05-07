import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSppiner from "./LoadingSppiner";

const PostList = () => {
    const { postList, addInitialPosts } = useContext(PostListData);
    const [fetching, Setfetching] = useState(false);
    useEffect(() => {
        Setfetching(true);
        const controller = new AbortController();
        const signal = controller.signal;

        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then((data) => {
                addInitialPosts(data.posts);
                Setfetching(false);
            });
        return () => {
            console.log("Cleaning up UseEffect.");
            controller.abort();
        };
    }, []);


    return (
        <>
            {fetching && <LoadingSppiner />}
            {!fetching && postList.length === 0 && <WelcomeMessage />}
            {!fetching && postList.map((post) => (<Post key={post.id} post={post} />))}
        </>)

};
export default PostList;