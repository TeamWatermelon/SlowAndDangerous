/// <reference path="controller.js" />
/// <reference path="..\libs/require.js" />
/// <reference path="..\libs/jquery-2.1.1.js" />
/// <reference path="..\libs/sha1.js" />
/// <reference path="..\libs/underscore.js" />


define(['requester', 'renderer', 'userController', 'underscore'], function (requester, renderer, userController, _) {
    'use strict';

    var resourceUrl, reloadPosts;

    reloadPosts = function () {
        resourceUrl = 'http://localhost:3000/post';
        requester.getRequest(resourceUrl)
            .then(function (data) {
                var sortedData;
                if ($('#sortBy-date').is(':checked')) {
                    if ($('#order-ascending').is(':checked')) {
                        sortedData = _.chain(data)
                            .sortBy('postDate').value().reverse();
                    } else {
                        sortedData = _.chain(data)
                                .sortBy('postDate').value();
                    } 
                } else if ($('#sortBy-title').is(':checked')) {
                    if ($('#order-descending').is(':checked')) {
                        sortedData = _.chain(data)
                            .sortBy('title').value().reverse();
                    } else {
                        sortedData = _.chain(data)
                            .sortBy('title').value();
                    }
                } else {
                    sortedData = data;
                }

                renderer.loadPosts(sortedData);
            }, function () {
                throw new Error('Information could not be accessed!');
            });
    };

    $('#main-content').on('click', '#filter - btn', function () {
        var filterValue;
        resourceUrl = 'http://localhost:3000/post';
        filterValue = $('#filter').val();
		var filteredData;

        requester.getRequest(resourceUrl)
            .then(function (data) {
                filteredData = _.chain(data)
                .filter(function (post) {
                    return post.title.contains(filterValue) || post.body.contains(filterValue) || post.user.username.contains(filterValue);
                }).value();

                renderer.loadPosts(filteredData);
            }, function () {
                throw new Error('Information could not be accessed!');
            });
    });

    $('#main-content').on('click', '#send-btn', function () {
        var title, body, currentMessage, sessionKey;

        event.preventDefault();
        title = $('#title').val();
        body = $('#message').val();
        currentMessage = { title: title, body: body };
        sessionKey = userController.sessionKey;

        requester.postRequest(resourceUrl, currentMessage, sessionKey)
            .then(reloadPosts, function () {
                renderer.showRegistrationErrorMessage;
            });
    });

    $('#main-content').on('click', '#btn-register', function () {
        var obj;

        resourceUrl = 'http://localhost:3000/user';

        obj = getInputData('user-field', 'pass-field');
        console.log(obj);
        requester.postRequest(resourceUrl, obj)
            .then(renderer.regSuccesMsg('success'),
                renderer.regErrorMsg('err-msg'))
            .done();
    });

    $('#main-content').on('click', '#btn-login', function () {
        var obj;
        resourceUrl = 'http://localhost:3000/auth';

        obj = getInputData('tb-username', 'tb-pass');

        console.log(obj);

        requester.postRequest(resourceUrl, obj)
            .then(function (data) {
                renderer.regSuccesMsg('success');
                userController.saveUserData(data);
            }, function (err) {
                renderer.regErrorMsg('err-msg');
            }).done();
    });

    $('#main-content').on('click', '#logout-btn', function () {
        var sessionKey = userController.sessionKey;
        resourceUrl = 'http://localhost:3000/user?' + sessionKey;

        requester.putRequest(resourceUrl, sessionKey)
            .then(function () {
                renderer.regSuccesMsg('success');
                userController.userLogOut();
            }, function () {
                renderer.regErrorMsg('err-msg');
            }).done();
    });

    function getInputData(username, pass) {
        var username, password, authCode, obj;

        username = $('#' + username).val();
        password = $('#' + pass).val();

        if (username.length < 6 || username.length > 40) {
            //renderer.regErrorMsg('Username must be with length in the range [6; 40]', 'err-msg');
            throw new Error('Username must be with length in the range [6; 40]');
        }

        authCode = generateAuthCode(username, password);
        obj = {
            username: username,
            authCode: authCode
        }

        return obj;
    }

    function generateAuthCode(username, password) {
        var authCode, concatStr;

        concatStr = username + password;
        authCode = CryptoJS.SHA1(username, password);
        authCode = authCode.toString();
        console.log(authCode);

        return authCode;
    }

    return {
        reloadPosts: reloadPosts,
    }
});