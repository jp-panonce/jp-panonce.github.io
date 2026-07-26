//Hello Everyone.

//IN this program, one can change the scenerie's time by pulling on the chain.
//This would either turn off(become night) or turn on (turn to day) the scenery

//Made by: John Paul Asensi Panonce 
var sky_Color=-16,nord = 0;  //night = -16 day=162
                            //nord=1 if day and 0 by night    
var switchyeah=27,switchoh=35,temp=0;//on/day-18 off/night-0
//colorss
var grassstroke = color(56, 115, 31);
var grasscolor = color(20, 143, 8);
var chimneystroke = color(227, 158, 54);
var chimneyfill = color(230, 197, 97);
var chimneytop = color(94, 42, 20);
var housecolor = color(230, 197, 97);
var roofcolor = color(120, 80, 24);
var windowfill = color(0, 150, 213);
var doorcolor = color(84, 51, 14);
var staircolor = color(122, 122, 122);
var pathwaycolor = color(232, 195, 135);
var treecolor = color(24, 94, 24);
var treebranchcolor = color(115, 62, 9);
var clouds = color(51, 51, 51);
var bush = color(23, 87, 7);

var sunPosy=400;
var moonPosy=400;
var leftX=312,rightX=144;

    
draw = function() {
    mousePressed = function() {
        if(mouseX<60 && mouseY<181){
            playSound(getSound("rpg/metal-clink"));
            if(nord===1){   //if from day, turn to night
                nord=0;
                switchoh=35;
                moonPosy=400;
                sunPosy=-50;
            } else if (nord === 0){
              nord=1;
              switchoh=0;
              sunPosy=400;
              moonPosy=-50;
            }
        } 
    };
    var stars = function(){
        stroke(161, 161, 161);
        strokeWeight(3);
        point(213,237);
        point(88,262);
        point(64,291);
        point(92,30);
        point(378,19);
        point(48,27);
        point(28,219);
        point(57,117);
        point(362,22);
        point(362,169);
        point(197,24);
        point(376,295);
        point(252,50);
        point(329,134);
        point(301,76);
        point(278,151);
        point(324,39);
        point(174,50);
        point(100,100);
        point(129,70);
        point(61,53);
        point(35,116);
        point(66,160);
        point(165,200);
        point(157,128);
        point(147,170);
        point(285,187);
        point(172,272);
        point(348,279);
        point(121,100);
        point(278,248);
        point(302,314);
        point(138,22);
        point(293,125);
        point(223,51);
        point(291,23);
        point(127,124);
        point(194,96);
    };
    if(nord===1){    //if day
        temp=0;
        sky_Color=162;
        grassstroke = color(68, 140, 39);
        grasscolor = color(20, 143, 8);
        chimneystroke = color(227, 158, 54);
        chimneyfill = color(230, 197, 97);
        chimneytop = color(94, 42, 20);
        housecolor = color(230, 197, 97);
        roofcolor = color(120, 80, 24);
        windowfill = color(77, 103, 112);
        doorcolor = color(84, 51, 14);
        staircolor = color(122, 122, 122);
        pathwaycolor = color(232, 195, 135);
        treecolor = color(24, 94, 24);
        treebranchcolor = color(115, 62, 9);
        clouds = color(219, 219, 219);
        bush = color(39, 212, 0);
    
    } else if(nord===0){ //if night
        sky_Color=-16;
        grassstroke = color(16, 28, 11);
        grasscolor = color(6, 48, 1);
        chimneystroke = color(46, 33, 13);
        chimneyfill = color(110, 94, 44);
        chimneytop = color(69, 28, 12);
        housecolor = color(110, 94, 44);
        roofcolor = color(69, 45, 15);
        windowfill = color(255, 238, 0);
        doorcolor = color(54, 32, 9);
        staircolor = color(64, 64, 64);
        pathwaycolor = color(69, 57, 39);
        treecolor = color(11, 38, 11);
        treebranchcolor = color(46, 25, 4);
        clouds = color(51, 51, 51);
        bush = color(23, 87, 7);
    }
    
    background(0, sky_Color, sky_Color+63);
    noFill();
    
    if(nord===0){
        stars();
    }
    //sun
        noStroke();
        fill(255, 230, 0);
        ellipse(345,sunPosy,80,80);
    //moon
        fill(224, 224, 224);
        ellipse(345,moonPosy,80,80);
        fill(99, 99, 99);
        noStroke();
        fill(204, 204, 204);
        ellipse(575,moonPosy+0,26,21);
        ellipse(365,moonPosy+0,26,18);
        ellipse(330,moonPosy+24,20,13);
        ellipse(356,moonPosy+-22,12,8);
        ellipse(322,moonPosy+-6,13,9);
    
    //clouds
    if(leftX>-99){
        leftX-=0.6;
    } else {
        leftX=500;
    }
    if(rightX<500){
        rightX+=0.5;
    } else {
        rightX=-100;
    }
    noStroke();
    fill(clouds);
    ellipse(leftX, 33, 127, 23);
    ellipse(leftX+62, 35, 76, -15);
    ellipse(leftX-62, 33, 70, 14);
    ellipse(rightX, 100, 126, 33);
    ellipse(rightX+62, 100, 70, 20);
    ellipse(rightX-62, 100, 70, 23);
    
    
    strokeWeight(2);
    fill(grassstroke);    //grassstroke    day68, 140, 39    night: 16, 28, 11
    fill(grasscolor);   //grasscolor: if day = (20, 143, 8) and if night = (6, 48, 1) 
    rect(-4,327,405,75);
    //house
    var y=74,house_height=210,house_top=95;
      //glass function
        var windowglass = function(posx,posy) {
            fill(windowfill);  //windowfill - fill(13, 49, 64); 
                                //if day and fill(255, 238, 0); if night
            stroke(212, 182, 212);
            rect(posx,posy,32,18);
            rect(posx,posy+18,16,18);
            rect(posx+16,posy+18,16,18);
            fill(31, 66, 171);
            noStroke();
            rect(posx+-16,posy,16,36);
            rect(posx+32,posy,16,36);
            fill(29, 51, 130);
            rect(posx+-13,posy+3,10,13);
            rect(posx+35,posy+3,10,13);
            rect(posx+-13,posy+19,10,13);
            rect(posx+35,posy+19,10,13);
        };
    
      //chimney
          stroke(chimneystroke);//chimneystroke: day:227, 158, 54 night:
          strokeWeight(2);
          fill(chimneyfill);//chimneyfill  day: 237, 184, 26   night:66, 50, 6 
          rect(241,87,26,68);
          fill(chimneytop);//chimneytop    day: 94, 42, 20  night: 69, 28, 12
          noStroke();
          rect(239,79,30,8);
      //mainhouse
        fill(housecolor);//housecolor day: 230, 197, 97   night: 110, 94, 44
        beginShape();
        vertex(y, house_height);
        vertex(200, house_top);
        vertex(400-y, house_height);
        vertex(400-y, 327);
        vertex(y,327);
        endShape(CLOSE);
      //roof
        fill(roofcolor);//roofcolor   day:120, 80, 24  night:69, 45, 15
        beginShape();
        vertex(y-18, house_height);
        vertex(200, house_top-18);
        vertex(418-y, house_height);
        vertex(400-y, house_height);
        vertex(200,house_top);
        vertex(y, house_height);
        endShape(CLOSE);
      //windows
        stroke(255, 255, 255);
        //windowfill    day: 0, 150, 213    night: 255, 238, 0
        fill(windowfill);
        ellipse(200,142,20,20);
        windowglass(185,170);
        fill(0, 150, 213);
        windowglass(200-96,251);
        fill(0, 150, 213);
        windowglass(200+60,251);
      //door
        fill(doorcolor);//doorcolor day: 84, 51, 14    night: 54, 32, 9
        rect(186,272,32,55);
        fill(0, 0, 0);
        ellipse(211,300,6,6);
      //frontstairs
        stroke(79, 79, 79);
        fill(staircolor);//staircolor    day:122, 122, 122  night:64, 64, 64
        rect(178,330,47,8);
        rect(183,322,39,8);
    //switch
        strokeWeight(2);
        stroke(0, 0, 0);
        fill(209, 201, 201);
        line(switchyeah,0,switchyeah,switchoh+113);
        arc(switchyeah,switchoh+146,31,68,180,360);
        fill(143, 143, 143);
        ellipse(switchyeah,switchoh+147,29,11);
        fill(0, 0, 0);
        ellipse(switchyeah,switchoh+108,4,4);
        ellipse(switchyeah,switchoh+100,4,4);
        ellipse(switchyeah,switchoh+92,4,4);
        ellipse(switchyeah,switchoh+84,4,4);
        ellipse(switchyeah,switchoh+76,4,4);
        ellipse(switchyeah,switchoh+68,4,4);
        ellipse(switchyeah,switchoh+60,4,4);
        ellipse(switchyeah,switchoh+52,4,4);
        ellipse(switchyeah,switchoh+44,4,4);
        ellipse(switchyeah,switchoh+36,4,4);
        ellipse(switchyeah,switchoh+28,4,4);
        ellipse(switchyeah,switchoh+20,4,4);
        ellipse(switchyeah,switchoh+12,4,4);
        ellipse(switchyeah,switchoh+4,4,4);
        ellipse(switchyeah,switchoh-4,4,4);
        ellipse(switchyeah,switchoh-12,4,4);
        ellipse(switchyeah,switchoh-20,4,4);
        ellipse(switchyeah,switchoh-28,4,4);
        ellipse(switchyeah,switchoh-36,4,4);
    //pathway
        noStroke();
        fill(pathwaycolor);//pathwaycolor   day:232, 195, 135  night: 69, 57, 39
        quad(177,334,225,334,200+71,501,200-46,402);
    //tree
        fill(treecolor);//treecolor    day: 24, 94, 24   night: 11, 38, 11
        ellipse(348,253,32,60);
        ellipse(372,234,55,68);
        ellipse(372,266,55,34);
        fill(treebranchcolor);//treebranchcolor  day:115, 62, 9   night:46, 25, 4
        bezier(346, 381, 361, 333, 360, 152, 364, 380);
    //bush
        strokeWeight(0.5);
        stroke(0, 0, 0);
        fill(bush);//bush1    day:39, 212, 0  night:23, 87, 7
        ellipse(143,342,31,25);
        ellipse(133,383,40,32);
        ellipse(249,345,31,25);
        ellipse(263,384,40,32);
        if(moonPosy>75||sunPosy>75){
            moonPosy-=1.5;
            sunPosy-=1.5;
        }
    
};







