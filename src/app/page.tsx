import Image from "next/image";
import {
  bigOne,
  combos,
  extraToppings,
  faq,
  lasagna,
  menuNotes,
  pizzas,
  pizzaSizes,
  restaurant,
  sides,
  type MenuItem,
} from "@/data/restaurant";
import { BigOnePicker } from "./big-one-picker";

const menuCategories = [
  { id: "thick-pizza", label: "Original Thick" },
  { id: "two-pizza-deal", label: "Two-Pizza Deal" },
  { id: "extra-toppings", label: "Extra Toppings" },
  { id: "combos", label: "Combos" },
  { id: "sides", label: "Sides & Lasagna" },
];

const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

const icons = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 18 18 0 0 1-7.9-2.8 18 18 0 0 1-5.5-5.5 18 18 0 0 1-2.8-7.9A2 2 0 0 1 5.6 3h3a2 2 0 0 1 2 1.7l.6 2.8a2 2 0 0 1-.5 2.1l-1.3 1.3a14 14 0 0 0 5.5 5.5l1.3-1.3a2 2 0 0 1 2.1-.5l2.8.6a2 2 0 0 1 .9 1.7Z" />
  ),
  external: <path d="M7 17 17 7M7 7h10v10" />,
  down: <path d="M12 4v15m-6-6 6 6 6-6" />,
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}

function OrderLinks() {
  return (
    <div className="order-links">
      <a className="button button-primary" href={restaurant.phones.main.href}>
        <Icon name="phone" />
        Call to Order
      </a>
      <a className="button" href={restaurant.links.doorDash}>
        Order on DoorDash
        <Icon name="external" />
      </a>
    </div>
  );
}

function BigOneHero() {
  const sizes = pizzaSizes.flatMap((label, index) => {
    const price = bigOne.thick[index];
    return price === null ? [] : [{ label, price: currency.format(price) }];
  });
  const styles = bigOne.styles.map(({ name, toppings }) => ({ name, toppings }));

  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="shell hero-content">
        <div className="hero-feature">
          <h1 id="hero-heading">{bigOne.name}</h1>
          <p className="hero-description">Extra meat on our Original Thick crust.</p>
          <figure className="hero-figure">
            <div className="hero-photo">
              <Image
                src="/versatos-the-big-one.webp"
                alt="A cut T-Rex pizza showing thick layers of meat under browned mozzarella"
                width={1055}
                height={676}
                fetchPriority="high"
                loading="eager"
                unoptimized
              />
            </div>
            <figcaption>
              <strong>Weighs {bigOne.weight}</strong>
              <span>T-Rex style shown</span>
            </figcaption>
          </figure>
        </div>

        <div className="order-ticket">
          <h2>Order by phone</h2>
          <BigOnePicker sizes={sizes} styles={styles} />
          <noscript>
            <p className="ticket-fallback">
              Choose {styles.map(({ name }) => name).join(" or ")} when you call.
            </p>
            <ul className="ticket-fallback">
              {sizes.map(({ label, price }) => <li key={label}>{label} {price} CAD</li>)}
            </ul>
          </noscript>
          <a className="button button-primary ticket-call" href={restaurant.phones.main.href}>
            <Icon name="phone" />
            Call {restaurant.phones.main.label}
          </a>
          <div className="ticket-links">
            <a href="#menu">Full menu <Icon name="down" /></a>
            <a href={restaurant.links.doorDash}>Order on DoorDash <Icon name="external" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

type SizedMenuItem = {
  name: string;
  description?: string;
  prices: readonly (number | null)[];
};

function SizePriceTable({
  labelledBy,
  rows,
}: {
  labelledBy: string;
  rows: SizedMenuItem[];
}) {
  return (
    <table className="size-table" aria-labelledby={labelledBy} role="table">
      <thead role="rowgroup">
        <tr role="row">
          <th scope="col" role="columnheader"><span className="sr-only">Item</span></th>
          {pizzaSizes.map((size) => (
            <th key={size} scope="col" role="columnheader">{size}</th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map(({ name, description, prices }) => (
          <tr key={name} role="row">
            <th scope="row" role="rowheader">
              <span className="item-name">{name}</span>
              {description && <span className="item-description">{description}</span>}
            </th>
            {prices.map((price, index) => (
              <td key={pizzaSizes[index]} role="cell">
                <span className="size-label" aria-hidden="true">{pizzaSizes[index]}</span>
                {price === null ? (
                  <>
                    <span className="unavailable" aria-hidden="true">—</span>
                    <span className="sr-only">Unavailable</span>
                  </>
                ) : <span className="price">{currency.format(price)}</span>}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MenuOptions({ options }: { options: MenuItem["options"] }) {
  return (
    <ul className="menu-options" role="list">
      {options.map(({ label, price }) => (
        <li key={label ?? price}>
          {label && <span className="size-label">{label}</span>}
          <span className="price">{currency.format(price)}</span>
        </li>
      ))}
    </ul>
  );
}

function MenuItems({ items }: { items: MenuItem[] }) {
  return (
    <ul className="menu-items" role="list">
      {items.map(({ name, description, options }) => (
        <li className="menu-item" key={name}>
          <div>
            <p className="item-name">{name}</p>
            {description && <p className="item-description">{description}</p>}
          </div>
          <MenuOptions options={options} />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const { name, address, phones, hours, holidayHours, links } = restaurant;
  const thickPizzas = pizzas.map(({ name, toppings, thick }) => ({
    name,
    description: toppings,
    prices: thick,
  }));
  const thinPairs = pizzas.flatMap(({ name, toppings, thinPair }) =>
    thinPair ? [{ name, description: toppings, prices: thinPair }] : [],
  );

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="shell header-content">
          <a className="brand" href="#top">
            <Image src="/versatos-logo.png" alt={name} width={310} height={117} unoptimized />
          </a>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#menu">Menu</a>
            <a href="#faq">FAQ</a>
            <a href="#visit">Visit</a>
          </nav>
          <a className="header-call" href={phones.main.href} aria-label={`Call ${phones.main.label}`}>
            <Icon name="phone" />
            <span className="call-short">Call</span>
            <span className="call-number">{phones.main.label}</span>
          </a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <BigOneHero />

        <section className="menu-section" id="menu" aria-labelledby="menu-heading">
          <div className="shell menu-layout">
            <div className="menu-index">
              <h2 id="menu-heading">Menu</h2>
              <p>{menuNotes.pricing}</p>
              <nav className="menu-nav" aria-label="Menu categories">
                {menuCategories.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}
              </nav>
            </div>

            <div className="menu-content">
              <section className="menu-category" id="thick-pizza" aria-labelledby="thick-heading">
                <h3 id="thick-heading">Original Thick Pizza</h3>
                <p className="category-note">{menuNotes.thick}</p>
                <SizePriceTable labelledBy="thick-heading" rows={thickPizzas} />
                <p className="menu-note">{menuNotes.flipped}</p>
              </section>

              <section className="menu-category" id="two-pizza-deal" aria-labelledby="pair-heading">
                <h3 id="pair-heading">Two Pizzas, Thin Topping</h3>
                <p className="category-note">{menuNotes.thinPair}</p>
                <SizePriceTable labelledBy="pair-heading" rows={thinPairs} />
              </section>

              <section className="menu-category" id="extra-toppings" aria-labelledby="toppings-heading">
                <h3 id="toppings-heading">Extra Toppings per Pizza</h3>
                <SizePriceTable labelledBy="toppings-heading" rows={extraToppings} />
              </section>

              <section className="menu-category" id="combos" aria-labelledby="combos-heading">
                <h3 id="combos-heading">Combos</h3>
                <MenuItems items={combos} />
              </section>

              <section className="menu-category" id="sides" aria-labelledby="sides-heading">
                <h3 id="sides-heading">More Than Just Great Pizza</h3>
                <MenuItems items={sides} />
                <div className="lasagna">
                  <h4>{lasagna.name}</h4>
                  <p className="item-description">{lasagna.description}</p>
                  <MenuOptions options={lasagna.options} />
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="shell section-layout">
            <h2 id="faq-heading">FAQ</h2>
            <div className="faq-list">
              {faq.map(({ question, answer }) => (
                <details key={question}>
                  <summary>{question}<span className="plus" aria-hidden="true" /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="visit-section" id="visit" aria-labelledby="visit-heading">
          <div className="shell">
            <h2 id="visit-heading">Visit &amp; Order</h2>
            <div className="visit-layout">
              <div className="visit-details">
                <address>
                  <a className="visit-address" href={links.directions}>
                    <Icon name="pin" />
                    <span>{address.street}<br />{address.city}, {address.province}</span>
                  </a>
                  <div className="visit-phones">
                    <a className="main-phone" href={phones.main.href}>{phones.main.label}</a>
                    <a href={phones.alternate.href}>{phones.alternate.label}</a>
                  </div>
                </address>

                <h3>Hours</h3>
                <dl className="hours">
                  {hours.map(({ days, time }) => (
                    <div key={days}><dt>{days}</dt><dd>{time}</dd></div>
                  ))}
                </dl>
                {holidayHours.length > 0 && (
                  <>
                    <h3>Holiday hours</h3>
                    <dl className="hours">
                      {holidayHours.map(({ days, time }) => (
                        <div key={days}><dt>{days}</dt><dd>{time}</dd></div>
                      ))}
                    </dl>
                  </>
                )}
                <p className="visit-note">{menuNotes.delivery}</p>
                <OrderLinks />
              </div>
              <div className="visit-map">
                <iframe
                  src={links.mapEmbed}
                  title={`Google Maps pin for ${address.street}, ${address.city}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a className="button" href={links.directions}>
                  Get Directions
                  <Icon name="external" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-content">
          <p><strong>{name}</strong><span>{address.city}, Alberta</span></p>
          <p>{menuNotes.coupons}</p>
        </div>
      </footer>
    </>
  );
}
