"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";

export type PhoneOrderItem = {
  name: string;
  detail?: string;
  price: number;
};

type OrderLine = PhoneOrderItem & { key: string; quantity: number };

const currency = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });

const PhoneOrderContext = createContext<{
  add: (item: PhoneOrderItem) => void;
  open: () => void;
  started: boolean;
  count: number;
} | null>(null);

function usePhoneOrder() {
  const order = useContext(PhoneOrderContext);
  if (!order) throw new Error("Phone order controls must be inside PhoneOrder.");
  return order;
}

export function AddOrderItem({
  item,
  className,
  children,
}: {
  item: PhoneOrderItem;
  className: string;
  children: ReactNode;
}) {
  const { add } = usePhoneOrder();
  const description = item.detail ? `${item.name}, ${item.detail}` : item.name;

  return (
    <button
      type="button"
      className={`order-add ${className}`}
      aria-label={`Add ${description}, ${currency.format(item.price)}, to phone order`}
      onClick={() => add(item)}
    >
      {children}
    </button>
  );
}

export function PhoneOrderTrigger({ children }: { children: ReactNode }) {
  const { count, open, started } = usePhoneOrder();
  if (!started) return children;

  return (
    <button
      type="button"
      className="header-call order-trigger"
      aria-label={`Review phone order, ${count} ${count === 1 ? "item" : "items"}`}
      onClick={open}
    >
      Order <span aria-hidden="true">{count}</span>
    </button>
  );
}

export function PhoneOrder({
  children,
  phone,
}: {
  children: ReactNode;
  phone: { label: string; href: string };
}) {
  const [order, setOrder] = useState<{ lines: OrderLine[]; started: boolean }>({
    lines: [],
    started: false,
  });
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const count = order.lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = order.lines.reduce(
    (sum, line) => sum + Math.round(line.price * 100) * line.quantity,
    0,
  );

  function add(item: PhoneOrderItem) {
    const key = JSON.stringify([item.name, item.detail]);
    setOrder(({ lines }) => ({
      started: true,
      lines: lines.some((line) => line.key === key)
        ? lines.map((line) => line.key === key ? { ...line, quantity: line.quantity + 1 } : line)
        : [...lines, { ...item, key, quantity: 1 }],
    }));
  }

  function subtract(line: OrderLine) {
    if (line.quantity === 1) closeButton.current?.focus();
    setOrder((current) => ({
      ...current,
      lines: current.lines
        .map((item) => item.key === line.key ? { ...item, quantity: item.quantity - 1 } : item)
        .filter((item) => item.quantity > 0),
    }));
  }

  function close() {
    dialog.current?.close();
  }

  return (
    <PhoneOrderContext.Provider value={{
      add,
      open: () => dialog.current?.showModal(),
      count,
      started: order.started,
    }}>
      {children}
      <p className="sr-only" role="status">
        {order.started && `Phone order has ${count} ${count === 1 ? "item" : "items"}.`}
      </p>
      <dialog className="phone-order" ref={dialog} aria-labelledby="phone-order-heading">
        <div className="phone-order-head">
          <h2 id="phone-order-heading">Your phone order</h2>
          <button type="button" ref={closeButton} onClick={close}>Close</button>
        </div>
        {!count ? (
          <p className="phone-order-empty">Use the + buttons on the menu to add items.</p>
        ) : (
          <>
            <p className="phone-order-instructions">Read this list when you call. Mention sauce or topping changes.</p>
            <ul className="phone-order-lines" role="list">
              {order.lines.map((line) => {
                const description = line.detail ? `${line.name}, ${line.detail}` : line.name;
                return (
                  <li key={line.key}>
                    <div>
                      <strong>{line.name}</strong>
                      {line.detail && <span>{line.detail}</span>}
                    </div>
                    <div className="phone-order-quantity">
                      <button
                        type="button"
                        aria-label={`Remove one ${description}`}
                        onClick={() => subtract(line)}
                      >−</button>
                      <strong aria-live="polite"><span className="sr-only">Quantity </span>{line.quantity}</strong>
                      <button
                        type="button"
                        aria-label={`Add one ${description}`}
                        onClick={() => add(line)}
                      >+</button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="phone-order-total">
              <span>Menu subtotal (CAD)</span>
              <strong>{currency.format(subtotal / 100)}</strong>
            </div>
          </>
        )}
        <a className="button button-primary phone-order-call" href={phone.href}>
          Call {phone.label} to order
        </a>
      </dialog>
    </PhoneOrderContext.Provider>
  );
}
