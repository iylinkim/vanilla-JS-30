const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;

function handleCheck(e) {
  //check if they had the shift key down
  //and check that they are checking it
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    //go ahead and do what we need
    //loop over every single checkbox
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
        console.log("between checked!");
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  console.log(this.nextElementSibling)
  lastChecked = this;
}

function init() {
  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("click", handleCheck)
  );
}
init();
