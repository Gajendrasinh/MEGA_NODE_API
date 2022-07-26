interface Constants {
    ERROR_CODES: {
        [key: number]: {
            status: number,
            message: string
        }
    }
}
/**
 * Constants are message code, their status and error messages
 */
const constants: Constants  = {
    ERROR_CODES: {
       101: {
           status: 401,
           message: 'Unauthorized'
       },
       102: {
           status: 422,
           message: 'No user found'
       }, 
       103: {
           status: 422,
           message: 'there are no dependents found'
       },
       104: {
        status: 400,
        message: 'You are not authorized to access this'
    },
        105: {
            status: 400,
            message: 'No quote detail of this product'
        }
   }

}

export default constants