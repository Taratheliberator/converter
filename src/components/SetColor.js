import React, {useState} from "react";
import   "./setColor.css";

export default function SetColor() {
  const [form, setForm] = useState({
    color: '#123456',
  });

  const handleFormChange = (e) => {
    const {name, value} = e.target;
    setForm(prevForm => ({
      ...prevForm, [name]: value
    }));
  };

  const setBackgroundColor = (hex) => {
    if (hex == null) {return};
    document.documentElement.style.background = '#'+hex;
  }


  const validHexColor = (color) => {
    if (color == null || typeof color !== 'string' || color.length !== 7) {return null};
    const validHex = new RegExp('^#([0-9a-f]{6})$','i');
    var match = validHex.exec(color);
    return match ? match[1] : false;
  }

  const hex2rgb = (hex) => {
    if (hex == null) {return 'Введите код (например: #123456)'};
    if (!hex) {return 'Ошибка: неверный код'};
    hex = '0x' + hex;
    let r = (hex >> 16) & 0xFF;
    let g = (hex >> 8) & 0xFF;
    let b = hex & 0xFF;
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Render
  const hex = validHexColor(form.color);
  setBackgroundColor(hex);

  return (
    <div className="color-form">
      <form onSubmit={(e) => {e.preventDefault()}}>
        <div>
          <input
            name="color"
            value={form.color}
            placeholder="#123456"
            onChange={handleFormChange}
            autoFocus
          />
        </div>
        <p className={(hex === false ? ' error':null)}>{hex2rgb(hex)}</p>
      </form>
    </div>
  );
}