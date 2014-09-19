define(['jquery'], function ($) {
    var makeHttpRequest = function (url, type, dataType, data, headers) {
        var ajaxOptions = {
            url: url,
            type: type,
            dataType: dataType,
            success: function (data) {
                deferred.resolve(data);
            },
            error: function (error) {
                deferred.reject(error);
            }
        };

        if (data) {
            ajaxOptions.data = data;
        }

        if (headers) {
            ajaxOptions.headers = headers;
        }

        $.ajax(ajaxOptions);
    };

    var getJSON = function (url) {
        return makeHttpRequest(url, 'GET', 'JSON');
    };

    var postJSON = function (url, data, headers) {
        return makeHttpRequest(url, 'POST', 'JSON', data, headers);
    };

    var getText = function (url) {
        return makeHttpRequest(url, 'GET', 'TEXT');
    };

    var putJSON = function (url, headers) {
        return makeHttpRequest(url, 'PUT', 'JSON', undefined, headers);
    };

    return {
        getJSON: getJSON,
        postJSON: postJSON,
        getText: getText,
        putJSON: putJSON
    };
});