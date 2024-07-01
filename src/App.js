import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Post',
      datetime: 'June 29, 2024 14:48 PM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aperiam odio nesciunt quia rem, aliquam quod consequuntur minima, doloribus architecto possimus pariatur accusantium nisi fuga distinctio cum? Quia, assumenda totam!'
    },
    {
      id: 2,
      title: 'My Second Post',
      datetime: 'June 29, 2024 14:48 PM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aperiam odio nesciunt quia rem, aliquam quod consequuntur minima, doloribus architecto possimus pariatur accusantium nisi fuga distinctio cum? Quia, assumenda totam!'
    },
    {
      id: 3,
      title: 'My Third Post',
      datetime: 'June 29, 2024 14:48 PM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aperiam odio nesciunt quia rem, aliquam quod consequuntur minima, doloribus architecto possimus pariatur accusantium nisi fuga distinctio cum? Quia, assumenda totam!'
    },
    {
      id: 4,
      title: 'My Fourth Post',
      datetime: 'June 29, 2024 14:48 PM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aperiam odio nesciunt quia rem, aliquam quod consequuntur minima, doloribus architecto possimus pariatur accusantium nisi fuga distinctio cum? Quia, assumenda totam!'
    }
  ])

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const history = useHistory()

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
    ||((post.title).toLowerCase()).includes(search.toLowerCase()))

    setSearchResults(filteredResults.reverse())
  },[posts, search])

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody};
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('')
    setPostBody('')
    history.push('/')
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    history.push('/')
  }
  
  return (
    <div className="App">
      <Header title='Reacct JS Blog' />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home posts={searchResult} />
        </Route>
        <Route exact path="/post">
          <NewPost 
           handleSubmit={handleSubmit}
           postTitle={postTitle}
           setPostTitle={setPostTitle}
           postBody={postBody}
           setPostBody={setPostBody}
           />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
