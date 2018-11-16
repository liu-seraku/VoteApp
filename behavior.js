window.onload = function () {

  var urlParams = new URLSearchParams(location.search);
  var role = urlParams.get('role');
  if (role == 'admin') {} else if (role == 'host') {
    var operationBoard = document.getElementsByClassName("operationboard")[0];
    operationBoard.setAttribute("hidden", "");
  } else {
    var ctrlBoard = document.getElementsByClassName("ctrlboard")[0];
    ctrlBoard.setAttribute("hidden", "");
  }

  function reduceCoin() {
    var coinNum = document.getElementsByClassName("coin")[0].firstChild;
    if (coinNum.nodeValue > 0) {
      coinNum.nodeValue -= 1;
      if (coinNum.nodeValue == 0) {
        document.getElementsByClassName("votebtn")[0].setAttribute("disabled", "");
      }
      var coins = document.getElementsByClassName("coinimg");
      var coinNum = document.getElementsByClassName("coin")[0].firstChild.nodeValue;
      var lastCoin = coins[coinNum];
      lastCoin.setAttribute("hidden", "");
    }
  }

  function lightPoint() {
    var allPoints = document.getElementsByClassName("point");
    var lightedPoints = document.getElementsByClassName("active");
    if (lightedPoints.length < allPoints.length) {
      var superpoint = Math.ceil(allPoints.length/4)*3;
      if (lightedPoints.length >= superpoint){
        var nextPoint = allPoints[allPoints.length - lightedPoints.length - 1];
        nextPoint.setAttribute("class", "point superactive");
      } else {
        var nextPoint = allPoints[allPoints.length - lightedPoints.length - 1];
        nextPoint.setAttribute("class", "point active");
      }
    }

    var sound = document.getElementsByTagName("audio")[0];
    sound.load();
    sound.play();
  }

  function vote() {
    var allPoints = document.getElementsByClassName("point");
    var lightedPoints = document.getElementsByClassName("active");
    if (lightedPoints.length < allPoints.length) {
      reduceCoin();
    } else {
      alert("現在は投票できません。")
    }
  }

  function setPoints(number) {
    var points = document.getElementsByClassName("points")[0];
    var point = document.getElementsByClassName("point");
    var pointNumber = point.length;
    for (var i = 0; i < pointNumber; i++) {
      points.removeChild(point[0]);
    }

    for (var i = number - 1; i >= 0; i--) {
      var point = document.createElement("div");
      point.setAttribute("class", "point");
      var pointNumber = document.createTextNode(i + 1);
      point.appendChild(pointNumber);
      points.appendChild(point);
    }
  }

  function resetBoard() {
    var point = document.getElementsByClassName("point");
    for (var i = 0; i < point.length; i++) {
      point[i].setAttribute("class", "point");
    }
    var button = document.getElementsByClassName("votebtn")[0];
    var coinNum = document.getElementsByClassName("coin")[0].firstChild;
    coinNum.nodeValue = 3;
    button.removeAttribute("disabled");
    var coins = document.getElementsByClassName("coinimg");
    for (var i = 0; i < coins.length; i++) {
      coins[i].removeAttribute("hidden");
    }
  }

  var voteButton = document.getElementsByClassName("votebtn")[0];
  var setNumberBtn = document.getElementsByClassName("setnumber")[0];
  var resetBtn = document.getElementsByClassName("reset")[0];
  voteButton.onclick = function(){
    vote();
    socket.emit('vote', 'vote');
  }
  setNumberBtn.onclick = function(){
    var number = document.getElementsByClassName("inputnumber")[0].value * 3;
    socket.emit('set points', number);
  }
  resetBtn.onclick = function(){
    socket.emit('reset board', 'reset board');
  }

  socket.on('vote', function(msg){
    lightPoint();
  });
  socket.on('set points', function(number){
    setPoints(number);
  });
  socket.on('reset board', function(msg){
    resetBoard();
  });

}