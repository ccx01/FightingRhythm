cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
    },

    animControl: function(cfg) {
        var self = this;
        var anim1 = this.anim.getAnimationState(cfg.anim);
        anim1.on('play', function() {
            cfg.play && cfg.play();
        }, this);
        anim1.on('stop', function() {
            cfg.stop && cfg.stop();
        }, this);
        anim1.on('lastframe', function() {
            cfg.lastframe && cfg.lastframe();
        }, this);
        anim1.on('finished', function() {
            cfg.finished && cfg.finished();
        }, this);
        anim1.on('pause', function() {
            cfg.pause && cfg.pause();
        }, this);
    },

    // use this for initialization
    onLoad: function () {
              
    },

    // called every frame, uncomment this function to activate update callback
    /*update: function (dt) {

    },*/
});
