import React from "react";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

const Components = [
  { _id: 1, title: "First Component", status: "Components" },
  { _id: 2, title: "Second Component", status: "Components" },
  { _id: 3, title: "Third Component", status: "Components" },
  { _id: 4, title: "Fourth Component", status: "Components" },
  { _id: 5, title: "Fifth Component", status: "Components" },
  { _id: 6, title: "Sixth Component", status: "Components" },
  { _id: 7, title: "Seventh Component", status: "Components" },
  { _id: 8, title: "Eighth Component", status: "Components" },
  { _id: 9, title: "Ninth Component", status: "Components" },
  { _id: 10, title: "Tenth Component", status: "Components" },
];

const labels = ["Components", "new", "Canvas1", "Canvas2", "Canvas3"];
const labelsMap = {
  Components: "Components",
  new: "Blank Space",
  Canvas1: "Canvas1",
  Canvas2: "Canvas",
  Canvas3: "Canvas3",

  
};

const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
  },
  column: {
    minWidth: 200,
    width: "18vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "#566573",
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "#7F8C8D",
    color: "white",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white",
  },
};

class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Components,
    };
  }
  update = (id, status) => {
    const { Components } = this.state;
    const Component = Components.find((Component) => Component._id === id);
    // console.log("Component", Component);
    Component.status = status;
    const ComponentIndex = Components.indexOf(Component);
    const newComponents = update(Components, {
      [ComponentIndex]: { $set: Component },
    });
    console.log("newComponent", newComponents);
    this.setState({ Components: newComponents });
  };

  render() {
    const { Components } = this.state;
    return (
      <main>
        <header className="header">Example Drag Board </header>
        <section style={classes.board}>
          {labels.map((channel) => (
            <DragColumn status={channel}>
              <div style={classes.column}>
                <div style={classes.columnHead}>{labelsMap[channel]}</div>
                <div>
                  {Components
                    .filter((item) => item.status === channel)
                    .map((item) => (
                      <DragItem id={item._id} onDrop={this.update}>
                        <div style={classes.item}>{item.title}</div>
                      </DragItem>
                    ))}
                </div>
              </div>
            </DragColumn>
          ))}
        </section>
      </main>
    );
  }
}

export default DragDropContext(HTML5Backend)(Drag);

// Column

const boxTarget = {
  drop(props) {
    return { name: props.status };
  },
};

class DragColumn extends React.Component {
  render() {
    return this.props.connectDropTarget(<div>{this.props.children}</div>);
  }
}

DragColumn = DropTarget("DragItem", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(DragColumn);

// Item

const boxSource = {
  beginDrag(props) {
    return {
      name: props.id,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.onDrop(monitor.getItem().name, dropResult.name);
    }
  },
};

class DragItem extends React.Component {
  render() {
    return this.props.connectDragSource(<div>{this.props.children}</div>);
  }
}

DragItem = DragSource("DragItem", boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(DragItem);
