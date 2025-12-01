import HelloRedux from "./HelloRedux/page";
import CounterRedux from "./CounterRedux/page";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
  return(
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux />
      <TodoList />
    </div>
  );
};
