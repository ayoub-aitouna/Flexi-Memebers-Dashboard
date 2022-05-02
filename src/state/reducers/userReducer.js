const initialState = {
    isloged: false,
    username: null,
    Email: null,

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "login":
            return {...state, isloged: true };

        case "logout":
            return {...state, isloged: false };
        default:
            return state;
    }
};

export default reducer;