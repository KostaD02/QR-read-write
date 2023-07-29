import { Component, HostListener, OnInit } from '@angular/core';
import QRCode from 'easyqrcodejs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public showRead: boolean = true;
  public userAgreed: boolean = false;
  public scanResult: string = "";
  public isHttp: boolean = false;

  private options = {
    text: "https://konstantinedatunishvili.com/",
    logo: "../../../assets/images/logo_500x500.png",
    width: 320,
    height: 320,
    colorDark: '#0a192f',
    quietZone: 20,
    logoWidth: 64,
    logoHeight: 64,
    quietZoneColor: 'transparent',
    logoBackgroundTransparent: false,
  };

  @HostListener('window:resize') resize() {
    const codePart = document.getElementById("codePart") as HTMLElement;
    if (codePart) {
      if (codePart.offsetWidth <= 380) {
        this.options.width = codePart.offsetWidth - 55;
        this.options.height = codePart.offsetWidth - 55;
        this.updateQRCode();
      } else {
        this.options.width = 320;
        this.options.height = 320;
      }
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('user_agreed_camera')) {
      this.userAgreed = true;
    }
  }

  updateResult() {
    this.showRead = !this.showRead;
    if (!this.showRead) {
      setTimeout(() => {
        this.resize();
        this.updateQRCode();
      }, 100);
    }
  }

  onCodeResult(result: string) {
    this.scanResult = result;
    this.isHttp = /\b(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*/.test(result);
  }

  givePermission() {
    navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then(() => {
      this.userAgreed = true;
      localStorage.setItem('user_agreed_camera', 'yes');
    })
    .catch(() => {
      this.userAgreed = false;
    });
  }

  onChange(data: KeyboardEvent) {
    const target = data.target as HTMLInputElement;
    this.options.text = target.value;

    if (this.options.logo === "../../../assets/images/logo_500x500.png") {
      this.options.logo = "";
    }

    if (target.value === " " || target.value === "") {
      this.options.text = "https://konstantinedatunishvili.com/";
      this.options.logo = "../../../assets/images/logo_500x500.png";
    }
    this.updateQRCode();
  }

  onImageChange(event: Event) {
    const fileReader = new FileReader();
    const target = event.target as HTMLInputElement;
    if (target.files) {
      fileReader.readAsDataURL(target.files[0]);
      fileReader.onload = () => {
        this.options.logo = fileReader.result as string;
        this.updateQRCode();
      }
    }
  }

  downloadQrCode() {
    const canvasImage = ((document.getElementById("qrCodeDisplay") as HTMLElement).children[0] as HTMLCanvasElement).toDataURL(
      'image/png',
      1.0
    );
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response);
      a.download = `generated_qr_code.png`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    xhr.open('GET', canvasImage);
    xhr.send();
  }

  updateQRCode() {
    const qrCodeDisplay = document.getElementById("qrCodeDisplay") as HTMLElement;
    try {
      qrCodeDisplay.innerHTML = "";
      new QRCode(qrCodeDisplay, this.options);
    } catch(err) {
      console.log(err);
    }
  }
}
