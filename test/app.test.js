/* import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import App from "../src/App";
import Tile from "../src/Tile";
import Table from "../src/Table";

configure({ adapter: new Adapter() });
const wrapper = shallow(<App />);

const piece22 = wrapper
  .find(Table)
  .dive()
  .find(Tile)
  .at(0);

it("Verifies if I can select", () => {
  piece22.simulate("click", {
    currentTarget: {
      getAttribute: function(attr) {
        return attr === "y" ? "2" : "2";
      }
    }
  });
  expect(wrapper.state().table["2"]["2"].selected).to.equal(true);
});

it("Verifies if I can unselect", () => {
  piece22.simulate("click", {
    currentTarget: {
      getAttribute: function(attr) {
        return attr === "y" ? "2" : "2";
      }
    }
  });

  expect(wrapper.state().table["2"]["2"].selected).to.equal(false);
});
*/
