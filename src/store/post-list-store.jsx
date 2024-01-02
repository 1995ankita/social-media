import { createContext } from "react";

const PostList = createContext({});

const PostListProvider = ({chil}) => {
    return <PostList.Provider></PostList.Provider>

}
export default PostListProvider;