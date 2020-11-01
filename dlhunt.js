var bUrl =
  "https://script.google.com/macros/s/AKfycbxZduEhyztMGq_empHt988AmSdyzO-S3CmSGIiCaZsN9dTTKhni/exec?";
var fskr = (lux = mhn = nva = drd = anime = xp = pdl = mrm = mrobot = fir = single = false);
let kapish = "";
var allLinks = [];
var homeUrl = "https://www.dlhunt.xyz/";
var pr3 = "https://sgscrape.herokuapp.com/?url=";
var notFound =
  "https://1.bp.blogspot.com/-qaaPQQ3B43s/Xrsc7tZXXZI/AAAAAAAABEE/bHiljKwceCESlvQgb5B6h7FmBttsddsqwCK4BGAsYHg/rNotFound.jpg";
var pLabel = null;

var md = new MobileDetect(window.navigator.userAgent);

function notMobile() {
  return !window.location.href.includes("?m=1") || md.phone() === null;
}

var loaderContainer =
  '<div class="container mmLoader"><div class="row"><div class="col"></div><div id="loaderSpace" class="col"></div><div class="col"></div></div></div>';
var imgPreload = new Image();
$(imgPreload).attr({
  src:
    "https://2.bp.blogspot.com/-rV2l94ZUiQs/XocamFgowtI/AAAAAAAAA14/KSlARcBGavAo1GpL8TRKXlDz-Rrekj9UACPcBGAYYCw/s1600/rLoading.gif",
});

if (notMobile() && window.location.href === homeUrl) {
  getDesktopData("TV SERIES", false);
} else if (!notMobile() && window.location.href === homeUrl + "?m=1") {
  getMobileData("TV SERIES", true);

  $(function () {
    $("#ceetek").css("display", "block");
    $("#featuredpost").css("display", "none");
  });
}

function getMobileData(label, first, page) {
  if (page) {
    if (parseInt($("#pAmount").text()) >= 0) {
      $.getJSON(
        "https://dlhunt.xyz/feeds/posts/summary/-/" +
          label +
          "?callback=?&max-results=9&start-index=" +
          $("#pStartIndex").text() +
          "&alt=json",
        function (json) {
          $("#pMainTotal").text(json.feed.openSearch$totalResults.$t);
          $("#pStartIndex").text(parseInt($("#pStartIndex").text()) + 9);
          $("#pAmount").text(
            parseInt($("#pMainTotal").text()) -
              parseInt($("#pStartIndex").text())
          );
          pageRowCallback(json);
        }
      );
    }
  } else {
    $.getJSON(
      "https://dlhunt.xyz/feeds/posts/summary/-/" +
        label +
        "?callback=?&max-results=1&alt=json",
      function (json) {
        total = json.feed.openSearch$totalResults.$t;

        $.ajax({
          url:
            "https://dlhunt.xyz/feeds/posts/summary/-/" +
            label +
            "?max-results=9&start-index=" +
            Math.ceil(Math.random() * (total - 10)) +
            "&alt=json",
          dataType: "jsonp",
          success: function (data) {
            $(function () {
              rowCallback(data, label);
            });
          },
          error: function (a, e) {
            console.log("error");
          },
        });
      }
    );

    if (first) {
      $.getJSON(
        "https://dlhunt.xyz/feeds/posts/summary/-/Current?callback=?&max-results=1&alt=json",
        function (json) {
          total = json.feed.openSearch$totalResults.$t;

          $.ajax({
            url:
              "https://dlhunt.xyz/feeds/posts/summary/-/Current?max-results=6&start-index=" +
              Math.ceil(Math.random() * (total - 6)) +
              "&alt=json",
            dataType: "jsonp",
            success: function (data) {
              $(function () {
                caroselCallback(data);
              });
            },
            error: function (a, e) {
              console.log("error");
            },
          });
        }
      );
    }
  }
}

function getDesktopData(label, page) {
  if (page) {
    if (parseInt($("#pAmount").text()) >= 0) {
      $.getJSON(
        "https://dlhunt.xyz/feeds/posts/summary/-/" +
          label +
          "?callback=?&max-results=15&start-index=" +
          $("#pStartIndex").text() +
          "&alt=json",
        function (json) {
          $("#pMainTotal").text(json.feed.openSearch$totalResults.$t);
          $("#pStartIndex").text(parseInt($("#pStartIndex").text()) + 15);
          $("#pAmount").text(
            parseInt($("#pMainTotal").text()) -
              parseInt($("#pStartIndex").text())
          );
          desktopPageCallback(json, 1);
        }
      );
    }
  } else {
    $.getJSON(
      "https://dlhunt.xyz/feeds/posts/summary/-/" +
        label +
        "?callback=?&max-results=1&alt=json",
      function (json) {
        total = json.feed.openSearch$totalResults.$t;

        $.ajax({
          url:
            "https://dlhunt.xyz/feeds/posts/summary/-/" +
            label +
            "?max-results=12&start-index=" +
            Math.ceil(Math.random() * (total - 12)) +
            "&alt=json",
          dataType: "jsonp",
          success: function (json) {
            $(document).ready(function () {
              desktopCallback(json, true, label);
            });
          },
          error: function () {
            alert("error");
          },
        }); //end
      }
    );
  }
}

//================================== START OF SINGLE DATA CODE =========================

function getSingleData(index, url) {
  if (index === 0) {
    let hourDiff = getHourDiff();
    allHourDiff = hourDiff;
  }

  if (allHourDiff >= 24) {
    $.ajax({
      url: url[index],
      type: "GET",
      success: function (data, status, jqXHR) {
        let lnk = cleanUrl(data, 3, "");
        let encLinks = mkencrypt(lnk);
        let serverNumber = index + 1;
        $("#sgHolder").append(
          '<div style="text-align:center;"><p class="serverNumber">Server ' +
            serverNumber +
            "</p></div>" +
            encLinks
        );

        index++;
        if (url.length !== index) {
          getSingleData(index, url);
        } else {
          appendSingleData();
        }
      },
      error: function (jqXHR, status, error) {
        index++;
        console.log("error");
        if (url.length !== index) {
          console.log("im here");
          getSingleData(index, url);
        } else {
          appendSingleData();
        }
      },
    });
  } else {
    if ($("#downloadbox *[data-mvlink]").length > 0) {
      //not time
      $("#cssLoader").remove();
      $("#downloadbox").fadeIn(1000);
    } else {
      //not time and nothing found
      $("#cssLoader").remove();
      $("#downloadbox")
        .append(
          '<div id="noLinkFound"><p>Something Went Wrong. No Links Were Found. Please Do Notify The Admin Through The Comment Section</p><div>'
        )
        .fadeIn(1000);
    }
  }
}

function appendSingleData() {
  let postContent = $("#spb").prop("outerHTML");
  postContent = $(postContent);
  if ($("#sgHolder *[data-mvlink]").length > 0) {
    $("#downloadbox", postContent).html($("#sgHolder").html());
    postContent = $(postContent).prop("outerHTML");

    doPost($("#mypid").text(), postContent);
    $("#cssLoader").remove();
    $("#downloadbox").html($("#sgHolder").html()).fadeIn(1000);

    reDo();
  } else if (
    $("#sgHolder *[data-mvlink]").length === 0 &&
    $("#downloadbox *[data-mvlink]").length > 0
  ) {
    $("#cssLoader").remove();
    $("#downloadbox").fadeIn(1000);
    reDo();
  } else if (
    $("#sgHolder *[data-mvlink]").length === 0 &&
    $("#downloadbox *[data-mvlink]").length === 0
  ) {
    $("#cssLoader").remove();
    $("#downloadbox")
      .append(
        '<div style="text-align:center;" id="noLinkFound"><p>Something Went Wrong. No Links Were Found. Please Do Notify The Admin Through The Comment Section</p><div>'
      )
      .fadeIn(1000);
  }
}

function prepareLnk(lnk) {
  let requests = [];
  let corsMan = [
    "https://sgpost.herokuapp.com/",
    "https://sgpost1.herokuapp.com/",
  ];
  for (var i = 0; i < lnk.length; i++) {
    requests.push(
      corsMan[Math.floor(Math.random() * Math.floor(2))] +
        defs(decodeURI(lnk[i]), key, false)
    );
  }

  return requests;
}

function mkencrypt(urls) {
  let finalString = "";
  let str =
    "<div class='sDownload' data-mvlink='url'>Download quality Quality</div>";
  for (let i = 0; i < urls.length; i++) {
    let al = urls[i];
    if (al.match(/480p|48op/gi) || al.includes("480p") || al.includes("48Op")) {
      finalString =
        finalString +
        str.replace("url", obfs(al, key, true)).replace("quality", "480p") +
        "<br><br>";
    } else if (
      al.match(/720p|72op|dvd|hdrip|dvdrip/gi) ||
      al.includes("720p") ||
      al.includes("72Op")
    ) {
      finalString =
        finalString +
        str.replace("url", obfs(al, key, true)).replace("quality", "720p") +
        "<br><br>";
    } else if (
      al.match(/1080p|108op|1o8op|1o80p/gi) ||
      al.includes("1080p") ||
      al.includes("108Op")
    ) {
      finalString =
        finalString +
        str.replace("url", obfs(al, key, true)).replace("quality", "1080p") +
        "<br><br>";
    }
  }
  return '<div style="text-align: center;">' + finalString + "</div>";
}

let key = 24;
function obfs(o, e, n, r = 130) {
  for (var t = o.split(""), f = 0; f < t.length; f++) {
    t[f].charCodeAt(0) <= r &&
      (t[f] = String.fromCharCode((t[f].charCodeAt(0) + e) % r));
  }
  return n ? encodeURI(t.join("")) : t.join("");
}
function defs(o, e, n, r = 130) {
  return obfs(o, r - e, n);
}
//================================== END OF SINGLE DATA CODE =========================

function reDo() {
  var aTags = document.querySelectorAll("span[data-href]");

  for (var i = 0; i < aTags.length; i++) {
    var aTag = aTags[i];
    aTag.addEventListener("click", function (e) {
      var ele = e.target;
      let mvlnk = ele.getAttribute("data-href");
      if (parseInt($("#fucked").text()) === 1) {
        //window.open('https://graizoah.com/afu.php?zoneid=3229326','_blank');

        // window.location.replace(mvlnk);
        alert(
          "Please Go to Settings and Disable your Adblock And Refresh Page or Use GOOGLE CHROME to SUPPORT US and continue Download"
        );
        return;
      }
      //window.open('https://graizoah.com/afu.php?zoneid=3381167','_blank');

      //mvlnk.includes('dl3.tvto.ga')?window.location.replace(mvlnk.replace('tvto.ga','tvgapserver.xyz')):window.location.replace(mvlnk);

      if (mvlnk.includes("tvto.ga") || mvlnk.includes("tvgapserver.xyz")) {
        alert("Servers down. We're Working To Restore them!!");
        return;
      } else {
        /*window.location.replace(mvlnk);*/ mvlnk.match(/avaupload/i)
          ? window.location.replace(
              mvlnk
                .replace("avaupload.ir", "avaup1.ir")
                .replace("avaupload.xyz", "avaup1.ir")
            )
          : window.location.replace(mvlnk);
      }

      //window.location.replace(mvlnk);

      // window.location.replace(ele.getAttribute('data-href'));
    });
  }

  var bTags = document.querySelectorAll("div[data-mvlink]");

  for (var i = 0; i < bTags.length; i++) {
    var bTag = bTags[i];
    bTag.addEventListener("click", function (e) {
      var ele = e.target;
      let mvlnk = defs(decodeURI(ele.getAttribute("data-mvlink")), key, false);

      if (parseInt($("#fucked").text()) === 1) {
        //window.open('https://graizoah.com/afu.php?zoneid=3229326','_blank');

        //window.location.replace(mvlnk);
        alert(
          "Please Go to Settings and Disable your Adblock or Use GOOGLE CHROME to SUPPORT US and continue Download"
        );
        return;
      }
      //window.open('https://graizoah.com/afu.php?zoneid=3381167','_blank');
      //window.location.replace(mvlnk);

      if (mvlnk.includes("rayadl.xyz")) {
        alert(
          "This Particular Server is currently down. Please try the other links."
        );
        return;
      } else {
        mvlnk.match(/avaupload/i)
          ? window.location.replace(
              mvlnk
                .replace("avaupload.ir", "avaup1.ir")
                .replace("avaupload.xyz", "avaup1.ir")
            )
          : mvlnk.includes("uploadtera.ml")
          ? window.location.replace(
              mvlnk.replace("uploadtera.ml", "uploadtera.com")
            )
          : window.location.replace(mvlnk);
        //window.location.replace(mvlnk)
      }
    });
  }
}

function previousPage() {
  history.go(-1);
}

let pr1 =
  "https://images" +
  ~~(Math.random() * 33) +
  "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=";

let postMan = [
  "https://stonestorm.herokuapp.com/",
  "https://stonestorm.herokuapp.com/",
  " https://stdlhunt3.herokuapp.com",
  "https://orfreenom.herokuapp.com/",
];

let pr2 = postMan[Math.floor(Math.random() * Math.floor(2))];

pr1 = pr2;

function getPid() {
  let mypid = $("#mypid").text();
  return mypid;
}

var s1 = [
  "s01",
  "s02",
  "s03",
  "s04",
  "s05",
  "s06",
  "s07",
  "s08",
  "s09",
  "s10",
  "s11",
  "s12",
  "s13",
  "s14",
  "s15",
  "s16",
  "s17",
  "s18",
  "s19",
  "s20",
  "s21",
  "s22",
  "s23",
  "s24",
  "s25",
  "s26",
  "s27",
  "s28",
  "s29",
  "s30",
  "s31",
  "s32",
];
var s2 = [
  "e01",
  "e02",
  "e03",
  "e04",
  "e05",
  "e06",
  "e07",
  "e08",
  "e09",
  "e10",
  "e11",
  "e12",
  "e13",
  "e14",
  "e15",
  "e16",
  "e17",
  "e18",
  "e19",
  "e20",
  "e21",
  "e22",
  "e23",
  "e24",
  "e25",
  "e26",
  "e27",
  "e28",
  "e29",
  "e30",
  "e31",
  "e32",
  "e33",
  "e34",
  "e35",
  "e36",
  "e37",
  "e38",
  "e39",
  "e40",
  "e41",
  "e42",
  "e43",
  "e44",
  "e45",
  "e46",
  "e47",
  "e48",
  "e49",
  "e50",
  "e51",
  "e52",
  "e53",
  "e54",
  "e55",
  "e56",
  "e57",
  "e58",
  "e59",
  "e60",
];

var k2 = [
  "e01",
  "e02",
  "e03",
  "e04",
  "e05",
  "e06",
  "e07",
  "e08",
  "e09",
  "e10",
  "e11",
  "e12",
  "e13",
  "e14",
  "e15",
  "e16",
  "e17",
  "e18",
  "e19",
  "e20",
  "e21",
  "e22",
  "e23",
  "e24",
  "e25",
  "e26",
  "e27",
  "e28",
  "e29",
  "e30",
  "e31",
  "e32",
  "e33",
  "e34",
  "e35",
  "e36",
  "e37",
  "e38",
  "e39",
  "e40",
  "e41",
  "e42",
  "e43",
  "e44",
  "e45",
  "e46",
  "e47",
  "e48",
  "e49",
  "e50",
  "e51",
  "e52",
  "e53",
  "e54",
  "e55",
  "e56",
  "e57",
  "e58",
  "e59",
  "e60",
];

var seasonNames = [
  "Season 1",
  "Season 2",
  "Season 3",
  "Season 4",
  "Season 5",
  "Season 6",
  "Season 7",
  "Season 8",
  "Season 9",
  "Season 10",
  "Season 11",
  "Season 12",
  "Season 13",
  "Season 14",
  "Season 15",
  "Season 16",
  "Season 17",
  "Season 18",
  "Season 19",
  "Season 20",
  "Season 21",
  "Season 22",
  "Season 23",
  "Season 24",
  "Season 25",
  "Season 26",
  "Season 27",
  "Season 28",
  "Season 29",
  "Season 30",
  "Season 31",
  "Season 32",
];

var header =
    '<br> <br><div style="text-align: center;">\n<div class="h1 text-warning lead" style="background: #191919; font-family: \'Gugi\'; font-size: 2em;">\n seasonName  </div>\n</div>\n<br />',
  body2 =
    '<br />\n<div style="text-align: center;">\n<div style="font-family: Open Sans condensed; font-size: 1.5em; font-weight: 600;">\n<span class="text-info">seasonEpisode:&nbsp;</span><span class="text-default">| </span><span\n data-href="ceetek1" rel="nofollow" >ql1 </span><span class="text-default">| </span> \n<span\ndata-href="ceetek2" rel="nofollow" >ql2 </span><span\n class="text-default">|</span> <br />\n</div>\n\n</div>',
  body1 =
    '<br><div style="text-align: center;">\n<div style="font-family: Open Sans condensed; font-size: 1.5em; font-weight: 600;">\n<span class="text-info">seasonEpisode:&nbsp;</span><span class="text-default">| </span><span\n data-href="ceetek1" rel="nofollow" >ql1</span><span class="text-default">|</span> <br >\n</div>\n</div>',
  body3 =
    '<br /><div style="text-align: center;">\n<div style="font-family: Open Sans condensed; font-size: 1.5em; font-weight: 600;">\n<span class="text-info">seasonEpisode:&nbsp;</span><span class="text-default">| </span><span\ndata-href="ceetek1" rel="nofollow" >ql1 </span><span class="text-default">| </span> \n <span\ndata-href="ceetek2" rel="nofollow" >ql2 </span><span\nclass="text-default">| </span><span\ndata-href="ceetek3" rel="nofollow" >ql3 </span><span class="text-default">| </span> <br />\n</div>\n\n</div>';

function myCallback(response) {
  clockResponse = response;
}

function checkDate(targetLink, l1, l2, l3, l4, proxy, korean) {
  calcTime(
    new Date(Date.now()).toISOString(),
    targetLink,
    l1,
    l2,
    l3,
    l4,
    proxy,
    korean
  );
}

function calcTime(response, targetLink, l1, l2, l3, l4, proxy, korean) {
  let t1 = $("#timekeeper").text();
  let t2 = response;
  $("#timekeeper").text(t2);

  let lastUpdate = new Date(t1);
  let now = new Date(t2);

  let hourDiff = (now.getTime() - lastUpdate.getTime()) / 36e5;

  if (hourDiff >= 24 || (now.getHours() >= 6 && now.getHours() <= 7)) {
    if (targetLink !== "") {
      targetLink.includes("baromovi.pw")
        ? (targetLink = targetLink.replace("baromovi.pw", "baromov.xyz"))
        : (targetLink = targetLink);
      if (targetLink.includes("perdl")) return;
      if (targetLink !== "" && l1 !== "" && l2 === "") {
        let res1, res2, res3, res4;

        $.when(
          $.get(proxy + targetLink, function (r1) {
            res1 = r1;
          }),

          $.get(proxy + l1, function (r2) {
            res2 = r2;
          })
        ).then(function () {
          let rx = cleanUrl(res1, 3, "");
          let ry = cleanUrl(res2, 3, "");
          let nowUrl = rx.concat(ry);

          let oldUrl = cleanUrl(
            document.getElementsByClassName("ceetek")[0].innerHTML,
            2,
            ""
          );

          verifyEpiSeason(nowUrl, oldUrl, hourDiff, korean);
        });
      } else {
        getData(targetLink, hourDiff, proxy, korean);
      }
    } else {
      getData2(hourDiff, l1, l2, l3, l4, proxy, korean);
    }
  }
}

function getData(targetLink, hourDiff, proxy, korean) {
  //console.log('inside getData');
  $.ajax({
    url: proxy + targetLink,
    type: "get",
    success: function (response) {
      let nowUrl = cleanUrl(response, 3, "");
      //console.log(nowUrl);
      let oldUrl = cleanUrl(
        document.getElementsByClassName("ceetek")[0].innerHTML,
        2,
        ""
      );

      if (nowUrl.length === 0) return;
      //where i'll insert anime

      if (anime) {
      } else {
        verifyEpiSeason(nowUrl, oldUrl, hourDiff, korean);
      }
    },
  });
}

var allHourDiff = "";

function getHourDiff() {
  let t1 = $("#timekeeper").text();
  let t2 = new Date(Date.now()).toISOString();
  $("#timekeeper").text(t2);

  let lastUpdate = new Date(t1);
  let now = new Date(t2);

  let hourDiff = (now.getTime() - lastUpdate.getTime()) / 36e5;

  return hourDiff;
}

function doMagic(url) {
  let t1 = $("#timekeeper").text();
  let t2 = new Date(Date.now()).toISOString();
  $("#timekeeper").text(t2);

  let lastUpdate = new Date(t1);
  let now = new Date(t2);

  let hourDiff = (now.getTime() - lastUpdate.getTime()) / 36e5;
  allHourDiff = hourDiff;

  if (hourDiff >= 12) {
    //checking

    let linkArr = [];
    let corsMan = [
      "https://stdlhuntmagic.herokuapp.com/",
      "https://stdlhunt2magic.herokuapp.com/",
    ];

    $.get(corsMan[Math.floor(Math.random() * Math.floor(2))] + url, function (
      response
    ) {
      response = $.parseHTML(response);
      $(response)
        .find("a")
        .each(function () {
          if (this.href.match(/.mkv|.mp4/i))
            linkArr.push(this.href.substring(0, this.href.lastIndexOf("/")));
          else {
            linkArr.push(this.href);
          }
        });

      linkArr = linkArr.filter(function (el) {
        return el != null;
      });

      if (mrm) {
        linkArr = linkArr.filter(function (el) {
          return (
            typeof el != "undefined" && isKnown(el) && !el.includes("servertwo")
          );
        });
      } else {
        linkArr = linkArr.filter(function (el) {
          return typeof el != "undefined" && isKnown(el);
        });
      }

      linkArr = Array.from(new Set(linkArr));
      //console.log(linkArr)
      doRequest(linkArr);
    });
  }
} //end

function isKnown(el) {
  return (
    el.match(
      /720p|1080p|480p|s01|s02|s03|s04|s05|s06|s07|s08|s09|s10|so1|so2|so3|so4|so5|so6|so7|so8|so9|s1o/i
    ) && !el.match(/dub|duble|farsi/gi)
  );
}

function doRequest(mData) {
  var requests = [];

  let corsMan = [
    "https://stdlhuntmagic.herokuapp.com/",
    "https://stdlhunt2magic.herokuapp.com/",
  ];
  if (mData.length > 1) {
    for (var i = 0; i < mData.length; i++) {
      requests.push(
        $.get(corsMan[Math.floor(Math.random() * Math.floor(2))] + mData[i])
      );
    }

    $.when.apply(null, requests).then(function () {
      $.each(arguments, function (i, row) {
        continueDoRequest(i, row, mData, allLinks);
      });
    });
  } else {
    $.get(
      corsMan[Math.floor(Math.random() * Math.floor(2))] + mData[0],
      function (data, textStatus) {
        continueDoRequest(0, [data, textStatus], mData);
      }
    );
  }
}

function continueDoRequest(i, row, mData) {
  let mLinkArr = [];

  if (row[1] === "success") {
    if (!mrm) {
      row[0] = $.parseHTML(row[0]);
    }
    $(row[0])
      .find("a")
      .each(function () {
        mLinkArr.push(this.href);
      });

    mLinkArr = mLinkArr.filter(function (el) {
      return el != null;
    });

    mLinkArr = mLinkArr.filter(function (el) {
      return (
        typeof el != "undefined" &&
        (el.endsWith(".mkv") ||
          el.endsWith(".MKV") ||
          el.endsWith(".mp4") ||
          el.endsWith(".MP4") ||
          el.endsWith(".avi") ||
          el.endsWith(".AVI")) &&
        !el.match(/farsi|dubbed|fawww|fa.www/i)
      );
      /* || el.includes('.mkv?')|| el.includes('.MKV?');*/
    });

    for (let x = 0; x < mLinkArr.length; x++) {
      let a = mLinkArr[x].lastIndexOf("/");

      mLinkArr[x] = mData[i] + "/" + mLinkArr[x].substring(a + 1);
      if (fskr) {
        mLinkArr[x] = mLinkArr[x].replace("?dir=", "");
      }
    }

    allLinks = allLinks.concat(mLinkArr);

    if (i === mData.length - 1) {
      // $('body').append('<p>'+allLinks+'</p>');

      let nowUrl = allLinks;

      let oldUrl = cleanUrl(
        document.getElementsByClassName("ceetek")[0].innerHTML,
        2,
        ""
      );

      verifyEpiSeason(nowUrl, oldUrl, allHourDiff, kapish);
    }
  } else {
    console.log("some error occured");
  }
}

function getData2(hourDiff, l1, l2, l3, l4, proxy, korean) {
  let res1, res2, res3, res4;
  if (l1 !== "" && l2 !== "" && l3 === "" && l4 === "") {
    $.when(
      $.get(proxy + l1, function (r1) {
        res1 = r1;
      }),

      $.get(proxy + l2, function (r2) {
        res2 = r2;
      })
    ).then(function () {
      //console.log(res1,'================================================',res2)
      let rx = cleanUrl(res1, 3, l1);
      let ry = cleanUrl(res2, 3, l2);
      let nowUrl = rx.concat(ry);
      // console.log('Logging nowUrl');
      //console.log(nowUrl);
      let oldUrl = cleanUrl(
        document.getElementsByClassName("ceetek")[0].innerHTML,
        2,
        ""
      );

      verifyEpiSeason(nowUrl, oldUrl, hourDiff, korean);
    });
  } else if (l1 !== "" && l2 !== "" && l3 !== "" && l4 === "") {
    $.when(
      $.get(proxy + l1, function (r1) {
        res1 = r1;
      }),

      $.get(proxy + l2, function (r2) {
        res2 = r2;
      }),
      $.get(proxy + l1, function (r3) {
        res3 = r3;
      })
    ).then(function () {
      let rx = cleanUrl(res1, 3, l1);
      let ry = cleanUrl(res2, 3, l2);
      let rz = cleanUrl(res3, 3, l3);
      let nowUrl = rx.concat(ry).concat(rz);
      let oldUrl = cleanUrl(
        document.getElementsByClassName("ceetek")[0].innerHTML,
        2,
        ""
      );

      verifyEpiSeason(nowUrl, oldUrl, hourDiff, korean);
    });
  } else if (l1 !== "" && l2 !== "" && l3 !== "" && l4 !== "") {
    $.when(
      $.get(proxy + l1, function (r1) {
        res1 = r1;
      }),

      $.get(proxy + l2, function (r2) {
        res2 = r2;
      }),
      $.get(proxy + l3, function (r3) {
        res3 = r3;
      }),
      $.get(proxy + l4, function (r4) {
        res4 = r4;
      })
    ).then(function () {
      let rx = cleanUrl(res1, 3, l1);
      let ry = cleanUrl(res2, 3, l2);
      let rz = cleanUrl(res3, 3, l3);
      let rn = cleanUrl(res4, 3, l4);
      let nowUrl = rx.concat(ry).concat(rz).concat(rn);
      let oldUrl = cleanUrl(
        document.getElementsByClassName("ceetek")[0].innerHTML,
        2,
        ""
      );

      verifyEpiSeason(nowUrl, oldUrl, hourDiff, korean);
    });
  }
}

function verifyEpiSeason(nowUrl, oldUrl, hourDiff, korean) {
  let ns = getSeason(nowUrl, korean);
  let os = getSeason(oldUrl, korean);
  // console.log(oldUrl);

  let ne = 0;
  let oe = 0;

  if (ns > 0 && os > 0) {
    if (korean === "k") {
      ne = getEpisodeNumber("", nowUrl);
      oe = getEpisodeNumber("", oldUrl);
    } else {
      ne = getEpisodeNumber(s1[ns - 1], nowUrl);
      oe = getEpisodeNumber(s1[os - 1], oldUrl);
    }
  } else {
    ne = getEpisodeNumber(s1[ns - 1], nowUrl);
    oe = getEpisodeNumber(s1[os], oldUrl);
  }
  let hasSeasonalUpdate = false;
  let hasEpisodeUpdate = false;

  if (ns > os) hasSeasonalUpdate = true;
  if (ne > oe && ns === os) hasEpisodeUpdate = true;

  update(
    hasSeasonalUpdate,
    hasEpisodeUpdate,
    hourDiff,
    oe,
    ns,
    os,
    nowUrl,
    oldUrl,
    korean
  );
}

function update(
  hasSeasonalUpdate,
  hasEpisodeUpdate,
  hourDiff,
  oe,
  ns,
  os,
  nowUrl,
  oldUrl,
  korean
) {
  let update = "";
  let content = "";

  if (hasEpisodeUpdate) {
    update = createHtml(os - 1, oe, ns, nowUrl, korean);
    $(".ceetek").append(update);
    reDo();
    content = document.getElementById("pb").innerHTML;
    content = '<div id="pb">' + content + "</div>";
    //console.log("one called");

    if (korean !== "k") {
      updateAll(os, ns, nowUrl, korean, content);
    } else {
      // content = document.getElementById('pb').innerHTML;
      // content = '<div id=\"pb\">' + content + '</div>';
      doPost(getPid(), content);
    }
  } else if (hasSeasonalUpdate) {
    let ne1 = 0;
    let oe1 = 0;
    if (ns > 1 && os > 0) {
      ne1 = getEpisodeNumber(s1[ns - 2], nowUrl);
      oe1 = getEpisodeNumber(s1[os - 1], oldUrl);
    }

    if (ne1 > oe1) {
      //Checking and updating older season episode before updating the new seasons
      update = createHtml(os - 1, oe, os, nowUrl, korean);
      $(".ceetek").append(update);
      update = "";

      // updating to newer seasons
      update = createHtml(os, 0, ns, nowUrl, korean);
      $(".ceetek").append(update);
      content = document.getElementById("pb").innerHTML;
      content = '<div id="pb">' + content + "</div>";

      reDo();
      doPost(getPid(), content);

      // console.log("two called")
    } else {
      // Nothing found so we'll post from first season

      update = createHtml(os, 0, ns, nowUrl, korean);
      $(".ceetek").append(update);
      reDo();
      content = document.getElementById("pb").innerHTML;
      content = '<div id="pb">' + content + "</div>";
      doPost(getPid(), content);
      //console.log("three called");
    }
  } else {
    // CASE WHEN THERES NO EPISODE OR SEASONAL UPDATE TO DO

    if (hourDiff >= 12) {
      content = document.getElementById("pb").innerHTML;
      content = '<div id="pb">' + content + "</div>";
      updateAll(os, ns, nowUrl, korean, content);

      // console.log(" 4 called");
    }
  }
}

function createHtml(seasonNum, episodeNum, seasonNumber, urls, korean) {
  let temp = "";
  let bBody;
  let html2 = "";
  for (let i = seasonNum; i < seasonNumber; i++) {
    if (episodeNum === 0) {
      temp = temp + header.replace("seasonName", seasonNames[i]);
    }

    if (korean !== "k") {
      for (j = episodeNum; j < getEpisodeNumber(s1[i], urls); j++) {
        let i1 = getIndex(s1[i], s2[j], "f", urls);
        let i2 = getIndex(s1[i], s2[j], "s", urls);
        let i3 = getIndex(s1[i], s2[j], "t", urls);

        //Only 480p
        if (i2 === -1 && i3 === -1 && i1 !== -1) {
          temp =
            temp +
            body1
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i1])
              .replace("ql1", "480p");

          // 480p & 720p
        } else if (i1 !== -1 && i3 === -1 && i1 !== -1) {
          temp =
            temp +
            body2
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i1])
              .replace("ceetek2", urls[i2])
              .replace("ql1", "480p")
              .replace("ql2", "720p");

          // All of them
        } else if (i1 !== -1 && i2 !== -1 && i3 !== -1) {
          temp =
            temp +
            body3
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i1])
              .replace("ceetek2", urls[i2])
              .replace("ceetek3", urls[i3])
              .replace("ql1", "480p")
              .replace("ql3", "1080p")
              .replace("ql2", "720p");

          // 720p & 1080p
        } else if (i1 === -1 && i2 !== -1 && i3 !== -1) {
          temp =
            temp +
            body2
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i2])
              .replace("ceetek2", urls[i3])
              .replace("ql1", "720p")
              .replace("ql2", "1080p");
          // Only 720p
        } else if (i2 !== -1 && i3 === -1 && i1 === -1) {
          temp =
            temp +
            body1
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i2])
              .replace("ql1", "720p");
        } else if (i2 === -1 && i3 !== -1 && i1 === -1) {
          temp =
            temp +
            body1
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i1])
              .replace("ql1", "1080p");
        }
      }
    } else {
      //console.log('loggin from createhtml case korean');
      //console.log(urls);
      for (j = episodeNum; j < getEpisodeNumber("", urls); j++) {
        let i0 = getIndex("", k2[j], "ts", urls);
        let i1 = getIndex("", k2[j], "f", urls);
        let i2 = getIndex("", k2[j], "s", urls);
        //let i3 = getIndex('', k2[j], 't', urls);
        let i4 = getIndex("", k2[j], "ff", urls);

        //CASE 360P ALONE
        if (i0 !== -1 && i1 === -1 && i2 === -1 && i4 === -1) {
          temp =
            temp +
            body1
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i0])
              .replace("ql1", "360p");
        } //CASE 480p ALONE
        else if (i0 === -1 && i1 !== -1 && i2 === -1 && i4 === -1) {
          temp =
            temp +
            body1
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i1])
              .replace("ql1", "480p");
        }
        //CASE 540P ALONE
        else if (i0 === -1 && i1 === -1 && i2 === -1 && i4 !== -1) {
          temp =
            temp +
            body1
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i4])
              .replace("ql1", "540p");
        }
        //CASE 720p ALONE
        else if (i0 === -1 && i1 === -1 && i2 !== -1 && i4 === -1) {
          temp =
            temp +
            body1
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i2])
              .replace("ql1", "720p");
        }
        //CASE 540P 720P ALONE
        else if (i0 === -1 && i1 === -1 && i2 !== -1 && i4 !== -1) {
          temp =
            temp +
            body2
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i4])
              .replace("ceetek2", urls[i2])
              .replace("ql1", "540p")
              .replace("ql2", "720p");
        }
        //CASE 360P 720P ALONE
        else if (i0 !== -1 && i1 === -1 && i2 !== -1 && i4 === -1) {
          temp =
            temp +
            body2
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i0])
              .replace("ceetek2", urls[i2])
              .replace("ql1", "360p")
              .replace("ql2", "720p");
        }
        //CASE 480P ALONE
        else if (i0 === -1 && i1 !== -1 && i2 === -1 && i4 === -1) {
          temp =
            temp +
            body1
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i1])
              .replace("ql1", "480p");
        }
        //ALL OF THEM
        else if (i0 !== -1 && i1 !== -1 && i2 !== -1 && i4 !== -1) {
          temp =
            temp +
            body3
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i0])
              .replace("ceetek2", urls[i4])
              .replace("ceetek3", urls[i2])
              .replace("ql1", "360p")
              .replace("ql2", "540p")
              .replace("ql3", "720p");
        } //480p 540p 720p
        else if (i0 === -1 && i1 !== -1 && i2 !== -1 && i4 !== -1) {
          temp =
            temp +
            body3
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i1])
              .replace("ceetek2", urls[i4])
              .replace("ceetek3", urls[i2])
              .replace("ql1", "480p")
              .replace("ql2", "540p")
              .replace("ql3", "720p");
        } //360p 540p 720p
        else if (i0 !== -1 && i1 === -1 && i2 !== -1 && i4 !== -1) {
          temp =
            temp +
            body3
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i0])
              .replace("ceetek2", urls[i4])
              .replace("ceetek3", urls[i2])
              .replace("ql1", "360p")
              .replace("ql2", "540p")
              .replace("ql3", "720p");
        } //360p 480p 720p
        else if (i0 !== -1 && i1 !== -1 && i2 !== -1 && i4 === -1) {
          temp =
            temp +
            body3
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i0])
              .replace("ceetek2", urls[i1])
              .replace("ceetek3", urls[i2])
              .replace("ql1", "360p")
              .replace("ql2", "480p")
              .replace("ql3", "720p");
        } //CASE 480P 720P ALONE
        else if (i0 === -1 && i1 !== -1 && i2 !== -1 && i4 === -1) {
          temp =
            temp +
            body2
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i1])
              .replace("ceetek2", urls[i2])
              .replace("ql1", "480p")
              .replace("ql2", "720p");
        } //CASE 540 720P ALONE
        else if (i0 === -1 && i1 === -1 && i2 !== -1 && i4 !== -1) {
          temp =
            temp +
            body2
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i4])
              .replace("ceetek2", urls[i2])
              .replace("ql1", "540p")
              .replace("ql2", "720p");
        } //CASE 480P 540P ALONE
        else if (i0 === -1 && i1 !== -1 && i2 === -1 && i4 !== -1) {
          temp =
            temp +
            body2
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i1])
              .replace("ceetek2", urls[i4])
              .replace("ql1", "480p")
              .replace("ql2", "540p");
        } //CASE 360p 480p ALONE
        else if (i0 !== -1 && i1 !== -1 && i2 === -1 && i4 === -1) {
          temp =
            temp +
            body2
              .replace("seasonEpisode", s1[i] + s2[j])
              .replace("ceetek1", urls[i0])
              .replace("ceetek2", urls[i1])
              .replace("ql1", "360p")
              .replace("ql2", "480p");
        }
      }
    }

    html2 = html2 + temp;
    temp = "";
  }
  return html2;
}

function doPost(mypid, content) {
  console.log("doPost called");
  var postUrl =
    "https://script.google.com/macros/s/AKfycbzKlVVCArUNP1zQEYba_BeiTRtTqZ0TXim9cg_awq_gRokEoqFm/exec?";
  //  postUrl = "https://images" + ~~(Math.random() * 33) +
  //"-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURI(postUrl);

  let postMan = [];
  if (!single) {
    postMan = [
      "https://ceetekcors.herokuapp.com/",
      "https://hostsme.herokuapp.com/",
    ];

    postUrl = postMan[Math.floor(Math.random() * Math.floor(2))] + postUrl;
  } else {
    postMan = [
      "https://sgpost.herokuapp.com/",
      "https://sgpost1.herokuapp.com/",
    ];

    postUrl = postMan[Math.floor(Math.random() * Math.floor(2))] + postUrl;
  }

  let data = {
    pid: mypid,
    content: content,
    callback: "ctrl",
  };

  if (!mrobot) {
    $.post(postUrl, data, function (dta) {
      console.log(dta);
    });
  }
}

function matchWords(subject, words) {
  var regexMetachars = /[(){[*+?.\\^$|]/g;

  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].replace(regexMetachars, "\\$&");
  }

  var regex = new RegExp(words.join("|"), "gi");

  return subject.match(regex) || [];
}

//Returns the index of a particular season and episode
function getIndex(str1, str2, quality, urls) {
  var index = -1;
  if (quality === "f") {
    for (var i = 0; i < urls.length; i++) {
      if (
        urls[i].includes(str1 + str2) ||
        urls[i].includes(str1.toUpperCase() + str2) ||
        urls[i].includes(str1 + str2.toUpperCase()) ||
        urls[i].includes(str1.toUpperCase() + str2.toUpperCase()) ||
        urls[i].includes(str1 + "%20" + str2) ||
        urls[i].includes(str1.toUpperCase() + "%20" + str2) ||
        urls[i].includes(str1 + "%20" + str2.toUpperCase()) ||
        urls[i].includes(str1.toUpperCase() + "%20" + str2.toUpperCase()) ||
        (urls[i].includes(str1) && urls[i].includes(str2)) ||
        (urls[i].includes(str1.toUpperCase()) && urls[i].includes(str2)) ||
        (urls[i].includes(str1) && urls[i].includes(str2.toUpperCase())) ||
        (urls[i].includes(str1.toUpperCase()) &&
          urls[i].includes(str2.toUpperCase()))
      ) {
        if (urls[i].includes("480p")) {
          index = i;
          break;
        } else if (
          !urls[i].includes("480p") &&
          !urls[i].includes("720p") &&
          !urls[i].includes("1080p") &&
          !urls[i].includes("540p") &&
          !urls[i].includes("360p")
        ) {
          index = i;
          break;
        }
      }
    }
    return index;
  } else if (quality === "s") {
    for (var i = 0; i < urls.length; i++) {
      if (
        urls[i].includes(str1 + str2) ||
        urls[i].includes(str1.toUpperCase() + str2) ||
        urls[i].includes(str1 + str2.toUpperCase()) ||
        urls[i].includes(str1.toUpperCase() + str2.toUpperCase()) ||
        urls[i].includes(str1 + "%20" + str2) ||
        urls[i].includes(str1.toUpperCase() + "%20" + str2) ||
        urls[i].includes(str1 + "%20" + str2.toUpperCase()) ||
        urls[i].includes(str1.toUpperCase() + "%20" + str2.toUpperCase()) ||
        (urls[i].includes(str1) && urls[i].includes(str2)) ||
        (urls[i].includes(str1.toUpperCase()) && urls[i].includes(str2)) ||
        (urls[i].includes(str1) && urls[i].includes(str2.toUpperCase())) ||
        (urls[i].includes(str1.toUpperCase()) &&
          urls[i].includes(str2.toUpperCase()))
      ) {
        if (
          urls[i].includes("720p") &&
          !urls[i].includes("480p") &&
          !urls[i].includes("1080p")
        ) {
          index = i;
          break;
        }
      }
    }
    return index;
  } else if (quality === "t") {
    for (var i = 0; i < urls.length; i++) {
      if (
        urls[i].includes(str1 + str2) ||
        urls[i].includes(str1.toUpperCase() + str2) ||
        urls[i].includes(str1 + str2.toUpperCase()) ||
        urls[i].includes(str1.toUpperCase() + str2.toUpperCase()) ||
        urls[i].includes(str1 + "%20" + str2) ||
        urls[i].includes(str1.toUpperCase() + "%20" + str2) ||
        urls[i].includes(str1 + "%20" + str2.toUpperCase()) ||
        urls[i].includes(str1.toUpperCase() + "%20" + str2.toUpperCase()) ||
        (urls[i].includes(str1) && urls[i].includes(str2)) ||
        (urls[i].includes(str1.toUpperCase()) && urls[i].includes(str2)) ||
        (urls[i].includes(str1) && urls[i].includes(str2.toUpperCase())) ||
        (urls[i].includes(str1.toUpperCase()) &&
          urls[i].includes(str2.toUpperCase()))
      ) {
        if (
          urls[i].includes("1080p") &&
          !urls[i].includes("480p") &&
          !urls[i].includes("720p")
        ) {
          index = i;
          break;
        }
      }
    }
    return index;
  } else if (quality === "ff") {
    for (var i = 0; i < urls.length; i++) {
      if (
        urls[i].includes(str1 + str2) ||
        urls[i].includes(str1.toUpperCase() + str2) ||
        urls[i].includes(str1 + str2.toUpperCase()) ||
        urls[i].includes(str1.toUpperCase() + str2.toUpperCase()) ||
        urls[i].includes(str1 + "%20" + str2) ||
        urls[i].includes(str1.toUpperCase() + "%20" + str2) ||
        urls[i].includes(str1 + "%20" + str2.toUpperCase()) ||
        urls[i].includes(str1.toUpperCase() + "%20" + str2.toUpperCase()) ||
        (urls[i].includes(str1) && urls[i].includes(str2)) ||
        (urls[i].includes(str1.toUpperCase()) && urls[i].includes(str2)) ||
        (urls[i].includes(str1) && urls[i].includes(str2.toUpperCase())) ||
        (urls[i].includes(str1.toUpperCase()) &&
          urls[i].includes(str2.toUpperCase()))
      ) {
        if (
          urls[i].includes("540p") &&
          !urls[i].includes("480p") &&
          !urls[i].includes("1080p") &&
          !urls[i].includes("360p") &&
          !urls[i].includes("720p")
        ) {
          index = i;
          break;
        }
      }
    }
    return index;
  } else if (quality === "ts") {
    for (var i = 0; i < urls.length; i++) {
      if (
        urls[i].includes(str1 + str2) ||
        urls[i].includes(str1.toUpperCase() + str2) ||
        urls[i].includes(str1 + str2.toUpperCase()) ||
        urls[i].includes(str1.toUpperCase() + str2.toUpperCase()) ||
        urls[i].includes(str1 + "%20" + str2) ||
        urls[i].includes(str1.toUpperCase() + "%20" + str2) ||
        urls[i].includes(str1 + "%20" + str2.toUpperCase()) ||
        urls[i].includes(str1.toUpperCase() + "%20" + str2.toUpperCase()) ||
        (urls[i].includes(str1) && urls[i].includes(str2)) ||
        (urls[i].includes(str1.toUpperCase()) && urls[i].includes(str2)) ||
        (urls[i].includes(str1) && urls[i].includes(str2.toUpperCase())) ||
        (urls[i].includes(str1.toUpperCase()) &&
          urls[i].includes(str2.toUpperCase()))
      ) {
        if (
          urls[i].includes("360p") &&
          !urls[i].includes("480p") &&
          !urls[i].includes("1080p") &&
          !urls[i].includes("540p") &&
          !urls[i].includes("720p")
        ) {
          index = i;
          break;
        }
      }
    }
    return index;
  }
}

//End of getIndex function

// new episodenum
function getEpisodeNumber(str, urls) {
  if (urls.length === 0) return 0;

  var count = 0;
  var episodeNum = 0;
  for (var i = k2.length - 1; i >= 0; i--) {
    for (var k = 0; k < urls.length; k++) {
      if (str !== "") {
        if (
          gkq(urls[k]).includes(str + s2[i]) ||
          gkq(urls[k]).includes(str + s2[i].toUpperCase()) ||
          gkq(urls[k]).includes(str.toUpperCase() + s2[i]) ||
          gkq(urls[k]).includes(str.toUpperCase() + s2[i].toUpperCase()) ||
          gkq(urls[k]).includes(str + "%20" + s2[i]) ||
          gkq(urls[k]).includes(str + "%20" + s2[i].toUpperCase()) ||
          gkq(urls[k]).includes(str.toUpperCase() + "%20" + s2[i]) ||
          gkq(urls[k]).includes(
            str.toUpperCase() + "%20" + s2[i].toUpperCase()
          ) ||
          (gkq(urls[k]).includes(str) && gkq(urls[k]).includes(s2[i])) ||
          (gkq(urls[k]).includes(str) &&
            gkq(urls[k]).includes(s2[i].toUpperCase())) ||
          (gkq(urls[k]).includes(str.toUpperCase()) &&
            gkq(urls[k]).includes(s2[i])) ||
          (gkq(urls[k]).includes(str.toUpperCase()) &&
            gkq(urls[k]).includes(s2[i].toUpperCase()))
        ) {
          episodeNum = i + 1;
          count += 1;
          break;
        }

        /*	if( matchWords(gkq(urls[k]), [str + s2[i], str + " " + s2[i], str, s2[i]]).length >= 2){
				  episodeNum = i + 1;
                  count += 1;
                    break;
		}*/
      } else {
        if (
          gkq(urls[k]).includes(str + k2[i]) ||
          gkq(gkq(urls[k])).includes(str + k2[i].toUpperCase()) ||
          gkq(urls[k]).includes(str.toUpperCase() + k2[i]) ||
          gkq(urls[k]).includes(str.toUpperCase() + k2[i].toUpperCase()) ||
          gkq(urls[k]).includes(str + "%20" + k2[i]) ||
          gkq(urls[k]).includes(str + "%20" + k2[i].toUpperCase()) ||
          gkq(urls[k]).includes(str.toUpperCase() + "%20" + k2[i]) ||
          gkq(urls[k]).includes(
            str.toUpperCase() + "%20" + k2[i].toUpperCase()
          ) ||
          (gkq(urls[k]).includes(str) && gkq(urls[k]).includes(k2[i])) ||
          (gkq(urls[k]).includes(str) &&
            gkq(urls[k]).includes(k2[i].toUpperCase())) ||
          (gkq(urls[k]).includes(str.toUpperCase()) &&
            gkq(urls[k]).includes(k2[i])) ||
          (gkq(urls[k]).includes(str.toUpperCase()) &&
            gkq(urls[k]).includes(k2[i].toUpperCase()))
        ) {
          episodeNum = i + 1;
          count += 1;
          break;
        }

        /*
            if( matchWords(gkq(urls[k]), [str + k2[i], str + " " + k2[i], str, k2[i]]).length >= 2){
				  episodeNum = i + 1;
                  count += 1;
                    break;
		}*/
      }
    }

    if (count > 0) break;
  }
  return episodeNum;
}

//End of getEpisode Number
function gkq(url) {
  return url.includes("?")
    ? url.substring(url.lastIndexOf("/"), url.indexOf("?"))
    : url;
}

function getSeason(urls, korean) {
  // searches for the number of seasons

  if (korean === "k") return 1;
  if (urls.length === 0) return 0;
  var sNum = -1;
  var counter = 0;
  for (var i = s1.length - 1; i >= 0; i--) {
    for (var k = 0; k < urls.length; k++) {
      if (
        (urls[k].includes(s1[i]) && urls[k].indexOf(s1[i]) > 12) ||
        (urls[k].includes(s1[i].toUpperCase()) &&
          urls[k].indexOf(s1[i].toUpperCase()) > 12)
      ) {
        sNum = i + 1;
        counter += 1;

        break;
      }
    }
    if (counter > 0) break;
  }
  //End of season search
  return sNum;
}

// Returns a clean extracted url versions

function cleanUrl(response, tp, lnk) {
  //console.log(response);
  let linkArr = [];
  if (tp === 2) {
    var doc = document.createElement("html");
    doc.innerHTML = response;
    var links = doc.getElementsByTagName("span");

    for (var i = 0; i < links.length; i++) {
      linkArr.push(links[i].getAttribute("data-href"));
    }
  } else if (tp === 3) {
    if (mrm) {
      $(response)
        .find("a")
        .each(function () {
          linkArr.push(this.href);
        });
    } else {
      response = $.parseHTML(response);
      $(response)
        .find("a")
        .each(function () {
          linkArr.push(this.href);
        });
    }
  }
  linkArr = linkArr.filter(function (el) {
    return el != null;
  });

  if (tp === 2) return linkArr;
  if ((lux && tp === 3) || (mhn && tp === 3)) {
    linkArr = linkArr.filter(function (el) {
      return typeof el != "undefined";
    });

    if (lux) {
      //CONVERTING TO NORMAL
      for (let p = 0; p < linkArr.length; p++) {
        //linkArr[p] = window.atob(linkArr[p].substring(linkArr[p].indexOf('url=') + 4, linkArr[p].indexOf('&type')))
        console.log(
          linkArr[p].substring(
            linkArr[p].indexOf("url=") + 4,
            linkArr[p].indexOf("&type")
          )
        );
      }

      linkArr = linkArr.filter(function (el) {
        return (
          (typeof el != "undefined" && el.endsWith(".mkv")) ||
          el.endsWith(".MKV") ||
          el.endsWith(".mp4") ||
          el.endsWith(".MP4") ||
          el.endsWith(".avi") ||
          el.endsWith(".AVI")
        );
      });
    }

    if (mhn) {
      linkArr = linkArr.filter(function (el) {
        return (
          (typeof el != "undefined" && el.includes(".mkv?")) ||
          el.includes(".MKV?")
        );
      });
    }

    return linkArr;
  } else {
    if (!mrobot) {
      linkArr = linkArr.filter(function (el) {
        return (
          typeof el != "undefined" &&
          !el.match(/farsi|dubbed|fawww|fa.www|trailer|servertwo/i) &&
          (el.endsWith(".mkv") ||
            el.endsWith(".MKV") ||
            el.endsWith(".mp4") ||
            el.endsWith(".MP4") ||
            el.endsWith(".avi") ||
            el.endsWith(".AVI"))
        ); /*el.match(/\b.mkv|.mp4|.avi\b/gi)*/ /* el.match(/\b.mkv|.mp4|.avi\b/gi) */
        /* || el.includes('.mkv?')|| el.includes('.MKV?');*/
      });

      if (fir) {
        linkArr = linkArr.filter(function (el) {
          return (
            (typeof el != "undefined" &&
              /*el.match(/.mkv\?|.mp4\?|.avi\?/i);*/ el.includes(".mkv?")) ||
            el.includes(".MKV?") ||
            el.includes(".mp4?") ||
            el.includes(".MP4?") ||
            el.includes(".avi?") ||
            el.includes(".AVI?")
          );
        });

        for (let m = 0; m < linkArr.length; m++) {
          let jx = linkArr[m];
          if (jx.includes("?"))
            linkArr[m] = jx.substring(
              0,
              jx.indexOf(jx.match(/.mkv|.avi|.mp4/i)[0]) + 4
            );
        }
      } //for fRan
    } else {
      linkArr = linkArr.filter(function (el) {
        return (
          (typeof el != "undefined" &&
            /*el.match(/.mkv\?|.mp4\?|.avi\?/gi); */ el.includes(".mkv?")) ||
          el.includes(".MKV?") ||
          el.includes(".mp4?") ||
          el.includes(".MP4?") ||
          el.includes(".avi?") ||
          el.includes(".AVI?")
        );
      });
    } //IF ROBOT

    if (lnk !== "" && !mrobot) {
      // lnk = lnk.substring(0,lnk.split("/",3).join("/").length);

      for (let x = 0; x < linkArr.length; x++) {
        let a = linkArr[x].lastIndexOf("/");

        linkArr[x] = lnk + linkArr[x].substring(a + 1);
        if (fskr) {
          linkArr[x] = linkArr[x].replace("?dir=", "");
        }
      }
    }

    if (xp) {
      for (let m = 0; m < linkArr.length; m++) {
        let jx = linkArr[m];
        linkArr[m] = jx.substring(jx.indexOf("?") + 1);
      }
    }

    if (drd) {
      for (let m = 0; m < linkArr.length; m++) {
        linkArr[m] = linkArr[m].replace("uppdl.info", "updddl.xyz");
      }
    }

    if (pdl) {
      for (let m = 0; m < linkArr.length; m++) {
        let jx = linkArr[m];
        linkArr[m] = jx.substring(jx.indexOf("url=") + 4);
      }
    }

    if (single) {
      linkArr.forEach(function (item, index) {
        if (item.split("http").length > 2)
          this[index] = item.substring(item.lastIndexOf("http"));
      }, linkArr);
    }

    //console.log(linkArr);
    return linkArr;
  }
} //end of cleanurl

function updateAll(os, ns, nowUrl, korean, content) {
  update = createHtml(0, 0, ns, nowUrl, korean);

  let doc = document.createElement("div");
  doc.innerHTML = content;

  doc.getElementsByClassName("ceetek")[0].innerHTML = update;

  content = $(doc).find("#pb").html();

  content = '<div  id="pb">' + content + "</div>";
  /*
        if($('#qtags').length < 1){
            content = $('<div>'+content+'</div>');
            $('#timekeeper',content).html(3)
        }else{

        }
        */
  doPost(getPid(), content);
}

//Related Post
var relnojudul = 0;
var relmaxtampil = 12;
var numchars = 25;
var reljudul = new Array(); //titles
var relurls = new Array();
var relcuplikan = new Array(); //summary
var relgambar = new Array(); //image

function saringtags(g, h) {
  var e = g.split("<");
  for (var f = 0; f < e.length; f++) {
    if (e[f].indexOf(">") != -1) {
      e[f] = e[f].substring(e[f].indexOf(">") + 1, e[f].length);
    }
  }
  e = e.join("");
  e = e.substring(0, h - 1);
  return e;
}

function relpostimgcuplik(h) {
  for (var e = 0; e < h.feed.entry.length; e++) {
    var g = h.feed.entry[e];
    reljudul[relnojudul] = g.title.$t;
    postcontent = "";
    if ("content" in g) {
      postcontent = g.content.$t;
    } else {
      if ("summary" in g) {
        postcontent = g.summary.$t;
      }
    }
    relcuplikan[relnojudul] = saringtags(postcontent, numchars);
    if ("media$thumbnail" in g) {
      postimg = g.media$thumbnail.url;
    } else {
      postimg =
        "http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s1600/grey.GIF";
    }
    relgambar[relnojudul] = postimg;
    for (var f = 0; f < g.link.length; f++) {
      if (g.link[f].rel == "alternate") {
        relurls[relnojudul] = g.link[f].href;
        break;
      }
    }
    relnojudul++;
  }
}

function contains(a, e) {
  for (var f = 0; f < a.length; f++) {
    if (a[f] == e) {
      return true;
    }
  }
  return false;
}

function relatedscript() {
  var v = new Array(0);
  var w = new Array(0);
  var x = new Array(0);
  var A = new Array(0);
  for (var u = 0; u < relurls.length; u++) {
    if (!contains(v, relurls[u])) {
      v.length += 1;
      v[v.length - 1] = relurls[u];
      w.length += 1;
      w[w.length - 1] = reljudul[u];
      x.length += 1;
      x[x.length - 1] = relcuplikan[u];
      A.length += 1;
      A[A.length - 1] = relgambar[u];
    }
  }
  reljudul = w;
  relurls = v;
  relcuplikan = x;
  relgambar = A;
  for (var u = 0; u < reljudul.length; u++) {
    var B = Math.floor((reljudul.length - 1) * Math.random());
    var i = reljudul[u];
    var s = relurls[u];
    var y = relcuplikan[u];
    var C = relgambar[u];
    reljudul[u] = reljudul[B];
    relurls[u] = relurls[B];
    relcuplikan[u] = relcuplikan[B];
    relgambar[u] = relgambar[B];
    reljudul[B] = i;
    relurls[B] = s;
    relcuplikan[B] = y;
    relgambar[B] = C;
  }
  var r = 0;
  var D = Math.floor((reljudul.length - 1) * Math.random());
  var z = D;
  var q;
  var t = document.URL;
  let ip = 0;
  let output =
    '<div class="mcontainer"> <div class="row"> <div class="col first"> <div class="item"> <a href="link1"><img src="img1" alt="img"></a> <a href="link1"> <p>title1 </p></a> </div></div><div class="col middle"> <div class="item"> <a href="link2"><img src="img2" alt="img"></a> <a href="link2"> <p>title2 </p></a> </div></div><div class="col last"> <div class="item"> <a href="link3"><img src="img3" alt="img"></a> <a href="link3"> <p>title3 </p></a> </div></div></div></div>';
  let out1 = output;
  while (r < relmaxtampil) {
    if (relurls[D] != t) {
      if (notMobile()) {
        q = "<li class='news-title clearfix'>";
        q +=
          "<a href='" +
          relurls[D] +
          "' rel='nofollow' target='_top' title='" +
          reljudul[D].substring(0, 23) +
          "..'><div class='overlayb'></div><img src='" +
          relgambar[D] +
          "' /></a>";
        q +=
          "<a class='relinkjdulx' href='" +
          relurls[D] +
          "' target='_top'>" +
          reljudul[D].substring(0, 23) +
          "..</a>";
        q += "<span class='news-text'>" + relcuplikan[D] + "</span>";
        q += "</li>";
        document.write(q);
      } else {
        if (ip % 3 == 0) {
          output = output
            .replace("img1", relgambar[D].replace("s72-c", "w120"))
            .replace("title1", reljudul[D])
            .replace(/link1/g, relurls[D]);
          ip += 1;
        } else if (ip % 3 == 1) {
          output = output
            .replace("img2", relgambar[D].replace("s72-c", "w120"))
            .replace("title2", reljudul[D])
            .replace(/link2/g, relurls[D]);
          ip += 1;
        } else if (ip % 3 == 2) {
          output = output
            .replace("img3", relgambar[D].replace("s72-c", "w120"))
            .replace("title3", reljudul[D])
            .replace(/link3/g, relurls[D]);
          ip += 1;
          //document.write(output);
          $("#related-post").append(output);
          output = out1;
        }
        //if(ip===8)break;
      }

      r++;
      if (r == relmaxtampil) {
        break;
      }
    }
    if (D < reljudul.length - 1) {
      D++;
    } else {
      D = 0;
    }
    if (D == z) {
      break;
    }
  }
}

var mLabels = [
  "Film",
  "KOREAN SERIES",
  "Animation",
  "romance",
  "Horror",
  "comedy",
  "Adventure",
  "TV SERIES",
];
var loading,
  pLoading = false;

//==========================================SCROLLING TO LOAD MORE=--===============================
$(window).scroll(function () {
  if (notMobile()) {
    if (
      $(window).scrollTop() + $(window).height() >=
        $("#outer-wrapper").height() - 70 &&
      !loading &&
      parseInt($("#labelIndex").text()) < mLabels.length &&
      window.location.href === homeUrl
    ) {
      loading = true;
      $("#outer-wrapper").append(loaderContainer);
      $("#loaderSpace").append(imgPreload);

      getDesktopData(mLabels[parseInt($("#labelIndex").text())], false);
    } else if (
      $(window).scrollTop() + $(window).height() >=
        $("#outer-wrapper").height() - 70 &&
      !pLoading &&
      pLabel !== null
    ) {
      if (parseInt($("#pAmount").text()) >= 0) {
        pLoading = true;
        $("#outer-wrapper").append(loaderContainer);
        $("#loaderSpace").append(imgPreload);

        getDesktopData(pLabel, true);
      }
    }
  } //IS MOBILE
  else {
    if (
      $(window).scrollTop() + $(window).height() >=
        $("#ceetek").height() - 70 &&
      !loading &&
      parseInt($("#labelIndex").text()) < mLabels.length &&
      window.location.href === homeUrl + "?m=1"
    ) {
      loading = true;
      $("#ceetek").append(loaderContainer);
      $("#loaderSpace").append(imgPreload);

      getMobileData(mLabels[parseInt($("#labelIndex").text())]);
    } else if (
      $(window).scrollTop() + $(window).height() >=
        $("#pCeetek").height() - 70 &&
      !pLoading &&
      pLabel !== null
    ) {
      if (parseInt($("#pAmount").text()) >= 0) {
        pLoading = true;
        $("#pCeetek").append(loaderContainer);
        $("#loaderSpace").append(imgPreload);

        getMobileData(pLabel, true, true);
      }
    }
  }
}); //END OF WINDOWS SCROLL

//===============================================END OF LOAD MORE====================================================

function desktopCallback(e, first, mLabel) {
  let label =
    mLabel.indexOf("/") > -1
      ? mLabel.substring(0, mLabel.indexOf("/"))
      : mLabel;
  let str1 =
    "<div style='background:#191919; overflow-x:auto; width:100%; max-width:1150px; margin:auto;'><div class='widget-content'><ul id='label_with_thumbs'>";
  let str2 = "  </ul></div></div>";
  let str3 = "  </ul></div>btnVa</div>";

  let tempHtml = "";

  var item =
    "<li class='recent-box'><div class='imageContainer'><a href='url1' target='_top'><img alt='title1' class='label_thumb' src='img1'title='title1' /></a></div><a class='label_title' href='url1' target='_top'>title1</a><div class='toe'><a class='post-date' href='url1'>date1</a><a class='recent-com' href='url1#comment-form'target='_top'>comment1</a></div></li>";

  var turn = numposts;
  if (first) {
    turn = 0;
    holder = e;
  }

  for (var t = turn; t < numposts + turn; t++) {
    var n = e.feed.entry[t];
    var r = n.title.$t;
    var i;
    if (t == e.feed.entry.length) break;
    for (var o = 0; o < n.link.length; o++) {
      if (n.link[o].rel == "replies" && n.link[o].type == "text/html") {
        var u = n.link[o].title;
        var f = n.link[o].href;
      }
      if (n.link[o].rel == "alternate") {
        i = n.link[o].href;
        break;
      }
    }
    var l;
    try {
      l = n.media$thumbnail.url;
    } catch (h) {
      s = n.content.$t;
      a = s.indexOf("<img");
      b = s.indexOf('src="', a);
      c = s.indexOf('"', b + 5);
      d = s.substr(b + 5, c - b - 5);
      if (a != -1 && b != -1 && c != -1 && d != "") {
        l = d;
      } else
        l =
          "http://3.bp.blogspot.com/-zP87C2q9yog/UVopoHY30SI/AAAAAAAAE5k/AIyPvrpGLn8/s1600/picture_not_available.png";
    }
    var p = n.published.$t;
    var v = p.substring(0, 4);
    var m = p.substring(5, 7);
    var g = p.substring(8, 10);
    var y = new Array();
    y[1] = "Jan";
    y[2] = "Feb";
    y[3] = "Mar";
    y[4] = "Apr";
    y[5] = "May";
    y[6] = "June";
    y[7] = "July";
    y[8] = "Aug";
    y[9] = "Sept";
    y[10] = "Oct";
    y[11] = "Nov";
    y[12] = "Dec";

    var w = "";
    var E = 0;

    p = n.published.$t;
    var S = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var x = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    var T = p.split("-")[2].substring(0, 2);
    var N = p.split("-")[1];
    var C = p.split("-")[0];
    for (var k = 0; k < S.length; k++) {
      if (parseInt(N) == S[k]) {
        N = x[k];
        break;
      }
    }
    var L = T + " " + N + " " + C;
    if (E == 1) {
      w = w + " | ";
    }
    if (u == "1 Comments") u = "1 Comment";
    if (u == "0 Comments") u = "No Comments";
    w = w + u;
    E = 1;

    tempHtml =
      tempHtml +
      item
        .replace(/url1/g, i)
        .replace(/title1/g, r)
        .replace(/date1/g, L)
        .replace(/comment1/g, u)
        .replace("img1'", l.replace("s72-c", "w200"));

    if (t === numposts + turn - 1) {
      if (first) {
        $(".mmLoader").remove();
        let title =
          '<h5 style="color:white; margin: 0 0 5px 5px; font-size:2.6vh; display:inline-block; border-bottom: 1px solid crimson; font-family: gugi;">label</h5>';
        $("#outer-wrapper").append(
          title.replace("label", titleCase(label)) + str1 + tempHtml + str2
        );
        desktopCallback(holder, false, label);
      } else {
        let label =
          mLabel.indexOf("/") > -1
            ? mLabel
                .substring(0, mLabel.indexOf("/"))
                .toLowerCase()
                .replace(" ", "-")
            : mLabel.toLowerCase().replace(" ", "-");
        let btnVa =
          '<button onclick="window.location.href =\'labelUrl\'" class="btnVa">View All </button>';
        btnVa = btnVa.replace(
          "labelUrl",
          "https://dlhunt.xyz/p/" + label + ".html"
        );
        $("#outer-wrapper").append(
          str1 + tempHtml + str3.replace("btnVa", btnVa)
        );
        loading = false;
        $("#labelIndex").text(parseInt($("#labelIndex").text()) + 1);
      }
    }
  }
}

//===================================================================DESKTOP PAGE CALLBACK========================================
function desktopPageCallback(e, round) {
  let str1 =
    "<div style='background:#191919; overflow-x:auto; width:100%; max-width:1150px; margin:auto;'><div class='widget-content'><ul id='label_with_thumbs'>";
  let str2 = "  </ul></div></div>";

  let tempHtml = "";

  let item =
    "<li class='recent-box'><div class='imageContainer'><a href='url1' target='_top'><img alt='title1' class='label_thumb' src='img1'title='title1' /></a></div><a class='label_title' href='url1' target='_top'>title1</a><div class='toe'><a class='post-date' href='url1'>date1</a><a class='recent-com' href='url1#comment-form'target='_top'>comment1</a></div></li>";

  if (round === 1) {
    turn = 0;
    holder = e;
    pTotal = e.feed.entry.length;
    pTotal >= 5 ? (numposts = 5) : (numposts = pTotal);
  } else if (round === 2) {
    if (pTotal > 5 && pTotal < 10) {
      turn = pTotal - 5;
    } else {
      turn = 5;
    }
  } else if (round === 3) {
    if (pTotal > 10 && pTotal < 15) {
      turn = pTotal - 10;
      numposts += 5;
    } else {
      turn = 10;
    }
  }

  for (var t = turn; t < numposts + turn; t++) {
    var n = e.feed.entry[t];
    var r = n.title.$t;
    var i;
    if (t == e.feed.entry.length) break;
    for (var o = 0; o < n.link.length; o++) {
      if (n.link[o].rel == "replies" && n.link[o].type == "text/html") {
        var u = n.link[o].title;
        var f = n.link[o].href;
      }
      if (n.link[o].rel == "alternate") {
        i = n.link[o].href;
        break;
      }
    }
    var l;
    try {
      l = n.media$thumbnail.url;
    } catch (h) {
      s = n.content.$t;
      a = s.indexOf("<img");
      b = s.indexOf('src="', a);
      c = s.indexOf('"', b + 5);
      d = s.substr(b + 5, c - b - 5);
      if (a != -1 && b != -1 && c != -1 && d != "") {
        l = d;
      } else
        l =
          "http://3.bp.blogspot.com/-zP87C2q9yog/UVopoHY30SI/AAAAAAAAE5k/AIyPvrpGLn8/s1600/picture_not_available.png";
    }
    var p = n.published.$t;
    var v = p.substring(0, 4);
    var m = p.substring(5, 7);
    var g = p.substring(8, 10);
    var y = new Array();
    y[1] = "Jan";
    y[2] = "Feb";
    y[3] = "Mar";
    y[4] = "Apr";
    y[5] = "May";
    y[6] = "June";
    y[7] = "July";
    y[8] = "Aug";
    y[9] = "Sept";
    y[10] = "Oct";
    y[11] = "Nov";
    y[12] = "Dec";

    var w = "";
    var E = 0;

    p = n.published.$t;
    var S = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var x = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    var T = p.split("-")[2].substring(0, 2);
    var N = p.split("-")[1];
    var C = p.split("-")[0];
    for (var k = 0; k < S.length; k++) {
      if (parseInt(N) == S[k]) {
        N = x[k];
        break;
      }
    }
    var L = T + " " + N + " " + C;
    if (E == 1) {
      w = w + " | ";
    }
    if (u == "1 Comments") u = "1 Comment";
    if (u == "0 Comments") u = "No Comments";
    w = w + u;
    E = 1;

    tempHtml =
      tempHtml +
      item
        .replace(/url1/g, i)
        .replace(/title1/g, r)
        .replace(/date1/g, L)
        .replace(/comment1/g, u)
        .replace("img1'", l.replace("s72-c", "w200"));

    if (t === numposts + turn - 1) {
      $(".mmLoader").remove();
      $("#outer-wrapper").append(str1 + tempHtml + str2);
      break;
    }
  }

  if (round === 1) {
    pTotal > 5 ? desktopPageCallback(holder, 2) : (pLoading = false);
  } else if (round === 2) {
    pTotal > 10 ? desktopPageCallback(holder, 3) : (pLoading = false);
  } else {
    pLoading = false;
  }
} //END OF DESKTOPPAGE CALLBACK

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (chunk) {
      return chunk.charAt(0).toUpperCase() + chunk.substring(1);
    })
    .join(" ");
}

//========================================================ROW CALLBACK=====================================
function rowCallback(json, label) {
  let appendTitle = true;
  // var html1 = document.getElementById('rowContainer').innerHTML;
  // var html2 = html1;
  var data = [];
  for (var i = 0; i < json.feed.entry.length; i++) {
    for (var j = 0; j < json.feed.entry[i].link.length; j++) {
      if (json.feed.entry[i].link[j].rel == "alternate") {
        var postUrl = json.feed.entry[i].link[j].href;
        break;
      }
    }
    var postTitle = json.feed.entry[i].title.$t;
    postTitle = titleCase(postTitle);
    // var postAuthor = json.feed.entry[i].author[0].name.$t;
    // var postSummary = json.feed.entry[i].summary.$t;
    // var entryShort = postSummary.substring(0, 400);
    // var entryEnd = entryShort.lastIndexOf(" ");
    // var postContent = entryShort.substring(0, entryEnd) + '...';
    var postImage = json.feed.entry[i].media$thumbnail.url.replace(
      "s72-c/",
      "w120/"
    );
    // var item = '<div class="wrapper"><img src="' + postImage + '"/><h3><a href=' + postUrl + '>' + postTitle + '</h3></a><span>' + postAuthor + '</span><p>' + postContent + '</p></div>';
    // document.write(item);
    data.push({ imageUrl: postImage, postTitle: postTitle, postUrl: postUrl });
    if ((i + 1) % 3 === 0) {
      createRow(data, label, appendTitle, i);
      data = [];
      appendTitle = false;
    }
  }
  loading = false;
  $("#labelIndex").text(parseInt($("#labelIndex").text()) + 1);
}

function createRow(data, mLabel, appendTitle, count) {
  let title =
    '<h5 style="color:white; margin: 0 0 5px 5px; display: inline-block; border-bottom: 1px solid crimson; font-family: gugi;">label</h5>';
  let out1 =
    '<div class="mcontainer"> <div class="row"> <div class="col first"> <div class="item"> <a href="link1"><img src="img1" alt="img"></a> <a href="link1"> <p>title1 </p></a> </div></div><div class="col middle"> <div class="item"> <a href="link2"><img src="img2" alt="img"></a> <a href="link2"> <p>title2 </p></a> </div></div><div class="col last"> <div class="item"> <a href="link3"><img src="img3" alt="img"></a> <a href="link3"> <p>title3 </p></a> </div></div></div></div>';
  let out2 =
    '<div class="mcontainer"> <div class="row"> <div class="col first"> <div class="item"> <a href="link1"><img src="img1" alt="img"></a> <a href="link1"> <p>title1 </p></a> </div></div><div class="col middle"> <div class="item"> <a href="link2"><img src="img2" alt="img"></a> <a href="link2"> <p>title2 </p></a> </div></div><div class="col last"> <div class="item"> <a href="link3"><img src="img3" alt="img"></a> <a href="link3"> <p>title3 </p></a> </div></div></div><button onclick="window.location.href =\'labelUrl\'" class="btnVa">View All </button></div>';
  let label =
    mLabel.indexOf("/") > -1
      ? mLabel.substring(0, mLabel.indexOf("/")).toLowerCase().replace(" ", "-")
      : mLabel.toLowerCase().replace(" ", "-");

  let output = count == 8 ? out2 : out1;
  for (var i = 0; i < data.length; i++) {
    if (i == 0) {
      output = output
        .replace("img1", data[i].imageUrl)
        .replace("title1", data[i].postTitle)
        .replace(/link1/g, data[i].postUrl);
    } else if (i == 1) {
      output = output
        .replace("img2", data[i].imageUrl)
        .replace("title2", data[i].postTitle)
        .replace(/link2/g, data[i].postUrl);
    } else if (i == 2) {
      if (appendTitle) {
        output = title + output;
        label = mLabel;
        output = output
          .replace("img3", data[i].imageUrl)
          .replace("title3", data[i].postTitle)
          .replace(/link3/g, data[i].postUrl)
          .replace("label", titleCase(label));
      } else {
        if (count === 8) {
          output = output
            .replace("img3", data[i].imageUrl)
            .replace("title3", data[i].postTitle)
            .replace(/link3/g, data[i].postUrl)
            .replace("labelUrl", "https://dlhunt.xyz/p/" + label + ".html");
        } else {
          output = output
            .replace("img3", data[i].imageUrl)
            .replace("title3", data[i].postTitle)
            .replace(/link3/g, data[i].postUrl);
        }
      }
      $(".mmLoader").remove();
      $("#ceetek").append(output);
    }
  }
}

//==================================================================================PAGE ROWCALLBACK============================================

function pageRowCallback(json) {
  var data = [];
  for (var i = 0; i < json.feed.entry.length; i++) {
    for (var j = 0; j < json.feed.entry[i].link.length; j++) {
      if (json.feed.entry[i].link[j].rel == "alternate") {
        var postUrl = json.feed.entry[i].link[j].href;
        break;
      }
    }
    var postTitle = json.feed.entry[i].title.$t;
    postTitle = titleCase(postTitle);

    var postImage = json.feed.entry[i].media$thumbnail.url.replace(
      "s72-c/",
      "w120/"
    );

    data.push({ imageUrl: postImage, postTitle: postTitle, postUrl: postUrl });
    if ((i + 1) % 3 === 0) {
      createPageRow(data);
      data = [];
      appendTitle = false;
    }
  }
  if (data.length !== 0) createPageRow(data);
  pLoading = false;
}

function createPageRow(data) {
  let output =
    '<div class="mcontainer"> <div class="row"> <div class="col first"> <div class="item"> <a href="link1"><img src="img1" alt="img"></a> <a href="link1"> <p>title1 </p></a> </div></div><div class="col middle"> <div class="item"> <a href="link2"><img src="img2" alt="img"></a> <a href="link2"> <p>title2 </p></a> </div></div><div class="col last"> <div class="item"> <a href="link3"><img src="img3" alt="img"></a> <a href="link3"> <p>title3 </p></a> </div></div></div></div>';

  if (data.length % 3 === 0) {
    for (var i = 0; i < data.length; i++) {
      if (i == 0) {
        output = output
          .replace("img1", data[i].imageUrl)
          .replace("title1", data[i].postTitle)
          .replace(/link1/g, data[i].postUrl);
      } else if (i == 1) {
        output = output
          .replace("img2", data[i].imageUrl)
          .replace("title2", data[i].postTitle)
          .replace(/link2/g, data[i].postUrl);
      } else if (i == 2) {
        output = output
          .replace("img3", data[i].imageUrl)
          .replace("title3", data[i].postTitle)
          .replace(/link3/g, data[i].postUrl);

        $(".mmLoader").remove();
        $("#pCeetek").append(output);
        $("#pTempContainer").css("display", "none");
      }
    }
  } else {
    if (data.length % 3 === 1) {
      output = output
        .replace("img1", data[0].imageUrl)
        .replace("title1", data[0].postTitle)
        .replace(/link1/g, data[0].postUrl);
      output = output
        .replace("img2", notFound)
        .replace("title2", "")
        .replace(/link2/g, "");
      output = output
        .replace("img3", notFound)
        .replace("title3", "")
        .replace(/link3/g, "");
      $(".mmLoader").remove();
      $("#pCeetek").append(output);
    } else if (data.length % 3 === 2) {
      output = output
        .replace("img1", data[0].imageUrl)
        .replace("title1", data[0].postTitle)
        .replace(/link1/g, data[0].postUrl);
      output = output
        .replace("img2", data[1].imageUrl)
        .replace("title2", data[1].postTitle)
        .replace(/link2/g, data[1].postUrl);
      output = output
        .replace("img3", notFound)
        .replace("title3", "")
        .replace(/link3/g, "");
      $(".mmLoader").remove();
      $("#pCeetek").append(output);
    }
  }
} //END OF PAGEROW CALLBACK

//===============================================================CAROUSEL CALLBACK=======================================
function caroselCallback(json) {
  var html1 =
    '<div class="item"> <div class="imgdiv"> <a href="posturl"><img src="imageurl" alt=""></a> </div><div class="detailsdiv"> <div class="row clearb"> <div class="col-3 clearb"> <div id="dateContainer"> <div id="dateDay"> <p>mDay</p></div><div id="dateMonth"> <p>mMonth</p></div></div></div><div class="col-9 clearb"> <p>mTitle</p></div></div></div></div>';
  var final = "";

  for (var i = 0; i < json.feed.entry.length; i++) {
    for (var j = 0; j < json.feed.entry[i].link.length; j++) {
      if (json.feed.entry[i].link[j].rel == "alternate") {
        var postUrl = json.feed.entry[i].link[j].href;
        break;
      }
    }
    var postTitle = json.feed.entry[i].title.$t;
    postTitle = titleCase(postTitle);

    var postImage = json.feed.entry[i].media$thumbnail.url.replace(
      "s72-c/",
      "w520-h280-p/"
    );

    var p = json.feed.entry[i].published.$t;
    var S = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var x = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    var T = p.split("-")[2].substring(0, 2);
    var N = p.split("-")[1];
    var C = p.split("-")[0];
    for (var k = 0; k < S.length; k++) {
      if (parseInt(N) == S[k]) {
        N = x[k];
        break;
      }
    }

    final =
      final +
      html1
        .replace(/posturl/g, postUrl)
        .replace("imageurl", postImage)
        .replace("mTitle", postTitle)
        .replace("mMonth", N)
        .replace("mDay", T);
  }

  $(".mInner").html(final);

  ResCarouselSize();
  setUpInterval();
  //$('.leftLst').css('display', 'block')
  //$('.rightLst').css('display', 'block')

  $("#tempContainer").css("display", "none");
}

//=====================================================CAROUSEL STUFF===========================================
var robot = false;
var interval = null;
function setUpInterval() {
  interval = setInterval(() => {
    if ($(".rightLst").css("backgroundColor") === "rgb(204, 204, 204)") {
      robot = true;

      $(".leftLst").click();

      robot = false;
      return;
    }

    $(".rightLst").click();
  }, 2000);
}

$("#MultiCarousel").hover(
  function (event) {
    clearInterval(interval);
  },
  function (event) {
    setUpInterval();
  }
);

var itemsMainDiv = ".MultiCarousel";
var itemsDiv = ".MultiCarousel-inner";
var itemWidth = "";

// $(document).ready(function () {

$(".leftLst, .rightLst").click(function () {
  var condition = $(this).hasClass("leftLst");

  if (condition && robot) click(0, this, 9);
  else if (condition && !robot) click(0, this, 2);
  else click(1, this, 1);
});

$(window).resize(function () {
  // ResCarouselSize();
});

//this function define the size of the items
function ResCarouselSize() {
  var incno = 0;
  var dataItems = "data-items";
  var itemClass = ".item";
  var id = 0;
  var btnParentSb = "";
  var itemsSplit = "";
  var sampwidth = $(itemsMainDiv).width();
  var bodyWidth = $("body").width();
  $(itemsDiv).each(function () {
    id = id + 1;
    var itemNumbers = $(this).find(itemClass).length;
    btnParentSb = $(this).parent().attr(dataItems);
    itemsSplit = btnParentSb.split(",");
    $(this)
      .parent()
      .attr("id", "MultiCarousel" + id);

    if (bodyWidth >= 1200) {
      incno = itemsSplit[3];
      itemWidth = sampwidth / incno;
    } else if (bodyWidth >= 992) {
      incno = itemsSplit[2];
      itemWidth = sampwidth / incno;
    } else if (bodyWidth >= 768) {
      incno = itemsSplit[1];
      itemWidth = sampwidth / incno;
    } else if (bodyWidth >= 568 && bodyWidth <= 767) {
      itemWidth = sampwidth / 1;
    } else {
      incno = itemsSplit[0];
      itemWidth = sampwidth / incno;
    }
    $(this).css({
      transform: "translateX(0px)",
      width: itemWidth * itemNumbers,
    });
    $(this)
      .find(itemClass)
      .each(function () {
        $(this).outerWidth(itemWidth);
      });

    $(".leftLst").addClass("over");
    $(".rightLst").removeClass("over");
  });
}

//this function used to move the items
function ResCarousel(e, el, s) {
  var leftBtn = ".leftLst";
  var rightBtn = ".rightLst";
  var translateXval = "";
  var divStyle = $(el + " " + itemsDiv).css("transform");
  var values = divStyle.match(/-?[\d\.]+/g);
  var xds = Math.abs(values[4]);
  if (e == 0) {
    translateXval = parseInt(xds) - parseInt(itemWidth * s);
    $(el + " " + rightBtn).removeClass("over");

    if (translateXval <= itemWidth / 2) {
      translateXval = 0;
      $(el + " " + leftBtn).addClass("over");
    }
  } else if (e == 1) {
    var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
    translateXval = parseInt(xds) + parseInt(itemWidth * s);
    $(el + " " + leftBtn).removeClass("over");

    if (translateXval >= itemsCondition - itemWidth / 2) {
      translateXval = itemsCondition;
      $(el + " " + rightBtn).addClass("over");
    }
  }
  $(el + " " + itemsDiv).css(
    "transform",
    "translateX(" + -translateXval + "px)"
  );
}

//It is used to get some elements from btn
//It is used to get some elements from btn
function click(ell, ee, slide) {
  var Parent = "#" + $(ee).parent().attr("id");
  // var slide = $(Parent).attr("data-slide");

  ResCarousel(ell, Parent, slide);
}

//c + "/feeds/posts/default" + i + "?max-results=" + h.MaxPost + "&orderby=updated&alt=json-in-script"  "/s" +  h.ImageSize + "-p"

$(document).ready(function () {
  if (notMobile()) {
    FeaturedPost({
      blogURL: "https://dlhunt.xyz/",
      MaxPost: 3,
      idcontaint: "#featuredpost",
      ImageSize: 500,
      interval: 3000,
      autoplay: true,
      tagName: false,
    });
  }
});

function FeaturedPost(a) {
  (function (e) {
    var h = {
      blogURL: "",
      MaxPost: 5,
      idcontaint: "#featuredpost",
      ImageSize: 500,
      interval: 10000,
      autoplay: false,
      loadingClass: "loadingxx",
      pBlank:
        "http://3.bp.blogspot.com/-v45kaX-IHKo/VDgZxWv0xUI/AAAAAAAAHAo/QJQf8Dlh3xc/s1600/grey.gif",
      MonthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      tagName: false,
    };
    h = e.extend({}, h, a);
    var g = e(h.idcontaint);
    var c = h.blogURL;
    var d = h.MaxPost * 200;
    if (h.blogURL === "") {
      c = window.location.protocol + "//" + window.location.host;
    }
    g.html(
      '<div id="slides"><ul class="randomnya"></ul></div><div id="buttons"><a href="#" id="prevx" title="prev"></a><a href="#" id="nextx" title="next"></a></div>'
    ).addClass(h.loadingClass);
    var f = function (w) {
      var q,
        k,
        m,
        u,
        x,
        p,
        t,
        v,
        r,
        l = "",
        s = w.feed.entry;
      for (var o = 0; o < s.length; o++) {
        for (var n = 0; n < s[o].link.length; n++) {
          if (s[o].link[n].rel == "alternate") {
            q = s[o].link[n].href;
            break;
          }
        }
        if ("media$thumbnail" in s[o]) {
          u = s[o].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/w400-h250-p");
        } else {
          u = h.pBlank.replace(/\/s[0-9]+(\-c|\/)/, "/s" + h.ImageSize + "$1");
        }
        k = s[o].title.$t;
        r = s[o].published.$t.substring(0, 10);
        m = s[o].author[0].name.$t;
        x = r.substring(0, 4);
        p = r.substring(5, 7);
        t = r.substring(8, 10);
        v = h.MonthNames[parseInt(p, 10) - 1];
        l +=
          '<li><a  href="' +
          q +
          '" title="' +
          k +
          '"><div class="overlayx"></div><img class="random" src="' +
          u +
          '" title="' +
          k +
          '"><h4>' +
          k +
          '</h4></a><div class="label_text"><span class="date"><span class="dd">' +
          t +
          '</span> <span class="dm">' +
          v +
          '</span> <span class="dy">' +
          x +
          '</span></span> <span class="autname">' +
          m +
          "</span></div></li>";
      }
      e("ul", g).append(l);
    };
    var b = function () {
      var i = "/-/" + h.tagName;
      if (h.tagName === false) {
        i = "";
        $.getJSON(
          "https://dlhunt.xyz/feeds/posts/summary/-/Current?callback=?&max-results=1&alt=json",
          function (json) {
            let tTotal = json.feed.openSearch$totalResults.$t;
            e.ajax({
              url:
                "https://dlhunt.xyz/feeds/posts/default/-/Current?max-results=4&start-index=" +
                Math.ceil(Math.random() * (tTotal - 4)) +
                "&alt=json",
              success: f,
              dataType: "jsonp",
            });
          }
        );
      } else {
        $.getJSON(
          "https://dlhunt.xyz/feeds/posts/summary/-/Current?callback=?&max-results=1&alt=json",
          function (json) {
            let tTotal = json.feed.openSearch$totalResults.$t;
            e.ajax({
              url:
                "https://dlhunt.xyz/feeds/posts/default/-/Current?max-results=4&start-index=" +
                Math.ceil(Math.random() * (tTotal - 4)) +
                "&alt=json",
              success: f,
              dataType: "jsonp",
            });
          }
        );
      }
      (function () {
        setTimeout(function () {
          e("#prevx").click(function () {
            e("#slides li:first").before(e("#slides li:last"));
            return false;
          });
          e("#nextx").click(function () {
            e("#slides li:last").after(e("#slides li:first"));
            return false;
          });
          if (h.autoplay) {
            var k = h.interval;
            var l = setInterval("rotate()", k);
            e("#slides li:first").before(e("#slides li:last"));
            e("#slides").hover(
              function () {
                clearInterval(l);
              },
              function () {
                l = setInterval("rotate()", k);
              }
            );

            function j() {
              e("#nextx").click();
            }
          }
          g.removeClass(h.loadingClass);
        }, d);
      })();
    };
    e(document).ready(b);
  })(jQuery);
}

function rotate() {
  $("#nextx").click();
}
document.write("");

$("input").keypress(function (event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    let x = $(this).val();
    if (x !== "") {
      x = x.replace(/ /g, ",");
      window.location.href = "//dlhunt.xyz/search?q=title:" + x;
    }
  }
});
var yob = $(".comment-replybox-thread")
  .closest(".comment-thread")
  .parent("div")
  .children(".comment-thread")
  .children(".comment-replybox-thread");
$(".comment-thread ol").before($(yob));

setTimeout(function () {
  var viewheight = $(window).height();
  var viewwidth = $(window).width();
  var viewport = $("meta[name=viewport]");
  viewport.attr(
    "content",
    "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0"
  );
}, 300);
