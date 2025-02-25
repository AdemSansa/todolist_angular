import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FeatureService } from '../../shared/services/feature.service';
import { RouterLink } from '@angular/router';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'; // Import `registerables`
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink , MatSelectModule , MatFormFieldModule , MatLabel],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  @ViewChild('userGrowthChart', { static: true }) chartRef!: ElementRef;
  chart!: Chart;

  TotalUsers : number = 0;
  userGrowthChart :any;
  userGrowthdetails: any;

  
  TotalFeatures : number = 0;

  ngOnInit(): void {
    this.getUsers();
    this.getFeatures(); 
    this.usersGrowth();
    this.fetchUserGrowth('month'); // Default to monthly data

  }
  _userService= inject(UserService)
  _featuresService = inject(FeatureService)



constructor() {
  Chart.register(...registerables); // ✅ Register necessary components
}


  getUsers() {
    this._userService.getAllUsers().subscribe((data) => {
      this.TotalUsers = data.length;

    });
  }

  getFeatures() {
     this._featuresService.getAllFeatures().subscribe((data) => {
     this.TotalFeatures = data.length;
   });
  }
  usersGrowth()
  {
    this._userService.getUsersGrowth().subscribe((data) => {
      this.userGrowthdetails = data;
      console.log(
        this.userGrowthdetails
      );
      
    });
  
  }
  fetchUserGrowth(groupBy: string) {
    this._userService
      .fetchUserGrowth(groupBy)
      .subscribe(data => {

        const label = data.map((item: any) => item._id);
        const values = data.map((item: any) => item.count);


        this.createChart(label, values);

       
      });
  }

  createChart(labels: string[], values: number[]) {
    if (this.chart) {
      this.chart.destroy(); // Destroy previous instance to prevent duplicates
    }

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Users Added',
          data: values,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',

        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: true
          }

        }
        

      }
    });
  }

  onGroupChange(event: any) {
    const selectedValue = event.value;
    this.fetchUserGrowth(selectedValue);
  }
}