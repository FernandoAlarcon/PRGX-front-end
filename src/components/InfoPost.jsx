import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/infoPost.css';
import URL_DATA from '../data/routes.json'


function InfoBook (props) {

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        checkInfo();
    },[]);

    const [editPost, setEditPost] = useState(false);
    const [DataPost, setDataPost] = useState({
        id: Math.random(),
        userId: Math.random(),
        title: "",
        body: "", 
    });

    const checkInfo = () => {
        if(props.dataPost){

            console.log(props)
            let data = props.dataPost;
            setEditPost(true);
            setDataPost({
                id: data.id,
                userId: data.userId,
                title: data.title,
                body: data.body, 
            });
        }
    }

    const handleChange = (event) => { 
        setDataPost({
            ...DataPost,
            [event.target.name]: event.target.value
        });
    };

    const CleanForm = () => {
        setDataPost({
            id: "",
            userId: "",
            title: "",
            body: "", 
        });
    }//CleanForm

    const NuevoPost = async () => {

        try {   
            
            if( DataPost.title !== "" ||  
                DataPost.body !== "" ){
 
             //handleClose() 
 
             let DataSend = {
                 'title': DataPost.title,
                 'body': DataPost.body,
                 'userId': Math.random(), 
                 'id': Math.random() 
             }

             //console.log(DataSend);
 
             await axios.post(`${URL_DATA.SERVER_JSON.URL_BASE}/posts`, DataSend).then( res => {
                 
                 console.log(res)
 
                 if(res.status){
                     Swal.fire({
                         icon: 'success',
                         title: 'Buen trabajo...',
                         text: res.data.message
                        })                    
                        CleanForm();
                 }else{
                     Swal.fire({
                         icon: 'error',
                         title: 'Error Form',
                         text: res.data.message
                     })
                }
             })
            }else{
             Swal.fire({
                 icon: 'warning',
                 title: 'Error Form',
                 text: 'Deben estar todos lo campos llenos...'
             })
            }
 
         } catch (error) {
             
             Swal.fire({
                 icon: 'error',
                 title: 'error...',
                 text: error
             })
         }

    }

    const EditarPost = async () => {
        
        try {   
            await axios.put(`${URL_DATA.SERVER_JSON.URL_BASE}/posts/${DataPost.id}`, DataPost).then( res => {
                console.log(res);
               if(res.status === 200 ){
                    CleanForm();
                    props.getData();
                    props.handleClose();
                    setEditPost(true);

                    Swal.fire({
                        icon: 'success',
                        title: 'Buen trabajo...',
                        text: res.data.message
                    })
               }else{

                Swal.fire({
                    icon: 'error',
                    title: 'Error Form',
                    text: res.data.message
                })

               }/// end if
            })
        } catch (error) {
            
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: error
            })
        }
    }
    

    return <div className="">
                <div className="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="panel-posts">
                                {   editPost === false ?
                                        <h4>Añade nuevos posts</h4>  
                                    :
                                        <h4>Editar Post</h4> 
                                }
                                <br/>
                                <div class="row  ">
                                
                                 
                                <div class="col-lg-4  ">
                                    <ul>
                                        <li>
                                            <label for="title" >Titulo Post</label>
                                            <input  id="title" type="text" className='form-control' 
                                                            placeholder="Titulo" 
                                                            name="title"
                                                            value={DataPost.title}
                                                            onChange={handleChange} />
                                        </li>
                                        
                                  
                                        <li>
                                            <div class="form-group">
                                                <label for="body" >Descripcion Post</label>
                                                <textarea className="form-control"
                                                          id="body"
                                                          name="body"
                                                          value={DataPost.body}
                                                          onChange={handleChange}
                                                          placeholder='Descripcion' rows="3"></textarea>
                                            </div>
                                        </li>
                                        <div class="main-border-button">
                                        {   editPost === false ?
                                                <button className='btn btn-primary' onClick={NuevoPost} > Agregar Post </button>
                                            :
                                                <button className='btn btn-warning' onClick={EditarPost} > Guardar Cambios </button>
                                        }
                                        </div>
                                    </ul>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    

}

export default InfoBook;