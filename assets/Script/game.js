cc.Class({
    extends: cc.Component,

    properties: {
        end: false,
        playerBar: {
            default: null,
            type: cc.ProgressBar
        },
        enemyBar: {
            default: null,
            type: cc.ProgressBar
        },
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        dialogPrefab: {
            default: null,
            type: cc.Prefab
        },
        yukiPrefab: {
            default: null,
            type: cc.Prefab
        },
        hikaruPrefab: {
            default: null,
            type: cc.Prefab
        },
        trick: {
            default: null,
            type: cc.Node
        }
    },

    setChar: function(p, lv) {
        var char = cc.instantiate(this[p + 'Prefab']);
        char.getComponent(p).game = this;
        char.getComponent(p).rigor = true;

        if(!lv) {
            char.getComponent(p).control = true;
            char.getComponent(p).lifeBar = this.playerBar;
            char.getComponent(p).lifeBar.progress = 1;
        } else {
            char.getComponent(p).lv = lv;
            char.getComponent(p).lifeBar = this.enemyBar;
            char.getComponent(p).lifeBar.progress = 1;
            char.getComponent(p).face *= -1;
            char.scaleX = char.getComponent(p).face;
        }

        this.node.addChild(char);
        return char;
    },

    setUI: function() {
        var self = this;

        this.node.removeChild(this.ui);

        this.ui = cc.instantiate(this.uiPrefab);
        this.node.addChild(this.ui);

        this.ui.getComponent("ui").animControl({
            anim: "go",
            finished: function() {
                self.playerComp.rigor = false;
                self.enemyComp.rigor = false;
            }
        }); 

        this.ui.getComponent("ui").animControl({
            anim: "ko",
            play: function() {
                self.loser.stateSet("lose");
                self.winner.rigor = true;
                self.winner.lie = true;
                // self.update = function() {}
            },
            stop: function() {

            },
            finished: function() {
                self.winner.stateSet("win");
            }
        }); 
    },
    
    init: function (c) {

        var chapter = {
            "guide": {
                player: { name: "yuki" },
                enemy: { name: "hikaru", lv: 1 },
                story : [
                    { ava: 0, text: "新手引导实在是太麻烦了，对吧，小鬼？" },
                    { ava: 1, text: "………………" },
                    { ava: 0, text: "好，开始吧！" }
                ]
            },
            "lv2": {
                player: { name: "yuki" },
                enemy: { name: "hikaru", lv: 2 },
                story : [
                    { ava: 0, text: "怎么了，还要打吗？" },
                    { ava: 1, text: "………………" },
                    { ava: 1, text: "[难度2模式开启]" },
                    { ava: 0, text: "……难度2？" }
                ]
            },
            "lv3": {
                player: { name: "yuki" },
                enemy: { name: "hikaru", lv: 3 },
                story : [
                    { ava: 1, text: "………………" },
                    { ava: 1, text: "菜！" },
                    { ava: 0, text: "混蛋！你明明输了！" }
                ]
            },
            "lv4": {
                player: { name: "yuki" },
                enemy: { name: "hikaru", lv: 4 },
                story : [
                    { ava: 1, text: "你有点惹毛我了" },
                    { ava: 0, text: "啊？是你硬要和我打" }
                ]
            },
            "lv5": {
                player: { name: "yuki" },
                enemy: { name: "hikaru", lv: 5 },
                story : [
                    { ava: 0, text: "还有什么实力尽管使出来吧！" },
                    { ava: 1, text: "[认真模式]" },
                    { ava: 0, text: "臭小子，你想说你前面只是随便玩玩么？" }
                ]
            },
            "win": {
                player: { name: "yuki" },
                enemy: { name: "hikaru", lv: 6 },
                story : [
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "恭喜通关，试试上面3个按钮吧。" },
                    { ava: 0, text: "那我帮你选吧，要进入梦魇模式了哦" }
                ]
            },
            "lose": {
                player: { name: "yuki" },
                enemy: { name: "hikaru", lv: this.record },
                story : [
                    { ava: 0, text: "可恶，你挺强的嘛，再来！" }
                ]
            },
            "mare": {
                player: { name: "yuki" },
                enemy: { name: "hikaru", lv: 6 },
                story : [
                    { ava: 0, text: "你挺强的嘛，我承认你了，你叫什么名字？" },
                    { ava: 1, text: "[愤怒]" },
                    { ava: 0, text: "喂？……喂？" },
                    { ava: 1, text: "[愤怒]" },
                    { ava: 0, text: "不会吧，这个小鬼生气了……" }
                ]
            },
            "other": {
                player: { name: "hikaru" },
                enemy: { name: "yuki", lv: 5 },
                story : [
                    { ava: 1, text: "……我为什么跑右边了？" },
                    { ava: 0, text: "……" },
                    { ava: 1, text: "啊，为什么主角变成你了？" },
                    { ava: 0, text: "……" },
                    { ava: 1, text: "可恶！" }
                ]
            },
            "self": {
                player: { name: "yuki" },
                enemy: { name: "yuki", lv: 5 },
                story : [
                    { ava: 0, text: "……………………" },
                    { ava: 1, text: "……" },
                    { ava: 0, text: "哪个是我？" }
                ]
            }
        };

        this.stage = c || this.stage;

        var cfg = chapter[this.stage];


        this.node.removeChild(this.player);
        this.node.removeChild(this.enemy);
        this.node.removeChild(this.dialog);

        this.story = cfg.story;
        this.story_cur = 0;

        this.player = this.setChar(cfg.player.name, 0);
        this.enemy = this.setChar(cfg.enemy.name, cfg.enemy.lv);

        this.dialog = cc.instantiate(this.dialogPrefab);
        this.node.addChild(this.dialog);

        // 复用ui的js
        this.dialog.getChildByName("avaL").getComponents("ui")[0].anim.play(cfg.player.name);
        this.dialog.getChildByName("avaR").getComponents("ui")[0].anim.play(cfg.enemy.name);

        // common
        this.player.setPosition(-126, -90);
        this.enemy.setPosition(150, -90);

        this.playerComp = this.player.getComponent(this.player.name);
        this.enemyComp = this.enemy.getComponent(this.enemy.name);

        this.enemyComp.target = this.player;

        this.setUI();
        this.bind();
        this.talk();

    },

    talk: function() {
        var label = this.dialog.getChildByName("text").getComponent(cc.Label);

        var player_ava = this.dialog.getChildByName("avaL");
        var enemy_ava = this.dialog.getChildByName("avaR");

        player_ava.opacity = 255 - this.story[this.story_cur].ava * 255;
        enemy_ava.opacity = this.story[this.story_cur].ava * 255;


        label.string = this.story[this.story_cur].text;

        this.story_cur++;
    },

    bind: function() {
        var self = this;

        this.listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                if(self.story_cur == self.story.length) {
                    cc.eventManager.removeListener(dia);
                    self.begin();
                    return;
                }

                self.talk();

                return true;
            },
            onTouchMoved: function (touch, event) {

            },
            onTouchEnded: function (touch, event) {

            },
            onTouchCancelled: function (touch, event) {

            },
        }
        // 绑定单点触摸事件
        var dia = cc.eventManager.addListener(this.listener, this.node);
    },


    begin: function() {
        this.node.removeChild(this.dialog);
        this.ui.getComponents("ui")[0].anim.play("go");
        this.end = false;
        this.trick.active = false;
    },

    // use this for beginialization
    onLoad: function () {

        this.stage = "guide";
        this.record = 1;
        this.init();

        this.trick.active = false;

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;

    },

    // 暂时这么处理，按钮事件绑定
    btnOther: function() {
        this.init("other");
        this.trick.active = false;
    },
    btnSelf: function() {
        this.init("self");
        this.trick.active = false;
    },
    btnMare: function() {
        this.init("mare");
        this.trick.active = false;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.end) return;
        if(this.playerComp.hp <= 0) {

            this.stage = "lose";

            this.winner = this.enemyComp;
            this.loser = this.playerComp;
            this.ui.getComponents("ui")[0].anim.play("ko");
            this.end = true;

            if (this.record >= 6) {
                this.stage = "win";
                this.trick.active = true;
            }
        }
        if(this.enemyComp.hp <= 0) {
            this.record++;
            this.record = Math.min(this.record, 6);
            this.stage = "lv" + this.record;

            this.winner = this.playerComp;
            this.loser = this.enemyComp;
            this.ui.getComponents("ui")[0].anim.play("ko");
            this.end = true;

            if (this.record >= 6) {
                this.stage = "win";
                this.trick.active = true;
            }
        }
    },
});
