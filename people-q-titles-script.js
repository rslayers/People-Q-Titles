(function() {
  // Text patterns to remove and replace
  const replacementPatterns = [
    { pattern: /\bAsian\s|\sAsian\b/gi, replacement: '' }, // Remove "Asian " (with trailing space or preceding space)
    { pattern: /\bPretty\s|\sPretty\b/gi, replacement: '' }, // Remove "Pretty " (with trailing space or preceding space)
    { pattern: /\bGorgeous\s|\sGorgeous\b/gi, replacement: '' }, // Remove "Gorgeous " (with trailing space or preceding space)
    { pattern: /\bJewish\s|\sJewish\b/gi, replacement: '' }, // Remove "Jewish " (with trailing space or preceding space)
    { pattern: /\bJew\s|\sJew\b/gi, replacement: '' }, // Remove "Jew " (with trailing space or preceding space)
    { pattern: /\bMuslim\s|\sMuslim\b/gi, replacement: '' }, // Remove "Muslim " (with trailing space or preceding space)
    { pattern: /\bSexy\s|\sSexy\b/gi, replacement: '' }, // Remove "Sexy " (with trailing space or preceding space)
    { pattern: /\bAttractive\s|\sAttractive\b/gi, replacement: '' }, // Remove "Attractive " (with trailing space or preceding space)
    { pattern: /\bHandsome\s|\sHandsome\b/gi, replacement: '' }, // Remove "Handsome " (with trailing space or preceding space)
    { pattern: /\bBeautiful\s|\sBeautiful\b/gi, replacement: '' }, // Remove "Beautiful " (with trailing space or preceding space)
    { pattern: /\b(African American|African)\s|\s(African American|African)\b/gi, replacement: '' }, // Remove "African American" or "African"
    { pattern: /\bBlack\s|\sBlack\b/gi, replacement: '' }, // Remove "Black " (with trailing space or preceding space)
    { pattern: /\bCaucasian\s|\sCaucasian\b/gi, replacement: '' }, // Remove "Caucasian " (with trailing space or preceding space)
    { pattern: /\bMiddle-Eastern\s|\sMiddle-Eastern\b/gi, replacement: '' }, // Remove "Middle-Eastern " (with trailing space or preceding space)
    { pattern: /\bMiddle Eastern\s|\sMiddle Eastern\b/gi, replacement: '' }, // Remove "Middle Eastern " (with trailing space or preceding space)
    { pattern: /\bIndian\s|\sIndian\b/gi, replacement: '' }, // Remove "Indian " (with trailing space or preceding space)
    { pattern: /\bMulti-Ethnic\s|\sMulti-Ethnic\b/gi, replacement: '' }, // Remove "Multi-Ethnic " (with trailing space or preceding space)
    { pattern: /\bMultiethnic\s|\sMultiethnic\b/gi, replacement: '' }, // Remove "Multiethnic " (with trailing space or preceding space)
    { pattern: /\bMultiracial\s|\sMultiracial\b/gi, replacement: '' }, // Remove "Multiracial " (with trailing space or preceding space)
    { pattern: /\bMixed Race\s|\sMixed Race\b/gi, replacement: '' }, // Remove "Mixed Race " (with trailing space or preceding space)
    { pattern: /\bBiracial\s|\sBiracial\b/gi, replacement: '' }, // Remove "Biracial " (with trailing space or preceding space)
    { pattern: /\bArab\s|\sArab\b/gi, replacement: '' }, // Remove "Arab " (with trailing space or preceding space)
    { pattern: /\bArabic\s|\sArabic\b/gi, replacement: '' }, // Remove "Arabic " (with trailing space or preceding space)
    { pattern: /\bLatin\s|\sLatin\b/gi, replacement: '' },
    { pattern: /\bLatino\s|\sLatino\b/gi, replacement: '' },
    { pattern: /\bLatina\s|\sLatina\b/gi, replacement: '' },
    { pattern: /boy/gi, replacement: 'Kid' }, // Replace "boy" with "Kid"
    
    // Updated rules for "Girl" to "Woman" replacement only if "Woman" doesn't exist already
    {
      pattern: /(^|\s)Girl($|\s)/g,
      replacement: (match, p1, p2, offset, string) => {
        if (string.includes('Woman')) {
          // If "Woman" exists in the string, remove "Girl" and adjust spaces accordingly
          if (p1 === ' ' && p2 === ' ') {
            return ' '; // Remove both spaces if "Girl" is in the middle
          } else if (p1 === ' ' && p2 === '') {
            return ''; // Remove space after "Girl" if "Girl" is at the start
          } else if (p1 === '' && p2 === ' ') {
            return ''; // Remove space before "Girl" if "Girl" is at the end
          }
          return ''; // Just remove "Girl" without replacing
        } else {
          // If "Woman" doesn't exist in the string, replace "Girl" with "Woman" and handle spaces
          if (p1 === ' ' && p2 === ' ') {
            return ' Woman '; // Middle of the title, replace with "Woman" and keep spaces intact
          } else if (p1 === ' ' && p2 === '') {
            return ' Woman'; // Start of the title, replace "Girl" with "Woman" without extra space after it
          } else if (p1 === '' && p2 === ' ') {
            return 'Woman '; // End of the title, replace "Girl" with "Woman" without extra space before it
          }
          return `${p1}Woman${p2}`; // Default case: replace with "Woman" and maintain original spaces
        }
      }
    },
    
    // New rule: Check for "Albino" and add "With Albinism" after the next word, also remove "Albino"
    {
      pattern: /\bAlbino\s(\S+)/g,  // Match "Albino" followed by any non-whitespace character (word)
      replacement: (match, p1) => {
        return `Woman With Albinism`; // Replace with "Woman With Albinism"
      }
    }
  ];

  // Function to simulate hover
  function simulateHover(element) {
    if (element) {
      const event = new MouseEvent('mouseover', { bubbles: true, cancelable: true });
      element.dispatchEvent(event);
    } else {
      console.error('Element for hover not found.');
    }
  }

  // Function to simulate click
  function simulateClick(element) {
    if (element) {
      element.click();
    } else {
      console.error('Element for click not found.');
    }
  }

  // Function to update the text field
  function updateTextField(submission) {
    const textField = submission.querySelector('.form__item.form__item-name textarea[name="name"]');
    if (textField) {
      console.log('Original text field content:', textField.value);

      // Apply all replacement patterns to the text field value
      let updatedText = textField.value;
      replacementPatterns.forEach(({ pattern, replacement }) => {
        updatedText = updatedText.replace(pattern, replacement);
      });

      // Update the text field if changes are made
      if (textField.value !== updatedText) {
        textField.value = updatedText;

        // Dispatch an "input" event to ensure the change is recognized
        const inputEvent = new Event('input', { bubbles: true, cancelable: true });
        textField.dispatchEvent(inputEvent);

        console.log('Updated text field content:', updatedText);
      } else {
        console.log('No matching text found to replace/remove. Current content:', textField.value);
      }
    } else {
      console.error('Text field not found for submission.');
    }
  }

  // Select all submission elements
  const submissions = document.querySelectorAll('div.submissions > div');
  console.log('Found', submissions.length, 'submissions on the page.');

  if (submissions.length === 0) {
    console.error('No submissions found on the page.');
    return;
  }

  // Loop through each submission and process it
  submissions.forEach(function(submission, index) {
    console.log('Processing submission', index + 1);

    // Check if the checkbox is checked
    const checkbox = submission.querySelector('input[type="checkbox"][name="cb[]"]');
    const isChecked = checkbox && checkbox.checked;

    if (isChecked) {
      // Hover over the cog icon to reveal the "Edit Submission" link
      const cogIcon = submission.querySelector('.icon--prefs');
      if (cogIcon) {
        console.log('Hovering over cog icon for submission', index + 1);
        simulateHover(cogIcon);

        // Wait a small amount of time and then click the "Edit Submission" link
        setTimeout(function() {
          const editButton = submission.querySelector('a[href="#"] .icon--edit');
          if (editButton) {
            console.log('Clicking edit button for submission', index + 1);
            simulateClick(editButton);

            // Wait for text field to appear
            setTimeout(function() {
              updateTextField(submission);
            }, 2500); // Adjust timeout to ensure text field is loaded
          } else {
            console.error('Edit button not found for submission', index + 1);
          }
        }, 1000); // Adjust timeout before clicking edit
      } else {
        console.error('Cog icon not found for submission', index + 1);
      }
    } else {
      console.log('Skipping submission', index + 1, 'because the checkbox is not checked.');
    }
  });
})();
