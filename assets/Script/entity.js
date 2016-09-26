cc.Class({
    extends: cc.Component,

    properties: {
        xMaxSpeed: 0,
        yMaxSpeed: 0,
        xSpeed: 0,
        ySpeed: 0,
        xDestination: 0,
        face: 1,
        hpMax: 0,
        hp: 0,
        control: false,
        arBox: {
            default: null,
            type: cc.Prefab
        },
        bdBox: {
            default: null,
            type: cc.Prefab
        },
        atBox: {
            default: null,
            type: cc.Prefab
        },
    },


    move: function() {
        var d = this.xDestination - this.node.x;
        this.face = d / Math.abs(d);

        this.node.scaleX = this.face;
        this.xSpeed = this.xMaxSpeed * this.face;
    },

    addBox: function(cfg) {
        var box = cc.instantiate(this[cfg.type]);

        if(this.control) {
            cfg.tag = 0;
        } else {
            cfg.tag = 1;
        }
        
        this.node.addChild(box);
        box.setPosition(cfg.x, cfg.y);
        box.getComponents(cc.Collider)[0].tag = cfg.tag;
        box.getComponents(cc.Collider)[0].size.width = cfg.w;
        box.getComponents(cc.Collider)[0].size.height = cfg.h;
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
