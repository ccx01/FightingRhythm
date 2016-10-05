cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    onCollisionEnter: function (other, self) {
        // tag: 0{攻击范围} 1{受击框} 2{打击框} 
        // if(!other.enabled || !self.enabled) return;

        if(self.tag == 0 && other.tag == 1) {
            // 攻击范围内
            var s_comp = self.node.getComponent(self.node.name);
            s_comp.canHit = true;
        }

        if(self.tag == 2 && other.tag == 1) {
            // 攻击
            var o_comp = other.node.getComponent(other.node.name);
            var s_comp = self.node.getComponent(self.node.name);

            if(self.lie) {
                o_comp.hurt({
                    anim:"lie",
                    xD: other.node.x + (s_comp.face * 100),
                    damage: self.damage
                });
            } else {
                o_comp.hurt({
                    anim:"hurt",
                    xD: self.node.x,
                    damage: self.damage
                }); 
            }

            s_comp.hitEffect({
                name: self.effect.name,
                x: self.effect.x || self.offset.x,
                y: self.effect.y || self.offset.y
            });


            other.node.zIndex = 99;
            s_comp.node.zIndex = 999;
        }

    },

    onCollisionStay: function (other, self) {
        // console.log('on collision stay');
    },

    onCollisionExit: function (other, self) {
        // console.log('on collision exit');
        if(self.tag == 0 && other.tag == 1) {
            var s_comp = self.node.getComponent(self.node.name);
            s_comp.canHit = false;
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
