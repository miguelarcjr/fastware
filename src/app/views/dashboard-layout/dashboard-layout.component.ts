import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardLayoutComponent implements OnInit {
  scripts = ["/assets/dashboard/js/core/popper.min.js","/assets/dashboard/js/core/bootstrap.min.js","/assets/dashboard/js/plugins/perfect-scrollbar.min.js","/assets/dashboard/js/plugins/smooth-scrollbar.min.js","/assets/dashboard/js/plugins/script.js", "https://buttons.github.io/buttons.js","/assets/dashboard/js/soft-ui-dashboard.min.js?v=1.0.3","https://kit.fontawesome.com/42d5adcbca.js"];

  bread: string = "Tabelas";

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const doc = document.getElementById('main-script') as HTMLElement;
    for (const scriptSrc of this.scripts) {
      let script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.src = scriptSrc;
      doc.appendChild(script);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
