let routes = null;
let routeContainer = null;

function renderRoutes(currentRoute) {
  const paramRoutes = Object.keys(routes).filter((route) =>
    route.includes(":")
  );

  if (routes[currentRoute]) {
    // Normal route without params
    routeContainer.innerHTML = routes[currentRoute]();
  } else {
    // Routes containing params
    const splittedRoute = currentRoute.split("/");
    let is404 = true;

    for (const paramRoute of paramRoutes) {
      const splittedParamRoute = paramRoute.split("/");
      if (splittedRoute.length !== splittedParamRoute.length) continue;
      const paramIndex = splittedParamRoute.findIndex((v) => v[0] == ":");
      const paramName = splittedParamRoute[paramIndex].slice(1);
      const paramValue = splittedRoute[paramIndex];
      routeContainer.innerHTML = routes[paramRoute]({
        [paramName]: paramValue,
      });
      is404 = false;
      break;
    }
    if (is404) routeContainer.innerHTML = routes["404"]();
    // No match found, show 404 page:
  }
  handleLinks();
}

function processRoutes() {
  const currentRoute = window.location.pathname;

  if (!routeContainer) return;

  renderRoutes(currentRoute);
}

/**
 * Add event listeners to each custom link
 */
function handleLinks() {
  const links = document.querySelectorAll("a[data-href]");
  // Handle link click events
  links.forEach((link) => link.addEventListener("click", handleLinkClick));
}

function handleLinkClick(e) {
  e.preventDefault();
  const href = e.currentTarget.dataset.href;
  if (href) {
    window.history.pushState("", "", href);
    renderRoutes(href);
  }
}

function handleRouteChange() {
  // handle route change when user clicks the browser's back and forward buttons
  window.onpopstate = processRoutes;
}

export function initializeRouter(routeList, container) {
  routes = routeList;
  routeContainer = container;

  processRoutes();
  handleRouteChange();
}
