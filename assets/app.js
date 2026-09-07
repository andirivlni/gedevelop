/**
 * GEDEVELOP - Clean & Minimalist Interactive Controller
 */

const GEDEVELOP_CONFIG = {
  phone: "6281234567890", // Ganti dengan nomor WhatsApp aktif (tanpa tanda + atau spasi)
  brandName: "GEDEVELOP"
};

// Format Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

// Open WhatsApp
function openWhatsApp(message) {
  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/${GEDEVELOP_CONFIG.phone}?text=${encodedMsg}`;
  window.open(waUrl, '_blank');
}

// WhatsApp Order Package
function orderPackage(packageName, packagePrice, timeline) {
  const message = `Halo ${GEDEVELOP_CONFIG.brandName},\n\nSaya ingin memesan layanan pembuatan website:\n\n*Paket:* ${packageName}\n*Harga:* ${packagePrice}\n*Estimasi Pengerjaan:* ${timeline}\n\nMohon informasi prosedur dan langkah selanjutnya. Terima kasih.`;
  openWhatsApp(message);
}

// WhatsApp Order Addon
function orderAddon(addonName, addonPrice) {
  const message = `Halo ${GEDEVELOP_CONFIG.brandName},\n\nSaya ingin memesan Layanan Tambahan (Add-On):\n\n*Layanan:* ${addonName}\n*Biaya:* ${addonPrice}\n\nMohon konfirmasi ketersediaan dan detailnya. Terima kasih.`;
  openWhatsApp(message);
}

// Custom App Inquiry
function consultCustomApp() {
  const message = `Halo ${GEDEVELOP_CONFIG.brandName},\n\nSaya ingin berkonsultasi mengenai pembuatan *Custom Web App / Sistem Khusus*.\n\nRingkasan kebutuhan:\n- Deskripsi singkat: ...\n- Target waktu: ...\n\nMohon arahan untuk sesi diskusi teknis. Terima kasih.`;
  openWhatsApp(message);
}

// Calculator State
const calculatorData = {
  selectedPackage: {
    name: "Starter Portfolio",
    price: 150000,
    category: "Personal Portfolio"
  },
  addons: {
    domain: { name: "Setup Domain & DNS", price: 75000, selected: false },
    resume: { name: "Downloadable Resume (PDF)", price: 50000, selected: false },
    payment: { name: "Integrasi Payment Gateway", price: 350000, selected: false },
    maintenance: { name: "Maintenance & Backup Bulanan", price: 150000, selected: false },
    revision: { name: "Revisi Tambahan Ekstra", price: 50000, count: 0, selected: false }
  }
};

// Update Calculator
function updateCalculator() {
  let total = calculatorData.selectedPackage.price;
  const breakdownList = document.getElementById('calc-breakdown-items');
  if (!breakdownList) return;

  breakdownList.innerHTML = '';

  // Main Package
  const pkgLi = document.createElement('li');
  pkgLi.className = 'flex justify-between items-center text-xs py-2 border-b border-zinc-200/70 text-zinc-700';
  pkgLi.innerHTML = `
    <span class="font-medium text-zinc-800">${calculatorData.selectedPackage.name}</span>
    <span class="font-bold text-brand-700">${formatRupiah(calculatorData.selectedPackage.price)}</span>
  `;
  breakdownList.appendChild(pkgLi);

  // Addons
  Object.keys(calculatorData.addons).forEach(key => {
    const item = calculatorData.addons[key];
    if (item.selected) {
      let itemPrice = item.price;
      let label = item.name;
      if (key === 'revision' && item.count > 0) {
        itemPrice = item.price * item.count;
        label = `Revisi Tambahan (${item.count}x)`;
      }

      total += itemPrice;

      const li = document.createElement('li');
      li.className = 'flex justify-between items-center text-xs py-2 border-b border-zinc-200/70 text-zinc-600';
      li.innerHTML = `
        <span>+ ${label}</span>
        <span class="font-semibold text-zinc-800">+${formatRupiah(itemPrice)}</span>
      `;
      breakdownList.appendChild(li);
    }
  });

  // Update Total
  const totalDisplay = document.getElementById('calc-total-display');
  if (totalDisplay) {
    totalDisplay.textContent = formatRupiah(total);
  }
}

// Send Calculator Order
function sendCalculatorOrder() {
  let message = `Halo ${GEDEVELOP_CONFIG.brandName},\n\nSaya telah melakukan simulasi perhitungan melalui Kalkulator Biaya di website:\n\n`;
  message += `*Paket Utama:* ${calculatorData.selectedPackage.name} (${formatRupiah(calculatorData.selectedPackage.price)})\n`;

  let hasAddons = false;
  let total = calculatorData.selectedPackage.price;

  Object.keys(calculatorData.addons).forEach(key => {
    const item = calculatorData.addons[key];
    if (item.selected) {
      if (!hasAddons) {
        message += `\n*Layanan Tambahan (Add-Ons):*\n`;
        hasAddons = true;
      }
      let itemPrice = item.price;
      let label = item.name;
      if (key === 'revision' && item.count > 0) {
        itemPrice = item.price * item.count;
        label = `Revisi Tambahan (${item.count}x)`;
      }
      total += itemPrice;
      message += `• ${label}: +${formatRupiah(itemPrice)}\n`;
    }
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*TOTAL ESTIMASI:* ${formatRupiah(total)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `Mohon informasi untuk konsultasi lebih lanjut. Terima kasih.`;

  openWhatsApp(message);
}

// Contact Form Handler
function handleContactForm(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const category = document.getElementById('contact-category').value;
  const notes = document.getElementById('contact-notes').value.trim();

  if (!name) {
    alert('Mohon masukkan nama Anda.');
    return;
  }

  let message = `Halo ${GEDEVELOP_CONFIG.brandName},\n\nSaya ingin berkonsultasi mengenai pembuatan website:\n\n`;
  message += `*Nama:* ${name}\n`;
  message += `*Kategori:* ${category}\n`;
  if (notes) {
    message += `*Catatan Kebutuhan:* ${notes}\n`;
  }
  message += `\nMohon info jadwal dan langkah selanjutnya. Terima kasih.`;

  openWhatsApp(message);
}

// DOM Setup
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Filter Tabs
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  const pricingCards = document.querySelectorAll('.pricing-category-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      pricingCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Calculator Package Select
  const packageSelect = document.getElementById('calc-package-select');
  if (packageSelect) {
    packageSelect.addEventListener('change', (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      calculatorData.selectedPackage = {
        name: selectedOption.getAttribute('data-name'),
        price: parseInt(selectedOption.value, 10),
        category: selectedOption.getAttribute('data-category')
      };
      updateCalculator();
    });
  }

  // Addon Checkboxes
  const addonCheckboxes = document.querySelectorAll('.calc-addon-check');
  addonCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const key = e.target.getAttribute('data-addon-key');
      if (calculatorData.addons[key]) {
        calculatorData.addons[key].selected = e.target.checked;
        if (key === 'revision') {
          const revCountInput = document.getElementById('calc-revision-count');
          calculatorData.addons.revision.count = e.target.checked ? Math.max(1, parseInt(revCountInput?.value || 1, 10)) : 0;
          if (revCountInput) revCountInput.disabled = !e.target.checked;
        }
      }
      updateCalculator();
    });
  });

  // Revision Count
  const revisionCountInput = document.getElementById('calc-revision-count');
  if (revisionCountInput) {
    revisionCountInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) || 1;
      calculatorData.addons.revision.count = Math.max(1, val);
      updateCalculator();
    });
  }

  // FAQ Accordion
  const accordionButtons = document.querySelectorAll('.accordion-toggle');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.accordion-chevron');
      const isOpen = !content.classList.contains('hidden');

      document.querySelectorAll('.accordion-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.accordion-chevron').forEach(i => i.classList.remove('rotate-180'));

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });

  // Initial Calculation
  updateCalculator();

  // Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
