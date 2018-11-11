window.onload = function() {

  function reduceCoin() {
    var coinNum = document.getElementsByClassName("coin")[0].firstChild;
    if (coinNum.nodeValue > 0) {
      coinNum.nodeValue -= 1;
    }
  }

  function lightPoint() {
    var allPoints = document.getElementsByClassName("point");
    var lightedPoints = document.getElementsByClassName("active");
    if (lightedPoints.length < allPoints.length) {
      var nextPoint = allPoints[allPoints.length - lightedPoints.length - 1];
      nextPoint.setAttribute("class", "point active");
    }
  }

  function vote() {
    var allPoints = document.getElementsByClassName("point");
    var lightedPoints = document.getElementsByClassName("active");
    if (lightedPoints.length < allPoints.length) {
      var ifVote = confirm("投票します、よろしいですか？");
      if (ifVote == true) {
        this.setAttribute("disabled", "");
        alert("投票しました、複数回投票はできません。");
        reduceCoin();
        lightPoint();
      }
    } else {
      alert("現在は投票できません。")
    }
  }

  function setPoints() {
    var number = document.getElementsByClassName("inputnumber")[0].value;
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
    if (coinNum.nodeValue > 0) {
      button.removeAttribute("disabled");
    }
  }

  var voteButton = document.getElementsByClassName("votebtn")[0];
  var setNumberBtn = document.getElementsByClassName("setnumber")[0];
  var resetBtn = document.getElementsByClassName("reset")[0];
  voteButton.onclick = vote;
  setNumberBtn.onclick = setPoints;
  resetBtn.onclick = resetBoard;

}
