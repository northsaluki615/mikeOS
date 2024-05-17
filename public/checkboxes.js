document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
  
    checkboxes.forEach((checkbox, index) => {
      const savedState = localStorage.getItem(`checkbox-${index}`);
      if (savedState !== null) {
        checkbox.checked = savedState === "true";
      }
  
      checkbox.addEventListener("change", function() {
        localStorage.setItem(`checkbox-${index}`, checkbox.checked);
      });
    });
  });
  