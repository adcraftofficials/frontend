import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDetail, getProjectBySlug } from '../project-data';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls:  ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: ProjectDetail | undefined;
  activeImage = 0;
  enquirySubmitted = false;

  enquiry = { name: '', phone: '', email: '', message: '' };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.project = getProjectBySlug(slug);
    if (!this.project) { this.router.navigate(['/']); return; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get allImages(): { url: string; alt: string }[] {
    return this.project?.images ?? [];
  }

  setImage(idx: number): void { this.activeImage = idx; }

  prev(): void {
    this.activeImage = (this.activeImage - 1 + this.allImages.length) % this.allImages.length;
  }

  next(): void {
    this.activeImage = (this.activeImage + 1) % this.allImages.length;
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
