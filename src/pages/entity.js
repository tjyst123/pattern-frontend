import React from "react";
import { Breadcrumbs, Typography, Link, Button } from "@mui/material";
import cookie from 'react-cookies'
import Graphin, { GraphinContext, Utils } from '@antv/graphin';
import { TagFilled, DeleteFilled, ExpandAltOutlined } from '@ant-design/icons';
import { ContextMenu } from '@antv/graphin-components';
import { message, Col, Card } from 'antd';

const { Menu } = ContextMenu;
const options = [
    {
        key: 'tag',
        icon: <TagFilled />,
        name: '打标',
    },
    {
        key: 'delete',
        icon: <DeleteFilled />,
        name: '删除',
    },
    {
        key: 'expand',
        icon: <ExpandAltOutlined />,
        name: '扩散',
    },
];
const CanvasMenu = props => {
    const { graph, contextmenu } = React.useContext(GraphinContext);
    const context = contextmenu.canvas;
    const handleDownload = () => {
        graph.downloadFullImage('canvas-contextmenu');
        context.handleClose();
    };
    const handleClear = () => {
        message.info(`清除画布成功`);
        context.handleClose();
    };
    const handleStopLayout = () => {
        message.info(`停止布局成功`);
        context.handleClose();
    };
    return (
        <Menu bindType="canvas">
            <Menu.Item onClick={handleClear}>清除画布</Menu.Item>
            <Menu.Item onClick={handleStopLayout}>停止布局</Menu.Item>
            <Menu.Item onClick={handleDownload}>下载画布</Menu.Item>
        </Menu>
    );
};

export default function Entity() {

    const selection = cookie.load('selection')
    const mode = cookie.load('mode')
    const data = Utils.mock(8).circle().graphin()
    const numCols = 9
    const handleChange = (menuItem, menuData) => {
        console.log(menuItem, menuData);
        message.info({
            content: `元素：${menuData.id}，动作：${menuItem.name}`,
            style: {
                fontSize: '20px',
            }
        });
    };

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 30, m: 3 }}>
                <Typography color="text.primary" fontSize={30}>当前位置: </Typography>
                <Link underline="hover" color="inherit" href="/">
                    relationship
                </Link>
                <Link underline="hover" color="inherit" href="/">
                    mode
                </Link>
                <Link
                    underline="hover"
                    color="text.primary"
                    href="/mode"
                    aria-current="page"
                >
                    entity
                </Link>
            </Breadcrumbs>
            <h1 style={{ textAlign: "center", fontSize: 60 }}>选择的关系为{selection}，选择的模式为{mode}</h1>
            <div>
                {[...Array(numCols)].map((_, index) => {
                    let index_title = "实例" + index
                    return (
                        <Col span={14} push={5}>
                            <Card title={index_title}
                                bodyStyle={{ backgroundColor: "#E6E6FA" }}
                                headStyle={{ fontSize: "30px", backgroundColor: "#E6E6FA" }}>
                                <Graphin data={data}
                                    defaultNode={{
                                        style: {
                                            label: { fontSize: 20 },
                                            keyshape: { size: 60 }
                                        }
                                    }}>
                                    <ContextMenu style={{ width: '180px', fontSize: '20px' }}>
                                        <Menu options={options} onChange={handleChange} bindType="node" />
                                    </ContextMenu>
                                    <ContextMenu style={{ width: '180px', fontSize: '20px' }} bindType="canvas">
                                        <CanvasMenu />
                                    </ContextMenu>
                                    <ContextMenu style={{ width: '220px', fontSize: '20px' }} bindType="edge">
                                        <Menu
                                            options={options.map(item => {
                                                return { ...item, name: `${item.name}-EDGE` };
                                            })}
                                            onChange={handleChange}
                                            bindType="edge"
                                        />
                                    </ContextMenu>
                                </Graphin>
                            </Card>
                            <div style={{ margin: "20px", width: "100%", display: "flex", justifyContent: "center" }}>
                            </div>
                        </Col>
                    )
                })}
            </div>
        </div>
    )
}