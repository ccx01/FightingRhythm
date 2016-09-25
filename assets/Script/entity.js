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
        playerBox: {
            default: null,
            type: cc.Prefab
        },
        enemyBox: {
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
