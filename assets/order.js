// APEX ULTRA — smartwatch4u.store
// Collects the delivery details, then hands the visitor off to the
// AdriceNetwork tracking link (offer 1843) so the network's own order
// flow can record and confirm the conversion. A local click id is
// appended as `subid` so orders can be matched back to this page.
//
// IMPORTANT: replace TRACKING_LINK below if the network ever issues a
// new tracking URL / uid for this offer.
(function () {
  var TRACKING_LINK = 'https://offers.adricenetwork.com/?offer=1843&uid=0193c015-ceba-77f7-8889-3105ad6e6519';

  var form = document.getElementById('orderForm');
  var errorBox = document.getElementById('formError');
  var submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  function makeClickId() {
    return 'sw4u-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var fullName = form.fullName.value.trim();
    var phone = form.phone.value.trim();
    var city = form.city.value.trim();
    var address = form.address.value.trim();
    var postcode = form.postcode.value.trim();
    var courier = form.courier.value;

    var phoneOk = /^[0-9+\s()-]{7,}$/.test(phone);
    var valid = fullName.length > 3 && phoneOk && city.length > 1 && address.length > 3;

    if (!valid) {
      errorBox.style.display = 'block';
      errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    errorBox.style.display = 'none';

    var clickId = makeClickId();

    // Keep the lead details locally so the thank-you page (and this
    // browser's session) can show a personalised confirmation once the
    // network redirects back here.
    try {
      sessionStorage.setItem('sw4u_order', JSON.stringify({
        clickId: clickId,
        fullName: fullName,
        phone: phone,
        city: city,
        address: address,
        postcode: postcode,
        courier: courier,
        product: 'APEX ULTRA',
        total: '69,00 €',
        placedAt: new Date().toISOString()
      }));
    } catch (err) {
      /* sessionStorage unavailable — non-blocking */
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Пренасочване…';

    var url = TRACKING_LINK + '&subid=' + encodeURIComponent(clickId);
    window.location.href = url;
  });
})();
