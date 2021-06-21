import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import Boshqa from "./components/some-else/boshqa";
import "bootstrap/dist/css/bootstrap.css";
import Register from "./components/register/register";
import Post from "./admin/publishPost"
import PostScreen from './components/mains/postScreen'
import EditPostScreen from './components/mains/editPostScreen'

function App() {
  return (
    <Router>
      <Register />
      <Header />
      <Route path="/admin/post" component={Post} exact/>
      <Route path="/" component={Home} exact />
      <Route path='/post/:id' component={PostScreen} exact/>
      <Route path='/post/:id/edit' component={EditPostScreen} exact/>
      <Route path="/boshqa" component={Boshqa} exact/>
      <Footer />
    </Router>
  );
}

export default App;
