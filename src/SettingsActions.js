import * as appActions from "./AppActions";
//
export function showSettings(component, showSettings) {
  component.setState((state) => ({
    ...state,
    showMenu: showSettings,
  }));
}
//
export function setWhoStarts(component, event) {
  event.persist();
  appActions.restart(component);
  console.log("set show starts", event.target.checked);
  component.setState((state) => ({
    ...state,
    blackStarts: event.target.checked ? true : false,
    whoPlay: event.target.checked ? "black" : "white",
  }));
}
