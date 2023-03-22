const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UN_AUTHENTICATED: 401,
  UN_AUTHORISED: 403,
  INTERNAL_SERVER_ERROR: 500,
  NOT_ALLOWED: 405,
};

const clientError = (response) => {
  const jsonResponse = {
    error: true,
    message: "API does not allow deleting or modifying trades for any id value",
  };
  return response.status(HTTP_STATUS.NOT_ALLOWED).json(jsonResponse);
};

const errorHandle = (response, message) => {
  const jsonResponse = {
    error: true,
    message: message,
  };
  return response.status(HTTP_STATUS.BAD_REQUEST).json(jsonResponse);
};

const successDataResponse = (response, name, data) => {
  const jsonResponse = {
    error: false,
  };
  jsonResponse[`${name}`] = data;
  return response.status(HTTP_STATUS.SUCCESS).json(jsonResponse);
};
const createdDataResponse = (response, name, data) => {
  const jsonResponse = {
    error: false,
  };
  jsonResponse[`${name}`] = data;
  return response.status(HTTP_STATUS.CREATED).json(jsonResponse);
};

// const successResponse = (response, data) => {
//   const jsonResponse = { error: false, ...data };
//   return response.status(HTTP_STATUS.SUCCESS).json(jsonResponse);
// };

const createdResponse = (response, message = "Success") => {
  const jsonResponse = {
    error: false,
    message: message,
  };
  return response.status(HTTP_STATUS.CREATED).json(jsonResponse);
};

// const successPaginatedDataResponse = (response, data, page, limit) => {
//   const jsonResponse = {
//     error: false,
//     data: {
//       results: data.rows,
//       limit: parseInt(limit),
//       page: parseInt(page),
//       total: data.count,
//     },
//   };
//   return response.status(HTTP_STATUS.SUCCESS).json(jsonResponse);
// };

//   const serverError = (response, message = "Something went wrong.") => {
//     const jsonResponse = {
//       error: true,
//       message: message,
//     };
//     return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(jsonResponse);
//   };

//   const unAuthenticated = (response) => {
//     return response.status(HTTP_STATUS.UN_AUTHENTICATED).json({
//       error: true,
//       message: "You are not signed in / Session expired",
//     });
//   };

//   const unAuthorised = (response) => {
//     return response.status(HTTP_STATUS.UN_AUTHORISED).json({
//       error: true,
//       message:
//         "Unauthorised access, you do not have sufficient access for accessing the page",
//     });
//   };

//   const updateSuccess = (response) => {
//     const jsonResponse = {
//       error: false,
//       message: "successfully updated",
//     };
//     return response.status(HTTP_STATUS.SUCCESS).json(jsonResponse);
//   };

//   const noRowEffect = (response) => {
//     const jsonResponse = {
//       error: true,
//       message: "Oops! no row effect",
//     };
//     return response.status(HTTP_STATUS.SUCCESS).json(jsonResponse);
//   };

//   const alreadyExist = (response) => {
//     const jsonResponse = {
//       error: true,
//       message: "Data already exits",
//     };
//     return response.status(HTTP_STATUS.SUCCESS).json(jsonResponse);
//   };

//   const noDataFound = (response) => {
//     const jsonResponse = {
//       error: true,
//       message: "No data found!",
//     };
//     return response.status(HTTP_STATUS.SUCCESS).json(jsonResponse);
//   };

module.exports = {
  clientError,
  errorHandle,
  successDataResponse,
  createdResponse,
  createdDataResponse,
};
