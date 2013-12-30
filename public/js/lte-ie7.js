/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-location' : '&#xe000;',
			'icon-location-2' : '&#xe001;',
			'icon-compass' : '&#xe002;',
			'icon-phone' : '&#xe003;',
			'icon-coin' : '&#xe004;',
			'icon-cart' : '&#xe005;',
			'icon-cart-2' : '&#xe006;',
			'icon-home' : '&#xe007;',
			'icon-newspaper' : '&#xe008;',
			'icon-image' : '&#xe009;',
			'icon-image-2' : '&#xe00a;',
			'icon-images' : '&#xe00b;',
			'icon-camera' : '&#xe00c;',
			'icon-play' : '&#xe00d;',
			'icon-film' : '&#xe00e;',
			'icon-tag' : '&#xe00f;',
			'icon-tags' : '&#xe010;',
			'icon-qrcode' : '&#xe011;',
			'icon-ticket' : '&#xe012;',
			'icon-map' : '&#xe013;',
			'icon-map-2' : '&#xe014;',
			'icon-calendar' : '&#xe015;',
			'icon-calendar-2' : '&#xe016;',
			'icon-bubbles' : '&#xe017;',
			'icon-user' : '&#xe018;',
			'icon-users' : '&#xe019;',
			'icon-users-2' : '&#xe01a;',
			'icon-user-2' : '&#xe01b;',
			'icon-search' : '&#xe01c;',
			'icon-stats' : '&#xe01d;',
			'icon-bars' : '&#xe01e;',
			'icon-heart' : '&#xe01f;',
			'icon-heart-2' : '&#xe020;',
			'icon-thumbs-up' : '&#xe021;',
			'icon-thumbs-up-2' : '&#xe022;',
			'icon-smiley' : '&#xe023;',
			'icon-smiley-2' : '&#xe024;',
			'icon-sad' : '&#xe025;',
			'icon-sad-2' : '&#xe026;',
			'icon-close' : '&#xe027;',
			'icon-checkmark' : '&#xe028;',
			'icon-facebook' : '&#xe029;',
			'icon-twitter' : '&#xe02a;',
			'icon-youtube' : '&#xe02b;',
			'icon-facebook-2' : '&#xe02c;',
			'icon-twitter-2' : '&#xe02d;',
			'icon-instagram' : '&#xe02e;',
			'icon-facebook-3' : '&#xe02f;',
			'icon-twitter-3' : '&#xe030;',
			'icon-paypal' : '&#xe031;',
			'icon-paypal-2' : '&#xe032;',
			'icon-skype' : '&#xe033;',
			'icon-credit' : '&#xe034;',
			'icon-profile' : '&#xe035;',
			'icon-shield' : '&#xe036;',
			'icon-star' : '&#xe037;',
			'icon-star-2' : '&#xe038;',
			'icon-star-3' : '&#xe039;',
			'icon-safari' : '&#xe03a;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};