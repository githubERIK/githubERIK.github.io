class QuantityInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._onMinus = this._onMinus.bind(this);
        this._onPlus = this._onPlus.bind(this);
        this._onInput = this._onInput.bind(this);
    }

    static get observedAttributes() { return ['value', 'min', 'name', 'disabled']; }

    get value() { return String(this._value ?? this.getAttribute('value') ?? '0'); }
    set value(v) {
        this._value = String(v);
        this._updateInput();
        this.dispatchEvent(new Event('input', { bubbles: true }));
        this.dispatchEvent(new Event('change', { bubbles: true }));
    }

    get min() { return Number(this.getAttribute('min') ?? 0); }
    set min(v) { this.setAttribute('min', String(v)); }

    get name() { return this.getAttribute('name') || ''; }

    connectedCallback() { this.render(); }

    attributeChangedCallback(name) {
        if (name === 'value') this._updateInput();
        if (name === 'min') this._clampValue();
        if (name === 'disabled') this._updateDisabled();
    }

    render() {
        const tpl = document.createElement('template');
        tpl.innerHTML = `
  <style>
  :host { display:inline-block; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
  .wrapper {
    display:inline-flex; align-items:center; border:1px solid #ccc; border-radius:6px; overflow:hidden; background:#fff;
  }
  button {
    appearance:none; -webkit-appearance:none; -moz-appearance:none;
    border:none; background:#f5f5f5; padding:6px 10px; font-size:18px; cursor:pointer;
  }
  button:active { background:#7c5cff; }
  input {
    width:22px; text-align:center; border:none; outline:none; padding:6px 8px; font-size:14px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button { -webkit-appearance:none; margin:0; }
  input { -moz-appearance:textfield; }
  .hidden-native { display:none; }
  </style>
  <div class="wrapper" part="wrapper">
    <button type="button" part="minus" aria-label="Decrease">−</button>
    <input part="input" inputmode="numeric" pattern="\\d*" aria-label="Quantity" value="0">
    <button type="button" part="plus" aria-label="Increase">+</button>
  </div>
  <input class="hidden-native" type="hidden">
      `;
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(tpl.content.cloneNode(true));

        this._btnMinus = this.shadowRoot.querySelector('button[aria-label="Decrease"]');
        this._btnPlus = this.shadowRoot.querySelector('button[aria-label="Increase"]');
        this._input = this.shadowRoot.querySelector('input[part="input"]');
        this._hidden = this.shadowRoot.querySelector('.hidden-native');

        this._btnMinus.addEventListener('click', this._onMinus);
        this._btnPlus.addEventListener('click', this._onPlus);
        this._input.addEventListener('input', this._onInput);
        this._input.addEventListener('blur', () => this._clampValue());

        this._value = String(this.getAttribute('value') ?? '0');
        this._hidden.name = this.name;
        this._updateInput();
        this._updateDisabled();
    }

    _onMinus() {
        const n = this._toNumber(this._input.value);
        this.value = Math.max(this.min, n - 1);
    }

    _onPlus() {
        const n = this._toNumber(this._input.value);
        this.value = n + 1;
    }

    _onInput(e) {
        const cleaned = String(e.target.value).replace(/[^\d]/g, '');
        this._input.value = cleaned === '' ? '0' : cleaned;
        this._value = this._input.value;
        this._hidden.value = this._value;
        this.dispatchEvent(new Event('input', { bubbles: true }));
    }

    _toNumber(v) {
        const n = parseInt(String(v).replace(/[^\d-]/g, ''), 10);
        return Number.isFinite(n) ? n : 0;
    }

    _clampValue() {
        if (!this._input) {
            return;
        }
        const n = this._toNumber(this._input.value);
        const clamped = Math.max(this.min, n);
        if (clamped !== n) this.value = clamped;
        else { this._hidden.value = String(clamped); this._input.value = String(clamped); }
    }

    _updateInput() {
        const val = this._value ?? this.getAttribute('value') ?? '0';
        if (this._input) this._input.value = String(val);
        if (this._hidden) this._hidden.value = String(val);
    }

    _updateDisabled() {
        const disabled = this.hasAttribute('disabled');
        if (this._btnMinus) this._btnMinus.disabled = disabled;
        if (this._btnPlus) this._btnPlus.disabled = disabled;
        if (this._input) this._input.disabled = disabled;
    }
}

customElements.define('quantity-input', QuantityInput);
export { QuantityInput };
