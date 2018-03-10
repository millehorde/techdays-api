/**
 * Setup gojob namespace in request object
 * This object is used to share data all over the nest process
 * i.e. Authentication store `user_id` and `type` after authentication success
 * @param request
 * @param response
 * @param next
 */
export function setupRequestMiddleware(request: any, response: any, next: any) {
  request.techdays = {};
  next();
}
