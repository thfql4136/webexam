
  var config = {
    apiKey: "AIzaSyCDq07gHNOtQ_jY8x3RzhLjhWZiEpOkAfo",
    authDomain: "thfql4136-js1.firebaseapp.com",
    databaseURL: "https://thfql4136-js1.firebaseio.com",
    projectId: "thfql4136-js1",
    storageBucket: "thfql4136-js1.appspot.com",
    messagingSenderId: "363077689014"
  };
  firebase.initializeApp(config);

  var auth = firebase.auth();
  var db = firebase.database();
  var googleAuth = new firebase.auth.GoogleAuthProvider();
  var ref;
  var user;
  var key = '';

  function initData(){
      $(".lists").empty();
      ref = firebase.database().ref("문자열");
      ref = db.ref("root/memos/"+user.uid);
      ref.on("child_added", addData);
  }
 function initBt(mode) {
     switch(mode) {
         case 'C':
         $("#bt_save").show();
         $("#content:not(:focus)").focus();
         break;
     }
 }
function addData(data){
    var id = data.key;
    var memo = data.val();
    var title = memo.title;
    var content = memo.content;
    var wdate = memo.wdate;
    var html = '<li class="list" id="'+id+'" onClick="upData(this);">';
    html += '<p>'+title+'</p>';
    html +='</li>';
    $(".lists").prepend(html);
}

function upData(obj) {
    var id = obj.id;
    key = id;
    ref = db.ref("root/memos/"+user.uid+"/"+id);
    ref.once("value").then(function(data){
        $("#content").val(data.val().content);
    });
}

$("#bt_login_google").click(function(){
auth.signInWithPopup(googleAuth);
});
$("#bt_logout").click(function(){
auth.singOut();
});

$("#bt_save").click(function(){
key = '';
var content;
var title;
content = $("#content").val();
if(content == "" ){
    alert("내용을 입력하세요~");
    $("#content").focus();
}
else{
title = content.substr(0, 10);
ref = db.ref("root/memos/"+user.uid);
ref.push({
    title:title,
    content: content,
    wdate: new Date().getTime()
}).key;
}
});

auth.onAuthStateChanged(function(result){
    user = result;
    if(result){
        $("#bt_login_google").hide();
        $("#bt_logout").show();
        $(".tv_email").html(user.email);
        initData();
    }
    else{
        $("#bt_login_google").show();
        $("#bt_logout").hide();
        $(".tv_email").html('');
        $(".lists").empty();
    }
});