import { Component, OnInit } from '@angular/core';
import { NavbarService } from './Services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor( public nav: NavbarService ) {}

  ngOnInit(): void {
    this.nav.hide();
  }

  title = 'FinanciarTe';

}
