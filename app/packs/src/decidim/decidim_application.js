// This file is compiled inside Decidim core pack. Code can be added here and will be executed
// as part of that pack

// Load images
// require.context("../../images", true)
require.context("../../images", true)

/*
added Piero Chiussi
31.3.2022
  
source
https://github.com/quilljs/quill/issues/1173

Solve accessibility issue of Quill Editor by setting aria-label to the buttons
*/

function applyAccessibilityHacks() {

	// Get ref to the toolbar, its not available through the quill api ughh
	const query = document.getElementsByClassName('ql-toolbar');
	if (query.length !== 1) {
		// No toolbars found OR multiple which is not what we expect either
		return;
	}

	const toolBar = query[0];

	// apply aria labels to base buttons
	const buttons = toolBar.getElementsByTagName('button');
	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i];
		const className = button.getAttribute('class').toLowerCase();

		if (className.indexOf('bold') >= 0) {
			button.setAttribute('aria-label', 'Fett formatieren');
      		button.setAttribute('title', 'Fett formatieren');
		} else if (className.indexOf('italic') >= 0) {
			button.setAttribute('aria-label', 'Kursiv formatieren');
      		button.setAttribute('title', 'Kursiv formatieren');
		} else if (className.indexOf('underline') >= 0) {
			button.setAttribute('aria-label', 'Unterstreichen');
      		button.setAttribute('title', 'Unterstreichen');
    	} else if (className.indexOf('linebreak') >= 0) {
			button.setAttribute('aria-label', 'Zeilenumbruch hinzufügen');
      		button.setAttribute('title', 'Zeilenumbruch hinzufügen');
		} else if (className.indexOf('blockquote') >= 0) {
			button.setAttribute('aria-label', 'Zitat einfügen');
      		button.setAttribute('title', 'Zitat einfügen');
		} else if (className.indexOf('list') >= 0 && button.value === 'ordered') {
			button.setAttribute('aria-label', 'Geordnete Liste');
      		button.setAttribute('title', 'Geordnete Liste');
		} else if (className.indexOf('list') >= 0 && button.value === 'bullet') {
			button.setAttribute('aria-label', 'Ungeordnete Liste einfügen');
      		button.setAttribute('title', 'Ungeordnete Liste einfügen');
		} else if (className.indexOf('link') >= 0) {
			button.setAttribute('aria-label', 'Link einfügen');
      		button.setAttribute('title', 'Link einfügen');
		} else if (className.indexOf('clean') >= 0) {
			button.setAttribute('aria-label', 'Formatierung entfernen');
      		button.setAttribute('title', 'Formatierung entfernen');
		} else if (className.indexOf('code') >= 0) {
			button.setAttribute('aria-label', 'Als Code darstellen');
      		button.setAttribute('title', 'Als Code darstellen');
		} else if (className.indexOf('indent') >= 0 && button.value === '+1') {
			button.setAttribute('aria-label', ' Absatz einrücken');
      		button.setAttribute('title', ' Absatz einrücken');
		} else if (className.indexOf('indent') >= 0 && button.value === '-1') {
			button.setAttribute('aria-label', 'Absatzeinzug verringern');
      		button.setAttribute('title', 'Absatzeinzug verringern');
		} else if (className.indexOf('video') >= 0) {
			button.setAttribute('aria-label', 'Video einfügen');
      		button.setAttribute('title', 'Video einfügen');
		}
	}

	// Make pickers work with keyboard and apply aria labels
	//FIXME: When you open a submenu with the keyboard and close it with the mouse by click somewhere else, the menu aria-hidden value is incorrectly left to `false`
	const pickers = toolBar.getElementsByClassName('ql-picker');
	for (let i = 0; i < pickers.length; i++) {
		const picker = pickers[i];

		const label = picker.getElementsByClassName('ql-picker-label')[0];
		const optionsContainer = picker.getElementsByClassName('ql-picker-options')[0];
		const options = optionsContainer.getElementsByClassName('ql-picker-item');

		label.setAttribute('role', 'button');
		label.setAttribute('aria-haspopup', 'true');
		label.setAttribute('tabindex', '0');

		if (i === 0) {
			// HACK ALERT
			// This is our size select box.. Works for us as we only have the one drop box
			label.setAttribute('aria-label', 'Font Size');
		}

		optionsContainer.setAttribute('aria-hidden', 'true');
		optionsContainer.setAttribute('aria-label', 'submenu');

		for (let x = 0; x < options.length; x++) {
			const item = options[x];
			item.setAttribute('tabindex', '0');
			item.setAttribute('role', 'button');

			// Read the css 'content' values and generate aria labels
			const size = window.getComputedStyle(item, ':before').content.replace('\"', '');
			item.setAttribute('aria-label', size);
			item.addEventListener('keyup', (e) => {
				if (e.keyCode === 13) {
					item.click();
					optionsContainer.setAttribute('aria-hidden', 'true');
				}
			});
		}

		label.addEventListener('keyup', (e) => {
			if (e.keyCode === 13) {
				label.click();
				optionsContainer.setAttribute('aria-hidden', 'false');
			}
		});
	}
}

/*
$(document).ready(function(){
    applyAccessibilityHacks();
});
*/

/* solve share button problems */
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
window.SocialShareButton = {
    openUrl(url, width, height) {
      if (width === null) { width = 640; }
      if (height === null) { height = 480; }
      const left = (screen.width / 2) - (width / 2);
      const top = (screen.height * 0.3) - (height / 2);
      const opt = `width=${width},height=${height},left=${left},top=${top},menubar=no,status=no,location=no`;
      window.open(url, 'popup', opt);
      return false;
    },
  
    share(el) {
      if (el.getAttribute === null) {
        el = document.querySelector(el);
      }
  
      const site = el.getAttribute("data-site");
      const appkey = el.getAttribute("data-appkey") || '';
      const $parent = el.parentNode;
      let title = encodeURIComponent(el.getAttribute("data-" + site + "-title") || $parent.getAttribute('data-title') || '');
      const img = encodeURIComponent($parent.getAttribute("data-img") || '');
      let url = encodeURIComponent($parent.getAttribute("data-url") || '');
      const via = encodeURIComponent($parent.getAttribute("data-via") || '');
      const desc = encodeURIComponent($parent.getAttribute("data-desc") || ' ');
  
      // tracking click events if google analytics enabled
      const ga = window[window['GoogleAnalyticsObject'] || 'ga'];
      if (typeof ga === 'function') {
        ga('send', 'event', 'Social Share Button', 'click', site);
      }
  
      if (url.length === 0) {
        url = encodeURIComponent(location.href);
      }
      switch (site) {
        case "email":
          location.href = `mailto:?subject=${title}&body=${url}`;
          break;
        case "weibo":
          SocialShareButton.openUrl(`http://service.weibo.com/share/share.php?url=${url}&type=3&pic=${img}&title=${title}&appkey=${appkey}`, 620, 370);
          break;
        case "twitter":
          var hashtags = encodeURIComponent(el.getAttribute("data-" + site + "-hashtags") || $parent.getAttribute("data-hashtags") || '');
          var via_str = '';
          if (via.length > 0) { via_str = `&via=${via}`; }
          SocialShareButton.openUrl(`https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${hashtags}${via_str}`, 650, 300);
          break;
        case "douban":
          SocialShareButton.openUrl(`http://shuo.douban.com/!service/share?href=${url}&name=${title}&image=${img}&sel=${desc}`, 770, 470);
          break;
        case "facebook":
          SocialShareButton.openUrl(`http://www.facebook.com/sharer/sharer.php?u=${url}`, 555, 400);
          break;
        case "qq":
          SocialShareButton.openUrl(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&pics=${img}&summary=${desc}&site=${appkey}`);
          break;
        case "google_bookmark":
          SocialShareButton.openUrl(`https://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=${url}&title=${title}`);
          break;
        case "delicious":
          SocialShareButton.openUrl(`https://del.icio.us/save?url=${url}&title=${title}&jump=yes&pic=${img}`);
          break;
        case "pinterest":
          SocialShareButton.openUrl(`http://www.pinterest.com/pin/create/button/?url=${url}&media=${img}&description=${title}`);
          break;
        case "linkedin":
          SocialShareButton.openUrl(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${desc}`);
          break;
        case "xing":
          SocialShareButton.openUrl(`https://www.xing.com/spi/shares/new?url=${url}`);
          break;
        case "vkontakte":
          SocialShareButton.openUrl(`http://vk.com/share.php?url=${url}&title=${title}&image=${img}`);
          break;
        case "odnoklassniki":
          SocialShareButton.openUrl(`https://connect.ok.ru/offer?url=${url}&title=${title}&description=${desc}&imageUrl=${img}`);
          break;
        case "wechat":
          if (!window.SocialShareWeChatButton) { throw new Error("You should require social-share-button/wechat to your application.js"); }
          window.SocialShareWeChatButton.qrcode({
            url: decodeURIComponent(url),
            header: el.getAttribute('title'),
            footer: el.getAttribute("data-wechat-footer")
          });
          break;
  
        case "tumblr":
          var get_tumblr_extra = function(param) {
            const cutom_data = el.getAttribute(`data-${param}`);
            if (cutom_data) { return encodeURIComponent(cutom_data); }
          };
  
          var tumblr_params = function() {
            const path = get_tumblr_extra('type') || 'link';
  
            const params = (() => { switch (path) {
              case 'text':
                title = get_tumblr_extra('title') || title;
                return `title=${title}`;
              case 'photo':
                title = get_tumblr_extra('caption') || title;
                var source = get_tumblr_extra('source') || img;
                return `caption=${title}&source=${source}`;
              case 'quote':
                var quote = get_tumblr_extra('quote') || title;
                source = get_tumblr_extra('source') || '';
                return `quote=${quote}&source=${source}`;
              default: // actually, it's a link clause
                title = get_tumblr_extra('title') || title;
                url = get_tumblr_extra('url') || url;
                return `name=${title}&url=${url}`;
            } })();
  
  
            return `/${path}?${params}`;
          };
  
          SocialShareButton.openUrl(`http://www.tumblr.com/share${tumblr_params()}`);
          break;
  
        case "reddit":
          SocialShareButton.openUrl(`http://www.reddit.com/submit?url=${url}&newwindow=1`, 555, 400);
          break;
        case "hacker_news":
          SocialShareButton.openUrl(`http://news.ycombinator.com/submitlink?u=${url}&t=${title}`, 770, 500);
          break;
        case "telegram":
          SocialShareButton.openUrl(`https://telegram.me/share/url?text=${title}&url=${url}`);
          break;
        case "whatsapp_app":
          var whatsapp_app_url = `whatsapp://send?text=${title}%0A${url}`;
          window.open(whatsapp_app_url, '_top');
          break;
        case "whatsapp_web":
          SocialShareButton.openUrl(`https://web.whatsapp.com/send?text=${title}%0A${url}`);
          break;
      }
      return false;
    }
  };