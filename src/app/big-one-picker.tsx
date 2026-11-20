"use client";

import { useState } from "react";
import { AddOrderItem } from "./phone-order";

type Size = { label: string; price: number; formattedPrice: string };
type Style = { name: string; toppings: string };

export function BigOnePicker({ name, sizes, styles }: { name: string; sizes: Size[]; styles: Style[] }) {
  const [size, setSize] = useState(sizes[0]);
  const [style, setStyle] = useState(styles[0]);

  if (!size || !style) return null;

  return (
    <>
      <fieldset className="ticket-field">
        <legend>Size</legend>
        <div className="ticket-options">
          {sizes.map((option) => (
            <label key={option.label}>
              <input
                type="radio"
                name="big-one-size"
                value={option.label}
                checked={size.label === option.label}
                onChange={() => setSize(option)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="ticket-field">
        <legend>Style</legend>
        <div className="ticket-options">
          {styles.map((option) => (
            <label key={option.name}>
              <input
                type="radio"
                name="big-one-style"
                value={option.name}
                checked={style.name === option.name}
                onChange={() => setStyle(option)}
              />
              {option.name}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="ticket-toppings">{style.toppings}</p>

      <div className="ticket-summary">
        <div className="ticket-selection" role="status" aria-atomic="true">
          <span>
            <strong>{size.label} {style.name}</strong>
            <span className="ticket-price-label">In-store price in CAD</span>
          </span>
          <strong className="ticket-price">{size.formattedPrice}</strong>
        </div>
        <AddOrderItem
          className="ticket-add"
          item={{ name, detail: `${size.label} · ${style.name} style`, price: size.price }}
        >
          <span aria-hidden="true">+</span> Add
        </AddOrderItem>
      </div>
    </>
  );
}
