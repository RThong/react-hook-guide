import { Button, Form, Input, Modal, Space, Table } from 'antd';
import React, { useState } from 'react';

const data = [
  {
    name: 'aaa',
    age: 10,
  },
  {
    name: 'bbb',
    age: 11,
  },
  {
    name: 'ccc',
    age: 12,
  },
];

/** ***************************  基础写法  ******************************* */
const Demo2 = () => {
  // 创建/编辑相关状态
  const [curEditRecord, setCurEditRecord] = useState();
  const [editVisible, setEditVisible] = useState(false);

  // 详情状态
  const [curDetailRecord, setCurDetailRecord] = useState();
  const [detailVisible, setDetailVisible] = useState(false);

  const columns = [
    {
      dataIndex: 'name',
      title: 'name',
    },
    {
      dataIndex: 'age',
      title: 'age',
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space size={8}>
          <a
            onClick={() => {
              setEditVisible(true);
              setCurEditRecord(record);
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              setDetailVisible(true);
              setCurDetailRecord(record);
            }}
          >
            详情
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        onClick={() => {
          setEditVisible(true);
        }}
      >
        创建
      </Button>
      <Table rowKey="name" dataSource={data} columns={columns}></Table>
      <Modal
        title={curEditRecord ? '编辑' : '创建'}
        visible={editVisible}
        onOk={() => setEditVisible(false)}
        onCancel={() => setEditVisible(false)}
        afterClose={() => setCurEditRecord(undefined)}
      >
        {curEditRecord ? '编辑' : '创建'}
      </Modal>

      <Modal
        title="详情"
        visible={detailVisible}
        onOk={() => setDetailVisible(false)}
        onCancel={() => setDetailVisible(false)}
        afterClose={() => setCurDetailRecord(undefined)}
      >
        {JSON.stringify(curDetailRecord)}
      </Modal>
    </div>
  );
};

export default Demo2;
/** **************************   基础写法结束   ********************************* */

/** ***********************  第一步: 合并关联状态  ******************************* */
// const Demo2 = () => {
//   // 创建/编辑相关状态

//   const [{ visible: editVisible, curRecord: curEditRecord }, setEditState] = useState({
//     visible: false,
//     curRecord: undefined,
//   });

//   const [{ visible: detailVisible, curRecord: curDetailRecord }, setDetailState] = useState({
//     visible: false,
//     curRecord: undefined,
//   });

//   const columns = [
//     {
//       dataIndex: 'name',
//       title: 'name',
//     },
//     {
//       dataIndex: 'age',
//       title: 'age',
//     },
//     {
//       title: '操作',
//       render: (_, record) => (
//         <Space size={8}>
//           <a
//             onClick={() => {
//               setEditState({
//                 visible: true,
//                 curRecord: record,
//               });
//             }}
//           >
//             编辑
//           </a>
//           <a
//             onClick={() => {
//               setDetailState({
//                 visible: true,
//                 curRecord: record,
//               });
//             }}
//           >
//             详情
//           </a>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Button
//         onClick={() => {
//           setEditState((val) => ({
//             ...val,
//             visible: true,
//           }));
//         }}
//       >
//         创建
//       </Button>
//       <Table rowKey="name" dataSource={data} columns={columns}></Table>
//       <Modal
//         title={curEditRecord ? '编辑' : '创建'}
//         visible={editVisible}
//         onOk={() =>
//           setEditState((val) => ({
//             ...val,
//             visible: false,
//           }))
//         }
//         onCancel={() =>
//           setEditState((val) => ({
//             ...val,
//             visible: false,
//           }))
//         }
//         afterClose={() =>
//           setEditState((val) => ({
//             ...val,
//             curRecord: undefined,
//           }))
//         }
//       >
//         {curEditRecord ? '编辑' : '创建'}
//       </Modal>

//       <Modal
//         title="详情"
//         visible={detailVisible}
//         onOk={() =>
//           setDetailState((val) => ({
//             ...val,
//             visible: false,
//           }))
//         }
//         onCancel={() =>
//           setDetailState((val) => ({
//             ...val,
//             visible: false,
//           }))
//         }
//         afterClose={() =>
//           setDetailState((val) => ({
//             ...val,
//             curRecord: undefined,
//           }))
//         }
//       >
//         {JSON.stringify(curDetailRecord)}
//       </Modal>
//     </div>
//   );
// };

// export default Demo2;
/** **************************   第二步结束   ********************************* */

/** ***********************  第三步: 自定义hook  ******************************* */

// const useModal = () => {
//   const [{ visible, curRecord }, setModalState] = useState({
//     visible: false,
//     curRecord: undefined,
//   });

//   const open = (record: any) => {
//     setModalState({
//       visible: true,
//       curRecord: record,
//     });
//   };

//   const close = () => {
//     setModalState((val) => ({
//       ...val,
//       visible: false,
//     }));
//   };

//   const afterClose = () => {
//     setModalState((val) => ({
//       ...val,
//       curRecord: undefined,
//     }));
//   };

//   return [{ visible, curRecord }, { open, close, afterClose }, setModalState];
// };

// const Demo2 = () => {
//   // 创建/编辑相关状态

//   const [
//     { visible: editVisible, curRecord: curEditRecord },
//     { open: openEdit, close: closeEdit, afterClose: afterCloseEdit },
//   ] = useModal();

//   const [
//     { visible: detailVisible, curRecord: curDetailRecord },
//     { open: openDetail, close: closeDetail, afterClose: afterCloseDetail },
//     setDetailState,
//   ] = useModal();

//   const columns = [
//     {
//       dataIndex: 'name',
//       title: 'name',
//     },
//     {
//       dataIndex: 'age',
//       title: 'age',
//     },
//     {
//       title: '操作',
//       render: (_, record) => (
//         <Space size={8}>
//           <a
//             onClick={() => {
//               openEdit(record);
//             }}
//           >
//             编辑
//           </a>
//           <a
//             onClick={() => {
//               openDetail(record);
//             }}
//           >
//             详情
//           </a>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Button
//         onClick={() => {
//           openEdit();
//         }}
//       >
//         创建
//       </Button>
//       <Table rowKey="name" dataSource={data} columns={columns}></Table>
//       <Modal
//         title={curEditRecord ? '编辑' : '创建'}
//         visible={editVisible}
//         onOk={closeEdit}
//         onCancel={closeEdit}
//         afterClose={afterCloseEdit}
//       >
//         {curEditRecord ? '编辑' : '创建'}
//       </Modal>

//       <Modal
//         title="详情"
//         visible={detailVisible}
//         onOk={closeDetail}
//         // onCancel={closeDetail}
//         onCancel={() => {
//           setDetailState({
//             curRecord: undefined,
//             visible: false,
//           });
//         }}
//         // afterClose={afterCloseDetail}
//       >
//         <Form>
//           <Form.Item>
//             <Input value={JSON.stringify(curDetailRecord)}></Input>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Demo2;
/** **************************   第三步结束   ********************************* */
