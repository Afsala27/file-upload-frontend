import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private router: Router, private toastr: ToastrService) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('Logout successful');
  }
}
