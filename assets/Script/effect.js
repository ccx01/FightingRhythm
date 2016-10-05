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
        
        var self = this;

        var effectArr = [
            "hit1","hit2","hit3","hit4"
        ];

        for (var i = effectArr.length - 1; i >= 0; i--) {
            this.animControl({
                anim: effectArr[i],
                play: function() {
                    self.node.active = true;
                },
                stop: function() {
                    self.node.active = false;
                },
                finished: function() {
                    self.node.active = false;
                }
            });
        }
    },

    // called every frame, uncomment this function to activate update callback
    /*update: function (dt) {

    },*/
});
