import createError from 'http-errors';

// @desc Middleware to verify role
export const verifyRoles = (allowedRoles) => {
  return (request, response, next) => {
    //check if user exists
    if (!request.role) throw createError.Unauthorized();
    // check role of user
    const rolesArray = [allowedRoles];
    const result = request.role
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) throw createError.Unauthorized();
    next();
  };
};
