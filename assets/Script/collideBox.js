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
        if(other.tag != self.tag) {
            console.log(other.tag,self.tag)
        }
    },

    onCollisionStay: function (other, self) {
        // console.log('on collision stay');
    },

    onCollisionExit: function (other, self) {
        // console.log('on collision exit');
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
