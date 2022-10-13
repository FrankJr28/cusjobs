import React, {useState} from "react";
import DefaultLayout from "../components/DefaultLayout";
import {Row, Col, Form, Tabs, Input, Button, Select } from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router';
import { editJob } from '../redux/actions/jobActions'

const { TextArea } = Input;
const { Option } = Select
function EditJob({match}){

    const params= useParams()
    
    const [jobInfo, setJobInfo] = useState({})
    const [activeTab, setActiveTab] = useState("1")
    const dispatch = useDispatch()

    function onFirstFormFinish(values){
        setJobInfo(values)
        setActiveTab("2")
    }

    function onFinalFormFinish(values){
        const finalObj = {...jobInfo , ...values};
        finalObj._id = params.id
        console.log(finalObj)
        dispatch(editJob(finalObj))
    }

    const {jobs} = useSelector(state=>state.jobsReducer)
    const job = jobs.find(job=>job._id==params.id)
    console.log("Hola")
    console.log(job)
    console.log("Adios")

    return(
        <div>
            <DefaultLayout>
                <Tabs defaultActiveKey="1" activeKey={activeTab}
                    items={[
                    {
                        label: `Job Info`,
                        key: '1',
                        children: 
                            <Form layout="vertical" onFinish={onFirstFormFinish} initialValues={job}>
                                <Row gutter={16}>
                                    <Col lg={8} sm={24}>
                                        <Form.Item label="Title" required rules={[{required : true}]} name='title'>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col lg={8} sm={24}>
                                        <Form.Item label="Department" required rules={[{required : true}]} name='department'>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col lg={8} sm={24}>
                                        <Form.Item label="Experience" required rules={[{required : true}]} name='experience'>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col lg={8} sm={24}>
                                        <Form.Item label="Salary From" required rules={[{required : true}]} name='salaryFrom'>
                                            <Input type='number' />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={8} sm={24}>
                                        <Form.Item label="Salary To" required rules={[{required : true}]} name='salaryTo'>
                                            <Input type='number' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    
                                    <Col lg={8} sm={24}>
                                        <Form.Item label="Skills" required rules={[{required : true}]} name='skillsRequired'>
                                            <Input type='number' />
                                        </Form.Item>
                                    </Col>

                                    <Col lg={8} sm={24}>
                                        <Form.Item label="Minimun Qualification" required rules={[{required : true}]} name='minimunQualification'>
                                            <Select>
                                                <Option value='Degree'>Degree</Option>
                                                <Option value='Plus 2'>Plus 2</Option>
                                                <Option value='10th'>10th</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col lg={24} sm={24}>
                                        <Form.Item label="Small description" required rules={[{required : true}]} name='smallDescription'>
                                            <TextArea rows={3}/>
                                        </Form.Item>
                                    </Col>

                                    <Col lg={24} sm={24}>
                                        <Form.Item label="Full description" required rules={[{required : true}]} name='fullDescription'>
                                            <TextArea rows={6}/>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Button htmlType="submit">Next</Button>
                            </Form>
                        ,
                    },
                    {
                        label: `Company Info`,
                        key: '2',
                        children: 
                        <Form layout='vertical' onFinish={onFinalFormFinish} initialValues={job}>
                            <Row gutter={16}>
                                <Col lg={8} sm={24}>
                                    <Form.Item label="Company Nane" required rules={[{required : true}]} name='company'>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col lg={8} sm={24}>
                                    <Form.Item label="Company Email" required rules={[{required : true}]} name='email'>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col lg={8} sm={24}>
                                    <Form.Item label="Phone Number" required rules={[{required : true}]} name='phoneNumber'>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col lg={24} sm={24}>
                                    <Form.Item label="Company Description" required rules={[{required : true}]} name='companyDescription'>
                                        <TextArea rows={3} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button onClick={()=>{setActiveTab("1")}}>Previous</Button>
                            <Button htmlType="submit">Edit Job</Button>
                        </Form>
                        ,
                    },
                    
                    ]}
                /> 
            </DefaultLayout>
        </div>
    )
}

export default EditJob;