// Error Handler


function errorHandler(statusCode, message)
{
    const err = new Error();
    err.statusCode=statusCode;
    err.message= message;
    return err;

}
export default errorHandler;