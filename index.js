var request = require("request");

/**
 * Check that the string is one of the valid options
 * 
 * @param arguments {strings} the valid strings
 * @return {function} function(string)
 */
function validateOption(){
  var args = arguments;
  return function(test){
    for(var i = 0; i<args.length; i++){
      if(args[i] === test)return true;
    }
    return false;
  };
}

var validateFBSize = validateOption('square', 'small', 'normal', 'large');

/**
 * Request the photo based on a facebook id if present
 *
 * @param [opts] {object} optional options for the request
 * @param [opts.fb] {string} the property of the user object containing the facebook id default: "facebookid"
 * @param [opts.type] {string} the size of the image to return 'square', 'small', 'normal' or 'large' default: 'square'
 */
exports.id = function(opts){
  opts = opts || {};
  opts.fb = opts.fb || "facebookid";
  opts.type = opts.type || "square";
  if(!validateFBSize(opts.type)) throw "invalid size type for facebook";
  return function (user, callback){
    if(user[opts.fb]){
      callback("https://graph.facebook.com/" + user[opts.fb]+"/picture?type="+opts.type);
    }else{
      callback();
    }
  }
};

/**
 * Request the photo based on a facebook access_token if present
 *
 * @param [opts] {object} optional options for the request
 * @param [opts.access_token] {string} the property of the user object containing the facebook access token default: "access_token"
 * @param [opts.type] {string} the size of the image to return 'square', 'small', 'normal' or 'large' default: 'square'
 */
exports.token = function(opts){
  opts = opts || {};
  opts.access_token = opts.access_token || "access_token";
  opts.type = opts.type || "square";
  if(!validateFBSize(opts.type)) throw "invalid size type for facebook";
  return function (user, callback){
    if (user[opts.access_token]){
      callback("https://graph.facebook.com/me/picture?type="+opts.type + "&access_token=" + user[opts.access_token]);
    }else{
      callback();
    }
  }
};

/**
 * Request the photo from facebook- based on an email if present
 *
 * @param opts {object} options for the request
 * @param opts.access_token {string} an access token is required to perform search, any access token will do though
 * @param [opts.email] {string} the property of the user object containing the email token default: "email"
 * @param [opts.type] {string} the size of the image to return 'square', 'small', 'normal' or 'large' default: 'square'
 */
exports.search = function(opts){
  opts = opts || {};
  opts.email = opts.email || "email";
  opts.type = opts.type || "square";
  if(typeof opts.access_token !== "string" && typeof opts.access_token !== "function") throw "You must provide an access token to use facebookSearch";

  var getPhoto = exports.id({fb:"id", type:opts.type});

  return function (user, callback){
    var token = "";
    if(typeof opts.access_token === "function") token = opts.access_token();
    else token = opts.access_token;
    if(user[opts.email]){
      request({uri:"https://graph.facebook.com/search",qs:{q:user[opts.email], type:"user", access_token:opts.access_token}},
          function(err,response, body){
            if(!err && response.statusCode == 200){
              var result = JSON.parse(body.toString());
              if(result.data && result.data.length){
                var newUser = {id:result.data[0].id};
                getPhoto(newUser, callback);
              }else{
                callback();
              }
            }else if (response && response.statusCode === 400){
              var result = JSON.parse(body.toString());
              console.log(result);
              callback();
            }else{
              console.log(err||response);
              callback();
            }
          })
    }else{
      callback();
    }
  }
};