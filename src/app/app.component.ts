import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items: MenuItem[] | undefined;
  constructor(private router: Router) { }
  ngOnInit() {
    this.items = [
      {
        label: '預設',
        command: () => (this.router.navigate(['']))
      },
      {
        label: '修改月份樣式',
        command: () => (this.router.navigate(['ModifyMonthStyle']))
      },
      {
        label: '行事曆',
        items: [
          {
            label: '基礎行事曆畫面',
            command: () => (this.router.navigate(['Base']))
          },
          {
            label: '切換月份',
            command: () => (this.router.navigate(['MonthNavigation']))
          },
        ]
      },
    ]
  }
}