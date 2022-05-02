export const Login = () => {
    return (dispatch) => {
        dispatch({
            type: "login",
            payload: true,
        });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: "logout",
            payload: false,
        });
    };
};