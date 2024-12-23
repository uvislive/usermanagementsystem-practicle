class ApiResponse {
    constructor(isSuccess, statusCode, message, data = null) {
        this.isSuccess = isSuccess;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    toObject() {
        return {
            isSuccess: this.isSuccess,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data
        };
    }

    static success(data, message = 'Success', statusCode = 200) {
        return new ApiResponse(true, statusCode, message, data).toObject();
    }

    static error(message = 'Error', statusCode = 500, data = null) {
        return new ApiResponse(false, statusCode, message, data).toObject();
    }
}

module.exports = ApiResponse;
