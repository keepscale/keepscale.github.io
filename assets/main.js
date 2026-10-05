// KeepScale — interactions légères, sans dépendance ni appel externe
(function () {
	'use strict';

	var header = document.querySelector('.site-header');
	var toggle = document.querySelector('.nav-toggle');
	var nav = document.getElementById('menu');

	// Ombre de l'en-tête au défilement
	if (header) {
		var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
	}

	// Menu mobile
	if (toggle && nav) {
		var setOpen = function (open) {
			toggle.setAttribute('aria-expanded', String(open));
			nav.classList.toggle('is-open', open);
		};
		toggle.addEventListener('click', function () {
			setOpen(toggle.getAttribute('aria-expanded') !== 'true');
		});
		nav.addEventListener('click', function (e) {
			if (e.target.closest('a')) setOpen(false);
		});
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
		});
	}

	// Apparition progressive des blocs
	var reveals = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					io.unobserve(entry.target);
				}
			});
		}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
		reveals.forEach(function (el, i) {
			// Léger décalage entre éléments voisins d'une même grille
			var siblings = el.parentElement ? el.parentElement.querySelectorAll(':scope > .reveal') : [];
			var index = Array.prototype.indexOf.call(siblings, el);
			if (index > 0) el.style.transitionDelay = Math.min(index, 5) * 70 + 'ms';
			io.observe(el);
		});
	} else {
		reveals.forEach(function (el) { el.classList.add('is-visible'); });
	}

	// Lien de menu actif selon la section visible
	var links = nav ? nav.querySelectorAll('a[href^="#"]') : [];
	if (links.length && 'IntersectionObserver' in window) {
		var byId = {};
		links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				var link = byId[entry.target.id];
				if (link && entry.isIntersecting) {
					links.forEach(function (a) { a.removeAttribute('aria-current'); });
					link.setAttribute('aria-current', 'true');
				}
			});
		}, { rootMargin: '-45% 0px -50% 0px' });
		Object.keys(byId).forEach(function (id) {
			var section = document.getElementById(id);
			if (section) spy.observe(section);
		});
	}

	// Année du pied de page
	var year = document.querySelector('[data-year]');
	if (year) year.textContent = new Date().getFullYear();
})();
