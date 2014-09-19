/// <reference path="../libs/jquery-2.1.1.js" />
/// <reference path="../libs/q.js" />
/// <reference path="../libs/require.js" />

define(['jQuery', 'q'], function (jQuery, Q) {
    'use strict';

    var getRequest, postRequest, putRequest;

    getRequest = function (resourceUrl) {
        var deferred = Q.defer();

        $.ajax({
            url: resourceUrl,
            type: 'GET',
            contentType: 'application/json',
            accept: 'application/json',
            success: function (data) {
                if (data) {
                    console.log(data);
                    return deferred.resolve(data);
                }
            },
            error: function (err) {
                if (err) {
                    return deferred.reject(err);
                }
            }
        });

        return deferred.promise;
    };

    postRequest = function (resourceUrl, data, sessionKey) {
        var deferred = Q.defer();

        console.log(data);
        $.ajax({
            url: resourceUrl,
            type: 'POST',
            data: JSON.stringify(data),
            headers: { 'X-SessionKey': sessionKey },
            contentType: 'application/json',
            accept: 'application/json',
            success: function (data) {
                if (data) {
                    console.log(data);
                    return deferred.resolve(data);
                }
            },
            error: function (err) {
                if (err) {
                    return deferred.reject(err);
                }
            }
        });

        return deferred.promise;
    };

    putRequest = function (resourceUrl, sessionKey) {
        var deferred = Q.defer();

        $.ajax({
            url: resourceUrl,
            type: 'PUT',
            headers: { 'X-SessionKey': sessionKey },
            contentType: 'application/json',
            accept: 'application/json',
            success: function (data) {
                if (data) {
                    console.log(data);
                    return deferred.resolve(data);
                }
            },
            error: function (err) {
                if (err) {
                    return deferred.reject(err);
                }
            }
        });

        return deferred.promise;
    }

    return {
        getRequest: getRequest,
        postRequest: postRequest,
        putRequest: putRequest
    }
});

