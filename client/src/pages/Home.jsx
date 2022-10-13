import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import {useSelector, useDispatch} from 'react-redux';
import { getAllJobs } from "../redux/actions/jobActions";
import { useEffect } from 'react';
import {Row, Col, Button} from 'antd';
import moment from 'moment';
import { Link } from "react-router-dom";


function Home(){

    const {jobs} = useSelector(state=>state.jobsReducer)//here you specify
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllJobs())
    }, []);

    return(
        <div>
            <DefaultLayout>
                <Row gutter={16}>
                {jobs.map((job)=>{
                    return <Col lg={12} sm={24}>
                        <div className="job-div bs m-2 p-2">
                            <h4>{job.title}</h4>
                            <p>{job.company}</p>
                            <hr/>
                            <p>{job.smallDescription}</p>
                            <div className="flex justify-content-between">
                                <p>Salary : <b>{job.salaryFrom} - {job.salaryTo}</b></p>
                                <p className="ml-5">Experience : {job.experience} Years</p>
                            </div>
                            <></>
                            <div className="flex justify-content-between">
                                <Link to={`/jobs/${job._id}`}><Button>View</Button></Link>
                            </div>
                            <p>Posted on : {moment(job.createdDate).format('DD-MM-YYYY')}</p>
                        </div>
                    </Col>
                })}
                </Row>
            </DefaultLayout>
        </div>
    )
}

export default Home;