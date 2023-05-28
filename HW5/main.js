$(document).ready(function () {
  //do something
  $("#thisButton").click(function () {
    processImage();
  });
  $("#inputImageFile").change(function (e) {
    processImageFile(e.target.files[0]);
  });
});

function processImageFile(imageObject) {
  //確認區域與所選擇的相同或使用客製化端點網址
  var url = "https://eastus.api.cognitive.microsoft.com/";
  var uriBase = url + "vision/v2.1/analyze";

  var params = {
    visualFeatures: "Adult",
    details: "",
    language: "en",
  };

  //顯示分析的圖片
  //var sourceImageUrl = document.getElementById("inputImage").value;
  var sourceImageUrl = URL.createObjectURL(imageObject);
  document.querySelector("#sourceImage").src = sourceImageUrl;
  //送出分析
  $.ajax({
    url: uriBase + "?" + $.param(params),
    // Request header
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },
    type: "POST",
    processData: false,
    contentType: false,
    // Request body
    data: imageObject,
  })
    .done(function (data) {
      //顯示JSON內容
      $("#responseTextArea").val(JSON.stringify(data, null, 2));
      $("#picDescription").empty();
      if (
        data.adult.isAdultContent === false &&
        data.adult.isRacyContent === false &&
        data.adult.isGoryContent === false
      ) {
        $("#picDescription").append("不會");
      } else if (data.adult.isAdultContent === true) {
        $("#picDescription").append("可能會，此影片包含成人內容");
      } else if (data.adult.isRacyContent === true) {
        $("#picDescription").append("可能會，此影片包含色情內容");
      } else if (data.adult.isGoryContent === true) {
        $("#picDescription").append("可能會，此影片包含血腥內容");
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      //丟出錯誤訊息
      var errorString =
        errorThrown === ""
          ? "Error. "
          : errorThrown + " (" + jqXHR.status + "): ";
      errorString +=
        jqXHR.responseText === ""
          ? ""
          : jQuery.parseJSON(jqXHR.responseText).message;
      alert(errorString);
    });
}

function processImage() {
  //確認區域與所選擇的相同或使用客製化端點網址
  var url = "https://eastus.api.cognitive.microsoft.com/";
  var uriBase = url + "vision/v2.1/analyze";

  var params = {
    visualFeatures: "Adult",
    details: "",
    language: "en",
  };
  //顯示分析的圖片
  var sourceImageUrl = document.getElementById("inputImage").value;
  document.querySelector("#sourceImage").src = sourceImageUrl;
  //送出分析
  $.ajax({
    url: uriBase + "?" + $.param(params),
    // Request header
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },
    type: "POST",
    // Request body
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
  })
    .done(function (data) {
      //顯示JSON內容
      $("#responseTextArea").val(JSON.stringify(data, null, 2));
      $("#picDescription").empty();
      if (
        data.adult.isAdultContent === false &&
        data.adult.isRacyContent === false &&
        data.adult.isGoryContent === false
      ) {
        $("#picDescription").append("不會");
      } else if (data.adult.isAdultContent === true) {
        $("#picDescription").append("可能會，此影片包含成人內容");
      } else if (data.adult.isRacyContent === true) {
        $("#picDescription").append("可能會，此影片包含色情內容");
      } else if (data.adult.isGoryContent === true) {
        $("#picDescription").append("可能會，此影片包含血腥內容");
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      //丟出錯誤訊息
      var errorString =
        errorThrown === ""
          ? "Error. "
          : errorThrown + " (" + jqXHR.status + "): ";
      errorString +=
        jqXHR.responseText === ""
          ? ""
          : jQuery.parseJSON(jqXHR.responseText).message;
      alert(errorString);
    });
}
