import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {UserRequest} from '../../requestMethod'

export default function WidgetSm() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try{
        const res = await UserRequest.get('users?new=true')
        setUsers(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getUsers();
  }, [])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          users.map((el) => (
            <li className="widgetSmListItem" key={el.username}>
              <img
                src={users.img || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'}
                alt={users.username}
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{el.username}</span>
                <span className="widgetSmUserTitle">{el.email}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        }

      </ul>
    </div>
  );
}
