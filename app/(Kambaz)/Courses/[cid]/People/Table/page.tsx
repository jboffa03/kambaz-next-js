/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as client from "../../../client";
import { FormControl } from "react-bootstrap";

export default function Users() {
 const [users, setUsers] = useState<any[]>([]);
 const { cid, uid } = useParams();

 const fetchUsers = async () => {
   const users = await client.findUsersForCourse(cid as string);
   setUsers(users);
 };
 useEffect(() => {
   fetchUsers();
 }, [uid]);
 return (
   <div>
     <h3>Users</h3>
     <PeopleTable users={users} fetchUsers={fetchUsers} />
   </div>
);}
