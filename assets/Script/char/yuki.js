var entity = require("entity");

cc.Class({
	extends: entity,

    properties: {
        anim: cc.Animation,
    },

    onLoad: function () {

        this.initBox();
        this.initAnim();

        if(this.control) {
        	this.cmd();	
        } else {
            this.ai(this.lv);
        }
    },

    initAnim: function() {
        // 初始化各个动画参数

        var self = this;

        this.animControl({
            anim: "yuki_hurt",
            play: function() {
                self.rigor = true;
            },
            finished: function() {
                self.rigor = false;
                self.stateSet("stand");
            }
        });

        this.animControl({
            anim: "yuki_lie",
            play: function() {
                self.lie = true;
                self.disableBox(1);
            },
            finished: function() {
                self.lie = false;
                self.enableBox(1);
                self.stateSet("stand");
            }
        });

        this.animControl({
            anim: "yuki_lose",
            play: function() {
                self.lie = true;
                this.rigor = true;
                self.disableBox(1);
            }
        });
        this.animControl({
            anim: "yuki_win",
            play: function() {
                self.lie = true;
                this.rigor = true;
            },
            finished: function() {
                self.game.init();
            }
        });

        this.animControl({
            anim: "yuki_a1",
            play: function() {
                var cfg = {
                    x: 40,
                    y: 30,
                    w: 50,
                    h: 50,
                    damage: 1,
                    effect: {
                        name: 'hit1'
                    }
                }
                self.combo = 2;
                self.atkBox(cfg);
            },
            stop: function() {
                self.initBox();
            },
            finished: function() {
                self.combo = 1;
                self.stateSet("stand");
            }
        });

        this.animControl({
            anim: "yuki_a2",
            play: function() {
                self.combo = 3;
                var cfg = {
                    x: 40,
                    y: 30,
                    w: 50,
                    h: 50,
                    damage: 2,
                    effect: {
                        name: 'hit1'
                    }
                }
                self.atkBox(cfg);
            },
            stop: function() {
                self.initBox();
            },
            finished: function() {
                self.combo = 1;
                self.stateSet("stand");
            }
        });

        this.animControl({
            anim: "yuki_a3",
            play: function() {
                self.rigor = true;
                self.combo = 1;
                var cfg = {
                    x: 40,
                    y: 30,
                    w: 100,
                    h: 50,
                    damage: 2,
                    effect: {
                        name: 'hit2'
                    },
                    lie: true
                }
                self.atkBox(cfg);
            },
            stop: function() {
                self.initBox();
            },
            finished: function() {
                self.rigor = false;
                self.combo = 1;
                self.stateSet("stand");
            }
        });

        this.animControl({
            anim: "yuki_s1",
            play: function() {
                self.rigor = true;
                self.combo = 1;
                var cfg = {
                    x: 0,
                    y: 0,
                    w: 80,
                    h: 200,
                    lie: true,
                    damage: 1
                }
                self.atkBox(cfg);
            },
            stop: function() {
                self.initBox();
            },
            finished: function() {
                self.rigor = false;
                self.stateSet("s1_end");
            }
        });
        this.animControl({
            anim: "yuki_s1_end",
            play: function() {
                self.rigor = true;
            },
            stop: function() {
                self.rigor = false;
            },
            finished: function() {
                self.rigor = false;
                self.stateSet("stand");
            }
        });

        this.animControl({
            anim: "yuki_move",
            play: function() {
                self.combo = 1;
                self.disableBox(1);
            },
            stop: function() {
                self.enableBox(1);
            },
            finished: function() {
                self.enableBox(1);
                self.stateSet("stand");
            }
        });
    },

    stateSet: function(s) {
        if(s == "lose" || s== "win") {

            this.anim.play("yuki_" + s);
            return;
        }
        // 反之重复以及判断硬直
        if(this.state == s || this.rigor || this.lie) return;
        // 状态池
        this.state = s;

        var yuki_anim = "yuki_" + s;

        if(s == "runA") {
            yuki_anim = "yuki_run";
        }

        this.anim.play(yuki_anim);
    },

    stateUpadate: function(dt) {
        if(this.rigor) return;
        // 状态切换条件判断
        switch(this.state) {
            // 跑A和跑必须分离为两种状态
            case "run":
                if(Math.abs(this.node.x - this.xDestination) > Math.abs(this.xSpeed * dt)) {
                    this.node.x += this.xSpeed * dt;
                } else {
                    this.xSpeed = 0;
                    this.stateSet("stand");
                }
                
                this.node.y += this.ySpeed * dt;
                this.move(1);
            break;
            case "runA":
                if(this.canHit) {
                    this.stateSet("a" + this.combo);
                    this.xSpeed = 0;
                } else if(Math.abs(this.node.x - this.xDestination) > Math.abs(this.xSpeed * dt)) {
                    this.node.x += this.xSpeed * dt;
                    this.stateSet("runA");
                } else {
                    this.xSpeed = 0;
                    this.stateSet("stand");
                }
                this.move(1);
            break;
            case "move":
                this.stateSet(this.state);

                if(Math.abs(this.node.x - this.xDestination) > Math.abs(this.xSpeed * dt)) {
                    this.node.x += this.xSpeed * dt * 1.5;
                } else {
                    this.xSpeed = 0;
                    this.stateSet("stand");
                }
                
                this.node.y += this.ySpeed * dt;
                this.move(1);
            break;
            case "lie":
                this.stateSet(this.state);

                if(Math.sign(this.node.x - this.xDestination) * Math.sign(this.xSpeed) < 0) {
                    this.node.x += this.xSpeed * dt;
                } else {
                    this.xSpeed = 0;
                }
            break;
            case "stand":
            case "a1":
            case "a2":
            case "a3":
            case "s1":
            case "s1_end":
            case "hurt":
            case "ava":
                this.stateSet(this.state);
            break;
        }
    },

    ai: function (lv) {
        var t = 3000;
        switch(lv) {
            case 1:
                t = 3000;
                this.hp = 50;
                this.hpMax = 50;
            break;
            case 2:
                t = 2000;
                this.hp = 50;
                this.hpMax = 50;
            break;
            case 3:
                t = 1000;
                this.hp = 100;
                this.hpMax = 100;
            break;
            case 4:
                t = 300;
                this.hp = 100;
                this.hpMax = 100;
            break;
            case 5:
                t = 200;
                this.hp = 100;
                this.hpMax = 100;
            break;
            case 6:
                t = 100;
                this.hp = 100;
                this.hpMax = 100;
            break;
        }
        var self = this;
        setInterval(function() {
            self.stateSet("run");
            self.xDestination = Math.random() * 100 - 50 + self.target.x;

            if(Math.random() < 0.1) {
                self.stateSet("s1");
            }
            if(Math.random() < 0.5) {
                self.stateSet("move");
            }
            if(self.canHit) {
                self.stateSet("a" + self.combo);
            }
        }, t);
    },

    cmd: function () {
    	var self = this;

        var move = false;
        var Xtouch,Ytouch;
        var XtouchMove,YtouchMove;
        var xs, ys;
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                Xtouch = touch.getLocationX() - cc.winSize.width / 2;
                Ytouch = touch.getLocationY() - cc.winSize.height / 2;
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
                move = true;
            },
            onTouchEnded: function (touch, event) {
                if(move) {
                    XtouchMove = touch.getLocationX() - cc.winSize.width / 2;
                    YtouchMove = touch.getLocationY() - cc.winSize.height / 2;

                    if(Math.abs(XtouchMove - Xtouch) > 50) {
                        self.xDestination = XtouchMove;
                        self.stateSet("move");
                    } else if(Ytouch - YtouchMove > 50) {
                        self.stateSet("s1");
                    }
                    move = false;
                }

            },
            onTouchCancelled: function (touch, event) {

            },
        }
        // 绑定单点触摸事件
        cc.eventManager.addListener(listener, this.node);
    },
    
    update: function (dt) {
        // this.node.scaleX = this.face;
        this.stateUpadate(dt);
    },


});
