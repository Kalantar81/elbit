
class ApiResponse {
    constructor(error, errorCode, data) {
        this.data = data;
        this.error = error;
        if (error) {
            this.errorCode = errorCode;
        }
    }
}

const ErrorCodes = {
    QueryError: new ApiResponse('Server error.', 2003),
    TokenExpired: new ApiResponse('Token expired.', 6000),
    Unauthorized: new ApiResponse('Unauthorized.', 1000),
    TooManyRequests: new ApiResponse('Too many requests.', 2000),
    EntityNotFound: new ApiResponse('Entity not found.', 8000),
    NotEnoughInfo: new ApiResponse('Not enough information.', 9500),
    GeneralError: new ApiResponse('General.', 1000),
    DataNotMeetExpectations: new ApiResponse('Data does not meet expectations', 3001)
};

module.exports = {
    success: (data) => new ApiResponse(null, 0, data),
    error: (error, errorCode) => new ApiResponse(error, errorCode, null),
    ErrorCodes: ErrorCodes
};