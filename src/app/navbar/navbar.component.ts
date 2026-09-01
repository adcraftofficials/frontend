import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PROJECTS, ProjectDetail } from '../project-data';

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

  // ── Search ──
  searchQuery    = '';
  searchResults: ProjectDetail[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void { this.onScroll(); }
  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  onScroll(): void { this.navScrolled = window.scrollY > 60; }

  toggleProjects(): void   { this.projectsOpen   = !this.projectsOpen; }
  toggleMobileMenu(): void { this.mobileMenuOpen = !this.mobileMenuOpen; }

  onSearchInput(): void {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) { this.searchResults = []; return; }
    this.searchResults = PROJECTS.filter((p: ProjectDetail) =>
      p.name.toLowerCase().includes(q)     ||
      p.slug.toLowerCase().includes(q)     ||
      p.location.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q)
    );
  }

  onSearchEnter(): void {
    if (this.searchResults.length === 1) {
      this.navigateToResult(this.searchResults[0]);
    }
  }

  navigateToResult(project: ProjectDetail): void {
    this.searchOpen    = false;
    this.searchQuery   = '';
    this.searchResults = [];
    this.router.navigate(['/project', project.slug]);
  }

  closeSearch(): void {
    this.searchOpen    = false;
    this.searchQuery   = '';
    this.searchResults = [];
  }
}
