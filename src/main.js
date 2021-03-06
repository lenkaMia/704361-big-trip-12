import TripTitle from "./components/header/trip-title.js";
import TripCost from "./components/header/trip-cost.js";
import Navigation from "./components/header/page-navigation.js";
import Filters from "./components/header/trip-filter.js";
import TripPresenter from "./presenter/tripPresenter.js"
import {generetedEvents} from "./mock/generated-events.js";
import {MAIN_FILTERS} from "./mock/main-filters.js";
import {NAV_ITEMS} from "./mock/nav-items.js";
import {renderElement, RenderPosition} from "./utils/render.js";


const tripMain = document.querySelector(`.trip-main`);
renderElement(
  tripMain, 
  new TripTitle(generetedEvents),
  RenderPosition.AFTERBEGIN);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
renderElement(
  tripInfoContainer, 
  new TripCost(),
  RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-controls`);
renderElement(
  tripControls, 
  new Navigation(NAV_ITEMS), 
  RenderPosition.BEFOREEND);

renderElement(
  tripControls, 
  new Filters(MAIN_FILTERS), 
  RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(tripEvents);
tripPresenter.init(generetedEvents);
