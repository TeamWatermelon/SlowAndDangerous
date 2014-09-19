define([], function () {
    var userController = (function () {

        var username = localStorage.getItem('username');
        var sessionKey = localStorage.getItem('sessionKey');

        function isLoggedIn() {
            if (username !== null && sessionKey !== null) {
                //console.log(nickname);
                return true;
            }
            return false;
        }

        function saveUserData(userData) {
            localStorage.setItem('username', userData.nickname);
            localStorage.setItem('sessionKey', userData.sessionKey);

            username = localStorage.getItem('username');
            sessionKey = localStorage.getItem('sessionKey');
        }

        function userLogOut() {
            localStorage.clear();
        }

        return {
            sessionKey: sessionKey,
            isLoggedIn: isLoggedIn,
            saveUserData: saveUserData,
            userLogOut: userLogOut
        };

    }());

    return userController;
});