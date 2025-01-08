import Button from "./Button";

export default function Sidebar() {
  return (
    <nav className=" bg-cosmicLatte w-1/6 h-full p-8 flex flex-col gap-8">
      <Button
        text="New task"
        textColor="text-redNCS"
        borderColor="border-redNCS"
      />
      <h2 className="text-night text-2xl">Lists</h2>
      <Button
        text="New list"
        textColor="text-redNCS"
        borderColor="border-redNCS"
      />
    </nav>
  );
}
