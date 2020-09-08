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
      taskToEditName: "",
      taskToEditStage: null,
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
    this.handlerAddNewTask = this.handlerAddNewTask.bind(this);
    this.selectTaskForEdit = this.selectTaskForEdit.bind(this);
    this.handlerMove = this.handlerMove.bind(this);
    this.handlerDeleteTask = this.handlerDeleteTask.bind(this);
  }

  handlerAddNewTask(taskName) {
    const newTask = { name: taskName, stage: 0 };
    this.setState({
      tasks: [...this.state.tasks, newTask],
    });
  }

  handlerDeleteTask() {
    const tasks = this.state.tasks;
    const taskToBeEdited = this.state.taskToEditName;
    const newTasks = tasks.filter(function (item) {
      return item.name !== taskToBeEdited;
    });

    this.setState({
      tasks: newTasks,
    });
    this.setState({ taskToEditName: "", taskToEditStage: null });
  }

  handlerMove(direction) {
    const tasks = this.state.tasks;
    const taskToBeEdited = this.state.taskToEditName;

    const taskIndex = tasks.findIndex((task) => task.name === taskToBeEdited);

    const newRestOfTasks = tasks.filter(function (item) {
      return item.name !== taskToBeEdited;
    });

    let newTask = { name: "", stage: "" };
    switch (direction) {
      case "forward":
        newTask = {
          name: taskToBeEdited,
          stage: (tasks[taskIndex].stage = tasks[taskIndex].stage + 1),
        };

        break;
      case "back":
        newTask = {
          name: taskToBeEdited,
          stage: (tasks[taskIndex].stage = tasks[taskIndex].stage - 1),
        };
        break;
    }
    this.setState({
      tasks: [...newRestOfTasks, newTask],
    });
  }

  selectTaskForEdit(taskName, taskStage) {
    this.setState({ taskToEditName: taskName, taskToEditStage: taskStage });
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
        <Controls
          addNewTask={this.handlerAddNewTask}
          taskToEditName={this.state.taskToEditName}
          taskToEditStage={this.state.taskToEditStage}
          handlerDeleteTask={this.handlerDeleteTask}
          handlerMove={this.handlerMove}
        />
        <Board
          stagesTasks={stagesTasks}
          stagesNames={this.stagesNames}
          selectTaskForEdit={this.selectTaskForEdit}
        />
      </div>
    );
  }
}

export default App;
