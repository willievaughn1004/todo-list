// Lets user to create any element with text and attributes
export const buildComponent = (elem, text, attributes = {}) => {
  const element = document.createElement(`${elem}`);
  element.innerText = text;

  // Add attributes
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
};

// Can append multiple elements onto another element.
export const appendComponent = (targetElement, componentArr) => {
  let content;

  // Determines if targetElement is already a DOM element.
  if (typeof targetElement === "string") {
    content = document.querySelector(targetElement);
  } else {
    content = targetElement;
  };

  for (let i = 0; i < componentArr.length; i++) {
    content.appendChild(componentArr[i]);
  };
};
