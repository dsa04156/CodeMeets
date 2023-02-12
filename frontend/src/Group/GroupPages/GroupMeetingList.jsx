// import React, { useEffect, useState } from 'react';
// import CreateTable from './CreateTable';
// import Pagination from '../../CommonComponents/Pagination';
// import styled from 'styled-components';
// import { useParams, useNavigate } from "react-router-dom";

// import { APIroot, groupNavTitle, pageNumber } from '../../Store';
// import { useRecoilValue, useRecoilState} from 'recoil';

// import axios from 'axios';

// // import GroupMeetingListItem from "../GroupComponents/GroupMeetingListItem";

// const GroupMeetingList = () => {

//     const navigate = useNavigate();
//     const API = useRecoilValue(APIroot);

//     const [totalPosts, setTotalPosts] = useState(0);
//     const [page, setPage] = useRecoilState(pageNumber);
//     const [recordList, setRecordList] = useState([]);
//     const [recoilNavTitle, setRecoilNavTitle] = useRecoilState(groupNavTitle)
//     const [position, setPosition] = useState();
//     // const [order, setOder] = useState()

//     const TableNavHandler = (row) => {
//         navigate(`/group/record/${row.original.groupRecordPk}`);
//     }


//     const Meetdummy = [
//         { id: "1", title: "title 1", content: "content 1" },
//         { id: "2", title: "title 2", content: "content 2" },
//         { id: "3", title: "title 3", content: "content 3" },
//       ];

//     const grouppk = useParams()
//     console.log(grouppk)

//     const data = React.useMemo(() => recordList, [recordList]);

//     const columns = React.useMemo(
//       () => [
//         {
//           Header: "번호",
//           accessor: "userPk", // accessor is the "key" in the data
//           width: 100,
//         },
//         {
//           Header: "제목",
//           accessor: "groupNoticeTitle",
//           width: 400,
//         },
//         {
//           Header: "작성자",
//           accessor: "userName",
//           width: 100,
//         },
//         {
//           Header: "등록일자",
//           accessor: "groupNoticeDate",
//           width: 200,
//         },
//       ],
//       []
//     );

//     return (
//         <ul>
//             {Meetdummy.map((meetListItem) => (
//                 <GroupMeetingListItem 
//                 key={meetListItem.id}
//                 id={meetListItem.id}
//                 title={meetListItem.title}
//                 content={meetListItem.content}
//                 />
//             ))}
//         </ul>
//     );
// };

// export default GroupMeetingList;