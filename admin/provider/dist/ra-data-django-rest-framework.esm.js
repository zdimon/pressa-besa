import { stringify } from 'query-string';
import { fetchUtils } from 'ra-core';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function tokenAuthProvider(options) {
  if (options === void 0) {
    options = {};
  }

  var opts = _extends({
    obtainAuthTokenUrl: '/api-token-auth/'
  }, options);

  return {
    login: function (_ref) {
      var username = _ref.username,
          password = _ref.password;

      try {
        var request = new Request(opts.obtainAuthTokenUrl, {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password
          }),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        });
        return Promise.resolve(fetch(request)).then(function (response) {
          var _exit = false;

          function _temp2(_result) {
            if (_exit) return _result;

            if (response.headers.get('content-type') !== 'application/json') {
              throw new Error(response.statusText);
            }

            return Promise.resolve(response.json()).then(function (json) {
              var error = json.non_field_errors;
              throw new Error(error || response.statusText);
            });
          }

          var _temp = function () {
            if (response.ok) {
              var _localStorage2 = localStorage,
                  _setItem2 = _localStorage2.setItem;
              return Promise.resolve(response.json()).then(function (_response$json) {
                _setItem2.call(_localStorage2, 'token', _response$json.token);

                _exit = true;
              });
            }
          }();

          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    logout: function logout() {
      localStorage.removeItem('token');
      return Promise.resolve();
    },
    checkAuth: function checkAuth() {
      return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    checkError: function checkError(error) {
      var status = error.status;

      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        return Promise.reject();
      }

      return Promise.resolve();
    },
    getPermissions: function getPermissions() {
      return Promise.resolve();
    }
  };
}

function createOptionsFromToken() {
  var token = localStorage.getItem('token');

  if (!token) {
    return {};
  }

  return {
    user: {
      authenticated: true,
      token: 'Token ' + token
    }
  };
}
function fetchJsonWithAuthToken(url, options) {
  return fetchUtils.fetchJson(url, Object.assign(createOptionsFromToken(), options));
}

var getPaginationQuery = function getPaginationQuery(pagination) {
  return {
    page: pagination.page,
    page_size: pagination.perPage
  };
};

var getFilterQuery = function getFilterQuery(filter) {
  var search = filter.q,
      otherSearchParams = _objectWithoutPropertiesLoose(filter, ["q"]);

  return _extends(_extends({}, otherSearchParams), {}, {
    search: search
  });
};

var getOrderingQuery = function getOrderingQuery(sort) {
  var field = sort.field,
      order = sort.order;
  return {
    ordering: "" + (order === 'ASC' ? '' : '-') + field
  };
};
var index = (function (apiUrl, httpClient) {
  if (httpClient === void 0) {
    httpClient = fetchUtils.fetchJson;
  }

  var getOneJson = function getOneJson(resource, id) {
    return httpClient(apiUrl + "/" + resource + "/" + id + "/").then(function (response) {
      return response.json;
    });
  };

  return {
    getList: function (resource, params) {
      try {
        var query = _extends(_extends(_extends({}, getFilterQuery(params.filter)), getPaginationQuery(params.pagination)), getOrderingQuery(params.sort));

        var url = apiUrl + "/" + resource + "/?" + stringify(query);
        return Promise.resolve(httpClient(url)).then(function (_ref) {
          var json = _ref.json;
          return {
            data: json.results,
            total: json.count
          };
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    getOne: function (resource, params) {
      try {
        return Promise.resolve(getOneJson(resource, params.id)).then(function (data) {
          return {
            data: data
          };
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    getMany: function getMany(resource, params) {
      return Promise.all(params.ids.map(function (id) {
        return getOneJson(resource, id);
      })).then(function (data) {
        return {
          data: data
        };
      });
    },
    getManyReference: function (resource, params) {
      try {
        var _extends2;

        var query = _extends(_extends(_extends(_extends({}, getFilterQuery(params.filter)), getPaginationQuery(params.pagination)), getOrderingQuery(params.sort)), {}, (_extends2 = {}, _extends2[params.target] = params.id, _extends2));

        var url = apiUrl + "/" + resource + "/?" + stringify(query);
        return Promise.resolve(httpClient(url)).then(function (_ref2) {
          var json = _ref2.json;
          return {
            data: json.results,
            total: json.count
          };
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    update: function (resource, params) {
      try {
        return Promise.resolve(httpClient(apiUrl + "/" + resource + "/" + params.id + "/", {
          method: 'PATCH',
          body: JSON.stringify(params.data)
        })).then(function (_ref3) {
          var json = _ref3.json;
          return {
            data: json
          };
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    updateMany: function updateMany(resource, params) {
      return Promise.all(params.ids.map(function (id) {
        return httpClient(apiUrl + "/" + resource + "/" + id + "/", {
          method: 'PATCH',
          body: JSON.stringify(params.data)
        });
      })).then(function (responses) {
        return {
          data: responses.map(function (_ref4) {
            var json = _ref4.json;
            return json.id;
          })
        };
      });
    },
    create: function (resource, params) {
      try {
        return Promise.resolve(httpClient(apiUrl + "/" + resource + "/", {
          method: 'POST',
          body: JSON.stringify(params.data)
        })).then(function (_ref5) {
          var json = _ref5.json;
          return {
            data: _extends({}, json)
          };
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    delete: function _delete(resource, params) {
      return httpClient(apiUrl + "/" + resource + "/" + params.id + "/", {
        method: 'DELETE'
      }).then(function () {
        return {
          data: params.previousData
        };
      });
    },
    deleteMany: function deleteMany(resource, params) {
      return Promise.all(params.ids.map(function (id) {
        return httpClient(apiUrl + "/" + resource + "/" + id + "/", {
          method: 'DELETE'
        });
      })).then(function (responses) {
        return {
          data: responses.map(function (_ref6) {
            var json = _ref6.json;
            return json.id;
          })
        };
      });
    }
  };
});

export default index;
export { fetchJsonWithAuthToken, getOrderingQuery, tokenAuthProvider };
//# sourceMappingURL=ra-data-django-rest-framework.esm.js.map
