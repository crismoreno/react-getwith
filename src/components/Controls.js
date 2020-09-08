import React, { Component } from "react";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskTitle: "",
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  render() {
    console.log(this.props.taskToEditStage);
    return (
      <div style={{ padding: "1rem", background: "#D6F3FF" }}>
        <h1>Controls</h1>
        <div style={{ display: "flex" }}>
          <input
            placeholder="New task name"
            style={{ fontSize: "1rem" }}
            data-testid="new-task-name-input"
            type="text"
            value={this.state.newTaskTitle}
            onChange={(event) => this.handleUserInput(event)}
            name={"newTaskTitle"}
          />
          <button
            style={{ marginLeft: "1rem" }}
            disabled={this.state.newTaskTitle === "" ? "disabled" : null}
            data-testid="create-task-btn"
            onClick={() => {
              this.props.addNewTask(this.state.newTaskTitle);
              this.setState({ newTaskTitle: "" });
            }}
          >
            Create
          </button>
        </div>
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <input
            readOnly
            placeholder="Selected task name"
            style={{ fontSize: "1rem" }}
            data-testid="selected-task-field"
            value={this.props.taskToEditName}
          />
          <button
            style={{ marginLeft: "1rem" }}
            disabled={
              this.props.taskToEditStage < 1 ||
              this.props.taskToEditStage === null
                ? "disabled"
                : null
            }
            data-testid="move-back-btn"
            onClick={() => {
              this.props.handlerMove("back");
            }}
          >
            Move back
          </button>
          <button
            style={{ marginLeft: "1rem" }}
            disabled={
              this.props.taskToEditStage > 2 ||
              this.props.taskToEditStage === null
                ? "disabled"
                : null
            }
            data-testid="move-forward-btn"
            onClick={() => {
              this.props.handlerMove("forward");
            }}
          >
            Move forward
          </button>
          <button
            style={{ marginLeft: "1rem" }}
            disabled={this.props.taskToEditName === "" ? "disabled" : null}
            data-testid="delete-btn"
            onClick={this.props.handlerDeleteTask}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Controls;
