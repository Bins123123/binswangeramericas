const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', isOpen);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const siteHeader = document.querySelector('.site-header');
let previousScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (!siteHeader || nav?.classList.contains('open')) return;
  const currentScrollY = window.scrollY;
  siteHeader.classList.toggle('header-hidden', currentScrollY > previousScrollY && currentScrollY > 90);
  previousScrollY = currentScrollY;
}, { passive: true });

document.querySelector('.footer-top')?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const directionalArrows = new Map([['←', '←'], ['↑', '↑'], ['→', '→'], ['↓', '↓'], ['↗', '→']]);
document.querySelectorAll('a span, .circle-link, #services .service-card b, .expertise-list b').forEach((element) => {
  const symbol = element.textContent.trim();
  if (!directionalArrows.has(symbol)) return;
  element.textContent = directionalArrows.get(symbol);
  element.classList.add('arrow-glyph');
});

const heroCarousel = document.querySelector('[data-hero-carousel]');
if (heroCarousel) {
  const heroSlides = [...heroCarousel.querySelectorAll('.hero-copy-slide')];
  const heroControls = [...heroCarousel.querySelectorAll('.hero-index button')];
  const heroCounter = heroCarousel.querySelector('.hero-index b');
  const heroNext = heroCarousel.querySelector('.hero-next');
  const heroImage = document.querySelector('.cm-hero-image');
  const heroImages = [
    'toyota-in-peru.jpg',
    'warehouse-peru-aerial-drone.jpg',
  ];
  let activeHeroSlide = 0;
  let heroFadeTimer;
  const showHeroSlide = (index) => {
    activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeHeroSlide));
    heroControls.forEach((control, controlIndex) => {
      const isActive = controlIndex === activeHeroSlide;
      control.classList.toggle('is-active', isActive);
      control.setAttribute('aria-pressed', String(isActive));
    });
    heroCounter.textContent = String(activeHeroSlide + 1).padStart(2, '0');
    if (heroImage) {
      window.clearTimeout(heroFadeTimer);
      const nextImage = heroImages[activeHeroSlide % heroImages.length];
      heroImage.style.setProperty('--next-hero-image', `url('${nextImage}')`);
      heroImage.classList.add('is-crossfading');
      heroFadeTimer = window.setTimeout(() => {
        heroImage.style.backgroundImage = `url('${nextImage}')`;
        heroImage.classList.remove('is-crossfading');
      }, 420);
    }
  };
  heroControls.forEach((control, index) => control.addEventListener('click', () => showHeroSlide(index)));
  heroNext?.addEventListener('click', () => showHeroSlide(activeHeroSlide + 1));
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let heroAutoplay;
  const stopHeroAutoplay = () => window.clearInterval(heroAutoplay);
  const startHeroAutoplay = () => {
    stopHeroAutoplay();
    if (!motionPreference.matches && !document.hidden) {
      heroAutoplay = window.setInterval(() => showHeroSlide(activeHeroSlide + 1), 4000);
    }
  };
  heroCarousel.addEventListener('mouseenter', stopHeroAutoplay);
  heroCarousel.addEventListener('mouseleave', startHeroAutoplay);
  heroCarousel.addEventListener('focusin', stopHeroAutoplay);
  heroCarousel.addEventListener('focusout', (event) => {
    if (!heroCarousel.contains(event.relatedTarget)) startHeroAutoplay();
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stopHeroAutoplay() : startHeroAutoplay());
  motionPreference.addEventListener('change', startHeroAutoplay);
  startHeroAutoplay();
}


const cmMenuButton = document.querySelector('.cm-menu');
const cmNav = document.querySelector('.cm-header nav');

cmMenuButton?.addEventListener('click', () => {
  const isOpen = cmNav.classList.toggle('open');
  cmMenuButton.setAttribute('aria-expanded', isOpen);
});

cmNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  cmNav.classList.remove('open');
  cmMenuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('#history .article h3').forEach((heading) => {
  const match = heading.textContent.match(/^(.*)\s(\([^)]*\))$/);
  if (match) heading.innerHTML = `<span class="history-date">${match[2]}</span>${match[1]}`;
});

document.querySelectorAll('#numbers .stats span').forEach((label) => {
  if (label.textContent.trim() === 'Years of Industrial Expertise') {
    label.innerHTML = 'Years of Industrial<br />Expertise';
  }
});

const servicesList = document.querySelector('#services .service-list');
if (servicesList) {
  const servicesSection = document.querySelector('#services');
  const servicesHeading = servicesSection.querySelector('.services-heading');
  servicesHeading.querySelector('.eyebrow').textContent = 'Industries & Services';
  servicesHeading.querySelector('h2').textContent = 'Services';
  servicesSection.insertAdjacentHTML('beforebegin', `
    <section class="industries-section" aria-labelledby="industries-title">
      <div class="industries-section-heading"><p class="eyebrow">Industries &amp; Services</p><h2 id="industries-title">Industries</h2></div>
      <div class="industries-grid"><span>Manufacturing</span><span>Logistics</span><span>Life Sciences</span><span>Food &amp; Beverage</span><span>Cold Storage</span><span>Automotive</span><span>Semiconductors</span><span>Data Centers</span><span>Energy</span><span>Aerospace</span></div>
    </section>
  `);
}

const highlightedCountries = [
  { name: 'United States', code: 'USA', url: 'index.html#markets' },
  { name: 'Mexico', code: 'MEX', url: 'index.html#markets' },
  { name: 'Colombia', code: 'COL', url: 'index.html#markets' },
  { name: 'Peru', code: 'PER', url: 'index.html#markets' },
  { name: 'Brazil', code: 'BRA', url: 'index.html#markets' },
  { name: 'Chile', code: 'CHL', url: 'market-chile.html' },
  { name: 'Argentina', code: 'ARG', url: 'index.html#markets' }
];

const countryLookup = new Map(highlightedCountries.map((country) => [country.code, country]));
const latinAmericaCountryCodes = [
  'ARG', 'BHS', 'BLZ', 'BOL', 'BRA', 'BRB', 'CHL', 'COL', 'CRI', 'CUB', 'DMA',
  'DOM', 'ECU', 'GRD', 'GTM', 'GUY', 'HND', 'HTI', 'JAM', 'KNA', 'LCA', 'MEX',
  'NIC', 'PAN', 'PER', 'PRY', 'SLV', 'SUR', 'TTO', 'URY', 'USA', 'VCT', 'VEN'
];

const labelPositions = {
  ARG: [-64, -36], BHS: [-76.5, 24.3], BLZ: [-88.7, 17.2], BOL: [-64.7, -16.8],
  BRA: [-53, -10], BRB: [-59.55, 13.18], CHL: [-71.2, -31.5], COL: [-73, 4.5],
  CRI: [-84.2, 9.9], CUB: [-79.5, 21.8], DMA: [-61.35, 15.4], DOM: [-70.4, 18.9],
  ECU: [-78.3, -1.4], GRD: [-61.7, 12.1], GTM: [-90.3, 15.5], GUY: [-58.9, 4.9],
  HND: [-86.5, 14.8], HTI: [-72.4, 19], JAM: [-77.3, 18.1], KNA: [-62.75, 17.3],
  LCA: [-60.98, 13.9], MEX: [-102, 22.8], NIC: [-85, 12.8], PAN: [-80.3, 8.7],
  PER: [-75.2, -9.3], PRY: [-58.3, -23.2], SLV: [-88.9, 13.8], SUR: [-55.9, 4],
  TTO: [-61.2, 10.5], URY: [-56, -32.8], USA: [-98, 37], VCT: [-61.2, 13.25], VEN: [-66.2, 7.1]
};

const mapElement = document.querySelector('#map');

// Animate the metric figures once their By the Numbers section enters view.
const statFigures = document.querySelectorAll('.stats strong, .stats-grid strong, .lp-stat-grid strong');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animateStatFigure = (figure, delay) => {
  if (figure._counterFrame) cancelAnimationFrame(figure._counterFrame);
  const finalMarkup = figure.dataset.finalMarkup || figure.innerHTML;
  figure.dataset.finalMarkup = finalMarkup;
  const finalText = finalMarkup.replace(/<[^>]+>/g, '').trim();
  const target = Number.parseInt(finalText.replace(/\D/g, ''), 10);
  if (!Number.isFinite(target)) return;
  const suffix = finalText.includes('+') ? '+' : '';
  const duration = 1050;
  const start = performance.now() + delay;
  const tick = (now) => {
    const progress = Math.min(Math.max((now - start) / duration, 0), 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    figure.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) figure._counterFrame = requestAnimationFrame(tick);
    else {
      figure.innerHTML = finalMarkup;
      figure._counterFrame = null;
    }
  };
  figure._counterFrame = requestAnimationFrame(tick);
};
if (statFigures.length) {
  const statSections = [...new Set([...statFigures].map((figure) => figure.closest('.stats, .stats-strip, .lp-stats')))].filter(Boolean);
  const startCounters = (section) => {
    if (section.dataset.counting === 'true') return;
    section.dataset.counting = 'true';
    section.querySelectorAll('strong').forEach((figure, index) => {
      if (reducedMotion) return;
      animateStatFigure(figure, index * 90);
    });
  };
  const resetCounters = (section) => {
    section.dataset.counting = 'false';
    section.querySelectorAll('strong').forEach((figure) => {
      if (figure._counterFrame) cancelAnimationFrame(figure._counterFrame);
      figure._counterFrame = null;
      const finalMarkup = figure.dataset.finalMarkup || figure.innerHTML;
      figure.dataset.finalMarkup = finalMarkup;
      const finalText = finalMarkup.replace(/<[^>]+>/g, '').trim();
      const suffix = finalText.includes('+') ? '+' : '';
      figure.textContent = `0${suffix}`;
    });
  };
  if (reducedMotion) statSections.forEach(startCounters);
  else {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          startCounters(target);
        } else resetCounters(target);
      });
    }, { threshold: 0.35 });
    statSections.forEach((section) => counterObserver.observe(section));
  }
}

if (mapElement && window.maplibregl) {
  const map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {},
      layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#f4f4f1' } }]
    },
    center: [-78, -8], zoom: 2.0, minZoom: 2.0, maxZoom: 2.0,
    maxBounds: [[-135, -58], [-28, 50]], attributionControl: false,
    scrollZoom: false, dragPan: false, dragRotate: false, doubleClickZoom: false,
    touchZoomRotate: false, keyboard: false
  });

  const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 12 });

  map.on('load', async () => {
    const response = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
    const world = await response.json();
    const isoCodeKey = 'ISO3166-1-Alpha-3';
    const withoutHawaii = (feature) => {
      if (feature.properties[isoCodeKey] !== 'USA' || feature.geometry.type !== 'MultiPolygon') return feature;
      const mainlandAndTerritories = feature.geometry.coordinates.filter((polygon) => {
        const bounds = polygon.flat().reduce((result, [longitude, latitude]) => [
          Math.min(result[0], longitude), Math.max(result[1], longitude),
          Math.min(result[2], latitude), Math.max(result[3], latitude)
        ], [Infinity, -Infinity, Infinity, -Infinity]);
        const [minLongitude, maxLongitude, minLatitude, maxLatitude] = bounds;
        return !(maxLongitude < -150 && minLatitude > 15 && maxLatitude < 30);
      });
      return { ...feature, geometry: { ...feature.geometry, coordinates: mainlandAndTerritories } };
    };
    const regionalFeatures = world.features
      .filter((feature) => latinAmericaCountryCodes.includes(feature.properties[isoCodeKey]))
      .map(withoutHawaii);
    const highlightedFeatures = regionalFeatures
      .filter((feature) => countryLookup.has(feature.properties[isoCodeKey]))
      .map((feature) => ({ ...feature, id: feature.properties[isoCodeKey], properties: { ...feature.properties, ...countryLookup.get(feature.properties[isoCodeKey]) } }));
    const inactiveFeatures = regionalFeatures.filter((feature) => !countryLookup.has(feature.properties[isoCodeKey]));
    const labelFeatures = regionalFeatures.map((feature) => {
      const code = feature.properties[isoCodeKey];
      if (!labelPositions[code]) return null;
      return { type: 'Feature', geometry: { type: 'Point', coordinates: labelPositions[code] }, properties: { code, labelName: feature.properties.name, active: countryLookup.has(code) } };
    }).filter(Boolean);

    map.addSource('inactive-countries', { type: 'geojson', data: { type: 'FeatureCollection', features: inactiveFeatures } });
    map.addSource('highlighted-countries', { type: 'geojson', promoteId: 'code', data: { type: 'FeatureCollection', features: highlightedFeatures } });
    map.addSource('country-labels', { type: 'geojson', data: { type: 'FeatureCollection', features: labelFeatures } });
    map.addSource('equator', { type: 'geojson', data: { type: 'FeatureCollection', features: [{ type: 'Feature', geometry: { type: 'LineString', coordinates: [[-140, 0], [-10, 0]] }, properties: {} }] } });

    map.addLayer({ id: 'inactive-fill', type: 'fill', source: 'inactive-countries', paint: { 'fill-color': '#d0d1ce', 'fill-opacity': 0.78 } });
    map.addLayer({ id: 'inactive-outline', type: 'line', source: 'inactive-countries', paint: { 'line-color': '#f5f5f2', 'line-width': 1 } });
    map.addLayer({ id: 'highlight-fill', type: 'fill', source: 'highlighted-countries', paint: { 'fill-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#bd302d', '#777a76'], 'fill-opacity': 0.97 } });
    map.addLayer({ id: 'highlight-outline', type: 'line', source: 'highlighted-countries', paint: { 'line-color': '#f5f5f2', 'line-width': 1.15 } });
    map.addLayer({ id: 'equator-line', type: 'line', source: 'equator', paint: { 'line-color': '#a8aaa6', 'line-width': 1, 'line-dasharray': [2, 2] } });
    map.addLayer({ id: 'country-labels', type: 'symbol', source: 'country-labels', layout: { 'text-field': ['get', 'labelName'], 'text-font': ['Open Sans Regular'], 'text-size': 10, 'text-allow-overlap': false }, paint: { 'text-color': '#333631', 'text-halo-color': '#f4f4f1', 'text-halo-width': 1 } });

    let hoveredCountryId = null;
    map.on('mouseenter', 'highlight-fill', () => { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', 'highlight-fill', () => {
      map.getCanvas().style.cursor = '';
      if (hoveredCountryId) map.setFeatureState({ source: 'highlighted-countries', id: hoveredCountryId }, { hover: false });
      hoveredCountryId = null;
      popup.remove();
    });
    map.on('mousemove', 'highlight-fill', (event) => {
      const feature = event.features[0];
      const country = feature.properties;
      if (hoveredCountryId && hoveredCountryId !== feature.id) map.setFeatureState({ source: 'highlighted-countries', id: hoveredCountryId }, { hover: false });
      hoveredCountryId = feature.id;
      map.setFeatureState({ source: 'highlighted-countries', id: hoveredCountryId }, { hover: true });
      popup.setLngLat(event.lngLat).setHTML(`<p class="popup-title">${country.name}</p><a class="popup-link" href="${country.url}">Explore market <span>→</span></a>`).addTo(map);
    });
    map.on('click', 'highlight-fill', (event) => {
      if (!document.body.dataset.disableNavigation) window.location.href = event.features[0].properties.url;
    });
  });
}
