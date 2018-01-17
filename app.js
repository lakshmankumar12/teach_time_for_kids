var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
var hour = 4;
var minute = 37;
$("#start_btn").on("click", showSomeTime);
$("#submit_btn").on("click", checkAnswer);
var answer_display_dom = $("#answer");
var show_result_dom = $("#show_result");
var show_result_text_dom = $("#show_result_text");
var hr_ans_dom = $("#hour_ans");
var min_ans_dom = $("#min_ans");

init();

function showSomeTime() {
    hour = Math.floor(Math.random() * 12) + 1;
    minute = Math.floor(Math.random() * 60);
    drawClock();
    answer_display_dom.show();
    show_result_dom.hide();
    hr_ans_dom.val("");
    min_ans_dom.val("");
    hr_ans_dom.focus();
}

function checkAnswer() {
    show_result_dom.removeClass("panel-success");
    show_result_dom.removeClass("panel-danger");
    if (hr_ans_dom.val() == hour && min_ans_dom.val() == minute) {
        show_result_text_dom.text("You got it right. Click Start to ask a new time!");
        $("#start_btn").focus();
        show_result_dom.addClass("panel-success");
    } else {
        show_result_text_dom.text("Check your answer again!");
        show_result_dom.addClass("panel-danger");
        hr_ans_dom.focus();
    }
    show_result_dom.show();
}

function init() {
    ctx.translate(radius, radius);
    radius = radius * 0.90
    drawClock();
    answer_display_dom.hide();
}

function drawClock() {
    drawBorders();
    drawFace(ctx, radius);
    drawNumbers(ctx,radius);
    drawTime(ctx,radius, hour, minute, 0);
}

function drawFace(ctx, radius) {
    var grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawBorders() {
    ctx.arc(0, 0, radius, 0 , 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius, hour, minute, second){
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
