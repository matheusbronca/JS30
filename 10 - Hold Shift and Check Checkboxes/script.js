const $$ = document.querySelectorAll.bind(document);

const $checkboxes = $$('input[type="checkbox"]');

let lastChecked;

function handleCheck(e) {
  //Check if they had the shift key down;
  // And check that they are checking it;
  let inBetween = false;

  if (e.shiftKey && this.checked) {
    // Looping over every single checkbox

    $checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if(inBetween) checkbox.checked = true;
    });
  }

     lastChecked = this;
    console.log(lastChecked);

}

$checkboxes.forEach((checkbox) => (checkbox.onclick = handleCheck));
