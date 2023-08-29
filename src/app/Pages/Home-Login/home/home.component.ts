import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private nav: NavbarService){}

  ngOnInit(): void {
    this.nav.show();
  }

}
