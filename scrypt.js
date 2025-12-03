document.addEventListener("DOMContentLoaded", function () {
  // Бургер-меню навигации
  const toggleButton = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  toggleButton.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    toggleButton.classList.toggle("active");
    if (notifications.getAttribute("hidden") == null) {
      notifications.setAttribute("hidden", "");
    }
  });
  // Скрытие бургер-меню при клике на ссылку
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (navMenu) {
        navMenu.classList.remove("active");
      }
      if (toggleButton) {
        toggleButton.classList.remove("active");
      }
      if (notifications && notifications.getAttribute("hidden") == null) {
        notifications.setAttribute("hidden", "");
      }
    });
  });
  // Скрытие бугрер-меню при клике вне области
  document.addEventListener("click", function (event) {
    const isClickInsideNav = event.target.closest(".nav-container");
    if (!isClickInsideNav && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      toggleButton.classList.remove("active");
      if (notifications.getAttribute("hidden") == null) {
        notifications.setAttribute("hidden", "");
      }
    }
  });

  // Отобразить уведомления
  const notificationButton = document.getElementById("show-notifications");
  const notifications = document.getElementById("notifications");
  notificationButton.addEventListener("click", function () {
    if (notifications.getAttribute("hidden") != null) {
      notifications.removeAttribute("hidden");
    } else {
      notifications.setAttribute("hidden", "");
    }
  });

  // Вывод всплывающих уведомлений
  let popupContainer = null;
  function getPopupContainer() {
    if (!popupContainer) {
      popupContainer = document.createElement("div");
      popupContainer.className = "notification-popup-container";

      popupContainer.style.position = "fixed";
      popupContainer.style.bottom = "20px";
      popupContainer.style.right = "20px";
      popupContainer.style.zIndex = "10";
      popupContainer.style.display = "flex";
      popupContainer.style.flexDirection = "column-reverse";
      popupContainer.style.gap = "10px";

      document.body.appendChild(popupContainer);
    }
    return popupContainer;
  }
  // Отображение уведомления
  window.showNotification = function (options = {}) {
    const container = getPopupContainer();
    const notifDiv = document.createElement("div");

    notifDiv.className = "notification-item";

    notifDiv.style.background = "#ffffff";
    notifDiv.style.padding = "15px 20px";
    notifDiv.style.borderRadius = "8px";
    notifDiv.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
    notifDiv.style.display = "flex";
    notifDiv.style.alignItems = "center";
    notifDiv.style.minWidth = "280px";
    notifDiv.style.fontFamily = "'Manrope', sans-serif";

    notifDiv.style.opacity = "0";
    notifDiv.style.transform = "translateX(20px)";
    notifDiv.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    const iconClass = "bi bi-info-circle";
    const text = options.text || "Новое уведомление!";
    const duration = options.duration || 4000;

    notifDiv.innerHTML = `
    <div class="notification-icon">
      <i class="${iconClass}"></i>
    </div>
    <div class="notification-content">
      <div class="notification-text">${text}</div>
    </div>
    <div class="notification-close">
      &times;
    </div>
  `;

    container.appendChild(notifDiv);

    const closeNotification = () => {
      notifDiv.style.opacity = "0";
      notifDiv.style.transform = "translateX(20px)";

      setTimeout(() => {
        if (notifDiv.parentNode) {
          notifDiv.remove();
        }
      }, 300);
    };

    setTimeout(() => {
      notifDiv.style.opacity = "1";
      notifDiv.style.transform = "translateX(0)";
    }, 10);

    const autoCloseTimer = setTimeout(() => {
      closeNotification();
    }, duration);

    const closeBtn = notifDiv.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      clearTimeout(autoCloseTimer);
      closeNotification();
    });
  };
  // Тестовый вывод уведомления
  setTimeout(() => {
    window.showNotification({
      text: "Новое фото в галерее!",
      duration: 5000,
    });
  }, 1000);
});
