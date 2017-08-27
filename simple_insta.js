/*
Product version: 1.0
Licence: MIT ( more info: https://opensource.org/licenses/MIT )
Author: Mark Zelei
Author contact: mark@markzart.com
*/

"use strict";

/* PLUGIN CODE
==================================*/
function simpleInsta(params) {

              /* HANDLE OPTIONS
              ==================================*/

              //create default options
              var defaults = {
                  targetID: 'simple-insta',
                  accessToken: '2822109424.3a81a9f.5b190ccc70054fb1981ef9ad5c22108c',
                  userId: '571081594',
                  followMessage: 'Follow me',
                  containerClass: 'si-list',
                  endPoint: 'user', //user, tag, location
                  count: 12,
                  thumbLink: 'fullres', //fullres, post, user
                  tagName: 'vicoolyasaida',
                  locationID: '213205633',
                  callback: function() { console.log('Feed has been built succesfully!'); }
              }

              //Check if the function has arguments
              if ( typeof params === 'undefined' ) {
                   var params = {}
                   var i;
                   for (i in defaults) {
                        params[i] = defaults[i];
                        //console.log(params[i]);
                   }
              }
              
              //Replace missing arguments with default values
              if ( typeof params !== 'undefined' ) {
                   var o;
                   for(o in defaults) {
                       if(typeof params[o] == "undefined" ) {
                                 params[o] = defaults[o];
                       }
                   }
              }

              //create final values
              var targetID       = params['targetID'];
              var accessToken    = params['accessToken'];
              var userId         = params['userId'];
              var followMessage  = params['followMessage'];
              var containerClass = params['containerClass'];
              var endPoint       = params['endPoint'];
              var count          = params['count'];
              var thumbLink      = params['thumbLink'];
              var tagName        = params['tagName'];
              var locationID     = params['locationID'];
              var callback       = params['callback'];


              /* SCRIPT TAG
              ==================================*/

              //Build url
              function buildURL() {

                       //default variables
                       var dynamicURL;
                       var finalURL;
                       var baseURL = 'https://api.instagram.com/v1/';

                       //generate dynamic url
                       switch (endPoint) {
                              case 'user':
                                   dynamicURL = 'users/' + userId + '/media/recent?access_token=' + accessToken + '&count=' + count;
                              break;
                              case 'tag':
                                   dynamicURL = 'tags/' + tagName + '/media/recent?access_token=' + accessToken + '&count=' + count;
                              break;
                              case 'location':
                                   dynamicURL = 'locations/' + locationID + '/media/recent?access_token=' + accessToken;
                              break;
                       }

                       var finalURL = baseURL + dynamicURL + '&callback=simpleInsta.buildFeed';
                       return finalURL;
              }
              var instaURL = buildURL();

              //Build html tag
              var bodyTag = document.getElementsByTagName('body');
              var bodyTag = bodyTag[0];
              var scriptTag = document.createElement('script');
              scriptTag.src = instaURL;
              bodyTag.appendChild(scriptTag);

              /* BUILD HTML
              ==================================*/
              function listItem(linkUrl, imageUrl, postCaption) {
                       this.linkUrl = linkUrl;
                       this.imageUrl = imageUrl;
                       this.postCaption = postCaption;
                       this.layout = function() {
                                                switch (endPoint) {
                                                      case 'user' :
                                                           return '<li><a href="' + linkUrl + '" title="' + postCaption + '"><img src="' + imageUrl + '" alt="' + postCaption + '" /></a></li>';
                                                      break;
                                                      case 'tag':
                                                           return '<li><a href="' + linkUrl + '" title="' + postCaption + '"><img src="' + imageUrl + '" alt="' + postCaption + '" /></a></li>';
                                                      break;
                                                      case 'location':
                                                           return '<li><a href="' + linkUrl + '" title="' + postCaption + '"><img src="' + imageUrl + '" alt="' + postCaption + '" /></a></li>';
                                                      break;
                                                }
                       }
              }

              /* READ OUT FEED
              ==================================*/
              this.buildFeed = function(data) {

                       var feedData    = data;
                       var listClass   = containerClass;
                       var baseLink    = 'https://www.instagram.com/';
                       var userName    = feedData.data[0].user.username;
                       var buttonLabel = followMessage;
                       var buttonLink;
                       var finalLink;
                       var thumbUrl;
                       var fullresUrl;
                       var caption;
                       var captionText;
                       
                       //Build follow button
                       switch (endPoint) {
                              case 'user':
                                   buttonLink = baseLink + userName;
                              break;
                              case 'tag':
                                   buttonLink = baseLink + 'explore/tags/' + tagName;
                              break;
                              case 'location':
                                   buttonLink = baseLink + 'explore/locations/' + locationID;
                              break;
                       }

                       //Open html list
                       var feedHtml = '<ul class=' + listClass + '>';

                       //Iterate through items
                       var x = 0;
                       for ( x; x < count; x++ ) {
                             
                             //Generate final thumbnail link
                             if ( thumbLink === 'fullres' ) { finalLink = feedData.data[x].images.standard_resolution.url; }
                             if ( thumbLink === 'post' )    { finalLink = feedData.data[x].link; }
                             if ( thumbLink === 'user' )    { finalLink = userLink; }

                             //Image urls
                             thumbUrl    = feedData.data[x].images.thumbnail.url;
                             thumbUrl    = thumbUrl.replace('s150x150/', 's320x320/');
                             fullresUrl  = feedData.data[x].images.standard_resolution.url;
                             
                             //Image caption
                             caption = feedData.data[x].caption;
                             if ( caption !== null ) { captionText = caption.text; }
                             if ( caption === null ) { captionText = ''; }

                             //Add html to the feedHtml object
                             var listHtml = new listItem(finalLink, thumbUrl, captionText);
                             feedHtml += listHtml.layout();
                       }
                       
                       //Close html list and add follow button
                       feedHtml += '</ul>';
                       feedHtml += '<a href="' + buttonLink + '" class="si-follow-button">' + buttonLabel + '</a>';
                       
                       //Add list items to ul
                       document.getElementById(targetID).innerHTML = feedHtml;

                       //Run callback
                       callback();

              }

}

