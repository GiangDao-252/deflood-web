// src/mockData.js

// --- HÀM TRỢ GIÚP ---
// Nhiệm vụ: Lấy một FeatureCollection "thô" từ Overpass
// và "trang điểm" (transform) nó thành dữ liệu app của chúng ta cần.
function transformRawData(rawData, roadName, riskLevel) {
    const riskMap = {
      "Nang": { displayName: "Nguy cơ Ngập nặng" },
      "Vua": { displayName: "Nguy cơ Ngập vừa" },
      "AnToan": { displayName: "An toàn" }
    };
  
    // Lặp qua từng feature "thô" và biến đổi nó
    return rawData.features.map(feature => {
      // Chỉ lấy LineString, bỏ qua các feature "Node" (Point)
      if (feature.geometry.type === "LineString") {
        return {
          type: "Feature",
          geometry: feature.geometry, // Lấy lại geometry "thật"
          properties: {
            source: "ai_forecast",
            road_name: roadName,
            model_forecast: {
              risk_level: riskLevel,
              display_name: riskMap[riskLevel].displayName
            }
          }
        };
      }
      return null; // Bỏ qua các feature không phải LineString
    }).filter(Boolean); // Lọc bỏ các giá trị null
  }
  
  // --- DỮ LIỆU THÔ TỪ BẠN CUNG CẤP ---
  
  // 1. Dữ liệu thô Đường Giải Phóng
  const giaiPhongRawData = {
    "type": "FeatureCollection",
    "features": [
      { "type": "Feature", "properties": { "@id": "way/37370971", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8412431, 21.0041897 ], [ 105.841233, 21.0034052 ], [ 105.8412322, 21.0033436 ], [ 105.8412283, 21.0030394 ], [ 105.8412244, 21.0019229 ], [ 105.8412279, 21.0017416 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/37370973", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414307, 21.0017139 ], [ 105.8414337, 21.0018029 ], [ 105.8414363, 21.0018743 ], [ 105.8414391, 21.002074 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/37370975", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410732, 20.9941402 ], [ 105.841064, 20.9935173 ], [ 105.8410459, 20.9922942 ], [ 105.8410443, 20.9921822 ], [ 105.8410438, 20.9919552 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/37371053", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8408217, 20.9769732 ], [ 105.8408195, 20.9768351 ], [ 105.8408151, 20.9765574 ], [ 105.840797, 20.975246 ], [ 105.8407721, 20.9733896 ], [ 105.8407706, 20.9732833 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/37371055", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8412898, 20.9919597 ], [ 105.8412944, 20.9921927 ], [ 105.8413039, 20.992843 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/37371466", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8421078, 20.9663078 ], [ 105.8420983, 20.966859 ], [ 105.842069, 20.967468 ], [ 105.8420401, 20.9677054 ], [ 105.8420046, 20.9679964 ], [ 105.841981, 20.9681792 ], [ 105.8419407, 20.9684214 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/180088217", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8609484, 20.8847582 ], [ 105.8610845, 20.8840889 ], [ 105.8614386, 20.8824166 ], [ 105.8614872, 20.8821869 ], [ 105.8614978, 20.8821367 ], [ 105.8615953, 20.8816855 ], [ 105.8617624, 20.8808742 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/465069895", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8409289, 20.9960477 ], [ 105.8409248, 20.9955841 ], [ 105.8409207, 20.9950765 ], [ 105.8409162, 20.9948901 ], [ 105.8409085, 20.9945756 ], [ 105.8409087, 20.9943954 ], [ 105.8409065, 20.993695 ], [ 105.8409065, 20.9936812 ], [ 105.8409029, 20.9935213 ], [ 105.8408981, 20.9933145 ], [ 105.8408932, 20.9931821 ], [ 105.8408945, 20.9929439 ], [ 105.8408964, 20.9926618 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/593642478", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410428, 21.0063309 ], [ 105.8411375, 21.0063246 ], [ 105.8411847, 21.0063248 ], [ 105.8412184, 21.0063239 ], [ 105.8413094, 21.0063215 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/597550109", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.84123, 21.0008729 ], [ 105.8412002, 21.0000593 ], [ 105.8411762, 20.9991422 ], [ 105.8411489, 20.99853 ], [ 105.8411437, 20.998282 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/597550117", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.841331, 20.9945937 ], [ 105.8413397, 20.9949215 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/601455488", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414823, 21.0075347 ], [ 105.8414691, 21.0078117 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/601455489", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8412933, 21.0078352 ], [ 105.8413008, 21.0075596 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/601861003", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411402, 21.0067491 ], [ 105.8411375, 21.0063246 ], [ 105.8411396, 21.0057352 ], [ 105.8411399, 21.0056436 ], [ 105.8411038, 21.0051611 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/613324910", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411972, 20.9855627 ], [ 105.8412101, 20.9864429 ], [ 105.8412128, 20.9866272 ], [ 105.8412143, 20.9867302 ], [ 105.8412174, 20.9869383 ], [ 105.8412228, 20.9873082 ], [ 105.8412277, 20.9876414 ], [ 105.8412329, 20.9879976 ], [ 105.8412336, 20.9880464 ], [ 105.8412388, 20.9883997 ], [ 105.8412558, 20.9895631 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/635124756", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8412464, 20.9702448 ], [ 105.8412925, 20.9700864 ], [ 105.84139, 20.9697516 ], [ 105.8417396, 20.9683925 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/693286037", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411018, 20.9960322 ], [ 105.841088, 20.9951327 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/702919609", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8415156, 21.0071533 ], [ 105.8414962, 21.0073698 ], [ 105.8414876, 21.0074796 ], [ 105.8414823, 21.0075347 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/703496254", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410708, 20.9764996 ], [ 105.8410721, 20.976563 ], [ 105.841075, 20.9767696 ], [ 105.8410761, 20.9768448 ], [ 105.8410779, 20.9769705 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/703496255", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410779, 20.9769705 ], [ 105.8410807, 20.977167 ], [ 105.8410984, 20.978416 ], [ 105.8411009, 20.9785935 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/704595016", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.841088, 20.9951327 ], [ 105.8410825, 20.9947723 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/704595021", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410825, 20.9947723 ], [ 105.8410732, 20.9941402 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/704595023", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8413228, 20.9941369 ], [ 105.841331, 20.9945937 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705782098", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410322, 20.9913637 ], [ 105.8410246, 20.9908537 ], [ 105.8410088, 20.9897788 ], [ 105.8410057, 20.9895689 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705792271", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8409269, 20.984135 ], [ 105.8409238, 20.983832 ], [ 105.8409232, 20.9837736 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705792272", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.840944, 20.9853981 ], [ 105.8409305, 20.9844793 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705794058", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8412558, 20.9895631 ], [ 105.841259, 20.9897768 ], [ 105.8412618, 20.989968 ], [ 105.8412632, 20.9900655 ], [ 105.8412768, 20.9909933 ], [ 105.841282, 20.9913488 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705794060", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8409665, 20.9869198 ], [ 105.8409636, 20.9867213 ], [ 105.8409577, 20.9863199 ], [ 105.8409549, 20.9861322 ], [ 105.840944, 20.9853981 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705794061", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411339, 20.9809074 ], [ 105.8411476, 20.9818713 ], [ 105.8411573, 20.9825716 ], [ 105.8411614, 20.9828954 ], [ 105.8411644, 20.9831326 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705801769", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.842113, 20.9659006 ], [ 105.8421115, 20.966029 ], [ 105.8421078, 20.9663078 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705812469", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8408296, 20.9774657 ], [ 105.8408262, 20.9772537 ], [ 105.8408248, 20.9771671 ], [ 105.8408217, 20.9769732 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705812470", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8408477, 20.9785941 ], [ 105.8408467, 20.9785328 ], [ 105.8408296, 20.9774657 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705812473", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411009, 20.9785935 ], [ 105.8411124, 20.9793966 ], [ 105.8411132, 20.9794509 ], [ 105.8411146, 20.9795528 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705812474", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.840922, 20.9835456 ], [ 105.840921, 20.983506 ], [ 105.840915, 20.9830084 ], [ 105.8408857, 20.9809659 ], [ 105.8408848, 20.9809101 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705814526", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410073, 20.9732674 ], [ 105.8410089, 20.9733756 ], [ 105.8410203, 20.9739793 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705814527", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410203, 20.9739793 ], [ 105.8410339, 20.9747029 ], [ 105.8410413, 20.9750724 ], [ 105.8410478, 20.9753862 ], [ 105.8410608, 20.976019 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705815858", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410056, 20.9728764 ], [ 105.8410073, 20.9732674 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/705841392", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8418602, 20.9668044 ], [ 105.841851, 20.9660257 ], [ 105.8418528, 20.9659007 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/706480072", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410608, 20.976019 ], [ 105.8410708, 20.9764996 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/706480073", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.841643, 20.9696686 ], [ 105.841514, 20.9701468 ], [ 105.8414775, 20.9702765 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/706502080", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411644, 20.9831326 ], [ 105.8411655, 20.9832246 ], [ 105.8411691, 20.983505 ], [ 105.8411685, 20.9835443 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/706502081", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8409232, 20.9837736 ], [ 105.840922, 20.9835456 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/706503526", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411685, 20.9835443 ], [ 105.8411703, 20.9837736 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/708920948", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411411, 20.9981531 ], [ 105.8411369, 20.9979543 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/708920949", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411369, 20.9979543 ], [ 105.8411346, 20.9978418 ], [ 105.8411312, 20.9976784 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/708920950", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411167, 20.9970042 ], [ 105.8411155, 20.9969216 ], [ 105.8411018, 20.9960322 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/708964306", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8412209, 21.0013757 ], [ 105.84123, 21.0008729 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/708964307", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8412279, 21.0017416 ], [ 105.8412209, 21.0013757 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/708964308", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414235, 21.0015349 ], [ 105.8414307, 21.0017139 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/709260530", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411312, 20.9976784 ], [ 105.8411265, 20.9974546 ], [ 105.8411167, 20.9970042 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/711379740", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411437, 20.998282 ], [ 105.8411411, 20.9981531 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/711379742", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8412795, 21.004697 ], [ 105.8412682, 21.004432 ], [ 105.8412431, 21.0041897 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/711379743", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8413254, 21.007045 ], [ 105.8413234, 21.0069589 ], [ 105.8413094, 21.0063215 ], [ 105.8412936, 21.0053544 ], [ 105.8412837, 21.005163 ], [ 105.8412795, 21.004697 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/809463692", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8407886, 20.9722154 ], [ 105.8408181, 20.9719027 ], [ 105.8408913, 20.9715155 ], [ 105.8410512, 20.9709157 ], [ 105.841202, 20.9703975 ], [ 105.8412464, 20.9702448 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/821757223", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414775, 20.9702765 ], [ 105.8414266, 20.9704579 ], [ 105.8411968, 20.9712607 ], [ 105.841111, 20.9715504 ], [ 105.8410341, 20.9719328 ], [ 105.8410037, 20.972447 ], [ 105.8410056, 20.9728764 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/838425490", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414391, 21.002074 ], [ 105.8414459, 21.0030349 ], [ 105.8414534, 21.0035472 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/838425491", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414534, 21.0035472 ], [ 105.8414763, 21.0044271 ], [ 105.8414856, 21.0045406 ], [ 105.841507, 21.0051027 ], [ 105.8415181, 21.0053534 ], [ 105.8415156, 21.0071533 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/875229047", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414178, 21.0008354 ], [ 105.8414184, 21.0012303 ], [ 105.8414235, 21.0015349 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/926182259", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.840982, 20.9879692 ], [ 105.8409761, 20.9875661 ], [ 105.8409665, 20.9869198 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/945322271", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411146, 20.9795528 ], [ 105.8411169, 20.9797132 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/945322273", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411169, 20.9797132 ], [ 105.8411186, 20.9798332 ], [ 105.841132, 20.9807775 ], [ 105.8411326, 20.9808166 ], [ 105.8411333, 20.9808627 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/946030658", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414363, 20.9983731 ], [ 105.8414516, 20.9997724 ], [ 105.8414552, 21.0001077 ], [ 105.8414566, 21.0002473 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/952211062", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8413039, 20.992843 ], [ 105.8413228, 20.9941369 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/954882982", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8419407, 20.9684214 ], [ 105.8418851, 20.9686541 ], [ 105.8418251, 20.9689057 ], [ 105.8417777, 20.969104 ], [ 105.841643, 20.9696686 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/954882983", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8417396, 20.9683925 ], [ 105.841806, 20.967956 ], [ 105.8418588, 20.9674726 ], [ 105.8418602, 20.9668044 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/957062224", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410057, 20.9895689 ], [ 105.841002, 20.9893201 ], [ 105.840982, 20.9879692 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/961664403", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8413897, 20.9968235 ], [ 105.8414078, 20.9969135 ], [ 105.8414252, 20.9970002 ], [ 105.841429, 20.9974566 ], [ 105.8414266, 20.9976032 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/962177672", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8413008, 21.0075596 ], [ 105.8413113, 21.0074212 ], [ 105.8413254, 21.007045 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1031913853", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414328, 20.9978798 ], [ 105.8414338, 20.9981454 ], [ 105.8414352, 20.9982681 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1031913855", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414266, 20.9976032 ], [ 105.8414328, 20.9978798 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1058963343", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414352, 20.9982681 ], [ 105.8414363, 20.9983731 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1258466935", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411813, 20.9844792 ], [ 105.8411874, 20.9848947 ], [ 105.8411972, 20.9855627 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1262815037", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8412856, 20.9915971 ], [ 105.8412868, 20.9916744 ], [ 105.8412901, 20.9919008 ], [ 105.8412898, 20.9919597 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1290402078", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8413677, 20.9959883 ], [ 105.8413721, 20.996156 ], [ 105.8413897, 20.9968235 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1298906827", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8408841, 20.9808684 ], [ 105.8408834, 20.9808223 ], [ 105.8408675, 20.9798331 ], [ 105.8408656, 20.9797106 ], [ 105.8408633, 20.9795653 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1300236736", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411333, 20.9808627 ], [ 105.8411339, 20.9809074 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1300236737", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8408848, 20.9809101 ], [ 105.8408841, 20.9808684 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1301686342", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8407706, 20.9732833 ], [ 105.8407679, 20.9724342 ], [ 105.8407886, 20.9722154 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1335334254", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8413234, 21.0069589 ], [ 105.8412331, 21.006961 ], [ 105.8411878, 21.0069615 ], [ 105.8411458, 21.0069654 ], [ 105.8411402, 21.0067491 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1335894078", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410428, 21.0063309 ], [ 105.8410382, 21.0061558 ], [ 105.8410141, 21.005828 ], [ 105.8410033, 21.0057736 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1335894080", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411025, 21.0051215 ], [ 105.8410991, 21.0048429 ], [ 105.8410983, 21.0047824 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1339713739", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8410438, 20.9919552 ], [ 105.8410398, 20.9918787 ], [ 105.8410366, 20.9916617 ], [ 105.8410355, 20.991593 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1359074553", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8414566, 21.0002473 ], [ 105.8414576, 21.0003542 ], [ 105.8414582, 21.0004187 ], [ 105.8414178, 21.0008354 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1374079589", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411753, 20.9840913 ], [ 105.8411773, 20.9842186 ], [ 105.8411813, 20.9844792 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1374079590", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8409305, 20.9844793 ], [ 105.8409269, 20.984135 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1377422706", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8411703, 20.9837736 ], [ 105.8411713, 20.9838332 ], [ 105.8411727, 20.9839243 ], [ 105.8411753, 20.9840913 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1390293016", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8408633, 20.9795653 ], [ 105.8408615, 20.9794564 ], [ 105.8408477, 20.9785941 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1394481070", "name": "Đường Giải Phóng" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8409257, 20.9925846 ], [ 105.8409246, 20.9922865 ], [ 105.8409088, 20.9916683 ] ] } }
    ]
  };
  
  // 2. Dữ liệu thô Phố Xã Đàn
  const xaDanRawData = {
    "type": "FeatureCollection",
    "features": [
      { "type": "Feature", "properties": { "@id": "way/36869877", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8309465, 21.0170993 ], [ 105.8314786, 21.0166584 ], [ 105.8318303, 21.0163883 ], [ 105.8320175, 21.0162305 ], [ 105.8321379, 21.0161283 ], [ 105.8322001, 21.0160802 ], [ 105.832419, 21.015867 ], [ 105.8332616, 21.015008 ], [ 105.8333758, 21.0148912 ], [ 105.8337813, 21.0144608 ], [ 105.833905, 21.0143339 ], [ 105.834042, 21.014199 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/136556857", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8380906, 21.0096135 ], [ 105.8381595, 21.0094658 ], [ 105.8386416, 21.0089445 ], [ 105.8390015, 21.0086192 ], [ 105.8392555, 21.0083914 ], [ 105.839558, 21.0081797 ], [ 105.8399115, 21.0079687 ], [ 105.8402267, 21.0078235 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/136557832", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8369661, 21.011103 ], [ 105.8370646, 21.0109782 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/136557833", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8372067, 21.0107817 ], [ 105.8375159, 21.0103383 ], [ 105.8378683, 21.0098708 ], [ 105.8379433, 21.009784 ], [ 105.8380906, 21.0096135 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/399835468", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8412933, 21.0078352 ], [ 105.8412125, 21.0078503 ], [ 105.8411087, 21.0078641 ], [ 105.8410951, 21.0078682 ], [ 105.8407498, 21.0079405 ], [ 105.8406822, 21.0079547 ], [ 105.8406465, 21.0079677 ], [ 105.8403539, 21.0080749 ], [ 105.8400604, 21.008206 ], [ 105.8397249, 21.0084037 ], [ 105.8394551, 21.0085968 ], [ 105.8391931, 21.008832 ], [ 105.8388546, 21.0091303 ], [ 105.8385642, 21.0094227 ], [ 105.8383468, 21.0096418 ], [ 105.8381811, 21.0097637 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/402400378", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8341558, 21.0143481 ], [ 105.8340508, 21.0144632 ], [ 105.8334204, 21.0151197 ], [ 105.8331819, 21.0153575 ], [ 105.833037, 21.0155152 ], [ 105.8327388, 21.0158243 ], [ 105.8325925, 21.0159624 ], [ 105.832326, 21.0162084 ], [ 105.8320996, 21.0164023 ], [ 105.831832, 21.0166199 ], [ 105.8317099, 21.0167207 ], [ 105.8310576, 21.0172221 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/570572175", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8295223, 21.0177471 ], [ 105.8297967, 21.0177679 ], [ 105.8298747, 21.0177707 ], [ 105.8300672, 21.0177227 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/599146719", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8298683, 21.018268 ], [ 105.8296676, 21.0184915 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/702919616", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8362072, 21.0119062 ], [ 105.8363376, 21.0117753 ], [ 105.8365327, 21.0115611 ], [ 105.83665, 21.0114342 ], [ 105.8367718, 21.0113025 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/710298223", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8294809, 21.0182565 ], [ 105.8296877, 21.0179964 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/710307672", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8310576, 21.0172221 ], [ 105.8309379, 21.0173242 ], [ 105.8305145, 21.0176889 ], [ 105.8303433, 21.0178598 ], [ 105.8301743, 21.0180171 ], [ 105.8301196, 21.0180675 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/711052546", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8376269, 21.0104747 ], [ 105.8372517, 21.0110114 ], [ 105.8371689, 21.011114 ], [ 105.8370685, 21.0112582 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/711064567", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8370646, 21.0109782 ], [ 105.8372067, 21.0107817 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/945322256", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.834042, 21.014199 ], [ 105.834118, 21.0141169 ], [ 105.8341953, 21.0140257 ], [ 105.835217, 21.0129411 ], [ 105.835348, 21.0127992 ], [ 105.8355081, 21.012629 ], [ 105.8356217, 21.0125153 ], [ 105.8362072, 21.0119062 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/945322275", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8370685, 21.0112582 ], [ 105.8370016, 21.0113336 ], [ 105.8368332, 21.0115174 ], [ 105.8363468, 21.0120401 ], [ 105.8361373, 21.0122536 ], [ 105.8357509, 21.0126284 ], [ 105.835524, 21.0128828 ], [ 105.8342566, 21.0142381 ], [ 105.8341558, 21.0143481 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/947077276", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8407052, 21.0076693 ], [ 105.8410389, 21.0076004 ], [ 105.8410955, 21.0075925 ], [ 105.8412097, 21.007575 ], [ 105.8413008, 21.0075596 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/962177669", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8367718, 21.0113025 ], [ 105.8368974, 21.0111798 ], [ 105.8369661, 21.011103 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/962177671", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8402267, 21.0078235 ], [ 105.8402977, 21.0077973 ], [ 105.8405904, 21.0077022 ], [ 105.8407052, 21.0076693 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/964868047", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8296877, 21.0179964 ], [ 105.8297498, 21.0179182 ], [ 105.8300672, 21.0177227 ], [ 105.8302412, 21.0176313 ], [ 105.8305331, 21.0174167 ], [ 105.8307596, 21.0172329 ], [ 105.8307775, 21.0172186 ], [ 105.8309465, 21.0170993 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1333362366", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8381811, 21.0097637 ], [ 105.8378157, 21.0102091 ], [ 105.8376269, 21.0104747 ] ] } },
      { "type": "Feature", "properties": { "@id": "way/1392245988", "name": "Phố Xã Đàn" }, "geometry": { "type": "LineString", "coordinates": [ [ 105.8301196, 21.0180675 ], [ 105.8299825, 21.0181766 ], [ 105.8299006, 21.0182444 ], [ 105.8298683, 21.018268 ] ] } }
    ]
  };
  
  // --- BIẾN ĐỔI DỮ LIỆU ---
  
  const giaiPhongFeatures = transformRawData(giaiPhongRawData, "Đường Giải Phóng", "Nang");
  const xaDanFeatures = transformRawData(xaDanRawData, "Phố Xã Đàn", "Vua");
  
  // --- TẠO CÁC ĐIỂM BÁO CÁO CỘNG ĐỒNG ---
  const crowdFeatures = [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [105.8410, 20.9945] }, // Trên đường Giải Phóng
      "properties": {
        "source": "user_report",
        "level": "Nang",
        "timestamp": "2025-11-08T22:50:00Z"
      }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [105.8400, 21.0080] }, // Trên phố Xã Đàn
      "properties": {
        "source": "user_report",
        "level": "Vua",
        "timestamp": "2025-11-08T22:52:00Z"
      }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [105.8414, 20.9750] }, // Trên đường Giải Phóng
      "properties": {
        "source": "user_report",
        "level": "Nang",
        "timestamp": "2025-11-08T22:53:00Z"
      }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [105.8320, 21.0163] }, // Trên phố Xã Đàn
      "properties": {
        "source": "user_report",
        "level": "AnToan", // Một điểm báo an toàn
        "timestamp": "2025-11-08T22:54:00Z"
      }
    }
  ];
  
  
  // --- EXPORT DỮ LIỆU CUỐI CÙNG ---
  
  export const mockData = {
    type: "FeatureCollection",
    metadata: {
      timestamp: "2025-11-08T23:00:00Z",
      forecast_valid_for: "2025-11-08T23:15:00Z"
    },
    // Gộp tất cả các feature đã biến đổi và các điểm báo cáo lại
    features: [
      ...giaiPhongFeatures,
      ...xaDanFeatures,
      ...crowdFeatures
    ]
  };