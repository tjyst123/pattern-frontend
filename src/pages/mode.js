import React, { useState } from "react";
import { Breadcrumbs, Typography, Link, Button } from "@mui/material";
import cookie from 'react-cookies'
import Graphin, { Behaviors, Utils } from '@antv/graphin';
import { Grid, Col, Card } from 'antd';
import { useNavigate } from "react-router-dom";

export default function Mode() {

    const selection = cookie.load('selection')

    const data = Utils.mock(8).circle().graphin()

    const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

    const numCols = 9

    const navigator = useNavigate()

    function handleClick(index) {
        cookie.save("mode", index)
        navigator('/entity')
    }

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 30, m: 3 }}>
                <Typography color="text.primary" fontSize={30}>当前位置: </Typography>
                <Link underline="hover" color="inherit" href="/">
                    relationship
                </Link>
                <Link
                    underline="hover"
                    color="text.primary"
                    href="/mode"
                    aria-current="page"
                >
                    mode
                </Link>
            </Breadcrumbs>
            <h1 style={{ textAlign: "center", fontSize: 60 }}>选择的关系为{selection}，请选择模式</h1>
            <div>
                {[...Array(numCols)].map((_, index) => {
                    let index_title = "模式" + index
                    return (
                        <Col span={14} push={5}>
                            <Card title={index_title}
                                bodyStyle={{ backgroundColor: "#E6E6FA" }}
                                headStyle={{ fontSize: "30px", backgroundColor: "#E6E6FA" }}>
                                <Graphin data={data} layout={{ type: 'random' }}
                                    defaultNode={{
                                        style: {
                                            label: { fontSize: 20 },
                                            keyshape: { size: 60 }
                                        }
                                    }}>
                                    <ZoomCanvas disabled />
                                </Graphin>
                            </Card>
                            <div style={{ margin: "20px", width: "100%", display: "flex", justifyContent: "center" }}>
                                <Button onClick={() => handleClick(index)} variant="contained" size="large" sx={{ width: '200px', height: '100%', fontSize: '30px' }}>确认</Button>
                            </div>
                        </Col>
                    )
                })}
            </div>
        </div>
    )
}