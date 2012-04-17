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

## License

(The MIT License)

Copyright (c) FPF Lindesay

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the 'Software'), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and 
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.