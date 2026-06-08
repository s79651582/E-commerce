class ApiError extends Error{
    constructor(message , statusCodeNow){
        super(message);
        this.statusCode = statusCodeNow;
        this.status = `${statusCodeNow}`.startsWith(4)? "fail" : "error";
        this.isOperational = true ;  // تعني ان نحن من صنعنا هذا الخطأ و ليس مرسل من النظام
    }
}


module.exports = ApiError;