import React, {useState} from "react";
import { Input, Button, Modal, Form, Select } from 'antd';
import { FilterOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search"; 
import {useDispatch} from "react-redux"
import {searchJobs, sortJobs} from '../redux/actions/jobActions'

/*const Search = Input
*/
const {Option} = Select;

function Filter(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()


    const showModal = () => {
    setIsModalOpen(true);
    };

    const handleOk = () => {
    setIsModalOpen(false);
    };

    const handleCancel = () => {
    setIsModalOpen(false);
    };

    function sort(values){

        dispatch(sortJobs(values))
   
        handleCancel()
   
     }

    return(
        <div className="flex">
            <Search onSearch={(value)=>{dispatch(searchJobs(value))}} />
            <FilterOutlined onClick={showModal}/>
            
            <Modal title="Select filters" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closable={false}>
                <Form layout="vertical" onFinish={sort}>
                    <Form.Item name={'experience'} label='Experience'>

                        <Select>
                            <Option value={0}>Fresher</Option>
                            <Option value={1}>1 Year</Option>
                            <Option value={2}>2 Years</Option>
                            <Option value={3}>3 Years</Option>
                            <Option value={4}>4 Years</Option>
                            <Option value={5}>5 Years</Option>
                        </Select>

                    </Form.Item>

                    <Form.Item name={'salary'} label='Salary'>

                        <Select>
                            <Option value={10000}>10000+</Option>
                            <Option value={15000}>15000+</Option>
                            <Option value={25000}>25000+</Option>
                            <Option value={35000}>35000+</Option>
                            <Option value={50000}>50000+</Option>
                            <Option value={70000}>70000+</Option>
                        </Select>

                    </Form.Item>
                    <Button htmlType="submit">Filter</Button>
                </Form>
            </Modal>
        </div>
    )
}

export default Filter