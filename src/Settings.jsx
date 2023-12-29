import React from "react";
import * as settingsActions from "./SettingsActions";
import Modal from "./Modal";
import { Button, FormCheck, FormLabel, Row } from "react-bootstrap";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getFooter() {
    return (
      <Button
        variant="primary"
        onClick={() =>
          settingsActions.showSettings(this.props.component, false)
        }
      >
        Close
      </Button>
    );
  }

  render() {
    console.log("black starts", this.props.component.state.blackStarts);
    return (
      <Modal header={"Settings"} footer={this.getFooter()}>
        <Row>
          <FormLabel className="whoStartPlaying" component="legend">
            Who starts:
          </FormLabel>
        </Row>
        <Row>
          <FormCheck
            type="switch"
            id="black-starts"
            label="Black starts"
            defaultChecked={this.props.component.state.blackStarts}
            onChange={(event) =>
              settingsActions.setWhoStarts(this.props.component, event)
            }
          />
        </Row>
      </Modal>
    );
  }
}

export default Settings;
