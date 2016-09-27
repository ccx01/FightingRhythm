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
            self.node.getComponent(self.node.name).canHit = true;
        }

        if(self.tag == 2 && other.tag == 1) {
            // 攻击
            console.log('hit')
        }
    },

    onCollisionStay: function (other, self) {
        // console.log('on collision stay');
    },

    onCollisionExit: function (other, self) {
        // console.log('on collision exit');
        var pn = self.node.parent;
        if(self.tag == 0 && other.tag == 1) {
            self.node.getComponent(self.node.name).canHit = false;
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
