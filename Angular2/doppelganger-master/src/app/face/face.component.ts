import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaceService } from './face.service';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css']
})
export class FaceComponent implements OnInit {
  form: FormGroup;
  picture: any;
  doppelganger;
  background = 'https://doppelgangerapi813c.blob.core.windows.net/images/background.jpg';

  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private faceService: FaceService, private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      avatar: null
    });
  }

  ngOnInit() {}

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.picture = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    this.faceService.getTags(this.form.get('avatar').value).subscribe(data => {
      const probability = Math.round(data.Predictions[0].Probability * 100);
      this.doppelganger = `You look ${probability}% like ${
        data.Predictions[0].Tag
      }`;
    });
  }

  clearFile() {
    this.fileInput.nativeElement.value = '';
    this.form.get('avatar').setValue(null);
    this.picture = null;
    this.doppelganger = null;
  }
}
