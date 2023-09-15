export const isLoggedIn = function() {
    return localStorage.getItem('user-token', null) !== null;
}

export const token = function() {
    return localStorage.getItem('user-token', null);
}

export const setToken = function(val) {
    return localStorage.setItem('user-token', val);
}

export const name = function() {
    return localStorage.getItem('user-name', null);
}

export const setName = function(value) {
    return localStorage.setItem('user-name', value);
}

export const invalidate = function() {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-name');
}