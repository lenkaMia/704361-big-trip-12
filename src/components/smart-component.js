import AbstractComponent from "./abstract-component.js";

export default class SmartComponent extends AbstractComponent {
  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.restoreHandlers();
  }
}