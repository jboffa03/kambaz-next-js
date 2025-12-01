import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ArrayStateVariable() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables">
         <h2>Array State Variable</h2>
         <button onClick={addElement} className="btn btn-success mb-3">
                Add Element
            </button>
            <table className="table table-bordered">
                <tbody>
                    {array.map((item, index) => (
                        <tr key={index}> {item}
                            <td className="text-end" style={{ width: "100px" }}>
                                <button onClick={() => deleteElement(index)}
                                    className="btn btn-danger btn-sm"> Delete </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <ListGroup>
                {todos.map((todo: any) => (
                <ListGroupItem key={todo.id}>
                    {todo.title}
                </ListGroupItem>
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}