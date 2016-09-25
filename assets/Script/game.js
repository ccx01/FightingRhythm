cc.Class({
    extends: cc.Component,

    properties: {
        win: 0,
        yukiPrefab: {
            default: null,
            type: cc.Prefab
        },
    },

    setChar: function(p, isPlayer) {
        var char = cc.instantiate(this[p + 'Prefab']);
        char.getComponent(p).game = this;

        if(isPlayer) {
            char.getComponent(p).control = true;
        }

        this.node.addChild(char);
        return char;
    },

    setEnemy: function() {

    },

    enemyShow: function(x, y) {
        // 使用给定的模板在场景中生成一个新节点
        this.yuki = cc.instantiate(this.yukiPrefab);


        this.yuki.getComponent('yuki').game = this;
        // yuki.getComponent('yuki').control = true;
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(this.yuki);
        // 为星星设置一个随机位置
        this.yuki.setPosition(x, y);
    },
    // use this for initialization
    onLoad: function () {
        this.player = this.setChar("yuki", true);
        this.player.setPosition(-126, -90);


        this.enemy = this.setChar("yuki", false);
        this.enemy.setPosition(150, -90);


        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
