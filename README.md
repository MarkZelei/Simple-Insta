
<h2>What is Simple Insta?</h2>
<p>
Simple Insta is a configurable javascript plugin that fetches Instagram photos to a particular html tag. The script is capable of displaying photos by username, tag name or location.
</p>

<h2>Demos</h2>
<ul>
<li><a href="http://markzart.com/projects/simple_insta/default/">Media from a user account</a></li>
<li><a href="http://markzart.com/projects/simple_insta/location/">Media from a given location</a></li>
<li><a href="http://markzart.com/projects/simple_insta/tags/">Tagged media</a></li>
<li><a href="http://markzart.com/projects/simple_insta/lightbox_gallery/">Lightbox gallery</a></li>
</ul>

<h2>How to use?</h2>
<p>
First things first, you will need to get an access token in order to retrieve data from Instagram's server. You will find this <a href="https://www.youtube.com/watch?v=fGMk8daxF08">video</a>
pretty helpful in case you haven't requested an access token before. <strong>This is step is very important! You must have an access token to get the application work!</strong>
</p>

<h4>HTML</h4>

<p>
Just add the &lt;div id="simple-insta"> tag to your the source code of your site. It should be an empty &lt;div> if possible.
</p>

<pre>
&lt;div id="simple-insta">&lt;/div>
</pre>

<h4>JAVASCRIPT</h4>
<p>
The next step is including the script itself in the <strong>&lt;head></strong> tag or right before the closing 
<strong>&lt;/body></strong> tag:
</p>

<pre>
&lt;script src="simple_insta.min.js">&lt;/script>
</pre>

<p>
Simple Insta was built in raw javascript, so it can work as a standalone application, you don't need to include any third party library.
</p>

<p>
The last step is firing the plugin. You can do that inline right before the <strong>&lt;/body></strong> tag or you can do it in a separate file.
Minimal setup looks like this:
</p>

<pre>
var simpleInsta = new simpleInsta({
                      accessToken: 'your access token',
                      userId: 'your user id'
});
</pre>

<p>
The code above will retrive the latest posts from a particular user's feed. <strong>Important:</strong> currently, the script can handle only 
one feed per page and <strong>the variable must be named <i>simpleInsta</i></strong>!
</p>

<p>
<i>Additional note: you can even ignore the <strong>userID</strong> option, in that case, the application will display images from <a href="https://www.instagram.com/instagram/">Instagram's</a> feed.</i>
</p>

<h4>CSS</h4>

<p>
Simple Insta doesn't want to limit your creativity, so the application comes without default styling. You are free to build your own 
styles from scratch. The script generates the following html markup:
</p>

<pre>
&lt;div id="simple-insta">
     &lt;ul class="si-list">
         &lt;li>&lt;a href="" title="">&lt;img src="" alt="" />&lt;/a>&lt;/li>
         &lt;li>&lt;a href="" title="">&lt;img src="" alt="" />&lt;/a>&lt;/li>
         &lt;li>&lt;a href="" title="">&lt;img src="" alt="" />&lt;/a>&lt;/li>
         &lt;li>&lt;a href="" title="">&lt;img src="" alt="" />&lt;/a>&lt;/li>
         &lt;li>&lt;a href="" title="">&lt;img src="" alt="" />&lt;/a>&lt;/li>
     &lt;/ul>
     &lt;a href="" class="si-follow-button"></a>
&lt;/div>
</pre>

<h2>Full list of options</h2>
<p>
The script comes with one mandatory and ten optional configuration parameters.
</p>
<pre>
var simpleInsta = new simpleInsta({
                      targetID: 'simple-insta', //ID of the main container &lt;div>
                      accessToken: 'your access token', //Access token
                      endPoint: 'user', //accepted values: 'user', 'tag', 'location'
                      count: 8, //amount of images in the feed
                      userId: '25025320', //User ID
                      tagName: 'ocean', //tag name
                      locationID: '213205633', //location id
                      followMessage: 'Follow me', //Label of the follow button
                      containerClass: 'si-list', //the class attribute of the &lt;ul> list that contains the feed list items
                      thumbLink: 'post', //fullres, post, user                   
                      callback: function() { console.log('Feed has been built succesfully!'); } //callback function that fires once the feed built
});
</pre>
<p>Let's dive a bit deeper in details.</p>

<h4>targetID</h4>
<p><i>Default: 'simple-insta'</i></p>
<p>
The ID of the html element that supposed to store the feed. I recommend to use a &lt;div>.
<p>

<h4>accessToken</h4>
<p><i>Default: none</i></p>
<p>
There is no default value for this argument, you will need to use your own access token. This is a mandatory parameter.
<p>

<h4>endPoint</h4>
<p><i>Default: 'user'</i></p>
<p>
What do you want to display? This parameter accepts three values:
<ul>
<li><strong>'user'</strong> - <i>Displays the most recent media published by a user.</i></li>
<li><strong>'tag'</strong> - <i>Get recently tagged media.</i></li>
<li><strong>'location'</strong> - <i>Retrieve recent media objects from a given location.</i></li>
</ul>
<p>

<h4>count</h4>
<p><i>Default: 8</i></p>
<p>
Number of media to return. The value can be anything between 1 and 20, however, you need to be careful if you retrieve media by location
because the number of media items in the jsonp response is kinda various in that case. If you set the value 10, but the server provides only 9 files, 
the browser will return an error message. So, I don't recommend to use a value higher than 8 for location based media feeds. It is not
an issue with tag name or user based feeds.
<p>

<h4>userId</h4>
<p><i>Default: '25025320'</i></p>
<p>
Take a look at <a href="https://smashballoon.com/instagram-feed/find-instagram-user-id/">Smashbaloon</a> if you can't find the 
desired user ID.
<p>

<h4>tagName</h4>
<p><i>Default: 'ocean'</i></p>
<p>
Tag name without hash. For instance, if you want to display media that tagged <strong>#fun</strong>, you will need 
to use simply <strong>'fun'</strong>. 
<p>

<h4>locationID</h4>
<p><i>Default: '213205633'</i></p>
<p>
The ID of the location where the media items you want to load were taken.
<p>

<h4>followMessage</h4>
<p><i>Default: 'Follow me'</i></p>
<p>
You can define a custom label for the follow button.
<p>

<h4>containerClass</h4>
<p><i>Default: 'si-list'</i></p>
<p>
The css class of the &lt;ul> item that contains the feed list items. 
<p>

<h4>thumbLink</h4>
<p><i>Default: 'post'</i></p>
<p>
You can define the destination of the media thumbnail links. This option supports the following values:
<ul>
<li><strong>post</strong> - <i>the actual Instagram post</i></li>
<li><strong>user</strong> - <i>the user main feed.</i></li>
<li><strong>fullres</strong> - <i>full size version of the image. Might be useful for galleries</i></li>
</ul>
<p>

<h4>callback</h4>
<p><i>Default: function() { console.log('Feed has been built succesfully!'); }</i></p>
<p>
The callback function that fires when the feed is built. It must be a function() anyway!
<p>

<h2>Examples</h2>
<p>
We gonna experient with the scipt's capabilties a little bit.
</p>

<h3>Location</h3>
<p>Load media from a given location ( <a href="http://markzart.com/projects/simple_insta/location/">demo</a> )</p>
<pre>
var simpleInsta = new simpleInsta({
                      accessToken: 'your access token',
                      endPoint: 'location',
                      count: 8,
                      locationID: '168409033699624'
});
</pre>

<h3>Tagged media</h3>
<p>Display recent tagged media ( <a href="http://markzart.com/projects/simple_insta/tags/">demo</a> )</p>
<pre>
var simpleInsta = new simpleInsta({
                                  accessToken: 'your access token',
                                  endPoint: 'tag',
                                  tagName: 'ocean'
});
</pre>

<h3>Custom button and classes</h3>
<p>Let's modify the default class of the list item and the label of the follow button</p>
<pre>
var simpleInsta = new simpleInsta({
                                  accessToken: 'your access token',
                                  followMessage: 'Check out my Instagram account!',
                                  containerClass: 'custom-feed'
});
</pre>
<p>The setup above will result this html output:</p>
<pre>
&lt;div id="simple-insta">
     &lt;ul class="custom-feed">
         &lt;li>&lt;a href="" title="">&lt;img src="" alt="" />&lt;/a>&lt;/li>
         &lt;li>&lt;a href="" title="">&lt;img src="" alt="" />&lt;/a>&lt;/li>
         &lt;li>&lt;a href="" title="">&lt;img src="" alt="" />&lt;/a>&lt;/li>
         &lt;li>&lt;a href="" title="">&lt;img src="" alt="" />&lt;/a>&lt;/li>
         &lt;li>&lt;a href="" title="">&lt;img src="" alt="" />&lt;/a>&lt;/li>
     &lt;/ul>
     &lt;a href="" class="si-follow-button">Check out my Instagram account!</a>
&lt;/div>
</pre>

<h3>Custom container</h3>
<p>It is absolutely possible to define a custom ID for the main container element.</p>
<h4>HTML</h4>
<pre>
&lt;div id="my-feed">&lt;/div>
</pre>
<h4>JAVASCRIPT</h4>
<pre>
var simpleInsta = new simpleInsta({
                                  targetID: 'my-feed',
                                  accessToken: 'your access token'
});
</pre>

<h3>Lightbox gallery</h3>
<p>
This configuration will require some jQuery and the <a href="http://brutaldesign.github.io/swipebox/">Swipenox</a>
responsive lightbox plugin. Include jquery and the swipebox js above simple insta:
</p>
<pre>
&lt;script src="swipebox/jquery.min.js">&lt;/script>
&lt;script src="swipebox/swipebox.min.js">&lt;/script>
&lt;script src="simple_insta.js">&lt;/script>
</pre>
<p>
Then fire the plugin with the following configuration:
</p>
<pre>
var simpleInsta = new simpleInsta({
                                  accessToken: 'your access token',
                                  userId: '571081594',
                                  thumbLink: 'fullres',
                                  callback: function() { $( 'ul.si-list li a' ).swipebox(); }
                  });
</pre>
<p>
As you can see, we fire swipebox in the callback function. If everything went well, you should experience a 
result like <a href="http://markzart.com/projects/simple_insta/lightbox_gallery/">this one</a>.
</p>
