import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  navScrolled    = false;
  projectsOpen   = false;
  mobileMenuOpen = false;
  searchOpen     = false;

  ngOnInit(): void {
    this.onScroll();
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.navScrolled = window.scrollY > 60;
  }

  toggleProjects(): void {
    this.projectsOpen = !this.projectsOpen;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
