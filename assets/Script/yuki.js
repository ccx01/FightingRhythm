var entity = require("entity");

cc.Class({
	extends: entity,

    properties: {
        anim: cc.Animation,
    },

    onLoad: function () {

        this.initBox();

        if(this.control) {
        	this.cmd();	
        } else {
            this.ai();
        }
    },

    stateSet: function(s) {
        if(this.state == s) return;
        // 状态池
        this.state = s;
        switch(s) {
            case "stand":
                this.anim.play("yuki_stand");
            break;
            case "run":
            case "runA":
                this.anim.play("yuki_run");
            break;
            case "a1":
                this.anim.play("yuki_a1");
            break;
        }
    },

    stateUpadate: function(dt) {
        // 状态切换条件判断
        switch(this.state) {
            // 跑A和跑必须分离为两种状态
            case "run":
                if(Math.abs(this.node.x - this.xDestination) > this.xMaxSpeed * 0.01) {
                    this.node.x += this.xSpeed * dt;
                } else {
                    this.xSpeed = 0;
                    this.stateSet("stand");
                }
                
                this.node.y += this.ySpeed * dt;
                this.move();
            break;
            case "runA":
                if(this.canHit) {
                    this.stateSet("a1");
                    this.xSpeed = 0;
                } else if(Math.abs(this.node.x - this.xDestination) > this.xMaxSpeed * 0.01) {
                    this.node.x += this.xSpeed * dt;
                    this.stateSet("runA");
                } else {
                    this.xSpeed = 0;
                    this.stateSet("stand");
                }
                this.move();
            break;
            case "stand":
                this.stateSet("stand");
            break;
            case "a1":
                this.stateSet("a1");
            break;
        }
    },

    ai: function () {
        var self = this;
        setInterval(function() {
            self.stateSet("run");
            self.xDestination = Math.random() * 400 - 200;
        }, 2000);
    },

    cmd: function () {
    	var self = this;
        var Xtouch,Ytouch;
        var XtouchMove,YtouchMove;
        var xs, ys;
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                Xtouch = touch.getLocationX() - cc.winSize.width / 2;
                self.xDestination = Xtouch;

                var touchLoc = touch.getLocation();
                if(cc.Intersection.pointInPolygon(touchLoc, self.game.enemy.getComponents(cc.Collider)[1].world.points)) {
                    self.stateSet("runA");
                } else {
                    self.stateSet("run");
                }

                return true;
            },
            onTouchMoved: function (touch, event) {

            },
            onTouchEnded: function (touch, event) {
                Xtouch = touch.getLocationX() - cc.winSize.width / 2;
            },
            onTouchCancelled: function (touch, event) {

            },
        }
        // 绑定单点触摸事件
        cc.eventManager.addListener(listener, this.node);
    },
    
    update: function (dt) {
        this.stateUpadate(dt);
    },


});
