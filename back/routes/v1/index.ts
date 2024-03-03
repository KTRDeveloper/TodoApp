import express, { Router } from 'express';
import taskRoute from './task.route';

const router: Router = express.Router();

const defaultRoutes = [
  {
    path: '/tasks',
    route: taskRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
