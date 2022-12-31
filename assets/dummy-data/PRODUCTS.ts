import Product, { Variant } from "./Product_Model";

const PRODUCTS = [
  new Product(
    Math.random().toString(),
    "Iphone 13 Pro",
    [
      new Variant(
        "#504F4A",
        "Najlepszy smartfon na rynku",
        require("../images/iphone13_pro_graphite.webp"),
        "grafitowy",
        5400.0,
      ),
      new Variant(
        "#A3C1DB",
        "Najlepszy smartfon na rynku",
        require("../images/iphone13_pro_blue.webp"),
        "niebieski",
        5400.0,
      ),
      new Variant(
        "#869785",
        "Najlepszy smartfon na rynku",
        require("../images/iphone13_pro_green.webp"),
        "zielony",
        5390.0,
      ),
    ],
    1,
  ),
  new Product(
    Math.random().toString(),
    "X-BOX series S",
    [
      new Variant(
        "#000000",
        "Najlepsza konsola na rynku",
        require("../images/xbox_series_S_black.jpeg"),
        "czarny",
        2249.0,
      ),
    ],
    1,
  ),
];

export default PRODUCTS;
