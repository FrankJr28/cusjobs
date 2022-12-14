import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { useParams } from 'react-router';
import moment from 'moment';
import {Button, Tag} from 'antd';
import { Link } from 'react-router-dom'
import { applyJob } from '../redux/actions/jobActions';

function JobInfo(){
    const {jobs} = useSelector(state=>state.jobsReducer)
   
    const params= useParams()
   
    const job = jobs.find(job=>job._id == params.id)
   
    const userid = JSON.parse(localStorage.getItem('user'))._id
   
    const appliedCandidates = job.appliedCandidates

    const alreadyApplied = appliedCandidates.find(candidate=>candidate.userid == userid)

    const dispatch = useDispatch()
    
    function applyNow() {
        dispatch(applyJob(job))
    }
    
    return( 
        <DefaultLayout>
            <h1>Job Info</h1>
            {params.id} 
            <div>
                <p><b>Title</b> : {job.title}</p>
                <p><b>Company</b> : {job.company}</p>
                <p><b>Small Description</b> : {job.smallDescription}</p>
                <p><b>Full Description</b> : {job.fullDescription}</p>
                <p><b>Title</b> : {job.title}</p>
                <p><b>Skills Required</b> : {job.skillsRequired}</p>
                <p><b>Experience</b> : {job.experience}</p>
                <p><b>Minimun Qualification</b> : {job.minimunQualification}</p>

                <hr/>

                <p><b>Salary Range</b> : {job.salaryFrom} - {job.salaryTo}</p>
                <p><b>Department</b> : {job.department}</p>
                <p><b>Company Profile</b> : {job.companyDescription}</p>
                <p><b>Total Candidates applied</b> : {job.appliedCandidates.length}</p>

                <hr/>

                <div className='flex justify-content-between'>
                    {job.postedBy==userid ? (
                    <Button> <Link to={`/editjob/${job._id}`}> 
                    Edit Now </Link> 
                    </Button>) 
                    : alreadyApplied ? (<Tag color="green">Already Aplied</Tag>) : (<Button onClick={applyNow}>Apply Now</Button>)}
                    <p><b>Posted on</b> {moment(job.createdAt).format('MMM DD yyyy')} </p>
                </div>

            </div>
        </DefaultLayout>
    )
}

export default JobInfo;
//https://medium.com/alturasoluciones/parametrizar-rutas-con-react-router-1f1a0268f1a7