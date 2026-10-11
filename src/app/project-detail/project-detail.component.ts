import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeStyle, Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
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
    private route:     ActivatedRoute,
    private router:    Router,
    private sanitizer: DomSanitizer,
    private titleSvc:  Title,
    private metaSvc:   Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.project = getProjectBySlug(slug);
    if (!this.project) { this.router.navigate(['/']); return; }

    this.setSeo(this.project);

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

  // ── SEO ─────────────────────────────────────────────────────
  private setSeo(p: ProjectDetail): void {
    const DOMAIN    = 'https://www.rajyashreeconstruction.com';
    const SITE_NAME = 'Rajyashree Construction LLP';
    const pageUrl   = `${DOMAIN}/project/${p.slug}`;
    const heroImage = p.images?.find(img => img.url)?.url
      ?? 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784659597/1001027497_krkyzw.jpg';

    // ── Title — 55–65 chars, unique per project ──────────────
    // Pattern: "{Project Name} | {Config} in {City} | {Brand}"
    const configSnippet = p.area
      ? `${p.totalUnits?.includes('BHK') ? p.totalUnits : (p.specs.find(s => s.label === 'Configuration')?.value ?? p.category)}`
      : p.category;
    const title = `${p.name} | ${configSnippet} in ${p.location.split(',')[0]}, Pune | ${SITE_NAME}`;

    // ── Description — 145–160 chars ──────────────────────────
    const descParts = [
      p.tagline,
      p.area ? `${p.area}.` : '',
      p.possession ? `Possession: ${p.possession}.` : '',
      p.reraNumber ? `RERA: ${p.reraNumber}.` : '',
      `Enquire at +91 9371369595.`
    ].filter(Boolean).join(' ');
    const description = descParts.length > 160
      ? descParts.slice(0, 157) + '…'
      : descParts;

    // ── Keywords — project-specific + local intent ───────────
    const config   = p.specs.find(s => s.label === 'Configuration')?.value ?? '';
    const keywords = [
      p.name,
      `${p.name} Pune`,
      p.location,
      config ? `${config} in ${p.location.split(',')[0]} Pune` : '',
      config ? `${config} apartments Pune` : '',
      `${p.category.toLowerCase()} projects Pune`,
      `${p.status.toLowerCase()} projects Pune`,
      p.reraNumber ? `RERA ${p.reraNumber}` : '',
      `flats in ${p.location.split(',')[0]}`,
      `buy flat ${p.location.split(',')[0]} Pune`,
      SITE_NAME,
      'premium apartments Pune',
      'new launch Pune'
    ].filter(Boolean).join(', ');

    // ── Title + meta ─────────────────────────────────────────
    this.titleSvc.setTitle(title);
    this.metaSvc.updateTag({ name: 'description', content: description });
    this.metaSvc.updateTag({ name: 'keywords',    content: keywords });
    this.metaSvc.updateTag({ name: 'robots',      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });

    // ── Open Graph ───────────────────────────────────────────
    this.metaSvc.updateTag({ property: 'og:type',        content: 'website' });
    this.metaSvc.updateTag({ property: 'og:url',         content: pageUrl });
    this.metaSvc.updateTag({ property: 'og:title',       content: title });
    this.metaSvc.updateTag({ property: 'og:description', content: description });
    this.metaSvc.updateTag({ property: 'og:image',       content: heroImage });
    this.metaSvc.updateTag({ property: 'og:image:alt',   content: `${p.name} — ${p.location}` });
    this.metaSvc.updateTag({ property: 'og:locale',      content: 'en_IN' });
    this.metaSvc.updateTag({ property: 'og:site_name',   content: SITE_NAME });

    // ── Twitter Card ─────────────────────────────────────────
    this.metaSvc.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.metaSvc.updateTag({ name: 'twitter:title',       content: title });
    this.metaSvc.updateTag({ name: 'twitter:description', content: description });
    this.metaSvc.updateTag({ name: 'twitter:image',       content: heroImage });
    this.metaSvc.updateTag({ name: 'twitter:image:alt',   content: `${p.name} — ${p.location}` });

    // ── Canonical ────────────────────────────────────────────
    this.setCanonical(pageUrl);

    // ── JSON-LD: WebPage (main entity for the project page) ──
    // NOTE: We use WebPage + Place, not RealEstateListing.
    // RealEstateListing is for property broker/agent listings.
    // These are developer project pages.
    this.injectJsonLd('project-webpage', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': pageUrl,
      'url': pageUrl,
      'name': title,
      'description': description,
      'inLanguage': 'en-IN',
      'isPartOf': { '@id': `${DOMAIN}/#website` },
      'about': {
        '@type': 'Place',
        'name': p.name,
        'description': p.description,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': p.address,
          'addressLocality': 'Pune',
          'addressRegion': 'Maharashtra',
          'addressCountry': 'IN'
        }
      },
      'primaryImageOfPage': {
        '@type': 'ImageObject',
        'url': heroImage,
        'name': `${p.name} — ${p.location}`
      },
      'image': p.images
        .filter(img => img.url)
        .map(img => ({ '@type': 'ImageObject', 'url': img.url, 'name': img.alt }))
    });

    // ── JSON-LD: Project as a Service offering ───────────────
    this.injectJsonLd('project-service', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': p.name,
      'description': p.description,
      'serviceType': `${p.category} Real Estate Development`,
      'provider': {
        '@id': `${DOMAIN}/#organization`
      },
      'areaServed': {
        '@type': 'Place',
        'name': p.location,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': p.address,
          'addressLocality': 'Pune',
          'addressRegion': 'Maharashtra',
          'addressCountry': 'IN'
        }
      },
      'additionalProperty': [
        ...(p.reraNumber ? [{ '@type': 'PropertyValue', 'name': 'RERA Registration', 'value': p.reraNumber }] : []),
        ...(p.totalUnits ? [{ '@type': 'PropertyValue', 'name': 'Total Units', 'value': p.totalUnits }] : []),
        ...(p.area       ? [{ '@type': 'PropertyValue', 'name': 'Area Range', 'value': p.area, 'unitText': 'sq.ft' }] : []),
        ...(p.possession ? [{ '@type': 'PropertyValue', 'name': 'Expected Possession', 'value': p.possession }] : []),
        { '@type': 'PropertyValue', 'name': 'Project Status', 'value': p.status }
      ]
    });

    // ── JSON-LD: BreadcrumbList ───────────────────────────────
    this.injectJsonLd('project-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home',     'item': DOMAIN },
        { '@type': 'ListItem', 'position': 2, 'name': 'Projects', 'item': `${DOMAIN}/#projects` },
        { '@type': 'ListItem', 'position': 3, 'name': p.name,     'item': pageUrl }
      ]
    });
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private injectJsonLd(id: string, schema: object): void {
    const scriptId = `ld-json-${id}`;
    let script = this.doc.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = this.doc.createElement('script');
      script.id   = scriptId;
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }
  // ────────────────────────────────────────────────────────────

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
