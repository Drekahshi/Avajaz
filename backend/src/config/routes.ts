type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface PublicRoute {
  path: string;
  method: HttpMethod;
}

export const PUBLIC_ROUTES: PublicRoute[] = [
//   { path: '/api/v1/hello', method: 'GET' },

  // actuator
  { path: '/health', method: 'GET' },
  { path: '/info', method: 'GET' },
  { path: '/metrics', method: 'GET' },
];