import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Edit from './pages/Edit.jsx';
import Root from './pages/Root.jsx';
import { createTask, deleteTaskById, getTaskById, getTasks, updateTaskById } from './api/tasksAPI.js';

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: (
      <Root>
        <ErrorPage />
      </Root>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
        loader: async () => {
          const tasksData = await getTasks();
          return { tasksData };
        },
        action: async ({ request, params }) => {
          let formData = await request.formData();
          const ts = formData.get('status');
          const taskId = formData.get('taskId');
          return updateTaskById(taskId, {
            status: ts,
          });
        },
      },
      {
        path: '/tasks/:taskId/edit',
        element: <Edit />,
        loader: async ({ params }) => {
          const task = params.taskId === 'new' ? null : await getTaskById(params.taskId);
          return { task };
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();
          const body = Object.fromEntries(formData);
          const taskId = params.taskId;
          if (taskId === 'new') {
            await createTask(body);
          } else {
            await updateTaskById(taskId, body);
          }
          return redirect(`/`);
        },
      },
      {
        path: '/tasks/detete',
        action: async ({ request }) => {
          let formData = await request.formData();
          const taskId = formData.get('taskId');
          await deleteTaskById(taskId);
          return redirect(`/`);
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
