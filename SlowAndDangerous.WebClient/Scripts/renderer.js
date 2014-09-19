/// <reference path="..\libs/jquery-2.1.1.js" />
/// <reference path="..\libs/mustache.js" />
/// <reference path="..\libs/require.js" />

define(['jQuery', 'mustache', 'q'], function (jQuery, Mustache, Q) {
    'use strict';

    var displayPosts, loadPosts;

    function makeMessage(element, message) {
        var $domElement = $('#' + element);
        $domElement.html(message)
            .show()
            .fadeOut(2000);
    }
    function showRegistrationErrorMessage(err, element) {
        makeMessage(element, err.Message);
    }

    function showSuccessMessage(element) {
        var message = 'Successful operation!';
        makeMessage(element, message);
    }

    function getTemplate() {
        var deferred;

        deferred = Q.defer();
        $.get('partials/post-templates.html', function (template) {
            deferred.resolve(template);
        })
        .fail(function () {
            return deferred.reject(err);
        });

        return deferred.promise;
    }

    displayPosts = function (template, data) {
        var $postsContainer, currentPost, i, renderedPost, templateIsReady;

        $postsContainer = $('<div />');
        $postsContainer.addClass('posts-display');
        Mustache.parse(template);

        for (i in data) {
            currentPost = data[i];
            renderedPost = Mustache.render(template, currentPost);
            $postsContainer.append(renderedPost);
        }

        $('#display').html($postsContainer);
    }

    loadPosts = function (data) {
        getTemplate()
            .then(function (template) {
                displayPosts(template, data);
            }, function (err) {
                throw new Error('Requested information was not found!');
            });
    };

    return {
        loadPosts: loadPosts,
        regErrorMsg: showRegistrationErrorMessage,
        regSuccesMsg: showSuccessMessage
    }
});

