import $ from 'jquery';

class MobileMenu {
  constructor() {

    this.menuIcon = $(".site-header__menu-icon");
    this.menuContent = $(".site-header__menu-content");
    this.events();
  }

  events() {
    this.menuIcon.click(this.toggleTheMenu.bind(this));
  }

  toggleTheMenu() {
    console.log('Hoooray, the icon was clicked.');
    this.menuContent.toggleClass("site-header__menu-content--is-visible");
  }
}

export default MobileMenu;