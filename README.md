# Versato’s Pizza

A local redesign concept for Versato’s Pizza in Edmonton. The homepage uses the restaurant’s published menu prices in Canadian dollars. Customers order by phone or on DoorDash.

## Local preview

```sh
npm run dev
```

Open [localhost:3000](http://localhost:3000). In PowerShell, use `npm.cmd run dev` if script execution is disabled.

## Menu and business details

Edit [src/data/restaurant.ts](src/data/restaurant.ts) to update prices, toppings, hours, phone numbers, the address, ordering links, and FAQ answers. Use `holidayHours` for date-specific hours.

The restaurant’s homepage supplies the menu, logo, contact details, and hero photo. The FAQ supplies the pizza comparison and substitution policy. [Restaurant homepage](https://versatospizza.com/), [restaurant FAQ](https://versatospizza.com/faq)

## Production export

```sh
npm run lint
npm run build
```

The build writes the static site to `out/`, starting at `out/index.html`. Serve that directory with a static web server to preview the export.
