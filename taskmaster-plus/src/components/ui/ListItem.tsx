import Card from "./Card";
import TaskItem from "./TaskItem";

export interface ListItemType {
  id: number;
  title: string;
}

const dummyTasks = [
  {
    id: 10,
    listId: 1,
    title: "Pay the rent",
    completed: false
  },
  {
    id: 20,
    listId: 1,
    title: "Brush your teeth",
    completed: true
  },
  {
    id: 30,
    listId: 1,
    title: "Go to work",
    completed: false
  }
];

const ListItem: React.FC<ListItemType> = ({ id, title }) => {
  return (
    <Card key={id}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {dummyTasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          listId={task.listId}
          title={task.title}
          completed={task.completed}
        />
      ))}
    </Card>
  );
};

export default ListItem;
