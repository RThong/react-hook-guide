import { Button, Space } from 'antd';
import { useHistory } from 'umi';

export default function IndexPage(props) {
  const history = useHistory();
  console.log(props);

  return (
    <div>
      <Space size={8}>
        {(props.route?.routes || []).map((item) => (
          <Button key={item.path} onClick={() => history.push(item.path)}>
            {item.text || item.path}
          </Button>
        ))}
      </Space>

      {props.children}
    </div>
  );
}
