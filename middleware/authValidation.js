import jwt from 'jsonwebtoken';
import createError from 'http-errors';

// @desc Middleware to handle auth
export const authValidation = (request, response, next) => {
  try {
    const authHeader =
      request.headers.Authorization || request.headers.authorization;
    if (!authHeader.startsWith('Bearer')) {
      throw createError.Unauthorized();
    }
    const accessToken = authHeader.split(' ')[1];

    const verify = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) throw createError.Forbidden();
        request.user = decoded.username;
        const access = decoded.access;
        request.role = [access.role]; //added array to map over roles_list
        request.classAssigned = access.classAssigned;
        return request.user, request.role, request.classAssigned;
      }
    );
    next();
  } catch (error) {
    console.log(error);
    throw createError.Unauthorized();
  }
};
