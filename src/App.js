import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Paste from './redux/components/Paste';
import Navbar from './redux/components/Navbar';
import Home from './redux/components/Home';
import ViewPaste from './redux/components/ViewPaste';
const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <div>
          <Navbar></Navbar>
          <Home></Home>

        </div>
    },
    {
      path: "/pastes",
      element:
        <div>
          <Navbar></Navbar>
          <Paste></Paste>
        </div>
    },
    {
      path: "/pastes/:id",
      element:
        <div>
          <Navbar></Navbar>
          <ViewPaste></ViewPaste>
        </div>
    }
  ]
)
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
