export const ROUTE_NAMES = Object.freeze({
  MOVIES_LIST: 'MOVIES_LIST'
});

export default [
  {
    path: '/',
    name: ROUTE_NAMES.MOVIES_LIST,
    component: () => import('../views/movies/Movies.vue')
  }
];
