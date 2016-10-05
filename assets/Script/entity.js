cc.Class({
    extends: cc.Component,

    properties: {
        xMaxSpeed: 0,
        yMaxSpeed: 0,
        xSpeed: 0,
        ySpeed: 0,
        xDestination: 0,
        face: 1,
        combo: 1,
        hpMax: 100,
        hp: 100,
        lv: 1,
        canHit: false,
        control: false,
        rigor: false,   //硬直(无法控制)，默认true，游戏口头动画完成后才能动
        lie: false,   //倒地
        effectPrefab: {
            default: null,
            type: cc.Prefab
        },
    },


    move: function(v) {
        var d = this.xDestination - this.node.x;
        this.face = d / Math.abs(d);

        this.node.scaleX = this.face * v;
        this.xSpeed = this.xMaxSpeed * this.face;
    },

    hurt: function(cfg) {
        this.xDestination = cfg.xD;
        this.hp -= cfg.damage;

        this.lifeBar.progress = this.hp / this.hpMax;
        
        var d = this.xDestination - this.node.x;
        this.face = Math.sign(d);
        this.node.scaleX = this.face;
        if(cfg.anim == "lie") {
            this.node.scaleX = - this.face;
        }
        this.xSpeed = this.xMaxSpeed * this.face;

        this.stateSet(cfg.anim);
    },

    disableBox: function(n) {
        this.getComponents(cc.Collider)[n].enabled = false;
    },

    enableBox: function(n) {
        this.getComponents(cc.Collider)[n].enabled = true;
    },

    atkBox: function(cfg) {
        // 攻击框，供帧动画调用
        this.initBox();
        var at = this.getComponents(cc.Collider)[2];

        at.enabled = true;
        at.offset.x = cfg.x || 0;
        at.offset.y = cfg.y || 0;
        at.size.width = cfg.w || 0;
        at.size.height = cfg.h || 0;

        at.lie = cfg.lie || false;
        at.damage = cfg.damage || 0;

        at.effect = cfg.effect || {};
    },

    hitEffect: function(cfg) {
        var name = cfg.name;
        var x = cfg.x;
        var y = cfg.y;

        if(!name) return;

        this.effect = cc.instantiate(this.effectPrefab);
        this.node.addChild(this.effect);
        this.effect.setPosition(x, y);
        this.effect.getComponents("effect")[0].anim.play(name);
        this.isHitTouch = false;
    },

    initBox: function() {
        var at = this.getComponents(cc.Collider)[2];

        at.enabled = false;
        at.offset.x = 0;
        at.offset.y = 0;
        at.size.width = 0;
        at.size.height = 0;
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

    stateSet: function(s) {
        if(this.state == s) return;
        // 状态池
        this.state = s;
    },
    
    onLoad: function () {
        this.xSpeed = 0;
        this.ySpeed = 0;
    },

    
    update: function (dt) {
        if(Math.abs(this.node.x - this.xDestination) > this.xMaxSpeed * 0.01) {
            this.node.x += this.xSpeed * dt;
        } else {
            this.xSpeed = 0;
            this.stateSet("stand");
        }
        
        this.node.y += this.ySpeed * dt;
    },

});
