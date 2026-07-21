import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

export interface Project {
  name: string;
  category: string;
  location: string;
  status: string;
  type: string;
  color: string;
  slug: string;
}

export interface Enquiry {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
}

export interface StoryContent {
  eyebrow: string;
  heading: string;
  body1: string;
  body2: string;
  cta: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('heroVideo')   heroVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('heroSection') heroSectionRef!: ElementRef<HTMLElement>;

  projectsOpen   = false;
  mobileMenuOpen = false;
  searchOpen     = false;
  activeTab      = 'all';
  enquirySubmitted = false;
  currentYear    = new Date().getFullYear();
  navScrolled    = false;

  isMarathi = false;

  readonly storyEN: StoryContent = {
    eyebrow: 'Who We Are',
    heading: 'Our Story',
    body1: 'Founded with a vision to transform skylines and communities, Rajyashree Construction LLP has been shaping India\'s built environment for over two decades. Our journey began with a single promise — to deliver spaces that stand the test of time, crafted with precision, integrity, and an unrelenting commitment to quality.',
    body2: 'From humble foundations to landmark structures, every project we undertake is a reflection of our core values: excellence, transparency, and care for the communities we build in.',
    cta: 'Discover Our Heritage'
  };

  readonly storyMR: StoryContent = {
    eyebrow: 'आम्ही कोण आहोत',
    heading: 'आमची कहाणी',
    body1: 'आकाशरेषा आणि समुदायांचे रूपांतर करण्याच्या दृष्टिकोनातून स्थापित, राज्यश्री कन्स्ट्रक्शन एलएलपी गेल्या दोन दशकांहून अधिक काळापासून भारताच्या बांधकाम क्षेत्राला आकार देत आहे.',
    body2: 'साध्या पायापासून ते ऐतिहासिक संरचनांपर्यंत, आम्ही हाती घेतलेला प्रत्येक प्रकल्प आमच्या मूल्यांचे प्रतिबिंब आहे: उत्कृष्टता, पारदर्शकता आणि आम्ही ज्या समुदायांमध्ये बांधकाम करतो त्यांची काळजी.',
    cta: 'आमचा वारसा शोधा'
  };

  get story(): StoryContent {
    return this.isMarathi ? this.storyMR : this.storyEN;
  }

  enquiry: Enquiry = { name: '', phone: '', email: '', interest: '', message: '' };

  projects: Project[] = [
    { slug: 'nandanvan',          name: 'Rajyashree Nandanvan',          category: 'Residential',    location: 'Bhilarewadi, Pune',   status: 'Ongoing',   type: 'ongoing',     color: '#1a3328' },
    { slug: 'greenview-heights',  name: 'Rajyashree Greenview Heights',  category: 'Residential',    location: 'Baner, Pune',         status: 'Ongoing',   type: 'ongoing',     color: '#2c4a3e' },
    { slug: 'skyline-towers',     name: 'Rajyashree Skyline Towers',     category: 'Commercial',     location: 'Hinjewadi, Pune',     status: 'Ongoing',   type: 'ongoing',     color: '#1c2b3a' },
    { slug: 'garden-villas',      name: 'Rajyashree Garden Villas',      category: 'Residential',    location: 'Wagholi, Pune',       status: 'Completed', type: 'residential', color: '#3a2c1c' },
    { slug: 'business-park',      name: 'Rajyashree Business Park',      category: 'Commercial',     location: 'Kharadi, Pune',       status: 'Completed', type: 'commercial',  color: '#2c2c3a' },
    { slug: 'heritage-residency', name: 'Rajyashree Heritage Residency', category: 'Residential',    location: 'Koregaon Park, Pune', status: 'Completed', type: 'residential', color: '#3a3020' },
    { slug: 'metro-connect-hub',  name: 'Rajyashree Metro Connect Hub',  category: 'Infrastructure', location: 'Pimpri, Pune',        status: 'Ongoing',   type: 'ongoing',     color: '#1c3a3a' },
  ];

  get filteredProjects(): Project[] {
    if (this.activeTab === 'all')         return this.projects;
    if (this.activeTab === 'ongoing')     return this.projects.filter(p => p.type === 'ongoing');
    if (this.activeTab === 'residential') return this.projects.filter(p => p.type === 'residential');
    if (this.activeTab === 'commercial')  return this.projects.filter(p => p.type === 'commercial');
    return this.projects;
  }

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const video   = this.heroVideoRef?.nativeElement;
    const section = this.heroSectionRef?.nativeElement;

    if (video && section && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }, { threshold: 0.1 });
      this.observer.observe(section);
    }

    this.initReveal();
  }

  private initReveal(): void {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal,.reveal-left,.reveal-right')
        .forEach(el => el.classList.add('revealed'));
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    document.querySelectorAll('.reveal,.reveal-left,.reveal-right')
      .forEach(el => obs.observe(el));
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }

  toggleProjects(): void   { this.projectsOpen   = !this.projectsOpen; }
  toggleMobileMenu(): void { this.mobileMenuOpen = !this.mobileMenuOpen; }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Become solid once scrolled past the hero (1 viewport height)
    this.navScrolled = window.scrollY > (window.innerHeight * 0.85);
  }

  onEnquirySubmit(): void {
    if (this.enquiry.name && this.enquiry.phone) {
      this.enquirySubmitted = true;
      this.enquiry = { name: '', phone: '', email: '', interest: '', message: '' };
      setTimeout(() => { this.enquirySubmitted = false; }, 5000);
    }
  }
}
