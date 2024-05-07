import { createContext, useReducer, useState,useEffect } from "react";

export const PostList = createContext({
    postList: [],
    addPost: () => { },
    deletePost: () => { },
 
   
});

const PostListReducer = (currentPostList, action) => {
    let newPostList = currentPostList;
    if(action.type==="DELETE_POST"){
        newPostList=currentPostList.filter(post=>post.id!==action.payload.postId);
    }else if(action.type==="ADD_POST"){
      newPostList = [action.payload, ...currentPostList];
    }else if(action.type==="ADD_INITIAL_POSTS"){
      newPostList = action.payload.posts;
    }
    return newPostList;
}

const PostListProvider = ({ children }) => {
    const [postList, dispatchPostList] = useReducer(PostListReducer, [])

    // const [fetching, Setfetching] = useState(false);
   

    const addInitialPosts = (posts) => {
      dispatchPostList({
        type:"ADD_INITIAL_POSTS",
        payload: {
          posts
        },
      })
    }

    const addPost = (post) => {
      dispatchPostList({
        type:"ADD_POST",
        payload: 
         post
        
      })
    } 
    const deletePost = (postId) => {
        dispatchPostList({
          type: "DELETE_POSTS",
          payload: {
            postId,
          },
        });
      };

    //   useEffect(() => {
    //     Setfetching(true);
    //     const controller = new AbortController();
    //     const signal = controller.signal;

    //     fetch('https://dummyjson.com/posts')
    //         .then(res => res.json())
    //         .then((data) => {
    //             addInitialPosts(data.posts);
    //             Setfetching(false);
    //         });
    //     return () => {
    //         controller.abort();
    //     };
    // }, []); 

    return <PostList.Provider value={{
        postList,
        addPost,
        deletePost
    }
    }>{children}</PostList.Provider>

}

export default PostListProvider;