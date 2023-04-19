import { Component } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: any;
  chart: any;
  test: Array<{ x: Date; y: number }> = [];
  chartOptions = {
    theme: 'light2',
    animationEnabled: false,
    zoomEnabled: true,
    title: {
      text: 'Predicted Graph',
    },
    data: [
      {
        type: 'line',
        xValueFormatString: 'YYYY',
        yValueFormatString: '$#,###.##',
        dataPoints: this.test
		
      },
    ],
  };
  file: any;
  number: number = 0;
  dropdownOptions = ['Month', 'Week', 'Year'];
  selectedOption!: string;
  constructor(private uploadService: UploadService) {}
  onFilechange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }
  onSubmit(event: any) {
    this.number = event.target.value;
  }
  onDropdownChange() {
    this.selectedOption;
  }

  upload() {
    if (this.file) {
      this.uploadService
        .uploadfile(this.file, this.number, this.selectedOption)
        .subscribe((data) => {
          this.data = data;
          this.data.forEach((e: { ds: any; yhat: any }) => {
            this.test.push({
              x: new Date(e.ds),
              y: e.yhat,
            });
          });

          this.chartOptions = {
            theme: 'light1',
            animationEnabled: true,
            zoomEnabled: true,
            title: {
              text: 'Predicted Graph',
            },
            data: [
              {
                type: 'line',
                xValueFormatString: 'YYYY',
                yValueFormatString: '$#,###.##',
                dataPoints: this.test,
              },
            ],
          };

        });
        this.test=[]
    } else {
      alert('Please select a file first');
    }
  }
  
}
