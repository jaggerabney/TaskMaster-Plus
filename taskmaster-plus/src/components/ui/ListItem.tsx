import { Task } from "@/contexts/ListContext";
import Card from "./Card";
import TaskItem from "./TaskItem";

export interface ListItemType {
  id: number;
  title: string;
  tasks: Task[];
  visible: boolean;
  onClick: () => void;
}

const ListItem: React.FC<ListItemType> = ({
  id,
  title,
  tasks,
  visible,
  onClick
}) => {
  if (visible) {
    return (
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
              dueDate={task.dueDate}
              description={task.description}
              rrule={task.rrule}
            />
          ))}
        {tasks.length == 0 && (
          <div
            className="self-center underline text-redNCS cursor-pointer"
            onClick={onClick}
          >
            Create new task
          </div>
        )}
      </Card>
    );
  }
};

export default ListItem;
