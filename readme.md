
# Passport Photo Facebook

## Installation

    npm install passport-photo-facebook

## Usage

```javascript
var photo = require("passport-photo");
var fb = require("passport-photo-facebook");

photo.use(fb.id());
photo.use(fb.token());
photo.use(fb.search({access_token:"Any Valid Access Token"}));

photo({facebookid:445461, access_token:"User's Access Token",email:"user@example.com"}, function(err, avatarURL){
  if(!err) require('request')(avatarURL).pipe(require('fs').createWriteStream("./avatar.jpg"));
});
```


## API

### id

Take the following options to retrieve the avatar based on facebook user id.

@param [opts] {object} optional options for the request    
@param [opts.fb] {string} the property of the user object containing the facebook id default: "facebookid"    
@param [opts.type] {string} the size of the image to return 'square', 'small', 'normal' or 'large' default: 'square'   

### token

Take the following options to retrieve the avatar based on facebook user access token.

@param [opts] {object} optional options for the request    
@param [opts.access_token] {string} the property of the user object containing the facebook access token default: "access_token"    
@param [opts.type] {string} the size of the image to return 'square', 'small', 'normal' or 'large' default: 'square'    

### search

Using any valid user access token, you can search for a user based on their e-mail address, and then get their profile picture from that.

Takes the following options.

@param opts {object} options for the request    
@param opts.access_token {string} an access token is required to perform search, any access token will do though    
@param [opts.email] {string} the property of the user object containing the email token default: "email"    
@param [opts.type] {string} the size of the image to return 'square', 'small', 'normal' or 'large' default: 'square'    