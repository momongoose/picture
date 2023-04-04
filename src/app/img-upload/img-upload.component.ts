import { Component, OnInit } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';
import * as fs from 'fs';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css'],
})
export class ImgUploadComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  // OnClick of button Upload
  fileName = '';
  pre1 = "";
  pre2 = "";
  pre3 = "";
  url: any;
  calculating:boolean = false
  async onFileSelected(event: any) {
    this.calculating = true
    const file: any = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.onerror = (event: any) => {
        console.log('File could not be read: ' + event.target.error.code);
      };

      reader.readAsDataURL(event.target.files[0]);

      var imga: any = document.getElementById('img');

      // Load the model.
      mobilenet.load().then((model) => {
        // Classify the image.
        model.classify(imga).then((predictions : any) => {
          this.pre1 = ""
          this.pre2 = ""
          this.pre3 = ""
          this.pre1 = this.pre1 + "prediction: " + predictions[0].className + " | probability: " + (predictions[0].probability.toFixed(4) * 100).toString() + "%"
          this.pre2 = this.pre2 + "prediction: " + predictions[1].className + " | probability: " + (predictions[1].probability.toFixed(4) * 100).toString() + "%"
          this.pre3 = this.pre3 + "prediction: " + predictions[2].className + " | probability: " + (predictions[2].probability.toFixed(4) * 100).toString() + "%"
          this.calculating = false
        });
      });
    }
  }
}
