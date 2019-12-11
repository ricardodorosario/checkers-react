import React from "react";
import * as settingsActions from "./SettingsActions";
import Modal from "./Modal";
import Button from "@material-ui/core/Button";
import { Switch, FormLabel } from "@material-ui/core";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getFooter() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          settingsActions.showSettings(this.props.component, false)
        }
      >
        Close
      </Button>
    );
  }

  render() {
    console.log(this.props.component.state.blackStarts);
    return (
      <Modal header={"Settings"} footer={this.getFooter()}>
        <div className="row">
          <FormLabel component="legend">Who starts:</FormLabel>
        </div>
        <div className="row">
          <div>White</div>
          <Switch
            className="switch-black-starts"
            checked={this.props.component.state.blackStarts}
            onChange={event =>
              settingsActions.setWhoStarts(this.props.component, event)
            }
          />
          <div>Black</div>
        </div>
      </Modal>
    );
  }
}

export default Settings;
