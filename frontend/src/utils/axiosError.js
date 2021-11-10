export const extractErrMessage = (err) => {
  if (!err) return "Unknown error"
  if (err.response && err.response.data && err.response.data.message)
    return err.response.data.message;
  return err.message;
}