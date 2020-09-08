import React, { Component } from "react";
import "./App.css";

import Controls from "./components/Controls";
import Board from "./components/Board";

const NUM_STAGES = 4;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { name: "task 0", stage: 0 },
        { name: "task 1", stage: 0 },
        { name: "task 2", stage: 0 },
        { name: "task 3", stage: 0 },
        { name: "task 4", stage: 1 },
        { name: "task 5", stage: 1 },
        { name: "task 6", stage: 1 },
        { name: "task 7", stage: 2 },
        { name: "task 8", stage: 2 },
        { name: "task 9", stage: 3 },
      ],
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
    this.handlerAddNewTask = this.handlerAddNewTask.bind(this);
  }

  handlerAddNewTask(taskName) {
    const newTask = { name: taskName, stage: 0 };
    this.setState({
      tasks: [...this.state.tasks, newTask],
    });
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];

    for (let i = 0; i < NUM_STAGES; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="App">
        <Controls addNewTask={this.handlerAddNewTask} />
        <Board stagesTasks={stagesTasks} stagesNames={this.stagesNames} />
      </div>
    );
  }
}

export default App;
