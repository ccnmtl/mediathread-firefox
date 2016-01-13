var hostUrl = 'https://mediathread.ccnmtl.columbia.edu/';

self.port.on('apikeys', function(apikeys) {
    MediathreadCollect.options.flickr_apikey = apikeys.flickr_apikey;
    MediathreadCollect.options.youtube_apikey = apikeys.youtube_apikey;
    MediathreadCollect.runners.jump(hostUrl, true);
});
