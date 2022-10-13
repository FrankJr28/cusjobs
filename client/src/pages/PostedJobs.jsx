import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector , useDispatch } from 'react-redux'
import { Table, Modal } from 'antd'
import moment from "moment";
import { useNavigate }from "react-router-dom"
import { Link } from "react-router-dom";

import {
    EditOutlined,
    OrderedListOutlined
  } from '@ant-design/icons';

function PostedJobs(){
    const alljobs = useSelector(state=>state.jobsReducer).jobs  //Obtenemos los trabajos
    const allusers = useSelector(state=>state.usersReducer).users
    const userid = JSON.parse(localStorage.getItem('user'))._id //Obtenemos el Id del usuario
    const userPostedJobs = alljobs.filter(job=>job.postedBy==userid)    //obtenemos los trabajos de acuerdo al id
    const [selectedJob, setSelectedJob] = useState();
    const history = useNavigate();


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (job) => {
        setIsModalOpen(true);
        setSelectedJob(job)
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Company",
            dataIndex: "company", 
        },
        {
            title: "Posted On",
            dataIndex: "postedon",
        },
        {
            title: "Applied Candidates",
            dataIndex: "appliedCandidates",
        },
        {
            title: "Actions",
            render: (text, data)=>{
                return <div className="flex">
                    <EditOutlined className="mr-2" style={{fontSize:20}} onClick={()=>{history(`/editjob/${data.completeJobData._id}`)}}/>
                    <OrderedListOutlined style={{fontSize:20}} onClick={()=>{showModal(job)}}/>
                </div>
            }
        }

    ];

    const dataSource = []

    for(var job of userPostedJobs){
        var obj = {
            title : job.title ,
            company : job.company ,
            postedOn : moment(job.createdAt).format('MMM DD yyyy'),
            appliedCandidates : job.appliedCandidates.length,
            completeJobData : job
        }
        dataSource.push(obj);
    }

    console.log(userPostedJobs)
    
    function CandidatesList(){
        var candidatesDatasource = []
    
        const candidatesColumns = [
            {
                title: "Candidate Id",
                render : (text, data)=>{
                    return <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
                }
            },
            {
                title: "Full Name",
                dataIndex: "fullName",
            },
            {
                title: "Applied Date",
                dataIndex: "appliedDate",
            },
        ];

        for(var candidate of selectedJob.appliedCandidates){

            var user = allusers.find(user=>user._id == candidate.userid)

            var obj = {
                candidateId : user._id,
                fullName : user.firstName + " " + user.lastName,
                appliedDate : candidate.appliedDate
            }

            console.log(user);
            console.log("El id de usuario es "+user._id);

            candidatesDatasource.push(obj)
        }

        return <Table columns={candidatesColumns} dataSource={candidatesDatasource} />

    }

    return (
        <div>
            <DefaultLayout>
                <h1>Posted Jobs</h1>
                <Table columns={columns} dataSource={dataSource}></Table>
                <Modal title="Applied Candidates List" open={isModalOpen} closable={false} onOk={handleOk} onCancel={handleCancel}>
                    <CandidatesList/>
                </Modal>
            </DefaultLayout>
        </div>
    )

}

export default PostedJobs