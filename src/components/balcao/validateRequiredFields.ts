export function validateRequiredFields(button: HTMLButtonElement) {
  const section = button.closest<HTMLElement>("[data-required-fields]");
  if (!section) return true;

  const controls = Array.from(section.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select"));

  section.querySelectorAll("label").forEach((label) => {
    if (!label.textContent?.includes("(Necess")) return;

    label.parentElement
      ?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select")
      .forEach((control) => {
        control.required = true;
        if (control instanceof HTMLInputElement && label.textContent?.includes("Email")) {
          control.type = "email";
        }
        if (control instanceof HTMLSelectElement && control.options[0]?.text.includes("Selecione")) {
          control.options[0].value = "";
        }
        setPortugueseValidityMessage(control);
      });
  });

  const firstInvalidControl = controls.find((control) => !control.checkValidity());
  if (!firstInvalidControl) return true;

  firstInvalidControl.reportValidity();
  return false;
}

export function validateAcknowledgements(button: HTMLButtonElement) {
  const section = button.closest<HTMLElement>("[data-required-acknowledgements]");
  if (!section) return true;

  const checkboxes = Array.from(section.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));
  checkboxes.forEach((checkbox) => {
    checkbox.required = true;
    setPortugueseValidityMessage(checkbox, "Por favor, selecione esta opção.");
  });

  const firstUncheckedCheckbox = checkboxes.find((checkbox) => !checkbox.checkValidity());
  if (!firstUncheckedCheckbox) return true;

  firstUncheckedCheckbox.reportValidity();
  return false;
}

function setPortugueseValidityMessage(
  control: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  requiredMessage = "Por favor, preencha este campo.",
) {
  const message = control.validity.valueMissing
    ? requiredMessage
    : control.validity.typeMismatch
      ? "Introduza um endereço de e-mail válido."
      : "";
  control.setCustomValidity(message);
  control.addEventListener(
    "input",
    () => control.setCustomValidity(""),
    { once: true },
  );
  control.addEventListener(
    "change",
    () => control.setCustomValidity(""),
    { once: true },
  );
}
