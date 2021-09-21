import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css'],
})
export class ModalMessageComponent implements OnInit {
  modal: any;
  title!: any;
  message!: any;
  btn_confirm!: any;
  btn_cancel!: any;
  link_redirect = '';

  constructor() {}

  ngOnInit(): void {}
  hide_modal_from_outside(event: any) {
    if (event.target == this.modal) {
      this.modal.style.display = 'none';
    }
  }
  show_modal(params: any) {
    this.modal = document.getElementById('modal');

    this.title = document.getElementById('header');
    this.title.innerHTML = params.title ? params.title : '';

    this.message = document.getElementById('body');
    this.message.innerHTML = params.message ? params.message : '';

    this.btn_confirm = document.getElementById('btn-confirm');
    this.btn_cancel = document.getElementById('btn-cancel');
    if (!params.btns) {
      this.btn_confirm.style.display = 'none';
      this.btn_cancel.style.display = 'none';
      window.onclick = this.hide_modal_from_outside;
      this.hide_in_3secs();
    } else {
      this.btn_confirm.style.display = 'block';
      this.btn_cancel.style.display = 'block';
      this.btn_cancel.onclick = function () {
        var modal = document.getElementById('modal');
        modal = modal ? modal : new HTMLElement();
        modal.style.display = 'none';
      };
      this.btn_confirm.onclick = function () {
        this.modal = document.getElementById('modal');
        this.modal.style.display = 'none';
        params.confirm_function.call(params.object);
      };
    }

    this.modal.style.display = 'block';
  }
  async hide_in_3secs() {
    var modal = this.modal;
    setTimeout(function () {
      modal.style.display = 'none';
    }, 3000);
  }
}
