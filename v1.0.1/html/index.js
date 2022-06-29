var serverUrl = "http://54.180.133.208:1880/";
window.onload = function(){
    // 관리자 설정 가져오기
    if(location.href.includes('admin')) {
        // 유형 상태 가져오기
        jQuery.ajax({
            url: serverUrl+"appapi/GET_CASE/appRequest.do",
            type: "POST",
            dataType: "json",
            data: {
                caseId: "ha"
            }
        }).done(function(data) {
            if(data.resultCode == "0000") {
                var resultWomanData = data.resultData.wCase;
                var resultManData = data.resultData.mCase;

                for(var i = 0; i < resultWomanData.length; i ++) {
                    if(resultWomanData[i].state == "false") {
                        $("input:checkbox[name='"+resultWomanData[i].name+"W']").prop("checked", false);
                    }else {
                        $("input:checkbox[name='"+resultWomanData[i].name+"W']").prop("checked", true);
                    }
                }

                for(var i = 0; i < resultManData.length; i ++) {
                    if(resultManData[i].state == "false") {
                        $("input:checkbox[name='"+resultManData[i].name+"M']").prop("checked", false);
                    }else {
                        $("input:checkbox[name='"+resultManData[i].name+"M']").prop("checked", true);
                    }
                }
            }
        });
        // 유형 변경하기
        $("input[name='updateCase']").click(function() {
            var wCase = new Array();
            var mCase = new Array();
            var ajsonArray = new Object();
            for(var i = 0; i < $(".m").length; i ++ ) {
                var ajson = new Object();
                ajson.name = $(".m").eq(i).val();
                ajson.state = $(".m").eq(i).prop('checked');
                mCase.push(ajson);
            }
            for(var i = 0; i < $(".w").length; i ++ ) {
                var bjson = new Object();
                bjson.name = $(".w").eq(i).val();
                bjson.state = $(".w").eq(i).prop('checked');
                wCase.push(bjson);
            }
            ajsonArray.caseId = "ha";
            ajsonArray.wCase = wCase;
            ajsonArray.mCase = mCase;
            jQuery.ajax({
                url: serverUrl+"appapi/SET_CASE/appRequest.do",
                type: "POST",
                dataType: "json",
                data: {
                    data: ajsonArray
                }
            }).done(function(data) {
                if(data.resultCode == "0000") {
                    alert("변경 완료");
                    location.reload();
                }
            });
        });
    }else {
        getResearch();
        // 시작 버튼 클릭 시
        document.getElementById("goBtn").onclick = function fun(){
            var caseSelect = $("#caseSelect").val();
            var radio = $('input[name="gender"]:checked').val();
            console.log(radio);
            var age = $("#age").val();
            if(!radio){
                alert("성별을 선택해 주세요.");
                return false;
            } else if(!age){
                alert("나이를 입력해 주세요.");
                return false;
            } else if(caseSelect == "") {
                alert("유형을 선택해 주세요.");
                return false;
            } else {
                //정보를 cookie에 저장
                setCookie('case',caseSelect,365);
                setCookie('radio',radio,365);
                setCookie('age',age,365);
                //설문조사 페이지로 이동
                location.replace("/research/research.html");
            }
        }
        // 성별 변경 시
        $("input[name='gender']:radio").change(function() {
            $("#caseSelect").attr("disabled", false);
            $("#caseSelect").val("").prop("selected",true);
            $("#caseSelect").empty();
            $("#caseSelect").append("option value=''>선택</option>");
            var gender = $(this).val();
            jQuery.ajax({
                url: serverUrl+"appapi/GET_CASE/appRequest.do",
                type: "POST",
                dataType: "json",
                data: {
                    caseId: "ha"
                }
            }).done(function(data) {
                if(data.resultCode == "0000") {
                    var resultWomanData = data.resultData.wCase;
                    var resultManData = data.resultData.mCase;
                    var html = "";
                    if(gender == "woman") {
                        for(var i = 0; i < resultWomanData.length; i ++) {
                            if(resultWomanData[i].state == "false") {
                                //html += "<option value='"+resultWomanData[i].name+"'>"+getHtml()+"</option>";
                                //$("select option[value*="+resultWomanData[i].name+"]").prop("disabled", true);
                            }else {
                                html += "<option value='"+resultWomanData[i].name+"'>"+getHtml(resultWomanData[i].name)+"</option>";
                                //$("select option[value*="+resultWomanData[i].name+"]").prop("disabled", false);
                            }
                        }
                    } else if(gender == "man") {
                        var html = "";
                        for(var i = 0; i < resultManData.length; i ++) {
                            if(resultManData[i].state == "false") {
                                //$("select option[value*="+resultWomanData[i].name+"]").prop("disabled", true);
                            }else {
                                html += "<option value='"+resultWomanData[i].name+"'>"+getHtml(resultWomanData[i].name)+"</option>";
                                //$("select option[value*="+resultWomanData[i].name+"]").prop("disabled", false);
                            }
                        }
                    }
                    $("#caseSelect").append(html);
                }
            });
            
        });
    }
}
function getHtml(val) {
    var result = "";
    switch(val) {
        case "balck": result = "검정";
            break;
        case "red": result = "빨강";
            break;
        case "yellow": result = "노랑";
            break;
        case "green": result = "초록";
            break;
        case "blue": result = "파랑";
            break;
        case "backblack": result = "검정배경";
            break;
        case "backred": result = "빨강배경";
            break;
        case "backyellow": result = "노랑배경";
            break;
        case "backgreen": result = "초록배경";
            break;
        case "backblue": result = "파랑배경";
            break;
    }
    return result;
}
function getResearch() {
    var msg = "";
    var Url = serverUrl+"appapi/GET_RESEARCH/appRequest.do";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', Url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(msg);
    xhr.onreadystatechange = processRequest;
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            //엑셀 테이블 만들기
            if(response.resultCode == "0000"){         //정상 처리되었습니다.
                var dbData = response.resultData;
                var dbLenght = dbData.length;
                for(var i=0; i<dbLenght; i++){
                    var time = 0;
                    for(var j=0; j<dbData[i].time.length; j++){
                        time += dbData[i].time[j];
                    }
                    var rowdata = "<tr>";
                    rowdata += "<th>"+(i+1)+"</th>";
                    rowdata += "<td>"+dbData[i].date+"</th>";
                    rowdata += "<td>"+dbData[i].case+"</td>";
                    rowdata += "<td>"+dbData[i].radio+"</td>";
                    rowdata += "<td>"+dbData[i].age+"</td>";
                    rowdata += "<td>"+time+"</td>";
                    rowdata += "<td>"+dbData[i].wrong[0]+"</td>";
                    rowdata += "<td>"+dbData[i].time[0]+"</td>";
                    rowdata += "<td>"+dbData[i].wrong[1]+"</td>";
                    rowdata += "<td>"+dbData[i].time[1]+"</td>";
                    rowdata += "<td>"+dbData[i].wrong[2]+"</td>";
                    rowdata += "<td>"+dbData[i].time[2]+"</td>";
                    rowdata += "<td>"+dbData[i].wrong[3]+"</td>";
                    rowdata += "<td>"+dbData[i].time[3]+"</td>";
                    rowdata += "<td>"+dbData[i].wrong[4]+"</td>";
                    rowdata += "<td>"+dbData[i].time[4]+"</td>";
                    rowdata += "<td>"+dbData[i].wrong[5]+"</td>";
                    rowdata += "<td>"+dbData[i].time[5]+"</td>";
                    rowdata += "</tr>";
                    $(".tbody").append(rowdata);
                }     
            }
        }
    }
}
function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정

    var cookie_value = escape(value) + ((days === null) ? '' : ';    expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
}
function excelDown(id,title){
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    tab_text = tab_text + '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
    tab_text = tab_text + "<table border='1px'>";
    var exportTable = $('#' + id).clone();
    exportTable.find('input').each(function (index, elem) { $(elem).remove(); });
    tab_text = tab_text + exportTable.html();
    tab_text = tab_text + '</table></body></html>';
    var data_type = 'data:application/vnd.ms-excel';
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var fileName = title + '.xls';
    //Explorer 환경에서 다운로드
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, fileName);
        }
    } else {
        var blob2 = new Blob([tab_text], {
            type: "application/csv;charset=utf-8;"
        });
        var filename = fileName;
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob2);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}