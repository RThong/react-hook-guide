import moment from 'moment';
import { maxBy } from 'lodash';

export type Status = 'success' | 'fail' | 'warning';

export type SortMode = 'update_tm' | '-update_tm';

export interface DataItem {
  id: number;
  name: string;
  status: Status;
  update_tm: string;
}

export type ReqParams = {
  page: number;
  page_size: number;
  status?: Status;
  sort?: SortMode;
  search?: string;
};

let data: DataItem[] = [
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

export const fetchData = ({ page, page_size, status, sort, search }: ReqParams) => {
  console.log('【fetchData】', { page, page_size, status, sort, search });

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

export const deleteData = (id: number) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      data = data.filter((item) => item.id !== id);
      resolve({
        status: 'success',
      });
    }, 1000);
  });
};

export const addData = ({ name, status }: { name: string; status: Status }) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      data = [
        ...data,
        {
          id: (maxBy(data, 'id')?.id as number) + 1,
          name,
          status,
          update_tm: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
      ];
      resolve({
        status: 'success',
      });
    }, 1000);
  });
};
