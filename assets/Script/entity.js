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
        canHit: false,
        control: false,
    },


    move: function() {
        var d = this.xDestination - this.node.x;
        this.face = d / Math.abs(d);

        this.node.scaleX = this.face;
        this.xSpeed = this.xMaxSpeed * this.face;
    },

    atkBox: function(x, y, w, h) {
        // 攻击框，供帧动画调用
        var at = this.getComponents(cc.Collider)[2];

        at.enabled = true;
        at.offset.x = x;
        at.offset.y = y;
        at.size.width = w;
        at.size.height = h;
    },

    initBox: function() {
        var at = this.getComponents(cc.Collider)[2];

        at.enabled = false;
        at.offset.x = 0;
        at.offset.y = 0;
        at.size.width = 0;
        at.size.height = 0;
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
