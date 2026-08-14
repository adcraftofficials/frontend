import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ProjectDetail, getProjectBySlug } from '../project-data';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls:  ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  project: ProjectDetail | undefined;
  activeImage = 0;
  slideshowMode = false;
  enquirySubmitted = false;
  private autoScrollTimeout: any;
  private userHasScrolled = false;
  private imageSliderInterval: any;

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
    
    // Listen for user scroll to cancel auto-scroll
    window.addEventListener('scroll', this.handleUserScroll.bind(this), { once: true });
    
    // Auto-scroll after 3 seconds if user hasn't scrolled
    this.autoScrollTimeout = setTimeout(() => {
      if (!this.userHasScrolled) {
        this.autoScrollToContent();
      }
    }, 3000);

    // Start image auto-slider
    this.startImageAutoSlider();
  }

  private startImageAutoSlider(): void {
    // Change image every 3 seconds
    this.imageSliderInterval = setInterval(() => {
      if (this.allImages.length > 1) {
        this.activeImage = (this.activeImage + 1) % this.allImages.length;
      }
    }, 3000);
  }

  private stopImageAutoSlider(): void {
    if (this.imageSliderInterval) {
      clearInterval(this.imageSliderInterval);
      this.imageSliderInterval = null;
    }
  }

  private restartImageAutoSlider(): void {
    this.stopImageAutoSlider();
    this.startImageAutoSlider();
  }

  private handleUserScroll(): void {
    this.userHasScrolled = true;
    if (this.autoScrollTimeout) {
      clearTimeout(this.autoScrollTimeout);
    }
  }

  private autoScrollToContent(): void {
    // Scroll to the first section after hero (approximately one viewport height)
    const scrollTarget = window.innerHeight * 0.9;
    window.scrollTo({ 
      top: scrollTarget, 
      behavior: 'smooth' 
    });
  }

  ngOnDestroy(): void {
    // Clean up timeout if component is destroyed
    if (this.autoScrollTimeout) {
      clearTimeout(this.autoScrollTimeout);
    }
    // Clean up image slider interval
    this.stopImageAutoSlider();
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
    this.restartImageAutoSlider(); // Restart timer when user clicks thumbnail
  }

  prev(): void {
    this.activeImage = (this.activeImage - 1 + this.allImages.length) % this.allImages.length;
    this.slideshowMode = true;
    this.restartImageAutoSlider(); // Restart timer when user clicks prev
  }

  next(): void {
    this.activeImage = (this.activeImage + 1) % this.allImages.length;
    this.slideshowMode = true;
    this.restartImageAutoSlider(); // Restart timer when user clicks next
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
