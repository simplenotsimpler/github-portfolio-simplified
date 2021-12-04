// https://www.marclittlemore.com/simple-error-handling-for-your-production-express-server/

 const renderError = (req, res, statusCode, errorTitle, errorMessage, errorAction) => {
  errorTitle = `Error ${statusCode} | ${errorTitle}`;
  return res.status(statusCode).render('error', {
    title: errorTitle,
    statusCode,
    errorTitle,
    errorMessage,
    errorAction,
    siteName: 'Portfolio',
    supportEmail: process.env.SUPPORT_EMAIL || 'support@domain.com',
    isError: true
  });
}

function defaultErrorHandler(error, req, res, next) {

  //log for developer
  console.log(error);
 
  renderError(req, res, 500, 'Internal Server Error', `We apologize and are fixing the problem.`, `Refresh the page, try later, `);
}

module.exports = {
  defaultErrorHandler,
  renderError
};