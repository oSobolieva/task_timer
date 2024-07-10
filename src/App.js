import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TaskContextProvider from './contexts/TasksContext';
import HomePage from './components/HomePage'
import TaskTable from './components/TaskTable';
import TaskChart from './components/TaskChart';
import TaskDetailPage from './components/TaskDetailPage';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/', element: <HomePage />, errorElement: <ErrorPage/>,
    children: [
      { path: '/log', element: <TaskTable /> },
      { path: '/chart', element: <TaskChart /> }
    ]
  },
  {
    path: '/tasks/:ind', element: <TaskDetailPage />, errorElement: <ErrorPage/>
  },
]);

function App() {
  return (
      <TaskContextProvider>
        <RouterProvider router = {router} />
      </TaskContextProvider>
  )
}

export default App;
