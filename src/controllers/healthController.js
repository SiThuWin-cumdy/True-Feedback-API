import { success } from '../utils/responseHandler.js';

export const getHealth = (req, res) => {
  return success(res, {
    service: 'truefeedback-api',
    status: 'healthy'
  });
};
