//1. Реализовать класс, описывающий окружность.
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (value <= 0) {
      console.log("Radius doljen bity bolwe nulya");
    } else {
      this._radius = value;
    }
  }

  get diameter() {
    return this._radius * 2;
  }

  area() {
    return Math.PI * Math.pow(this._radius, 2);
  }

  circumference() {
    return 2 * Math.PI * this._radius;
  }
}
///////////////////////////////////////////////////////////
class HtmlElement {
  constructor(tagName, isSelfClosing = false, textContent = "") {
    this.tagName = tagName;
    this.isSelfClosing = isSelfClosing;
    this.textContent = textContent;
    this.attributes = [];
    this.styles = [];
    this.children = [];
  }

  setAttribute(name, value) {
    this.attributes.push({ name, value });
  }

  setStyle(property, value) {
    this.styles.push({ property, value });
  }

  appendChild(child) {
    this.children.push(child);
  }

  prependChild(child) {
    this.children.unshift(child);
  }

  getHtml() {
    let attributesString = this.attributes
      .map((attr) => `${attr.name}="${attr.value}"`)
      .join(" ");

    let stylesString = this.styles
      .map((style) => `${style.property}: ${style.value}`)
      .join("; ");

    let openingTag = `${this.tagName} ${attributesString} style=${stylesString}`;
    let closingTag = `/${this.tagName}`;

    if (this.isSelfClosing) {
      return `${this.tagName} ${attributesString} style="${stylesString}" /`;
    }

    let childrenHtml = this.children.map((child) => child.getHtml()).join("");
    return `${openingTag}${this.textContent}${childrenHtml}${closingTag}`;
  }
}
//////////////////////////////////////////////////////////
class CssClass {
  constructor(className) {
    this.className = className;
    this.styles = {};
  }

  setStyle(property, value) {
    this.styles[property] = value;
  }

  removeStyle(property) {
    if (this.styles[property]) {
      delete this.styles[property];
    } else {
      console.log(`Стиль "${property}" не найден`);
    }
  }

  getCss() {
    let stylesString = Object.entries(this.styles)
      .map(([property, value]) => `${property}: ${value};`)
      .join(" ");

    return `.${this.className} { ${stylesString} }`;
  }
}

///////////////////////////////////////////////////////////
//1
let circle = new Circle(5);
console.log(`Radius: ${circle.radius}`);
console.log(`Diameter:${circle.diameter}`);
console.log(`Area:${circle.area()}`);
console.log(`Circumference:${circle.circumference()}`);
//2
let wrapper = new HtmlElement("div");
wrapper.setAttribute("id", "wrapper");
wrapper.setStyle("display", "flex");
wrapper.setStyle("justify-content", "space-between");

let childDiv1 = new HtmlElement("div");
childDiv1.setStyle("width", "300px");
childDiv1.setStyle("margin", "10px");

let h3 = new HtmlElement("h3", false, "What is Lorem Ipsum?");
childDiv1.appendChild(h3);

let img = new HtmlElement("img", true);
img.setAttribute("src", "https://via.placeholder.com/300");
img.setAttribute("alt", "Lorem Ipsum");
childDiv1.appendChild(img);

let p = new HtmlElement(
  "p",
  false,
  "Lorem Ipsum is simply dummy text of the printing industry."
);
p.setStyle("text-align", "justify");
childDiv1.appendChild(p);

wrapper.appendChild(childDiv1);

let childDiv2 = childDiv1;
wrapper.appendChild(childDiv2);

document.write(wrapper.getHtml());
//3
let buttonClass = new CssClass("button");

buttonClass.setStyle("background-color", "blue");
buttonClass.setStyle("color", "white");
buttonClass.setStyle("padding", "10px 20px");

buttonClass.removeStyle("padding");

console.log(buttonClass.getCss());
