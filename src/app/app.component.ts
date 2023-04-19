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
        dataPoints: [
          {}
        ],
		
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

  async upload() {
    if (this.file) {
		
		
		this.test=[]
      this.uploadService
        .uploadfile(this.file, this.number, this.selectedOption)
        .subscribe((data) => {
          this.data = data;
          console.log(data);

          this.data.forEach((e: { ds: any; yhat: any }) => {

            this.test.push({
              x: new Date(e.ds),
              y: e.yhat,
            });
          });
          console.log(this.test);

          this.chartOptions = {
            theme: 'light2',
            animationEnabled: true,
            zoomEnabled: true,
            title: {
              text: 'Market Capitalization of ACME Corp',
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
          alert('Uploaded');
        });
    } else {
      alert('Please select a file first');
    }
  }
}
