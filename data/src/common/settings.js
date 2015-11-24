var MediathreadCollectOptions = {
    cross_origin: true,
    host_url: 'https://mediathread.ccnmtl.columbia.edu/save/',
    user_url: 'https://mediathread.ccnmtl.columbia.edu/' +
        'accounts/is_logged_in/'
};

if (typeof exports !== 'undefined') {
    exports.settings = MediathreadCollectOptions;
}
