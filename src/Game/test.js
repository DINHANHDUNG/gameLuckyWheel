import React, { useState } from "react";
import Winwheel from "winwheel";
import tick from "../assets/audio/tick.mp3";
function Test() {
  const [setUpLucky, setSetUpLucky] = useState({
    duration: 5, // Thời gian kết thúc vòng quay
    spins: 3, //Quay nhanh hay chậm 3, 8, 15
    numSegments: 8, // Chia 8 phần bằng nhau (Chia số phần mong muốn)
    rotationAngle: 0, // Đặt góc vòng quay từ 0 đến 360 độ.
    audio: "http://streaming.tdiradio.com:8000/house.mp3", //Link âm thanh
    textFontSize: 18, //font size
    listPrize: [
      { fillStyle: getColor(), text: "Giải 1" },
      { fillStyle: getColor(), text: "Giải 2" },
      { fillStyle: getColor(), text: "Giải 3" },
      { fillStyle: getColor(), text: "Giải 4" },
      { fillStyle: getColor(), text: "Giải 5" },
      { fillStyle: getColor(), text: "Giải 6" },
      { fillStyle: getColor(), text: "Giải 7" },
      { fillStyle: getColor(), text: "Giải 8" },
    ],
  });

  //Thông số vòng quay
  // let duration = 5; //Thời gian kết thúc vòng quay
  // let spins = 3; //Quay nhanh hay chậm 3, 8, 15
  let theWheel = new Winwheel({
    numSegments: setUpLucky.numSegments, // Chia 8 phần bằng nhau
    outerRadius: 210, // Đặt bán kính vòng quay mặc định để 212
    textFontSize: setUpLucky.textFontSize, // Đặt kích thước chữ
    rotationAngle: setUpLucky.rotationAngle, // Đặt góc vòng quay từ 0 đến 360 độ.
    // Các thành phần bao gồm màu sắc và văn bản.
    segments: setUpLucky.listPrize, // Danh sách 
    animation: {
      type: "spinOngoing",
      duration: setUpLucky.duration,
      spins: setUpLucky.spins,
      callbackSound: playSound, //Hàm gọi âm thanh khi quay
      soundTrigger: "pin", //Chỉ định chân là để kích hoạt âm thanh
      callbackFinished: alertPrize, //Hàm hiển thị kết quả trúng giải thưởng
    },
    pins: {
      number: 0, //Số lượng chân. Chia đều xung quanh vòng quay.
    },
  });

  //Kiểm tra vòng quay
  let wheelSpinning = false;

  //Tạo âm thanh và tải tập tin tick.mp3.
  let audio = new Audio(tick);
  function playSound() {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  //startSpin
  function startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false) {
      //Cấu hình vòng quay
      theWheel.animation = {
        type: "spinOngoing",
        duration: setUpLucky.duration,
        spins: setUpLucky.spins,
        callbackSound: playSound, //Hàm gọi âm thanh khi quay
        soundTrigger: "pin", //Chỉ định chân là để kích hoạt âm thanh
        callbackFinished: alertPrize, //Hàm hiển thị kết quả trúng giải thưởng
      };

      //Hàm bắt đầu quay
      theWheel.startAnimation();
    }
  }

  //stopSpin
  function stopSpin(number) {
    if (wheelSpinning == false) {
      theWheel.animation = {
        type: "spinToStop",
        duration: setUpLucky.duration + 13,
        spins: setUpLucky.spins + 1,
        callbackSound: playSound, //Hàm gọi âm thanh khi quay
        soundTrigger: "pin", //Chỉ định chân là để kích hoạt âm thanh
        callbackFinished: alertPrize, //Hàm hiển thị kết quả trúng giải thưởng
      };

      //Ta có: 360 độ chia 8 bằng 45 độ cho mỗi giải thưởng.
      //VD: Giải 3 => Có gốc độ từ 91 đến 135.

      //Lấy 360 chia số cột lấy độ mỗi giải => bằng x
      let start = (360 / setUpLucky.numSegments) * (number - 1) + 1; // x nhân số giải + 1
      let stop = Math.floor(
        Math.random() * ((360 / setUpLucky.numSegments) * (number - 1) - 1)
      ); //Giá trị cao nhất 44  //Giá trị truyền vào x nhân số giải -1
      console.log(stop);
      let stopAt = start + stop;
      theWheel.animation.stopAngle = stopAt;

      //Hàm bắt đầu quay
      theWheel.startAnimation();

      //Khóa vòng quay
      wheelSpinning = true;
    }
  }

  //Result
  function alertPrize(indicatedSegment) {
    console.log(indicatedSegment);

    alert("Chúc mừng bạn trúng: " + indicatedSegment.text);
  }

  //resetWheel
  function resetWheel() {
    theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    theWheel.draw(); // Call draw to render changes to the wheel.

    wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
  }

  function getColor() {
    // randomly generate rbg values for wheel sectors
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  }
  return (
    <div className="">
      <button id="spin_start" className="btn" onClick={() => startSpin()}>
        Quay ngay
      </button>
      <button id="spin_stop" className="btn" onClick={() => stopSpin(2)}>
        Dừng lại
      </button>
      <button id="spin_reset" className="btn" onClick={() => resetWheel()}>
        Quay lại
      </button>
      <div className="container">
        <canvas id="canvas" width="800" height="800">
          <p style={{ color: "#fff", textAlign: "center" }}>
            Sorry, your browser doesn't support canvas. Please try another.
          </p>
        </canvas>
      </div>
      
     
    </div>
  );
}

export default Test;
