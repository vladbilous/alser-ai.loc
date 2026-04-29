document.addEventListener('DOMContentLoaded', () => {
  // --- HERO SLIDER ---
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Жалюзі, Штори, Ролети<br>У Києві за 3 дні",
      subtitle: "Виробництво і установка 190 видів виробів під ключ з сертифікованих матеріалів"
    },
    {
      image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Ідеальний захист від сонця<br>Для вашого дому",
      subtitle: "Широкий асортимент тканин та систем для будь-якого інтер'єру"
    },
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Автоматичні системи<br>Керуйте з комфортом",
      subtitle: "Сучасна автоматика для штор та ролет з інтеграцією в розумний дім"
    }
  ];
  
  const heroBg = document.querySelector('.hero__bg');
  const heroTitle = document.querySelector('.hero__title');
  const heroSubtitle = document.querySelector('.hero__subtitle');
  const dots = document.querySelectorAll('.slide-dot');
  let currentSlide = 0;
  
  if (heroBg && dots.length > 0) {
    function changeSlide(index) {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      
      // Fade out background and text
      heroBg.style.opacity = '0.3';
      heroTitle.style.opacity = '0';
      heroSubtitle.style.opacity = '0';
      
      setTimeout(() => {
        // Change content
        heroBg.src = slides[index].image;
        heroTitle.innerHTML = slides[index].title;
        heroSubtitle.innerHTML = slides[index].subtitle;
        
        // Fade back in
        heroBg.style.opacity = '1';
        heroTitle.style.opacity = '1';
        heroSubtitle.style.opacity = '0.9'; // keeping the slight opacity from original CSS
        
        currentSlide = index;
      }, 300);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (currentSlide !== index) {
          changeSlide(index);
        }
      });
    });

    setInterval(() => {
      let nextSlide = (currentSlide + 1) % slides.length;
      changeSlide(nextSlide);
    }, 6000);
  }

  // --- Q&A ACCORDION ---
  const qaItems = document.querySelectorAll('.qa-item');
  
  qaItems.forEach(item => {
    const header = item.querySelector('.qa-item__header');
    
    header.addEventListener('click', () => {
      const currentActive = document.querySelector('.qa-item.active');
      if (currentActive && currentActive !== item) {
        currentActive.classList.remove('active');
        currentActive.querySelector('.qa-item__body').style.display = 'none';
        currentActive.querySelector('.qa-item__icon i').className = 'fa-solid fa-plus';
      }
      
      item.classList.toggle('active');
      const body = item.querySelector('.qa-item__body');
      const icon = item.querySelector('.qa-item__icon i');
      
      if (item.classList.contains('active')) {
        body.style.display = 'block';
        icon.className = 'fa-solid fa-xmark';
      } else {
        body.style.display = 'none';
        icon.className = 'fa-solid fa-plus';
      }
    });
  });

  // --- DRAG TO SCROLL UTILITY ---
  function enableDragToScroll(slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
    
    // Init cursor
    slider.style.cursor = 'grab';
  }

  // --- REPUTATION TABS ---
  const tabCerts = document.getElementById('tab-certs');
  const tabThanks = document.getElementById('tab-thanks');
  const sliderCerts = document.getElementById('slider-certs');
  const sliderThanks = document.getElementById('slider-thanks');

  if (tabCerts && tabThanks && sliderCerts && sliderThanks) {
    tabCerts.addEventListener('click', () => {
      tabCerts.classList.add('active');
      tabThanks.classList.remove('active');
      sliderCerts.style.display = 'flex';
      sliderThanks.style.display = 'none';
    });

    tabThanks.addEventListener('click', () => {
      tabThanks.classList.add('active');
      tabCerts.classList.remove('active');
      sliderThanks.style.display = 'flex';
      sliderCerts.style.display = 'none';
    });

    enableDragToScroll(sliderCerts);
    enableDragToScroll(sliderThanks);

    const sliderReviews = document.getElementById('slider-reviews');
    if (sliderReviews) {
      enableDragToScroll(sliderReviews);
    }
  }

  // --- MAP SECTION ---
  const mapLocationsSlider = document.getElementById('map-locations-slider');
  if (mapLocationsSlider) {
    enableDragToScroll(mapLocationsSlider);
  }

  const mapLocations = document.querySelectorAll('.map-loc');
  const mainMapIframe = document.getElementById('main-map-iframe');

  if (mapLocations.length > 0 && mainMapIframe) {
    mapLocations.forEach(loc => {
      loc.addEventListener('click', () => {
        // Remove active class from all
        mapLocations.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked
        loc.classList.add('active');
        
        // Update iframe source
        const newUrl = loc.getAttribute('data-map-url');
        if (newUrl) {
          mainMapIframe.src = newUrl;
        }
      });
    });
  }

  // --- SEO TEXT READ MORE / LESS ---
  const seoReadMore = document.getElementById('seo-read-more');
  const seoReadLess = document.getElementById('seo-read-less');
  const seoHiddenText = document.getElementById('seo-hidden-text');

  if (seoReadMore && seoReadLess && seoHiddenText) {
    seoReadMore.addEventListener('click', (e) => {
      e.preventDefault();
      seoHiddenText.style.display = 'block';
      seoReadMore.style.display = 'none';
    });

    seoReadLess.addEventListener('click', (e) => {
      e.preventDefault();
      seoHiddenText.style.display = 'none';
      seoReadMore.style.display = 'inline-block';
    });
  }

  // --- FANCYBOX INIT ---
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind('[data-fancybox="certs"]', {
      groupAll: true,
      dragToClose: false
    });
    Fancybox.bind('[data-fancybox="thanks"]', {
      groupAll: true,
      dragToClose: false
    });
    Fancybox.bind('[data-fancybox="video-reviews"]', {
      groupAll: true,
      dragToClose: false
    });
  }

  // --- DROPDOWN MENUS ---
  const btnCity = document.getElementById('btn-city');
  const dropdownCity = document.getElementById('dropdown-city');
  const btnMore = document.getElementById('btn-more');
  const dropdownMore = document.getElementById('dropdown-more');

  // Toggle City Dropdown
  if (btnCity && dropdownCity) {
    btnCity.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownCity.classList.toggle('show');
      if (dropdownMore) dropdownMore.classList.remove('show');
    });
  }

  // Toggle More Dropdown
  if (btnMore && dropdownMore) {
    btnMore.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMore.classList.toggle('show');
      if (dropdownCity) dropdownCity.classList.remove('show');
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (dropdownCity && dropdownCity.classList.contains('show') && !dropdownCity.contains(e.target)) {
      dropdownCity.classList.remove('show');
    }
    if (dropdownMore && dropdownMore.classList.contains('show') && !dropdownMore.contains(e.target)) {
      dropdownMore.classList.remove('show');
    }
  });

});
