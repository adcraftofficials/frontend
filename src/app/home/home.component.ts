import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { PROJECTS, ProjectDetail } from '../project-data';

export interface Project {
  name: string;
  category: string;
  location: string;
  status: string;
  type: string;
  color: string;
  slug: string;
  image?: string;   // optional card thumbnail
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
  isMarathi      = false;

  // ── Search ──
  searchQuery    = '';
  searchResults: ProjectDetail[] = [];

  constructor(
    private router:   Router,
    private titleSvc: Title,
    private metaSvc:  Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  onSearchInput(): void {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) { this.searchResults = []; return; }
    this.searchResults = PROJECTS.filter(p =>
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
    this.searchOpen  = false;
    this.searchQuery = '';
    this.searchResults = [];
    this.router.navigate(['/project', project.slug]);
  }

  closeSearch(): void {
    this.searchOpen    = false;
    this.searchQuery   = '';
    this.searchResults = [];
  }

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
    { slug: 'nandanvan',          name: 'Rajyashree Nandanvan',          category: 'Residential',    location: 'Bhilarewadi, Pune',   status: 'Ongoing',   type: 'ongoing',     color: '#1a3328', image: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663102/IMG-20260626-WA0009_1_zw9rup.jpg' },
    { slug: 'greenview-heights',  name: 'Rajyashree Greenview Heights',  category: 'Residential',    location: 'Baner, Pune',         status: 'Ongoing',   type: 'ongoing',     color: '#2c4a3e', image: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663105/21_rfyed0.jpg' },
    /* COMMENTED OUT - Will be enabled later
    { slug: 'skyline-towers',     name: 'Rajyashree Skyline Towers',     category: 'Commercial',     location: 'Hinjewadi, Pune',     status: 'Ongoing',   type: 'ongoing',     color: '#1c2b3a', image: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663106/23_daqebj.jpg' },
    { slug: 'garden-villas',      name: 'Rajyashree Garden Villas',      category: 'Residential',    location: 'Wagholi, Pune',       status: 'Completed', type: 'residential', color: '#3a2c1c', image: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663106/20_upp2fm.jpg' },
    { slug: 'business-park',      name: 'Rajyashree Business Park',      category: 'Commercial',     location: 'Kharadi, Pune',       status: 'Completed', type: 'commercial',  color: '#2c2c3a', image: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663106/22_wmawwj.jpg' },
    { slug: 'heritage-residency', name: 'Rajyashree Heritage Residency', category: 'Residential',    location: 'Koregaon Park, Pune', status: 'Completed', type: 'residential', color: '#3a3020', image: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663106/19_aj7pln.jpg' },
    */
  ];

  get filteredProjects(): Project[] {
    if (this.activeTab === 'all')         return this.projects;
    if (this.activeTab === 'ongoing')     return this.projects.filter(p => p.type === 'ongoing');
    if (this.activeTab === 'residential') return this.projects.filter(p => p.type === 'residential');
    if (this.activeTab === 'commercial')  return this.projects.filter(p => p.type === 'commercial');
    return this.projects;
  }

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.setSeo();
  }

  // ── SEO ─────────────────────────────────────────────────────
  private setSeo(): void {
    const DOMAIN   = 'https://www.rajyashreeconstruction.com';
    const LOGO     = 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784659597/1001027497_krkyzw.jpg';
    const HERO_IMG = 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663102/IMG-20260626-WA0009_1_zw9rup.jpg';

    // ── Title (55–65 chars) ──────────────────────────────────
    const title = 'Rajyashree Construction LLP | Premium Developer in Pune';
    this.titleSvc.setTitle(title);

    // ── Standard meta ────────────────────────────────────────
    this.metaSvc.updateTag({ name: 'description', content: 'Rajyashree Construction LLP — Pune\'s trusted residential and commercial developer since 1999. Ongoing projects: Nandanvan (Bhilarewadi) and Greenview Heights (Baner). 10+ years · 25 Lac sq.ft built · On-time delivery. RERA registered.' });
    this.metaSvc.updateTag({ name: 'keywords',    content: 'Rajyashree Construction LLP, Rajyashree Nandanvan, Rajyashree Greenview Heights, residential projects Pune, 2 BHK Pune, 3 BHK Pune, apartments in Baner, flats in Bhilarewadi, ongoing projects Pune, RERA registered developer Pune, construction company Pune, premium apartments Pune, real estate developer Pune, Baner Pune property, Bhilarewadi Pune flats, buy flat Pune, new launch Pune, under construction apartments Pune' });
    this.metaSvc.updateTag({ name: 'robots',      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });

    // ── Open Graph ───────────────────────────────────────────
    this.metaSvc.updateTag({ property: 'og:type',        content: 'website' });
    this.metaSvc.updateTag({ property: 'og:url',         content: `${DOMAIN}/` });
    this.metaSvc.updateTag({ property: 'og:title',       content: title });
    this.metaSvc.updateTag({ property: 'og:description', content: '10+ years building premium 2 & 3 BHK residential apartments and commercial spaces across Pune. Explore Nandanvan (Bhilarewadi) and Greenview Heights (Baner). RERA registered. Enquire today.' });
    this.metaSvc.updateTag({ property: 'og:image',       content: HERO_IMG });
    this.metaSvc.updateTag({ property: 'og:image:alt',   content: 'Rajyashree Nandanvan — Premium Residential Project in Bhilarewadi, Pune' });
    this.metaSvc.updateTag({ property: 'og:locale',      content: 'en_IN' });
    this.metaSvc.updateTag({ property: 'og:site_name',   content: 'Rajyashree Construction LLP' });

    // ── Twitter Card ─────────────────────────────────────────
    this.metaSvc.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.metaSvc.updateTag({ name: 'twitter:title',       content: title });
    this.metaSvc.updateTag({ name: 'twitter:description', content: 'Premium 2 & 3 BHK apartments in Baner & Bhilarewadi, Pune. 10+ years · 25 Lac sq.ft · RERA registered.' });
    this.metaSvc.updateTag({ name: 'twitter:image',       content: HERO_IMG });
    this.metaSvc.updateTag({ name: 'twitter:image:alt',   content: 'Rajyashree Nandanvan — Bhilarewadi, Pune' });

    // ── Canonical ────────────────────────────────────────────
    this.setCanonical(`${DOMAIN}/`);

    // ── JSON-LD: ItemList of active projects ─────────────────
    // Uses WebPage type per project — not RealEstateListing
    // (these are construction projects, not property broker listings)
    this.injectJsonLd('home-projects', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Rajyashree Construction LLP — Active Projects in Pune',
      'description': 'Ongoing and upcoming premium residential projects by Rajyashree Construction LLP in Pune.',
      'url': `${DOMAIN}/#projects`,
      'numberOfItems': PROJECTS.length,
      'itemListElement': PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'url': `${DOMAIN}/project/${p.slug}`,
        'name': p.name,
        'description': `${p.tagline}. ${p.category} project in ${p.location}. Status: ${p.status}.${p.area ? ' Area: ' + p.area + '.' : ''}${p.reraNumber ? ' RERA: ' + p.reraNumber + '.' : ''}`
      }))
    });

    // ── JSON-LD: FAQPage (dynamic — mirrors index.html static) ──
    // Injected here so it survives SPA navigation back to homepage
    this.injectJsonLd('home-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Where are Rajyashree Construction projects located?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Rajyashree Construction LLP has ongoing residential projects in Bhilarewadi and Baner, Pune. Rajyashree Nandanvan is located in Bhilarewadi, Pune and Rajyashree Greenview Heights is in Baner, Pune.' }
        },
        {
          '@type': 'Question',
          'name': 'Are Rajyashree Construction projects RERA registered?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Rajyashree Nandanvan is registered under Maharashtra RERA with registration number PS2100024059. Please verify the current status on the MahaRERA website.' }
        },
        {
          '@type': 'Question',
          'name': 'What configurations are available at Rajyashree Nandanvan?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Rajyashree Nandanvan offers 2 BHK and 3 BHK premium apartments ranging from 1000 to 1600 sq.ft in a G+23 floor tower with 650+ units at Bhilarewadi, Pune. Possession is expected in December 2030.' }
        },
        {
          '@type': 'Question',
          'name': 'How can I contact Rajyashree Construction LLP?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'You can reach Rajyashree Construction LLP at +91 9371369595 or email info@rajyashreeconstruction.com. The office is at Survey No. 42, Baner Road, Pune – 411045.' }
        },
        {
          '@type': 'Question',
          'name': 'What is the price range for Rajyashree Nandanvan apartments?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Apartments at Rajyashree Nandanvan are priced from approximately ₹55 lakh to ₹1.2 Crore depending on configuration and floor. Contact the sales team at +91 9371369595 for current pricing.' }
        }
      ]
    });
  }

  /** Upsert a <link rel="canonical"> tag in <head> */
  private setCanonical(url: string): void {
    const head = this.doc.head;
    let link: HTMLLinkElement = head.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Upsert a <script type="application/ld+json"> block by id */
  private injectJsonLd(id: string, schema: object): void {
    const scriptId = `ld-json-${id}`;
    let script = this.doc.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }
  // ────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    const video   = this.heroVideoRef?.nativeElement;
    const section = this.heroSectionRef?.nativeElement;

    if (video && section && 'IntersectionObserver' in window) {
      // Setup video optimization and stall recovery
      this.setupVideoOptimization(video);

      this.observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          video.play().catch(() => {});
          // Fade out hero text after 3 seconds
          this.fadeOutHeroText();
        } else {
          video.pause();
        }
      }, { threshold: 0.1 });
      this.observer.observe(section);
    }

    this.initReveal();
  }

  private setupVideoOptimization(video: HTMLVideoElement): void {
    let stallCheckInterval: any;
    let lastTime = 0;
    let stalled = false;

    // Monitor for stalls and recover automatically
    const checkForStall = () => {
      if (!video.paused && !video.ended) {
        if (video.currentTime === lastTime) {
          if (!stalled) {
            stalled = true;
            // Video is stalled, attempt recovery
            const currentTime = video.currentTime;
            video.load();
            video.currentTime = currentTime;
            video.play().catch(() => {});
          }
        } else {
          stalled = false;
          lastTime = video.currentTime;
        }
      }
    };

    // Check for stalls every 2 seconds
    stallCheckInterval = setInterval(checkForStall, 2000);

    // Handle buffering events
    video.addEventListener('waiting', () => {
      // Video is buffering, will auto-resume when ready
      console.log('Video buffering...');
    });

    video.addEventListener('canplay', () => {
      // Video has buffered enough, ensure it plays
      if (!video.paused) {
        video.play().catch(() => {});
      }
    });

    // Handle stalled event
    video.addEventListener('stalled', () => {
      console.log('Video stalled, attempting recovery...');
      const currentTime = video.currentTime;
      video.load();
      video.currentTime = currentTime;
      video.play().catch(() => {});
    });

    // Handle error and retry
    video.addEventListener('error', () => {
      console.log('Video error, retrying...');
      setTimeout(() => {
        video.load();
        video.play().catch(() => {});
      }, 1000);
    });

    // Cleanup on component destroy
    this.observer = new Proxy(this.observer || {} as any, {
      get: (target, prop) => {
        if (prop === 'disconnect') {
          return () => {
            clearInterval(stallCheckInterval);
            if (target.disconnect) target.disconnect();
          };
        }
        return target[prop];
      }
    });
  }

  private fadeOutHeroText(): void {
    const heroContent = this.heroSectionRef?.nativeElement?.querySelector('.hero__content');
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add('hero__content--hidden');
      }, 3000);
    }
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

  scrollToSection(id: string): void {
    // Close menu first, then scroll after the menu transition completes
    this.mobileMenuOpen = false;
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 420); // matches the menu slide-out transition (0.42s)
  }

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
