/// <reference path="..\libs/require.js" />

(function () {
    'use strict';

    require.config({
        paths: {
            'jQuery': '../libs/jquery-2.1.1',
            'sammy': '../libs/sammy-0.7.4',
            'mustache': '../libs/mustache',
            'q': '../libs/q',
            'requester': 'ajax-requester',
            'renderer': 'renderer',
            'controller': 'controller',
            'userController': 'user-controller',
            'sha1': '../libs/sha1',
            'underscore': '../libs/underscore'
        }
    });

    require(['jQuery'], function(jQuery){
        require(['sammy', 'mustache', 'controller', 'userController'], function (sammy, mustache, controller, userController) {

            var app = sammy('#main-content', function () {

                this.get('#/user', function () {
                    if (userController.isLoggedIn()) {
                        $('#main-content').empty()
                            .load('partials/reg-log-out.html');
                    } else {
                        $('#main-content').empty()
                            .load('partials/registration-form.html');
                    }
                });

                this.get('#/auth', function () {
                    $('#main-content').empty()
                        .load('partials/login-form.html');
                });

                this.get('#/post', function () {
                    if (userController.isLoggedIn()) {
                        $('#main-content').empty()
                            .load('partials/posts-form-logged-in.html');
                    } else {
                        $('#main-content').empty()
                            .load('partials/post-form.html');
                    }

                    setInterval(controller.reloadPosts, 2000);
                });

                this.get('#/post?user=', function () {

                });
            });

            app.run('#/user');
        });
    });
}());