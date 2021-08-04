import type { TablePaginationConfig } from 'antd';
import { Form, Modal, Select } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import { Table } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/lib/table/interface';
import moment from 'moment';
import type { Reducer } from 'react';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import type { DataItem, ReqParams, SortMode, Status } from './api';
import { addData } from './api';
import { deleteData } from './api';
import { fetchData } from './api';

// const Demo3 = () => {
//   const [query, setQuery] = useState<ReqParams>({
//     page: 1,
//     page_size: 3,
//     sort: '-update_tm',
//   });

//   const [dataList, setDataList] = useState<DataItem[]>([]);
//   const [total, setTotal] = useState(0);

//   const [loading, setLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   const [curRecord, setCurRecord] = useState<DataItem>();
//   const [visible, setVisible] = useState(false);

//   const [addLoading, setAddLoading] = useState(false);

//   const [form] = Form.useForm<{
//     name: string;
//     status: Status;
//   }>();

//   useEffect(() => {
//     setLoading(true);
//     fetchData(query).then((res) => {
//       setDataList(res.results);
//       setTotal(res.total);
//       setLoading(false);
//     });
//   }, [query]);

//   const handleDelete = async (id: number) => {
//     setDeleteLoading(true);
//     await deleteData(id);
//     setDeleteLoading(false);
//     setQuery({
//       page: 1,
//       page_size: 3,
//     });
//   };

//   const columns: ColumnsType<DataItem> = [
//     {
//       dataIndex: 'name',
//       title: 'name',
//     },
//     {
//       dataIndex: 'status',
//       title: '状态',
//       filters: ['success', 'fail', 'warning'].map((item) => ({
//         text: item,
//         value: item,
//       })),
//       filterMultiple: false,
//     },
//     {
//       dataIndex: 'update_tm',
//       title: '更新时间',
//       sorter: true,
//       defaultSortOrder: 'descend',
//     },
//     {
//       title: '操作',
//       render: (_, record) => (
//         <Button
//           loading={curRecord?.id === record.id && deleteLoading}
//           onClick={() => {
//             setCurRecord(record);
//             handleDelete(record.id);
//           }}
//         >
//           删除
//         </Button>
//       ),
//     },
//   ];

//   const handleAdd = async ({ name, status }: { name: string; status: Status }) => {
//     setAddLoading(true);
//     await addData({ name, status });
//     setAddLoading(false);
//     setVisible(false);
//     setQuery({
//       page: 1,
//       page_size: 3,
//     });
//   };

//   const handleTableChange = (
//     pagination: TablePaginationConfig,
//     filters: Record<string, FilterValue | null>,
//     sorter: SorterResult<DataItem>,
//   ) => {
//     console.log(pagination, filters, sorter);

//     setQuery((q) => ({
//       ...q,
//       page: pagination.current as number,
//       status: filters?.status?.[0] as Status,
//       sort: sorter.order
//         ? ((sorter.order === 'ascend' ? 'update_tm' : '-update_tm') as SortMode)
//         : undefined,
//     }));
//   };

//   return (
//     <div>
//       当前的查询参数：{JSON.stringify(query)}
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Button
//           type="primary"
//           onClick={() => {
//             setVisible(true);
//           }}
//         >
//           添加
//         </Button>
//         <Input.Search
//           style={{ width: 300 }}
//           onSearch={(val) =>
//             setQuery((q) => ({
//               ...q,
//               search: val,
//               page: 1,
//             }))
//           }
//         />
//       </div>
//       <Table
//         rowKey="id"
//         dataSource={dataList}
//         columns={columns}
//         loading={loading}
//         pagination={{
//           current: query.page,
//           pageSize: query.page_size,
//           total,
//         }}
//         onChange={handleTableChange}
//       ></Table>
//       <Modal
//         visible={visible}
//         title="创建"
//         confirmLoading={addLoading}
//         onOk={() => {
//           form.validateFields().then(handleAdd);
//         }}
//         onCancel={() => setVisible(false)}
//       >
//         <Form form={form}>
//           <Form.Item name="name" label="name" rules={[{ required: true, message: '请输入name' }]}>
//             <Input></Input>
//           </Form.Item>
//           <Form.Item
//             name="status"
//             label="status"
//             rules={[{ required: true, message: '请输入status' }]}
//           >
//             <Select
//               options={['success', 'fail', 'warning'].map((item) => ({
//                 label: item,
//                 value: item,
//               }))}
//             ></Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Demo3;

const useMyHttp = <T extends {}, Params extends {}>(
  httpFn: (params: Params) => Promise<T>,
  config?: { refreshDeps?: any[]; manual?: boolean; onSuccess?: (val: T) => void },
) => {
  const { refreshDeps = [], manual = false, onSuccess } = config || {};

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<T>();

  const fn = useRef(httpFn);

  const successCb = useRef(onSuccess);

  useEffect(() => {
    fn.current = httpFn;
  }, [...refreshDeps, httpFn]);

  const http = useCallback(
    (val: Params) => {
      setLoading(true);
      return fn.current(val).then((res) => {
        setData(res);
        setLoading(false);
        successCb.current?.(res);
      });
    },
    [...refreshDeps],
  );

  useEffect(() => {
    if (manual) {
      return;
    }
    http();
  }, [http, manual]);

  const run = useCallback(
    (val: Params) => {
      return http(val);
    },
    [http],
  );

  return { data, loading, run };
};

type Action =
  | { type: 'reset' }
  | { type: 'search'; payload: string }
  | { type: 'change'; payload: Partial<ReqParams> };

function reducer(state: ReqParams, action: Action) {
  switch (action.type) {
    case 'reset':
      return { page: 1, page_size: 3 };
    case 'search':
      return { page: 1, page_size: 3, search: action.payload };
    case 'change':
      return { ...state, ...action.payload };

    default:
      throw new Error();
  }
}

const Demo3 = () => {
  const [query, dispatch] = useReducer(reducer, {
    page: 1,
    page_size: 3,
    sort: '-update_tm',
  });

  const { data, loading } = useMyHttp(() => fetchData(query), {
    refreshDeps: [query],
  });

  const { total = 0, results: dataList } = data || {};

  const { loading: deleteLoading, run: deleteRun } = useMyHttp(deleteData, {
    manual: true,
    onSuccess: () => {
      dispatch({
        type: 'reset',
      });
    },
  });

  const [visible, setVisible] = useState(false);

  const { loading: addLoading, run: addRun } = useMyHttp(addData, {
    manual: true,
    onSuccess: () => {
      setVisible(false);
      dispatch({
        type: 'reset',
      });
    },
  });

  const [curRecord, setCurRecord] = useState<DataItem>();

  const [form] = Form.useForm<{
    name: string;
    status: Status;
  }>();

  const handleDelete = (record: DataItem) => {
    setCurRecord(record);
    deleteRun(record.id);
  };

  const columns: ColumnsType<DataItem> = [
    {
      dataIndex: 'name',
      title: 'name',
    },
    {
      dataIndex: 'status',
      title: '状态',
      filters: ['success', 'fail', 'warning'].map((item) => ({
        text: item,
        value: item,
      })),
      filterMultiple: false,
    },
    {
      dataIndex: 'update_tm',
      title: '更新时间',
      sorter: true,
      defaultSortOrder: 'descend',
    },
    {
      title: '操作',
      render: (_, record) => (
        <Button
          loading={curRecord?.id === record.id && deleteLoading}
          onClick={() => {
            handleDelete(record);
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataItem>,
  ) => {
    console.log(pagination, filters, sorter);

    dispatch({
      type: 'change',
      payload: {
        page: pagination.current as number,
        status: filters?.status?.[0] as Status,
        sort: sorter.order
          ? ((sorter.order === 'ascend' ? 'update_tm' : '-update_tm') as SortMode)
          : undefined,
      },
    });
  };

  return (
    <div>
      当前的查询参数：{JSON.stringify(query)}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          添加
        </Button>
        <Input.Search
          allowClear={true}
          style={{ width: 300 }}
          onSearch={(val) =>
            dispatch({
              type: 'search',
              payload: val,
            })
          }
        />
      </div>
      <Table
        rowKey="id"
        dataSource={dataList}
        columns={columns}
        loading={loading}
        pagination={{
          current: query.page,
          pageSize: query.page_size,
          total,
        }}
        onChange={handleTableChange}
      ></Table>
      <Modal
        visible={visible}
        title="创建"
        confirmLoading={addLoading}
        onOk={() => {
          form.validateFields().then(addRun);
        }}
        onCancel={() => setVisible(false)}
      >
        <Form form={form}>
          <Form.Item name="name" label="name" rules={[{ required: true, message: '请输入name' }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="status"
            label="status"
            rules={[{ required: true, message: '请输入status' }]}
          >
            <Select
              options={['success', 'fail', 'warning'].map((item) => ({
                label: item,
                value: item,
              }))}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Demo3;
