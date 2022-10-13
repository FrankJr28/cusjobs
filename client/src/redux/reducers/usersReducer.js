const initialstate = {
    users: []
}

export const usersReducer = (state = initialstate, action) => {

    switch (action.type) {
        case 'GET_ALL_USERS':
            {
                return {
                    ...state,
                    users: action.payload
                }
            }
        default:
            return state
    }

}