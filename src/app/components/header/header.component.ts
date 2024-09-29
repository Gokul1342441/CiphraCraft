import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';
  queryParams: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the current route (path) when the component is initialized
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;  // Full route including query params
    });

    // Access query parameters (this only captures query params)
    this.route.queryParams.subscribe(params => {
      console.log("🚀 ~ HeaderComponent ~ ngOnInit ~ params:", params)
      this.queryParams = params;
      console.log('Query Params:', params);
    });
  }
}
