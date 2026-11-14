import { error } from '../utils/responseHandler.js';

export default (req, res) => {
  return error(res, 'Route not found', 404);
};
