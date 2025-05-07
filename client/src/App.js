import './App.css';
import { User } from './getuser/User';
import { AddUser } from './adduser/AddUser.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UpdateUser } from './updateuser/UpdateUser.jsx';

function App() {
  const route = createBrowserRouter([
     {
      path:'/',
      element: <User/>
     },
     {
      path:'/adduser',
      element: <AddUser/>
     },
     {
      path:'/updateuser/:id',
      element: <UpdateUser/>
     }
  ])
  return (
    <div className="App">
      <RouterProvider router={route}/>
    </div>
  );
}

export default App;
