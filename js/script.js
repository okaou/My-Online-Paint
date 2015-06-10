/*jslint browser: true, node: true */
/*global $*/
"use strict";

$(document).ready(function () {
    var canv = document.getElementById("canvas"),
        context = canv.getContext('2d'),
        outil,

        ligne = {
            startX: 0,
            startY: 0,
            stopX: 0,
            stopY: 0,
            mousedown: function (e) {
                this.startX = e.pageX;
                this.startY = e.pageY;
                context.beginPath();
                context.moveTo(this.startX, this.startY);
            },
            click: function (g) {
                this.stopX = g.pageX;
                this.stopY = g.pageY;
                var tailleTrace = document.getElementById("size").value,
                    couleurTrace = document.getElementById("couleur").value;
                context.lineWidth = tailleTrace;
                context.lineTo(this.stopX, this.stopY);
                context.strokeStyle = couleurTrace;
                context.closePath();
                context.stroke();
            }
        },

        rectangle = {
            startX: 0,
            startY: 0,
            stopX: 0,
            stopY: 0,
            mousedown: function (ev) {
                this.startX = ev.pageX;
                this.startY = ev.pageY;
            },
            mouseup: function (ev) {
                this.stopX = ev.pageX;
                this.stopY = ev.pageY;
                var tailleTrace = document.getElementById("size").value,
                    width = this.stopX - this.startX,
                    height = this.stopY - this.startY,
                    couleurTrace = document.getElementById("couleur").value;
                context.lineWidth = tailleTrace;
                context.strokeStyle = couleurTrace;
                //shadow();
                context.rect(this.startX, this.startY, width, height);
                context.stroke();
            }
        },

        rectanglePlein = {
            startX: 0,
            startY: 0,
            stopX: 0,
            stopY: 0,
            mousedown: function (ev) {
                this.startX = ev.pageX;
                this.startY = ev.pageY;
            },
            mouseup: function (ev) {
                this.stopX = ev.pageX;
                this.stopY = ev.pageY;
                var couleurTrace = document.getElementById("couleur").value,
                    width = this.stopX - this.startX,
                    height = this.stopY - this.startY;
                context.fillStyle = couleurTrace;
                //shadow();
                context.fillRect(this.startX, this.startY, width, height);
                context.stroke();
            }
        },

        cerclePlein = {
            startX: 0,
            startY: 0,
            stopX: 0,
            stopY: 0,
            mousedown: function (ev) {
                this.startX = ev.pageX;
                this.startY = ev.pageY;
                context.beginPath();
            },
            mouseup: function (ev) {
                this.stopX = ev.pageX;
                this.stopY = ev.pageY;
                var dif1 = (this.stopX - this.startX) * (this.stopX - this.startX),
                    dif2 = (this.stopY - this.startY) * (this.stopY - this.startY),
                    result = dif1 + dif2,
                    res = Math.round(Math.sqrt(result) * 1000) / 1000,
                    couleurTrace = document.getElementById("couleur").value;
                //shadow();
                context.arc(this.startX, this.startY, res, 0, Math.PI * 2, true);
                context.fillStyle = couleurTrace;
                context.fill();
            }
        },

        cercle = {
            startX: 0,
            startY: 0,
            stopX: 0,
            stopY: 0,
            mousedown: function (ev) {
                this.startX = ev.pageX;
                this.startY = ev.pageY;
                context.beginPath();
            },
            mouseup: function (ev) {
                this.stopX = ev.pageX;
                this.stopY = ev.pageY;
                var tailleTrace = document.getElementById("size").value,
                    dif1 = (this.stopX - this.startX) * (this.stopX - this.startX),
                    dif2 = (this.stopY - this.startY) * (this.stopY - this.startY),
                    result = dif1 + dif2,
                    res = Math.round(Math.sqrt(result) * 1000) / 1000,
                    couleurTrace = document.getElementById("couleur").value;
                context.lineWidth = tailleTrace;
                //shadow();
                context.arc(this.startX, this.startY, res, 0, Math.PI * 2, true);
                context.strokeStyle = couleurTrace;
                context.stroke();
            }
        },

        crayon = {
            startX: 0,
            startY: 0,
            mousedown: function (ev) {
                this.startX = ev.pageX;
                this.startY = ev.pageY;
                var couleurTrace = document.getElementById("couleur").value;
                context.fillstyle = couleurTrace;
                context.strokeStyle = couleurTrace;
                context.fillRect(this.startX, this.startY, 1, 1);
            },
            mousemove: function (ev) {
                this.startX = ev.pageX;
                this.startY = ev.pageY;
                var couleurTrace = document.getElementById("couleur").value;
                context.fillstyle = couleurTrace;
                context.strokeStyle = couleurTrace;
                context.fillRect(this.startX, this.startY, 5, 5);
            },
            mouseup: function () {
                context.save();
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.off('mousemove', '**');
            }
        },

        font = {
            startX: 0,
            startY: 0,
            click: function (e) {
                this.startX = e.pageX;
                this.startY = e.pageY;
                var texte = document.getElementById("texte").value,
                    fontSize = document.getElementById("fontSize").value,
                    fontColor = document.getElementById("fontColor").value,
                    family = document.getElementById('family').value;
                context.font = fontSize + 'pt ' + family;
                context.fillStyle = fontColor;
                context.fillText(texte, this.startX, this.startY);
            }
        },

        image = {
            startX: 0,
            startY: 0,
            click: function (i) {
                var startX = i.pageX,
                    startY = i.pageY,
                    img = document.getElementById('img').value,
                    imageObj = new Image();
                console.log(img);
                imageObj.onload = function () {
                    context.drawImage(imageObj, startX, startY);
                };
                imageObj.src = 'img/button.jpg';
            }
        };

        /*function shadow () {
            var colorShadow = document.getElementById('colorShadow').value,
                blur = document.getElementById('blur').value,
                x = document.getElementById('x').value,
                y = document.getElementById('y').value;
            context.shadowColor = colorShadow;
            context.shadowBlur = blur;
            context.shadowOffsetX = x;
            context.shadowOffsetY = y;
        }*/

    $("#board").hide();
    $('#texte').hide();
    $('#fontSize').hide();
    $('#fontColor').hide();
    $('#fontFam').hide();
    $('#img').hide();
    $("#clickD").hide();
    $("#retour").hide();
    //$('#sett').hide();
    $("#start").mouseover(function () {
        $("#start").css({
            'background-image': 'url(img/button.jpg)'
        });
        $("#hea").css({
            'background-image': 'url(img/homeHover.png)'
        });
    });
    $("#start").mouseleave(function () {
        $("#start").css({
            'background-image': 'none'
        });
        $("#hea").css({
            'background-image': 'url(img/homePaint.png)'
        });
    });
    $("#start").click(function () {
        $("#home").css({'margin': 'auto'});
        $("#home").toggle("slow");
        $("#board").show();
    });
    $("#start").mousedown(function () {
        $(this).css({'background-image': 'url(img/buttonClick.jpg)'});
    });

    $('#canvas').mousemove(function (ev) {
        if (outil === crayon) {
            outil.mousemove(ev);
        }
    });

    $('#canvas').mouseup(function (r) {
        outil.mouseup(r);
    });

    $('#canvas').click(function (r) {
        outil.click(r);
    });

    $('#line').click(function () {
        //console.log(ligne);
        //context.beginPath();
        $("#board").css({'cursor': 'crosshair'});
        outil = ligne;
    });

    $('#rectangle').click(function () {
        $("#board").css({'cursor': 'crosshair'});
        outil = rectangle;
    });

    $('#fillRect').click(function () {
        $("#board").css({'cursor': 'crosshair'});
        outil = rectanglePlein;
    });

    $('#cercle').click(function () {
        $("#board").css({'cursor': 'crosshair'});
        outil = cercle;
    });

    $('#fillCercle').click(function () {
        $("#board").css({'cursor': 'crosshair'});
        outil = cerclePlein;
    });

    $('#pencil').click(function () {
        $("#board").css({'cursor': 'url(img/pencil24.png), crosshair'});
        outil = crayon;
    });

    $('#text').click(function () {
        $("#board").css({'cursor': 'text'});
        $('#texte').show();
        $('#fontSize').show();
        $('#fontColor').show();
        $('#fontFam').show();
        outil = font;
    });

    $('#image').click(function () {
        $('#img').show();
        outil = image;
    });

    $('#reset').click(function () {
        context.clearRect(0, 0, canv.width, canv.height);
    });

    $('#canvas').mousedown(function (f) {
        outil.mousedown(f);
    });

    $('#save').click(function () {
        var dataURL = canv.toDataURL();
        document.getElementById('resultat').src = dataURL;
        $("#board").hide();
        $("#resultat").show();
        $("#clickD").show();
        $("#retour").show();
    });

    $('#retour').click(function () {
        $("#board").show();
        $("#resultat").hide();
        $("#clickD").hide();
        $("#retour").hide();
    });

    /*$('#shadow').click(function () {
        $('#sett').show();
    });*/
});