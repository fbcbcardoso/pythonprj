import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faArrowRightArrowLeft = faRightFromBracket;

  name: any = localStorage.getItem('user');
  role: any = localStorage.getItem('cargo');

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('perm') == '') {
      localStorage.setItem('perm', 'REG');
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/'])
    
  }
}
