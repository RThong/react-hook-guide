/**
 * 一般第三方图表组件库，第一步都是初始化创建图表实例并关联到对应dom节点上，第二步都是调用api去根据数据去渲染图表
 *
 * 对应在hook中首先是将dom节点和图表实例都使用useRef进行保存，后续的操作都是通过ref.current保存的唯一图表实例去调用对应的api来实现
 *
 * 因为图表渲染相对耗费性能，所以图表实例不用状态保存
 */

/** ***********************    g6 demo   ****************************************** */
import type { Graph } from '@antv/g6';
import G6 from '@antv/g6';
import { useEffect, useRef } from 'react';
import data from './data';

const ThirdLib = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const graphRef = useRef<Graph | null>(null);

  //  创建graph实例
  useEffect(() => {
    graphRef.current = new G6.Graph({
      container: container.current as HTMLDivElement,
      width: 800,
      height: 600,
      fitView: true,
      fitViewPadding: 50,
      minZoom: 0.00000001,
      layout: {
        type: 'comboForce',
        nodeSpacing: (d) => 8,
      },
      defaultNode: {
        size: 15,
        color: '#5B8FF9',
        style: {
          lineWidth: 2,
          fill: '#C6E5FF',
        },
      },
      defaultEdge: {
        size: 2,
        color: '#e2e2e2',
      },
      modes: {
        default: ['drag-combo', 'drag-node', 'drag-canvas', 'zoom-canvas'],
      },
    });
  }, []);

  // 调用实例api渲染
  useEffect(() => {
    const graph = graphRef.current;
    graph?.data(data);
    graph?.render();
  }, []);

  return <div ref={container} style={{ width: 800, height: 600 }}></div>;
};

export default ThirdLib;
/** **************************** g6 demo结束       ************************************* */

/** **************************** echart demo       ************************************* */

/**
 * echarts图表可以使用echarts-for-react，也能够直接去使用
 */

// import * as echarts from 'echarts';
// import type { ECharts } from 'echarts';
// import { useEffect, useRef } from 'react';

// const ThirdLib = () => {
//   const container = useRef<HTMLDivElement | null>(null);

//   const chart = useRef<ECharts | null>(null);

//   useEffect(() => {
//     chart.current = echarts.init(container.current as HTMLDivElement);
//   }, []);

//   useEffect(() => {
//     chart.current?.setOption({
//       xAxis: {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//       },
//       yAxis: {
//         type: 'value',
//       },
//       series: [
//         {
//           data: [150, 230, 224, 218, 135, 147, 260],
//           type: 'line',
//         },
//       ],
//     });
//   }, []);

//   return <div ref={container} style={{ width: 800, height: 600 }}></div>;
// };

// export default ThirdLib;
