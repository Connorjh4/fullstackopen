import { useRef } from 'react'
import Toggle from "../components/toggle"
import BlogList from "../components/blogList"
import CreateForm from "../components/createForm"

const BlogsPage = () => {
    const createFormRef = useRef();
    return(
      <>
        <Toggle
          data-testid="newPost"
          buttonLabel="new post"
          ref={createFormRef}
        >
          <h2>Create New</h2>
          <CreateForm createFormRef={createFormRef}/>
        </Toggle>
        <BlogList />
      </>
    )
}

export default BlogsPage