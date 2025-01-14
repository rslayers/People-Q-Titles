(function() {
  // Text patterns to remove and replace
  const replacementPatterns = [
    { pattern: /\bAsian\s|\sAsian\b/gi, replacement: '' }, // Remove "Asian " (with trailing space or preceding space)
    { pattern: /\bBeautiful\s|\sBeautiful\b/gi, replacement: '' }, // Remove "Beautiful " (with trailing space or preceding space)
    { pattern: /\bGirl\b/g, replacement: 'Woman' }, // Replace "Girl" with "Woman" (no space issues)
    { pattern: /\bGirl\s/g, replacement: 'Woman ' }, // Replace "Girl " at the beginning or middle with "Woman "
    { pattern: /\sGirl\b/g, replacement: ' Woman' }, // Replace " Girl" at the end with " Woman"
    { pattern: /\b(African American|African)\s|\s(African American|African)\b/gi, replacement: '' },
    { pattern: /\bBlack\s|\sBlack\b/gi, replacement: '' }, // Remove "Black " (with trailing space or preceding space)
    { pattern: /\bCaucasian\s|\sCaucasian\b/gi, replacement: '' }, // Remove "Caucasian " (with trailing space or preceding space)
    { pattern: /boy/gi, replacement: 'Kid' } // Replace "boy" with "Kid"
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
