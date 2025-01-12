import Card from "./Card";
import TaskItem, { TaskItemType } from "./TaskItem";

export interface ListItemType {
  id: number;
  title: string;
  tasks: TaskItemType[];
  visible: boolean;
}

const ListItem: React.FC<ListItemType> = ({ id, title, tasks, visible }) => {
  return (
    visible && (
      <Card key={id}>
        <h2 className="text-2xl font-bold ">{title}</h2>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              listId={task.listId}
              title={task.title}
              completed={task.completed}
            />
          ))}
        {tasks.length == 0 && (
          <div className="self-center underline text-redNCS cursor-pointer">
            Create new task
          </div>
        )}
      </Card>
    )
  );
};

export default ListItem;
