(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Text = PIXI.Text;
    var Graphics = PIXI.Graphics;
    var shapes = PIXI.animate.ShapesCache;

    lib.LipsyncScene = Container.extend(function () {
        Container.call(this);
        var instance2 = new Graphics()
            .drawCommands(shapes.Game[0]);
        var instance1 = new Text("Lipsync w/ rhubarb")
            .setStyle({
                fontFamily: "Arial Rounded MT Bold",
                fontSize: 18,
                fill: "#fff",
                leading: 2
            })
            .setTransform(-96.95, -10.35);
        this.addChild(instance2, instance1);
    });

    lib.Paper = Container.extend(function () {
        Container.call(this);
        var instance1 = new Graphics()
            .drawCommands(shapes.Game[2]);
        this.addChild(instance1);
    });

    lib.Button = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 2
        });
        var instance3 = new Graphics()
            .drawCommands(shapes.Game[5]);
        var instance2 = new Graphics()
            .drawCommands(shapes.Game[4]);
        var instance1 = new Graphics()
            .drawCommands(shapes.Game[3]);
        var instance4 = new Graphics()
            .drawCommands(shapes.Game[6])
            .setTransform(140.35, 38.75);
        this.addTimedChild(instance3, 0, 1)
            .addTimedChild(instance2, 0, 1, {
                "0": {
                    x: 140.35,
                    y: 38.75
                }
            })
            .addTimedChild(instance1, 0, 1, {
                "0": {
                    x: 140.35,
                    y: 28.85
                }
            })
            .addTimedChild(instance4, 1, 1);
    });

    lib.Remote = Container.extend(function () {
        Container.call(this);
        var instance2 = new Graphics()
            .drawCommands(shapes.Game[7]);
        var instance1 = new lib.Button()
            .setTransform(-98.35, -37.2);
        this[instance1.name = "button"] = instance1;
        this.addChild(instance2, instance1);
    });

    var Graphic1 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 117, loop: false });
        var instance1 = new Graphics()
            .drawCommands(shapes.Game[8]);
        this.addTimedChild(instance1);
    });

    var Graphic2 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 117, loop: false });
        var instance2 = new Graphics()
            .drawCommands(shapes.Game[9]);
        var instance1 = new Graphic1(MovieClip.SYNCHED);
        this.addTimedChild(instance2)
            .addTimedChild(instance1, 0, 117, {
                "0": {
                    x: -9.4,
                    y: -45.95,
                    sy: 1
                },
                "36": {
                    y: -46,
                    sy: 0.109
                },
                "37": {
                    y: -46.023,
                    sy: 0.555
                },
                "38": {
                    y: -45.95,
                    sy: 1
                },
                "72": {
                    y: -46,
                    sy: 0.109
                },
                "73": {
                    y: -45.95,
                    sy: 1
                },
                "75": {
                    y: -46,
                    sy: 0.109
                },
                "76": {
                    y: -46.023,
                    sy: 0.555
                },
                "77": {
                    y: -45.95,
                    sy: 1
                }
            });
    });

    var Graphic3 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 123, loop: false });
        var instance1 = new Graphics()
            .drawCommands(shapes.Game[10])
            .setTransform(-744.2, -383.1);
        this.addTimedChild(instance1);
    });

    lib.Screen = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 123,
            labels: {
                turnOn: 0,
                turnOn_stop: 19,
                watchTV: 20,
                watchTV_loop: 109,
                turnOff: 110,
                turnOff_stop: 122
            }
        });
        var instance2 = new Graphics()
            .drawCommands(shapes.Game[11])
            .setTransform(-744.2, -383.1);
        var instance1 = new Graphic3(MovieClip.SYNCHED);
        var instance3 = new Graphic2(MovieClip.SYNCHED);
        this.addTimedChild(instance2)
            .addTimedChild(instance1, 0, 123, {
                "0": {
                    sx: 1,
                    sy: 1,
                    a: 0
                },
                "1": {
                    a: 0.05
                },
                "2": {
                    a: 0.11
                },
                "3": {
                    a: 0.16
                },
                "4": {
                    a: 0.21
                },
                "5": {
                    a: 0.26
                },
                "6": {
                    a: 0.32
                },
                "7": {
                    a: 0.37
                },
                "8": {
                    a: 0.42
                },
                "9": {
                    a: 0.47
                },
                "10": {
                    a: 0.53
                },
                "11": {
                    a: 0.58
                },
                "12": {
                    a: 0.63
                },
                "13": {
                    a: 0.68
                },
                "14": {
                    a: 0.74
                },
                "15": {
                    a: 0.79
                },
                "16": {
                    a: 0.84
                },
                "17": {
                    a: 0.89
                },
                "18": {
                    a: 0.95
                },
                "19": {
                    a: 1
                },
                "111": {
                    a: 0.8
                },
                "112": {
                    a: 0.59
                },
                "113": {
                    sx: 0.689,
                    sy: 0.689,
                    a: 0.51
                },
                "114": {
                    sx: 0.377,
                    sy: 0.377,
                    a: 0.43
                },
                "115": {
                    sx: 0.066,
                    sy: 0.066,
                    a: 0.35
                },
                "116": {
                    sx: 0.299,
                    sy: 0.052,
                    a: 0.52
                },
                "117": {
                    sx: 0.533,
                    sy: 0.038,
                    a: 0.68
                },
                "118": {
                    sx: 0.766,
                    sy: 0.024,
                    a: 0.84
                },
                "119": {
                    sx: 0.999,
                    sy: 0.01,
                    a: 1
                },
                "120": {
                    a: 0.67
                },
                "121": {
                    a: 0.33
                },
                "122": {
                    a: 0
                }
            })
            .addTimedChild(instance3, 6, 117, {
                "6": {
                    x: -3.05,
                    y: 16.35,
                    a: 0
                },
                "7": {
                    a: 0.08
                },
                "8": {
                    a: 0.15
                },
                "9": {
                    a: 0.23
                },
                "10": {
                    a: 0.31
                },
                "11": {
                    a: 0.38
                },
                "12": {
                    a: 0.46
                },
                "13": {
                    a: 0.54
                },
                "14": {
                    a: 0.62
                },
                "15": {
                    a: 0.69
                },
                "16": {
                    a: 0.77
                },
                "17": {
                    a: 0.85
                },
                "18": {
                    a: 0.92
                },
                "19": {
                    a: 1
                },
                "111": {
                    a: 0.75
                },
                "112": {
                    a: 0.5
                },
                "113": {
                    a: 0.25
                },
                "114": {
                    a: 0
                }
            });
    });

    lib.Game = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 30
        });
        var instance13 = new Graphics()
            .drawCommands(shapes.Game[16]);
        var instance12 = new Graphics()
            .drawCommands(shapes.Game[15])
            .setTransform(-5.15, -2.6);
        var instance11 = new Graphics()
            .drawCommands(shapes.Game[14]);
        var instance10 = new Graphics()
            .drawCommands(shapes.Game[13])
            .setTransform(30.8, -6.15);
        var instance9 = new Graphics()
            .drawCommands(shapes.Game[12])
            .setTransform(4.2, 12.6);
        var instance8 = new Graphics()
            .drawCommands(shapes.Game[12])
            .setTransform(4.2, 90);
        var instance7 = new lib.Screen()
            .setTransform(744.2, 383.1);
        this[instance7.name = "screen"] = instance7;
        var instance6 = new lib.Remote()
            .setTransform(762.85, 695.8);
        this[instance6.name = "remote"] = instance6;
        var instance5 = new lib.Paper()
            .setTransform(1150.2, 389);
        var instance4 = new Graphics()
            .drawCommands(shapes.Game[1]);
        var instance3 = new Text("Game + captions (here)")
            .setStyle({
                fontFamily: "Arial Rounded MT Bold",
                fontSize: 18,
                fill: "#fff",
                leading: 2
            })
            .setTransform(1042.95, 302.8);
        var instance2 = new lib.LipsyncScene()
            .setTransform(1148.9, 355.6);
        this[instance2.name = "lipsyncScene"] = instance2;
        var instance1 = new Text("WGBH TV Guide \n(example scenes)")
            .setStyle({
                fontFamily: "Arial Rounded MT Bold",
                fontSize: 20,
                fill: "#663499",
                leading: 2
            })
            .setAlign("center")
            .setTransform(1146.85, 235.55);
        this.addChild(instance13, instance12, instance11, instance10, instance9, instance8, instance7, instance6, instance5, instance4, instance3, instance2, instance1);
    });

    lib.Game.assets = {
        "Game": "images/Game.shapes.txt"
    };
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.Game,
        background: 0xffffff,
        width: 1536,
        height: 768,
        framerate: 30,
        totalFrames: 1,
        library: lib
    };
}