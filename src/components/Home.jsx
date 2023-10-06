import React, { useState, useEffect } from 'react';
import InfoPost from './InfoPost';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/home.css';
import URL_DATA from '../data/routes.json'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'; 
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';



//const URL_BASE = 'https://jsonplaceholder.typicode.com/posts';

function Home (){

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        getData();
    },[]);

    const columns = [
        {
         name: "userId",
         label: "Usuario",         
        },
        {
         name: "id",
         label: "# post",
        },
        {
         name: "title",
         label: "Titulo",         
        },
        {
         name: "body",
         label: "Texto",
        },
    ];

    const options = {
        filterType: 'checkbox',
        viewColumns: true, 
        onTableChange: (action, state) => {

            //console.log('action ' + action);

            if(action === 'rowDelete'){

                //console.dir(state);
                deleteData();
                //console.log(state);
            }else if(action === 'rowSelectionChange'){

                console.log(state.selectedRows.data);
                setSelectedRow(state.selectedRows.data);

            }


        }
    };
    const [dataPost, setdataPost]         = useState([]);
    const [selectedRow, setSelectedRow]   = useState([]);
    const [open, setOpen] = useState(false);

    const [DataPost, setDataPost] = useState({
        userId: '',
        id: '',
        title: "",
        body: ""
    });

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 950,
        bgcolor: 'black',
        border: '2px solid #000',
        boxShadow: 30,
        p: 4,
    };
 
    
    const handleClose = () =>{ 
        setOpen(false); 
    }

    const handleOpen = (post) => {
        
        setOpen(true);
        setDataPost({
            userId : post.userId,
            id     : post.id,
            title  : post.title,
            body   : post.body 
        });

    }
    
    const getData = async () => {
        try {
            await axios.get(`${URL_DATA.SERVER_JSON.URL_BASE}/posts`).then( res => {
                //console.log(res.data)
                setdataPost(res.data)
            })
        } catch (error) {
            
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: error
            })
        }
    }

    const deleteFile = async (post) => {

        let id_post = dataPost[post.index].id;

        await axios.delete(`${URL_DATA.SERVER_JSON.URL_BASE}/posts/${id_post}`).then( res => {

            if( res.status ===  200 ){
                
                console.log("llego")
                console.log(res)

            }

        }); //end axios

    }
    
    const deleteData = () => { 

        try {
            
              Swal.fire({
                title: 'Seguro que quieres elimnar estos post?', 
                showCancelButton: true
              }).then( async (result)  => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    
                    selectedRow.map( async (post, i) => await deleteFile(post));
                    getData();
                    Swal.fire('Eliminado!', '', 'success')

                } else if (result.isDenied) {
                  //Swal.fire('Changes are not saved', '', 'info')
                }
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: error
            })
        }

    }

    return  <div className="  home-body-style">
                            <div className="  home-body-style">
                                <div className="  home-body-style">
                                    <div className="heading-section">
                                        <h4> Nuestros   Posts</h4>
                                    </div> 
                                    <div className=" "> 
                                        
                                            <MUIDataTable
                                                className="data-table-styles"
                                                title={"Posts Lista"}
                                                data={dataPost}
                                                columns={columns}
                                                options={options}
                                                
                                            /> 
                                    
                                    </div>  
                                </div>
                            </div>
                            
                            
                            <div> 
                            {
                                selectedRow.length === 1 && 
                                        <>
                                            <Modal
                                                className=' '
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                open={open}
                                                onClose={handleClose}
                                                closeAfterTransition
                                                slots={{ backdrop: Backdrop }}
                                                slotProps={{
                                                backdrop: {
                                                    timeout: 500,
                                                },
                                                }}
                                            >   
                                                <Box  className='modal-edit-book' sx={style}>

                                                    <InfoPost dataPost={dataPost[selectedRow[0].index]}  handleClose={() => handleClose()}  getData={getData} />
                                                
                                                </Box>
                                            </Modal>                                 
                                            <a href="#"  className="btn-flotante" onClick={handleOpen} > 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </a>
                                        </>

                                }    
                            </div>
            </div>
}
  
export default Home;