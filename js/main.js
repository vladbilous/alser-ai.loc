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

});
