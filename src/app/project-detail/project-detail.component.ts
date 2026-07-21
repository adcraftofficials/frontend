import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ProjectDetail, getProjectBySlug } from '../project-data';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls:  ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: ProjectDetail | undefined;
  activeImage = 0;
  slideshowMode = false;
  enquirySubmitted = false;

  enquiry = { name: '', phone: '', email: '', message: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.project = getProjectBySlug(slug);
    if (!this.project) { this.router.navigate(['/']); return; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get allImages(): { url: string; alt: string }[] {
    return this.project?.images ?? [];
  }

  get heroBgStyle(): SafeStyle {
    const img = this.allImages[this.activeImage]?.url || this.allImages[0]?.url;
    if (img) {
      return this.sanitizer.bypassSecurityTrustStyle(
        `url('${img}') center/cover no-repeat`
      );
    }
    return this.sanitizer.bypassSecurityTrustStyle(
      this.project?.heroColor ?? '#1a3328'
    );
  }

  setImage(idx: number): void {
    this.activeImage = idx;
    this.slideshowMode = true;
  }

  prev(): void {
    this.activeImage = (this.activeImage - 1 + this.allImages.length) % this.allImages.length;
    this.slideshowMode = true;
  }

  next(): void {
    this.activeImage = (this.activeImage + 1) % this.allImages.length;
    this.slideshowMode = true;
  }

  exitSlideshow(): void {
    this.slideshowMode = false;
  }

  onEnquire(): void {
    if (this.enquiry.name && this.enquiry.phone) {
      this.enquirySubmitted = true;
      this.enquiry = { name: '', phone: '', email: '', message: '' };
      setTimeout(() => { this.enquirySubmitted = false; }, 5000);
    }
  }

  goBack(): void { this.router.navigate(['/']); }
}
