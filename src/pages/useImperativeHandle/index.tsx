import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

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

type Record = {
  name: string;
  age: number;
};

/**
 * forwardRef对外暴露ref
 * useImperativeHandle在ref上绑定特定的值
 */
const Child = forwardRef<
  | {
      curRecord: Record | undefined;
      setDataList: React.Dispatch<
        React.SetStateAction<
          {
            name: string;
            age: number;
          }[]
        >
      >;
    }
  | undefined
>((props, ref) => {
  const [curRecord, setCurRecord] = useState<Record>();

  const [dataList, setDataList] = useState(data);

  /**
   * 将状态暴露给父组件调用，甚至能在父组件修改子组件的内部的状态，
   * 切记：很少情况才需要这样做，大规模使用这样的方式会导致组件的状态逻辑十分混乱
   *       常规开发用不到，只在封装组件时可能会用到
   */
  useImperativeHandle(ref, () => ({
    curRecord,
    setDataList,
  }));

  const columns: ColumnsType<Record> = [
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
      render: (_, record) => <Button onClick={() => setCurRecord(record)}>选择</Button>,
    },
  ];

  return <Table rowKey="name" dataSource={dataList} columns={columns}></Table>;
});

const Demo = () => {
  const ref = useRef<{
    curRecord: Record | undefined;
    setDataList: React.Dispatch<
      React.SetStateAction<
        {
          name: string;
          age: number;
        }[]
      >
    >;
  }>();

  return (
    <div>
      <Child ref={ref} />
      <Button onClick={() => console.log(ref.current?.curRecord)}>获取curRecord</Button>
      <Button
        onClick={() =>
          ref.current?.setDataList((val) => [
            ...val,
            {
              name: 'ddd',
              age: 15,
            },
          ])
        }
      >
        添加data
      </Button>
    </div>
  );
};

export default Demo;
