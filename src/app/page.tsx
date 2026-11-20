import Image from "next/image";
import {
  bigOne,
  combos,
  extraToppings,
  lasagna,
  menuNotes,
  orderingFaq,
  pizzas,
  pizzaSizes,
  restaurant,
  sides,
  toppingSwaps,
  type MenuItem,
} from "@/data/restaurant";
import { BigOnePicker } from "./big-one-picker";
import { AddOrderItem, PhoneOrder, PhoneOrderTrigger, type PhoneOrderItem } from "./phone-order";

const menuCategories = [
  { id: "thick-pizza", label: "Original Thick" },
  { id: "two-pizza-deal", label: "Two-Pizza Deal" },
  { id: "extra-toppings", label: "Toppings & Swaps" },
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

function ToppingSwapDetails() {
  return (
    <details className="topping-swaps">
      <summary className="disclosure-summary">
        Swap a topping <span className="disclosure-icon" aria-hidden="true" />
      </summary>
      <div className="topping-swap-guide" id="topping-swaps">
        <p>Choose another topping of the same kind and tell us when you call.</p>
        <dl>
          {toppingSwaps.map(({ kind, from, to }) => (
            <div key={kind}>
              <dt>{kind}</dt>
              <dd>{from} <span aria-hidden="true">→</span><span className="sr-only"> to </span> {to}</dd>
            </div>
          ))}
        </dl>
      </div>
    </details>
  );
}

function FaqSection() {
  const styles = bigOne.styles.map(({ name }) => name);
  const choices = [
    {
      id: "thick",
      name: "Original Thick",
      highlight: "One loaded pizza",
      description: `Our Original Thick ${styles.join(" and ")} weigh ${bigOne.originalThickWeight} each.`,
      action: "See Original Thick",
      href: "#thick-pizza",
    },
    {
      id: "pair",
      name: "Two-Pizza Deal",
      highlight: "Two thin-topping pizzas",
      description: "The meat from one Original Thick, spread across two pizzas.",
      action: "See pizza pairs",
      href: "#two-pizza-deal",
    },
    {
      id: "big",
      name: bigOne.name,
      highlight: bigOne.weight,
      description: `Extra meat on our Original Thick crust, in ${styles.join(" or ")} style.`,
      action: "Build The Big One",
      href: "#top",
    },
  ];

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="faq-counter" id="faq-pizza">
        <div className="shell">
          <div className="faq-intro">
            <h2 id="faq-heading">Which pizza are you craving?</h2>
            <a href="#faq-ordering">Ordering questions</a>
          </div>
          <ul className="faq-choices" role="list">
            {choices.map(({ id, name, highlight, description, action, href }) => (
              <li className={`faq-choice faq-choice--${id}`} key={id}>
                <h3>{name}</h3>
                <p className="faq-choice-highlight">{highlight}</p>
                <p className="faq-choice-description">{description}</p>
                <div className="faq-choice-footer">
                  <a className="button" href={href}>{action}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell faq-ordering" id="faq-ordering">
        <div className="faq-ordering-intro">
          <h3>Frequently Asked Questions</h3>
          <a href={restaurant.phones.main.href}>
            <Icon name="phone" />
            Call the shop
          </a>
        </div>
        <div className="faq-answers">
          {orderingFaq.map(({ question, answer, orderOptions }) => (
            <details key={question}>
              <summary className="disclosure-summary">
                {question} <span className="disclosure-icon" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{answer}</p>
                {orderOptions && (
                  <>
                    <ul className="faq-order-options" role="list">
                      {orderOptions.map(({ intro, label, href, suffix }) => (
                        <li key={href}>{intro} <a href={href}>{label}</a>{suffix}.</li>
                      ))}
                    </ul>
                    <p className="menu-add-guide faq-phone-order-tip">
                      Use the + buttons on the <a href="#menu">menu</a> to build a phone order list, then read it to us when you call.
                    </p>
                  </>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function BigOneHero() {
  const sizes = pizzaSizes.flatMap((label, index) => {
    const price = bigOne.thick[index];
    return price === null ? [] : [{ label, price, formattedPrice: currency.format(price) }];
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

        <div className="order-ticket" id="big-one-order">
          <h2>Order by phone</h2>
          <BigOnePicker name={bigOne.name} sizes={sizes} styles={styles} />
          <noscript>
            <p className="ticket-fallback">
              Choose {styles.map(({ name }) => name).join(" or ")} when you call.
            </p>
            <ul className="ticket-fallback">
              {sizes.map(({ label, formattedPrice }) => <li key={label}>{label} {formattedPrice} CAD</li>)}
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

function MenuPrice({ item, label }: { item: PhoneOrderItem; label?: string }) {
  const price = currency.format(item.price);

  return (
    <>
      <AddOrderItem item={item} className="menu-add-price">
        {label && <span className="size-label">{label}</span>}
        <span className="menu-add-amount">
          <span className="price">{price}</span>
          <span className="menu-add-plus" aria-hidden="true">+</span>
        </span>
      </AddOrderItem>
      <noscript className="menu-price-fallback">
        {label && <span className="size-label">{label}</span>}
        <span className="price">{price}</span>
      </noscript>
    </>
  );
}

function SizePriceTable({
  labelledBy,
  rows,
  orderStyle,
}: {
  labelledBy: string;
  rows: SizedMenuItem[];
  orderStyle?: string;
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
              {name === bigOne.name && <a className="menu-choose-style" href="#top">Choose a style</a>}
            </th>
            {prices.map((price, index) => {
              const size = pizzaSizes[index];
              return (
                <td key={size} role="cell">
                  {price !== null && orderStyle && name !== bigOne.name ? (
                    <MenuPrice
                      label={size}
                      item={{ name, detail: `${size} ${orderStyle}`, price }}
                    />
                  ) : (
                    <>
                      <span className="size-label" aria-hidden="true">{size}</span>
                      {price === null ? (
                        <>
                          <span className="unavailable" aria-hidden="true">—</span>
                          <span className="sr-only">Unavailable</span>
                        </>
                      ) : <span className="price">{currency.format(price)}</span>}
                    </>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MenuOptions({ name, options }: { name: string; options: MenuItem["options"] }) {
  return (
    <ul className="menu-options" role="list">
      {options.map(({ label, price }) => (
        <li key={label ?? price}>
          <MenuPrice label={label} item={{ name, detail: label, price }} />
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
          <MenuOptions name={name} options={options} />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const { name, address, phones, hours, holidayHours, googleRating, links } = restaurant;
  const thickPizzas = pizzas.map(({ name, toppings, thick }) => ({
    name,
    description: toppings,
    prices: thick,
  }));
  const thinPairs = pizzas.flatMap(({ name, toppings, thinPair }) =>
    thinPair ? [{ name, description: toppings, prices: thinPair }] : [],
  );

  return (
    <PhoneOrder phone={phones.main}>
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
          <PhoneOrderTrigger>
            <a className="header-call" href={phones.main.href} aria-label={`Call ${phones.main.label}`}>
              <Icon name="phone" />
              <span className="call-short">Call</span>
              <span className="call-number">{phones.main.label}</span>
            </a>
          </PhoneOrderTrigger>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <BigOneHero />

        <section className="menu-section" id="menu" aria-labelledby="menu-heading">
          <div className="shell menu-layout">
            <div className="menu-index">
              <h2 id="menu-heading">Menu</h2>
              <p>{menuNotes.pricing}</p>
              <p className="menu-add-guide">Click + to start a phone order.</p>
              <nav className="menu-nav" aria-label="Menu categories">
                {menuCategories.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}
              </nav>
              <a className="menu-rating" href={googleRating.href}>
                <span className="google-rating-star" aria-hidden="true">★</span>
                <span className="menu-rating-text">
                  <span><strong>{googleRating.score}/5</strong> on Google</span>
                  <span className="menu-rating-reviews">
                    <span className="menu-rating-divider" aria-hidden="true">·</span>
                    {googleRating.reviewCount} reviews
                  </span>
                </span>
              </a>
            </div>

            <div className="menu-content">
              <section className="menu-category" id="thick-pizza" aria-labelledby="thick-heading">
                <h3 id="thick-heading">Original Thick Pizza</h3>
                <p className="category-note">{menuNotes.thick}</p>
                <SizePriceTable labelledBy="thick-heading" rows={thickPizzas} orderStyle="Original Thick" />
                <p className="menu-note">{menuNotes.flipped}</p>
              </section>

              <section className="menu-category" id="two-pizza-deal" aria-labelledby="pair-heading">
                <h3 id="pair-heading">Two Pizzas, Thin Topping</h3>
                <p className="category-note">{menuNotes.thinPair}</p>
                <SizePriceTable labelledBy="pair-heading" rows={thinPairs} orderStyle="Two-Pizza Deal" />
              </section>

              <section className="menu-category" id="extra-toppings" aria-labelledby="toppings-heading">
                <h3 id="toppings-heading">Extra Toppings per Pizza</h3>
                <SizePriceTable labelledBy="toppings-heading" rows={extraToppings} />
                <ToppingSwapDetails />
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
                  <MenuOptions name={lasagna.name} options={lasagna.options} />
                </div>
              </section>
            </div>
          </div>
        </section>

        <FaqSection />

        <section className="visit-section" id="visit" aria-labelledby="visit-heading">
          <div className="shell">
            <h2 id="visit-heading">Visit & Order</h2>
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
                  title={`Google Maps listing for ${name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="visit-map-actions">
                  <a className="button" href={links.directions}>
                    Get Directions
                    <Icon name="external" />
                  </a>
                  <a className="visit-rating" href={googleRating.href}>
                    <span className="google-rating-star" aria-hidden="true">★</span>
                    <span><strong>{googleRating.score}/5 on Google</strong><br />{googleRating.reviewCount} reviews</span>
                  </a>
                </div>
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
    </PhoneOrder>
  );
}
