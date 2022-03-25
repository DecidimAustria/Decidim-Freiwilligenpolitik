/* eslint-disable require-jsdoc */

import lineBreakButtonHandler from "src/decidim/editor/linebreak_module"

const quillFormats = ["bold", "italic", "link", "underline", "header", "list", "video", "image", "alt", "break"];

/*
added Piero Chiussi
20.3.2022

call to funcction applyAccessibilityHacks in decidim_application.js
  
source
https://github.com/quilljs/quill/issues/1173

Solve accessibility issue of Quill Editor by setting aria-label to the buttons
*/

function applyAccessibilityHacks(editor) {

	// Get ref to the toolbar, its not available through the quill api ughh
	const query = editor.container.parentElement.getElementsByClassName('ql-toolbar');
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

export default function createQuillEditor(container) {
  const toolbar = $(container).data("toolbar");
  const disabled = $(container).data("disabled");

  let quillToolbar = [
    ["bold", "italic", "underline", "linebreak"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "clean"]
  ];

  if (toolbar === "full") {
    quillToolbar = [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ...quillToolbar,
      ["video"]
    ];
  } else if (toolbar === "basic") {
    quillToolbar = [
      ...quillToolbar,
      ["video"]
    ];
  }

  const $input = $(container).siblings('input[type="hidden"]');
  container.innerHTML = $input.val() || "";

  const quill = new Quill(container, {
    modules: {
      linebreak: {},
      toolbar: {
        container: quillToolbar,
        handlers: {
          "linebreak": lineBreakButtonHandler
        }
      }
    },
    formats: quillFormats,
    theme: "snow"
  });

  if (disabled) {
    quill.disable();
  }

  quill.on("text-change", () => {
    const text = quill.getText();

    // Triggers CustomEvent with the cursor position
    // It is required in input_mentions.js
    let event = new CustomEvent("quill-position", {
      detail: quill.getSelection()
    });
    container.dispatchEvent(event);

    if (text === "\n" || text === "\n\n") {
      $input.val("");
    } else {
      $input.val(quill.root.innerHTML);
    }
  });

  /*
  added Piero Chiussi
  20.3.2022

  */
  
  applyAccessibilityHacks(quill);

  // After editor is ready, linebreak_module deletes two extraneous new lines
  quill.emitter.emit("editor-ready");

  return quill;
}
