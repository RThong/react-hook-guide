import type { TablePaginationConfig } from 'antd';
import { Input } from 'antd';
import { Table } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/lib/table/interface';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type SortMode = 'update_tm' | '-update_tm';

type Status = 'success' | 'fail' | 'warning';

type ReqParams = {
  page: number;
  page_size: number;
  status?: Status;
  sort?: SortMode;
  search?: string;
};

interface DataItem {
  id: number;
  name: string;
  status: Status;
  update_tm: string;
}

const data: DataItem[] = [
  {
    id: 1,
    name: 'ksp-devops5q24x-ksp-pipeline-trunk-master-2-1hrwn-qchmw-08cx4',
    status: 'success',
    update_tm: '2021-08-03 21:06:13',
  },
  {
    id: 2,
    name: 'ksp-web-56cc8fbf59-6qn5r',
    status: 'warning',
    update_tm: '2021-08-03 17:39:16',
  },
  {
    id: 3,
    name: 'ksp-agent-lhxlk',
    status: 'fail',
    update_tm: '2021-08-03 19:50:34',
  },

  {
    id: 4,
    name: 'nginx-app-6478bdd46-2hdvq',
    status: 'warning',
    update_tm: '2021-08-03 19:15:11',
  },
  {
    id: 5,
    name: 'nginx-app-6478bdd46-g28bt',
    status: 'success',
    update_tm: '2021-08-03 21:01:11',
  },

  {
    id: 6,
    name: 'ksp-agent-86blz',
    status: 'warning',
    update_tm: '2021-08-03 17:44:44',
  },
  {
    id: 7,
    name: 'ksp-agent-xcpq2',
    status: 'fail',
    update_tm: '2021-08-03 17:43:45',
  },
  {
    id: 8,
    name: 'notification-manager-operator-78595d8666-ngzsl',
    status: 'fail',
    update_tm: '2021-08-03 19:20:16',
  },

  {
    id: 9,
    name: 'elasticsearch-kibana-d58458ff-2xbdx',
    status: 'success',
    update_tm: '2021-08-03 17:38:55',
  },
  {
    id: 10,
    name: 'elasticsearch-coordinating-only-76749c4d69-6pn4h',
    status: 'fail',
    update_tm: '2021-08-03 17:45:35',
  },
];

const searchFilter =
  (str = '') =>
  (item: DataItem) =>
    item.name.indexOf(str) !== -1;

const statusFilter = (status?: Status) => (item: DataItem) => !status || status === item.status;

const sorterFn = (sortStr?: SortMode) => (a: DataItem, b: DataItem) =>
  // eslint-disable-next-line no-nested-ternary
  sortStr
    ? sortStr === 'update_tm'
      ? moment(a.update_tm).valueOf() - moment(b.update_tm).valueOf()
      : moment(b.update_tm).valueOf() - moment(a.update_tm).valueOf()
    : 0;

const fetchData = ({ page, page_size, status, sort, search }: ReqParams) => {
  return new Promise<{ results: DataItem[]; total: number }>((resolve) => {
    setTimeout(() => {
      const list = data
        .filter(searchFilter(search))
        .filter(statusFilter(status))
        .sort(sorterFn(sort));

      console.log('【接口数据】', list);
      const curPageList = list.slice((page - 1) * page_size, page * page_size);
      resolve({
        results: curPageList,
        total: list.length,
      });
    }, 1000);
  });
};

const Demo3 = () => {
  const [query, setQuery] = useState<ReqParams>({
    page: 1,
    page_size: 3,
  });

  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(query).then((res) => {
      setDataList(res.results);
      setTotal(res.total);
      setLoading(false);
    });
  }, [query]);

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
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataItem>,
  ) => {
    console.log(pagination, filters, sorter);

    setQuery((q) => ({
      ...q,
      page: pagination.current as number,
      status: filters?.status?.[0] as Status,
      sort: sorter.order
        ? ((sorter.order === 'ascend' ? 'update_tm' : '-update_tm') as SortMode)
        : undefined,
    }));
  };

  return (
    <div>
      当前的查询参数：{JSON.stringify(query)}
      <div style={{ textAlign: 'right' }}>
        <Input.Search
          style={{ width: 300 }}
          onSearch={(val) =>
            setQuery((q) => ({
              ...q,
              search: val,
              page: 1,
            }))
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
    </div>
  );
};

export default Demo3;
