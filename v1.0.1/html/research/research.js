var serverUrl = "http://54.180.133.208:1880/";
var question = ["다음 그림 중 화장실 표지판을 찾으시오.", 
"다음 그림 중 비상구 표지판을 찾으시오.", 
"다음 그림 중 장애인 표지판을 찾으시오.",
"다음 그림 중 분실물 보관소 표지판을 찾으시오.",
"다음 그림 중 물품 보관소 표지판을 찾으시오.",
"다음 그림 중 만남의 장소 표지판을찾으시오."];
var answer = "";
var right = [1,4,6,2,3,5]; //질문순서의 정답
var setTime = 0; // 카운트변수
var questionCnt = 0; //질문 카운트변수
var time = [];  //각질문에 선택하는시간
var wrong = []; //오답률
var preTime = 0;
var checkTime = 0;
var selectCase = getCookie("case");
$(document).ready(function(e){
    $("#finish").hide();
    $("#picture").hide();
    //질문 시작
    $("#question").html(question[questionCnt]);
    //이미지 랜덤으로 가져오기
    getImg(selectCase);
    //1초에 한번씩 함수실행
    function countTime() {
        //질문 1초동안
        if(setTime == 0){
            //랜덤이미지 배열
            $("#picture").hide();
        }else if(setTime == 1){ //5 카운트
            $("#count").html(5);
            $("#count").show();
        }else if(setTime == 2){ //4 카운트
            $("#count").html(4);
            $("#count").show(); 
        }else if(setTime == 3){ //3
            $("#count").html(3);
            $("#count").show();
        }else if(setTime == 4){ //2
            $("#count").html(2);
            $("#count").show();
        }else if(setTime == 5){ //1
            $("#count").html(1);
            $("#count").show();
        }else if(setTime == 6){ //그림보여주기
            $("#question").hide();
            $("#count").hide();
            $("#picture").show();
            preTime = new Date().getTime();
        }
        setTime = setTime + 1;
    }
    countTime();
    var timer = window.setInterval(function () {countTime();}, 1000);
    //정답을 선택하면 저장
    $(".img").click(function(){       
        answer = this.value;
        checkTime = new Date().getTime();
        var clcTime = checkTime - preTime;
        var data = clcTime/1000;
        $("#picture").hide();
        $(".img").empty();
        getImg(selectCase);
        time[questionCnt] = data;
        if(parseInt(answer) == right[questionCnt]){
            wrong[questionCnt] = true;
        }else{
            wrong[questionCnt] = false;
        }
        questionCnt++;
        answer = "";
        setTime = 0;
        $("#question").html(question[questionCnt]);
        $("#question").show();

        if(questionCnt == 6){
            requestHttp();
            questionCnt = 0;
            time = [];  
            wrong = [];        
            preTime = 0;
            checkTime = 0;
            $("#question").hide();
            $("#question").empty();
            $("#finish").show();
            clearInterval(timer);
        } 

    }); 
    //처음으로가기 버튼 누르면 실행
    $("#finishBtn").click(function(){
        deleteCookie("case");
        deleteCookie("radio");
        deleteCookie("age");
        location.replace('../index.html');
    });
});
//유형별 이미지 불러오기
function getImg(selectCase){
    if(selectCase == "black"){
        var nansu = randomNansu();
        for(var i=0; i<nansu.length; i++){
            $("#img"+(i+1)).val(nansu[i]);
            $("#img"+(i+1)).append("<img src='../img/"+selectCase+"/" + nansu[i] + ".jpg'>");
        }
    }else if(selectCase == "red"){
        var nansu = randomNansu();
        for(var i=0; i<nansu.length; i++){
            $("#img"+(i+1)).val(nansu[i]);
            $("#img"+(i+1)).append("<img src='../img/"+selectCase+"/" + nansu[i] + ".jpg'>");
        }
    }else if(selectCase == "yellow"){
        var nansu = randomNansu();
        for(var i=0; i<nansu.length; i++){
            $("#img"+(i+1)).val(nansu[i]);
            $("#img"+(i+1)).append("<img src='../img/"+selectCase+"/" + nansu[i] + ".jpg'>");
        }
    }else if(selectCase == "green"){
        var nansu = randomNansu();
        for(var i=0; i<nansu.length; i++){
            $("#img"+(i+1)).val(nansu[i]);
            $("#img"+(i+1)).append("<img src='../img/"+selectCase+"/" + nansu[i] + ".jpg'>");
        }
    }else if(selectCase == "blue"){
        var nansu = randomNansu();
        for(var i=0; i<nansu.length; i++){
            $("#img"+(i+1)).val(nansu[i]);
            $("#img"+(i+1)).append("<img src='../img/"+selectCase+"/" + nansu[i] + ".jpg'>");
        }
    }else if(selectCase == "backblack"){
        var nansu = randomNansu();
        for(var i=0; i<nansu.length; i++){
            $("#img"+(i+1)).val(nansu[i]);
            $("#img"+(i+1)).append("<img src='../img/"+selectCase+"/" + nansu[i] + ".jpg'>");
        }
    }else if(selectCase == "backred"){
        var nansu = randomNansu();
        for(var i=0; i<nansu.length; i++){
            $("#img"+(i+1)).val(nansu[i]);
            $("#img"+(i+1)).append("<img src='../img/"+selectCase+"/" + nansu[i] + ".jpg'>");
        }
    }else if(selectCase == "backyellow"){
        var nansu = randomNansu();
        for(var i=0; i<nansu.length; i++){
            $("#img"+(i+1)).val(nansu[i]);
            $("#img"+(i+1)).append("<img src='../img/"+selectCase+"/" + nansu[i] + ".jpg'>");
        }
    }else if(selectCase == "backgreen"){
        var nansu = randomNansu();
        for(var i=0; i<nansu.length; i++){
            $("#img"+(i+1)).val(nansu[i]);
            $("#img"+(i+1)).append("<img src='../img/"+selectCase+"/" + nansu[i] + ".jpg'>");
        }
    }else if(selectCase == "backblue"){
        var nansu = randomNansu();
        for(var i=0; i<nansu.length; i++){
            $("#img"+(i+1)).val(nansu[i]);
            $("#img"+(i+1)).append("<img src='../img/"+selectCase+"/" + nansu[i] + ".jpg'>");
        }
    }
}
//HTTP request 요청
function requestHttp() {
    var radio = getCookie("radio");
    var age = getCookie("age");
    var msg = JSON.stringify({"actionType": "INSERT", "case" : selectCase, "radio" : radio,"age" : age, "time" : time, "wrong" : wrong});
    var Url = serverUrl+"appapi/SET_RESEARCH/appRequest.do";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', Url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(msg);
    xhr.onreadystatechange = processRequest;
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if(response.resultCode == "0000"){         //정상 처리되었습니다.
                
            }
        }
    }  
}
//쿠키가져오기
function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');
  
    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        if (x == cookie_name) {
        return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
}
//쿠키저장하기
function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정

    var cookie_value = escape(value) + ((days === null) ? '' : ';    expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
}
//쿠키삭제하기
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}
//난수발생함수 1~6까지
function randomNansu(){
    var nansu = [];
    var i = 0;
    while(i < 6){
        var num = Math.floor(Math.random() * 6) + 1;
        if(!sameNum(num)){
            nansu.push(num)
            i++;
        }
    }
    function sameNum(num){
        for(var i=0; i< nansu.length; i++){
            if(num === nansu[i]){
                return true;
            }
        }
        return false;
    }
    return nansu;
}